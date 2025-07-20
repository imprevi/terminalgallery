// Shared utilities for ASCII conversion (main thread and worker)

// ASCII Character Sets
export const ASCII_SETS = {
  basic: '.,:;!*#@',
  extended: ' .\'"^`,:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
}

// Luminance calculation using standard weights
export function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

// Map luminance to ASCII character
export function luminanceToASCII(luminance: number, characterSet: string): string {
  const normalizedLuminance = Math.min(255, Math.max(0, luminance))
  const charIndex = Math.floor((normalizedLuminance / 255) * (characterSet.length - 1))
  return characterSet[charIndex]
}

// Calculate optimal chunk size based on output dimensions
export function calculateOptimalChunkSize(outputHeight: number): number {
  if (outputHeight <= 50) return 5
  if (outputHeight <= 100) return 10
  if (outputHeight <= 200) return 15
  if (outputHeight <= 400) return 20
  return 25
}

// Process image chunk with proper grayscale handling
export function processImageChunk(
  imageData: { data: Uint8ClampedArray; width: number; height: number },
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
      } else if (colorMode === 'grayscale' && a > 0) {
        // For grayscale mode, wrap character in span with gray color
        const gray = Math.round(luminance)
        const color = `rgb(${gray},${gray},${gray})`
        row += `<span style="color:${color}">${char}</span>`
      } else {
        row += char
      }
    }
    
    result.push(row)
  }

  return result
} 