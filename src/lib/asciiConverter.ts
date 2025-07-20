import type { ConversionSettings } from '@/types'
import { 
  optimizeImageDimensions, 
  canHandleProcessing,
  PerformanceMonitor,
  throttle
} from './performanceOptimizer'
import {
  ASCII_SETS,
  getLuminance,
  luminanceToASCII,
  processImageChunk,
  calculateOptimalChunkSize
} from './workerShared'

// Re-export for backwards compatibility
export { ASCII_SETS } from './workerShared'

// Size presets (legacy - now calculated dynamically)
export const SIZE_PRESETS = {
  small: { width: 50, height: 25 },
  medium: { width: 100, height: 50 },
  large: { width: 150, height: 75 }
}

// Character aspect ratio compensation (characters are ~1.5x taller than wide)
const CHARACTER_ASPECT_RATIO = 1.5

// Calculate dynamic size presets based on image aspect ratio
export function calculateDynamicPresets(imageWidth: number, imageHeight: number): typeof SIZE_PRESETS {
  const imageAspectRatio = imageWidth / imageHeight
  
  // Base heights for each preset
  const baseHeights = {
    small: 25,
    medium: 50,
    large: 75
  }
  
  const presets: typeof SIZE_PRESETS = {} as any
  
  Object.entries(baseHeights).forEach(([key, targetHeight]) => {
    // Calculate width preserving aspect ratio with character compensation
    const targetWidth = Math.round(targetHeight * imageAspectRatio * CHARACTER_ASPECT_RATIO)
    
    // Apply bounds (min 10, max 300) - increased width limit for wide images
    const boundedWidth = Math.max(10, Math.min(300, targetWidth))
    const boundedHeight = Math.max(10, Math.min(200, targetHeight))
    
    // If width was capped, adjust height proportionally to maintain aspect ratio
    const actualAspectRatio = boundedWidth / boundedHeight
    const targetAspectRatio = imageAspectRatio * CHARACTER_ASPECT_RATIO
    
    if (targetWidth > 300) {
      // Width was capped, so recalculate height to maintain proper aspect ratio
      const adjustedHeight = Math.round(boundedWidth / targetAspectRatio)
      presets[key as keyof typeof SIZE_PRESETS] = {
        width: boundedWidth,
        height: Math.max(10, Math.min(200, adjustedHeight))
      }
    } else {
      presets[key as keyof typeof SIZE_PRESETS] = {
        width: boundedWidth,
        height: boundedHeight
      }
    }
  })
  
  return presets
}

interface ProgressCallback {
  (progress: number, stage: string): void
}

interface ImageData {
  data: Uint8ClampedArray
  width: number
  height: number
}

// Get character set based on settings
function getCharacterSet(settings: ConversionSettings): string {
  switch (settings.characterSet) {
    case 'basic':
      return ASCII_SETS.basic
    case 'extended':
      return ASCII_SETS.extended
    case 'custom':
      return settings.customCharacters || ASCII_SETS.basic
    default:
      return ASCII_SETS.basic
  }
}

// Get output dimensions based on settings
function getOutputDimensions(settings: ConversionSettings): { width: number; height: number } {
  if (settings.size === 'custom') {
    return {
      width: Math.max(10, Math.min(500, settings.customWidth)),
      height: Math.max(10, Math.min(500, settings.customHeight))
    }
  }
  
  // Use dynamic presets if image dimensions are available
  if (settings.imageWidth && settings.imageHeight) {
    const dynamicPresets = calculateDynamicPresets(settings.imageWidth, settings.imageHeight)
    return dynamicPresets[settings.size] || dynamicPresets.medium
  }
  
  // Fallback to static presets
  return SIZE_PRESETS[settings.size] || SIZE_PRESETS.medium
}

