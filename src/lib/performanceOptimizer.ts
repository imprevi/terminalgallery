// Performance optimization utilities for TerminalGallery

export interface PerformanceConfig {
  maxImageSize: number
  chunkSize: number
  progressUpdateInterval: number
  workerTimeout: number
}

export const DEFAULT_PERFORMANCE_CONFIG: PerformanceConfig = {
  maxImageSize: 1920, // Max dimension before auto-resize
  chunkSize: 10, // Number of processing chunks
  progressUpdateInterval: 100, // ms between progress updates
  workerTimeout: 30000, // 30 seconds max processing time
}

// Optimize image dimensions for better performance
export function optimizeImageDimensions(
  originalWidth: number,
  originalHeight: number,
  maxSize: number = DEFAULT_PERFORMANCE_CONFIG.maxImageSize
): { width: number; height: number; wasResized: boolean } {
  const maxDimension = Math.max(originalWidth, originalHeight)
  
  if (maxDimension <= maxSize) {
    return {
      width: originalWidth,
      height: originalHeight,
      wasResized: false
    }
  }

  const scale = maxSize / maxDimension
  return {
    width: Math.round(originalWidth * scale),
    height: Math.round(originalHeight * scale),
    wasResized: true
  }
}

// Calculate optimal chunk size based on output dimensions
export function calculateOptimalChunkSize(outputHeight: number): number {
  if (outputHeight <= 50) return 5
  if (outputHeight <= 100) return 10
  if (outputHeight <= 200) return 15
  if (outputHeight <= 400) return 20
  return 25
}

// Estimate processing time based on image complexity
export function estimateProcessingTime(
  imageWidth: number,
  imageHeight: number,
  outputWidth: number,
  outputHeight: number
): { estimatedSeconds: number; complexity: 'low' | 'medium' | 'high' } {
  const inputPixels = imageWidth * imageHeight
  const outputPixels = outputWidth * outputHeight
  const complexityScore = (inputPixels + outputPixels) / 1000000 // Normalize to millions

  let estimatedSeconds: number
  let complexity: 'low' | 'medium' | 'high'

  if (complexityScore < 1) {
    estimatedSeconds = 2
    complexity = 'low'
  } else if (complexityScore < 5) {
    estimatedSeconds = 5
    complexity = 'medium'
  } else {
    estimatedSeconds = 10
    complexity = 'high'
  }

  return { estimatedSeconds, complexity }
}

// Memory usage estimation
export function estimateMemoryUsage(
  imageWidth: number,
  imageHeight: number,
  outputWidth: number,
  outputHeight: number
): { inputMB: number; outputMB: number; totalMB: number } {
  const inputMB = (imageWidth * imageHeight * 4) / 1024 / 1024 // RGBA
  const outputMB = (outputWidth * outputHeight * 2) / 1024 / 1024 // Rough estimate for ASCII with HTML
  const totalMB = inputMB + outputMB

  return { inputMB, outputMB, totalMB }
}

// Check if device can handle the processing
export function canHandleProcessing(
  imageWidth: number,
  imageHeight: number,
  outputWidth: number,
  outputHeight: number
): { canHandle: boolean; reason?: string; suggestion?: string } {
  const memory = estimateMemoryUsage(imageWidth, imageHeight, outputWidth, outputHeight)
  const time = estimateProcessingTime(imageWidth, imageHeight, outputWidth, outputHeight)

  // Check memory constraints (rough estimates for web browsers)
  if (memory.totalMB > 100) {
    return {
      canHandle: false,
      reason: 'Image too large for browser processing',
      suggestion: 'Try reducing the output size or using a smaller image'
    }
  }

  // Check time constraints
  if (time.estimatedSeconds > 30) {
    return {
      canHandle: false,
      reason: 'Processing would take too long',
      suggestion: 'Reduce output dimensions for faster processing'
    }
  }

  return { canHandle: true }
}

// Performance monitoring
export class PerformanceMonitor {
  private startTime: number = 0
  private checkpoints: { name: string; time: number }[] = []

  start(): void {
    this.startTime = performance.now()
    this.checkpoints = []
  }

  checkpoint(name: string): void {
    this.checkpoints.push({
      name,
      time: performance.now() - this.startTime
    })
  }

  getReport(): { totalTime: number; checkpoints: { name: string; time: number; duration: number }[] } {
    const totalTime = performance.now() - this.startTime
    const enhancedCheckpoints = this.checkpoints.map((checkpoint, index) => ({
      name: checkpoint.name,
      time: checkpoint.time,
      duration: index === 0 ? checkpoint.time : checkpoint.time - this.checkpoints[index - 1].time
    }))

    return { totalTime, checkpoints: enhancedCheckpoints }
  }

  reset(): void {
    this.startTime = 0
    this.checkpoints = []
  }
}

// Throttle function for progress updates
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
} 