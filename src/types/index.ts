// Type definitions for ASCII art converter
export interface ConversionSettings {
  characterSet: 'basic' | 'extended' | 'custom'
  customCharacters: string
  size: 'small' | 'medium' | 'large' | 'custom'
  customWidth: number
  customHeight: number
  colorMode: 'color' | 'grayscale' | 'blackwhite'
  backgroundColor: 'transparent' | 'black' | 'white'
  // Image dimensions for dynamic aspect ratio calculation
  imageWidth?: number
  imageHeight?: number
}

export interface ProcessingState {
  isProcessing: boolean
  stage: string
  progress: number
} 