// ASCII Conversion Web Worker
// This runs in a separate thread to prevent UI blocking

interface WorkerMessage {
  type: 'convert'
  imageData: ImageData
  settings: {
    characterSet: string
    outputWidth: number
    outputHeight: number
    colorMode: string
  }
}

interface WorkerResponse {
  type: 'progress' | 'complete' | 'error'
  progress?: number
  stage?: string
  result?: string
  error?: string
}

// ASCII Character Sets
const ASCII_SETS = {
  basic: '.,:;!*#@',
  extended: ' .\'"^`,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
}

// Luminance calculation using standard weights
function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

// Map luminance to ASCII character
function luminanceToASCII(luminance: number, characterSet: string): string {
  const normalizedLuminance = Math.min(255, Math.max(0, luminance))
  const charIndex = Math.floor((normalizedLuminance / 255) * (characterSet.length - 1))
  return characterSet[charIndex]
}

// Calculate optimal chunk size based on output dimensions
function calculateOptimalChunkSize(outputHeight: number): number {
  if (outputHeight <= 50) return 5
  if (outputHeight <= 100) return 10
  if (outputHeight <= 200) return 15
  if (outputHeight <= 400) return 20
  return 25
}

// Process image chunk
function processImageChunk(
  imageData: ImageData,
  startRow: number,
  endRow: number,
  outputWidth: number,
  outputHeight: number,
  characterSet: string,
  colorMode: string
): string[] {
  const { data, width, height } = imageData
  const result: string[] = []
  
  const scaleX = width / outputWidth
  const scaleY = height / outputHeight

  for (let y = startRow; y < endRow; y++) {
    let row = ''
    
    for (let x = 0; x < outputWidth; x++) {
      // Sample from the original image
      const sourceX = Math.floor(x * scaleX)
      const sourceY = Math.floor(y * scaleY)
      const pixelIndex = (sourceY * width + sourceX) * 4

      const r = data[pixelIndex]
      const g = data[pixelIndex + 1]
      const b = data[pixelIndex + 2]
      const a = data[pixelIndex + 3] || 255

      let luminance: number

      switch (colorMode) {
        case 'grayscale':
          luminance = getLuminance(r, g, b)
          break
        case 'blackwhite':
          luminance = getLuminance(r, g, b) > 128 ? 255 : 0
          break
        case 'color':
        default:
          luminance = getLuminance(r, g, b)
          break
      }

      // Apply alpha transparency
      if (a < 255) {
        luminance = luminance * (a / 255)
      }

      const char = luminanceToASCII(luminance, characterSet)
      
      if (colorMode === 'color' && a > 0) {
        // For color mode, wrap character in span with color
        const color = `rgb(${r},${g},${b})`
        row += `<span style="color:${color}">${char}</span>`
      } else {
        row += char
      }
    }
    
    result.push(row)
  }

  return result
}

// Main worker message handler
self.onmessage = function(e: MessageEvent<WorkerMessage>) {
  const { type, imageData, settings } = e.data

  if (type === 'convert') {
    try {
      const { characterSet, outputWidth, outputHeight, colorMode } = settings
      
      // Send initial progress
      self.postMessage({ 
        type: 'progress', 
        progress: 10, 
        stage: 'Starting conversion...' 
      } as WorkerResponse)

      // Process image in chunks
      const chunkSize = calculateOptimalChunkSize(outputHeight)
      const chunks: string[][] = []

      for (let i = 0; i < outputHeight; i += chunkSize) {
        const startRow = i
        const endRow = Math.min(i + chunkSize, outputHeight)
        
        const chunk = processImageChunk(
          imageData,
          startRow,
          endRow,
          outputWidth,
          outputHeight,
          characterSet,
          colorMode
        )
        
        chunks.push(chunk)
        
        // Update progress
        const progress = 10 + ((i / outputHeight) * 80)
        self.postMessage({ 
          type: 'progress', 
          progress, 
          stage: `Converting rows ${startRow}-${endRow}...` 
        } as WorkerResponse)
      }

      // Combine chunks
      self.postMessage({ 
        type: 'progress', 
        progress: 95, 
        stage: 'Finalizing...' 
      } as WorkerResponse)
      
      const result = chunks.reduce((acc, chunk) => acc.concat(chunk), []).join('\n')

      // Send final result
      self.postMessage({ 
        type: 'complete', 
        progress: 100, 
        result 
      } as WorkerResponse)

    } catch (error) {
      self.postMessage({ 
        type: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      } as WorkerResponse)
    }
  }
}

export {} 