// Load image into canvas and get image data with optimization
async function loadImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Could not get canvas context'))
      return
    }

    img.onload = () => {
      // Clean up object URL
      URL.revokeObjectURL(img.src)
      
      // Optimize image dimensions for performance
      const optimized = optimizeImageDimensions(img.width, img.height)
      
      canvas.width = optimized.width
      canvas.height = optimized.height
      
      // Draw image with optimized dimensions
      ctx.drawImage(img, 0, 0, optimized.width, optimized.height)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      resolve({
        data: imageData.data,
        width: imageData.width,
        height: imageData.height
      })
    }

    img.onerror = () => {
      // Clean up object URL on error too
      URL.revokeObjectURL(img.src)
      reject(new Error('Failed to load image'))
    }

    img.src = URL.createObjectURL(file)
  })
}



// Main conversion function using Web Worker with performance optimization
export async function convertImageToASCII(
  file: File,
  settings: ConversionSettings,
  onProgress?: ProgressCallback
): Promise<string> {
  const monitor = new PerformanceMonitor()
  monitor.start()

  try {
    // Step 1: Load and optimize image
    onProgress?.(5, 'Loading image...')
    monitor.checkpoint('Image load start')
    const imageData = await loadImageData(file)
    monitor.checkpoint('Image loaded')

    // Step 2: Get conversion parameters
    const characterSet = getCharacterSet(settings)
    const { width: outputWidth, height: outputHeight } = getOutputDimensions(settings)

    // Step 3: Performance check
    const performanceCheck = canHandleProcessing(
      imageData.width, 
      imageData.height, 
      outputWidth, 
      outputHeight
    )
    
    if (!performanceCheck.canHandle) {
      throw new Error(`${performanceCheck.reason}. ${performanceCheck.suggestion}`)
    }

    monitor.checkpoint('Performance check complete')

    // Step 3: Use Web Worker for processing
    return new Promise((resolve, reject) => {
      // Create worker from blob URL to avoid file path issues
      const workerCode = `
        // ASCII Character Sets
        const ASCII_SETS = {
          basic: '.,:;!*#@',
          extended: ' .\\'"\`^",:;Il!i><~+_-?][}{1)(|\\\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
        };

        function getLuminance(r, g, b) {
          return 0.299 * r + 0.587 * g + 0.114 * b;
        }

        function luminanceToASCII(luminance, characterSet) {
          const normalizedLuminance = Math.min(255, Math.max(0, luminance));
          const charIndex = Math.floor((normalizedLuminance / 255) * (characterSet.length - 1));
          return characterSet[charIndex];
        }

        function processImageChunk(imageData, startRow, endRow, outputWidth, outputHeight, characterSet, colorMode) {
          const { data, width, height } = imageData;
          const result = [];
          const scaleX = width / outputWidth;
          const scaleY = height / outputHeight;

          for (let y = startRow; y < endRow; y++) {
            let row = '';
            for (let x = 0; x < outputWidth; x++) {
              const sourceX = Math.floor(x * scaleX);
              const sourceY = Math.floor(y * scaleY);
              const pixelIndex = (sourceY * width + sourceX) * 4;

              const r = data[pixelIndex];
              const g = data[pixelIndex + 1];
              const b = data[pixelIndex + 2];
              const a = data[pixelIndex + 3] || 255;

              let luminance;
              switch (colorMode) {
                case 'grayscale':
                  luminance = getLuminance(r, g, b);
                  break;
                case 'blackwhite':
                  luminance = getLuminance(r, g, b) > 128 ? 255 : 0;
                  break;
                default:
                  luminance = getLuminance(r, g, b);
                  break;
              }

              if (a < 255) {
                luminance = luminance * (a / 255);
              }

              const char = luminanceToASCII(luminance, characterSet);
              
              if (colorMode === 'color' && a > 0) {
                const color = \`rgb(\${r},\${g},\${b})\`;
                row += \`<span style="color:\${color}">\${char}</span>\`;
              } else if (colorMode === 'grayscale' && a > 0) {
                const gray = Math.round(luminance);
                const color = \`rgb(\${gray},\${gray},\${gray})\`;
                row += \`<span style="color:\${color}">\${char}</span>\`;
              } else {
                row += char;
              }
            }
            result.push(row);
          }
          return result;
        }

        // Calculate optimal chunk size based on output dimensions
        function calculateOptimalChunkSize(outputHeight) {
          if (outputHeight <= 50) return 5;
          if (outputHeight <= 100) return 10;
          if (outputHeight <= 200) return 15;
          if (outputHeight <= 400) return 20;
          return 25;
        }

        self.onmessage = function(e) {
          const { imageData, settings } = e.data;
          const { characterSet, outputWidth, outputHeight, colorMode } = settings;
          
          try {
            self.postMessage({ type: 'progress', progress: 10, stage: 'Starting conversion...' });

            const chunkSize = calculateOptimalChunkSize(outputHeight);
            const chunks = [];

            for (let i = 0; i < outputHeight; i += chunkSize) {
              const startRow = i;
              const endRow = Math.min(i + chunkSize, outputHeight);
              
              const chunk = processImageChunk(imageData, startRow, endRow, outputWidth, outputHeight, characterSet, colorMode);
              chunks.push(chunk);
              
              const progress = 10 + ((i / outputHeight) * 80);
              self.postMessage({ type: 'progress', progress, stage: \`Converting rows \${startRow}-\${endRow}...\` });
            }

            self.postMessage({ type: 'progress', progress: 95, stage: 'Finalizing...' });
            const result = chunks.reduce((acc, chunk) => acc.concat(chunk), []).join('\\n');
            self.postMessage({ type: 'complete', progress: 100, result });

          } catch (error) {
            self.postMessage({ type: 'error', error: error.message });
          }
        };
      `;

      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      worker.onmessage = (e) => {
        const { type, progress, stage, result, error } = e.data;

        if (type === 'progress') {
          onProgress?.(progress, stage);
        } else if (type === 'complete') {
          monitor.checkpoint('Conversion complete')
          const performanceReport = monitor.getReport()
          console.log('TerminalGallery Performance Report:', performanceReport)
          
          onProgress?.(100, 'Complete!');
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve(result);
        } else if (type === 'error') {
          monitor.checkpoint('Conversion error')
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          reject(new Error(error));
        }
      };

      worker.onerror = (error) => {
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
        reject(new Error(`Worker error: ${error.message}`));
      };

      // Send data to worker
      worker.postMessage({
        imageData,
        settings: {
          characterSet,
          outputWidth,
          outputHeight,
          colorMode: settings.colorMode
        }
      });
    });

  } catch (error) {
    console.error('ASCII conversion failed:', error)
    throw new Error(`Conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Utility function to estimate output size
export function estimateOutputSize(settings: ConversionSettings): { chars: number; bytes: number } {
  const { width, height } = getOutputDimensions(settings)
  const chars = width * height
  
  let bytesPerChar: number
  if (settings.colorMode === 'color' || settings.colorMode === 'grayscale') {
    bytesPerChar = 50 // Rough estimate for HTML spans with color
  } else {
    bytesPerChar = 1 // Plain text for black & white
  }
  
  return {
    chars,
    bytes: chars * bytesPerChar
  }
}

// Utility function to validate settings
export function validateSettings(settings: ConversionSettings): string[] {
  const errors: string[] = []

  if (settings.characterSet === 'custom' && !settings.customCharacters.trim()) {
    errors.push('Custom character set cannot be empty')
  }

  if (settings.size === 'custom') {
    if (settings.customWidth < 10 || settings.customWidth > 500) {
      errors.push('Custom width must be between 10 and 500')
    }
    if (settings.customHeight < 10 || settings.customHeight > 500) {
      errors.push('Custom height must be between 10 and 500')
    }
  }

  return errors
} 