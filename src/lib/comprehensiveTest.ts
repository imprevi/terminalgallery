import { convertImageToASCII, SIZE_PRESETS, validateSettings, estimateOutputSize } from './asciiConverter'
import { optimizeImageDimensions, canHandleProcessing, estimateProcessingTime } from './performanceOptimizer'
import { ASCII_SETS } from './workerShared'
import type { ConversionSettings } from '@/types'

// Test results interface
interface TestResult {
  name: string
  passed: boolean
  error?: string
  time?: number
  output?: any
}

// Comprehensive test suite
export class ASCIIConverterTester {
  private results: TestResult[] = []
  private testImage: File | null = null

  async runAllTests(): Promise<TestResult[]> {
    this.results = []
    
    console.log('🧪 Starting Comprehensive ASCII Converter Tests...')
    
    // Load test image
    await this.loadTestImage()
    
    // Core functionality tests
    await this.testCharacterSets()
    await this.testSizePresets()
    await this.testColorModes()
    await this.testCustomSettings()
    
    // Edge case tests
    await this.testEdgeCases()
    
    // Performance tests
    await this.testPerformance()
    
    // Integration tests
    await this.testFullWorkflow()
    
    // Export functionality tests
    await this.testExportFormats()
    
    this.printResults()
    return this.results
  }

  private async loadTestImage(): Promise<void> {
    try {
      const response = await fetch('/samples/hamter.jpg')
      const blob = await response.blob()
      this.testImage = new File([blob], 'hamter.jpg', { type: 'image/jpeg' })
      this.addResult('Load Test Image', true, undefined, 0, `Loaded ${this.testImage.size} bytes`)
    } catch (error) {
      this.addResult('Load Test Image', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testCharacterSets(): Promise<void> {
    const settings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'small',
      customWidth: 40,
      customHeight: 30,
      colorMode: 'blackwhite',
      backgroundColor: 'transparent'
    }

    // Test basic character set
    try {
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasBasicChars = ASCII_SETS.basic.split('').some(char => result.includes(char))
      this.addResult('Basic Character Set', hasBasicChars && result.length > 100, undefined, time, 
        `Generated ${result.length} chars in ${time}ms`)
    } catch (error) {
      this.addResult('Basic Character Set', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test extended character set
    try {
      settings.characterSet = 'extended'
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasExtendedChars = ASCII_SETS.extended.split('').some(char => result.includes(char))
      this.addResult('Extended Character Set', hasExtendedChars && result.length > 100, undefined, time,
        `Generated ${result.length} chars in ${time}ms`)
    } catch (error) {
      this.addResult('Extended Character Set', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test custom character set
    try {
      settings.characterSet = 'custom'
      settings.customCharacters = '.:oO@'
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const onlyCustomChars = result.split('').every(char => 
        settings.customCharacters.includes(char) || char === '\n' || char === ' ')
      this.addResult('Custom Character Set', onlyCustomChars && result.length > 100, undefined, time,
        `Generated ${result.length} chars with custom set in ${time}ms`)
    } catch (error) {
      this.addResult('Custom Character Set', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testSizePresets(): Promise<void> {
    const baseSettings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'small',
      customWidth: 40,
      customHeight: 30,
      colorMode: 'blackwhite',
      backgroundColor: 'transparent'
    }

    for (const [sizeName, dimensions] of Object.entries(SIZE_PRESETS)) {
      try {
        const settings = { ...baseSettings, size: sizeName as any }
        const start = Date.now()
        const result = await convertImageToASCII(this.testImage!, settings)
        const time = Date.now() - start
        
        const lines = result.split('\n').filter(line => line.trim().length > 0)
        const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length
        
        // Check if dimensions are roughly correct (allow 10% variance)
        const heightOk = Math.abs(lines.length - dimensions.height) <= Math.ceil(dimensions.height * 0.1)
        const widthOk = Math.abs(avgLineLength - dimensions.width) <= Math.ceil(dimensions.width * 0.1)
        
        this.addResult(`Size Preset: ${sizeName}`, heightOk && widthOk, undefined, time,
          `Expected: ${dimensions.width}x${dimensions.height}, Got: ~${Math.round(avgLineLength)}x${lines.length}`)
      } catch (error) {
        this.addResult(`Size Preset: ${sizeName}`, false, error instanceof Error ? error.message : 'Unknown error')
      }
    }
  }

  private async testColorModes(): Promise<void> {
    const baseSettings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'small',
      customWidth: 40,
      customHeight: 30,
      colorMode: 'blackwhite',
      backgroundColor: 'transparent'
    }

    // Test black & white mode
    try {
      const settings = { ...baseSettings, colorMode: 'blackwhite' as const }
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasNoHTML = !result.includes('<span') && !result.includes('style=')
      this.addResult('Black & White Mode', hasNoHTML && result.length > 100, undefined, time,
        `Plain text output: ${result.length} chars`)
    } catch (error) {
      this.addResult('Black & White Mode', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test grayscale mode
    try {
      const settings = { ...baseSettings, colorMode: 'grayscale' as const }
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasGrayHTML = result.includes('<span') && result.includes('color:rgb(')
      // Check that grayscale colors are actually grayscale (same R, G, B values)
      const grayColorRegex = /color:rgb\((\d+),(\d+),(\d+)\)/g
      let hasValidGrayColors = true
      let match
      while ((match = grayColorRegex.exec(result)) !== null) {
        const [, r, g, b] = match
        if (r !== g || g !== b) {
          hasValidGrayColors = false
          break
        }
      }
      
      this.addResult('Grayscale Mode', hasGrayHTML && hasValidGrayColors && result.length > 100, undefined, time,
        `HTML output with proper grayscale spans: ${result.length} chars`)
    } catch (error) {
      this.addResult('Grayscale Mode', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test color mode
    try {
      const settings = { ...baseSettings, colorMode: 'color' as const }
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasColorHTML = result.includes('<span') && result.includes('color:rgb(')
      this.addResult('Color Mode', hasColorHTML && result.length > 100, undefined, time,
        `HTML output with color: ${result.length} chars`)
    } catch (error) {
      this.addResult('Color Mode', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testCustomSettings(): Promise<void> {
    // Test custom dimensions
    try {
      const settings: ConversionSettings = {
        characterSet: 'basic',
        customCharacters: '',
        size: 'custom',
        customWidth: 60,
        customHeight: 25,
        colorMode: 'blackwhite',
        backgroundColor: 'transparent'
      }
      
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const lines = result.split('\n').filter(line => line.trim().length > 0)
      const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length
      
      const heightOk = Math.abs(lines.length - 25) <= 3
      const widthOk = Math.abs(avgLineLength - 60) <= 6
      
      this.addResult('Custom Dimensions', heightOk && widthOk, undefined, time,
        `Expected: 60x25, Got: ~${Math.round(avgLineLength)}x${lines.length}`)
    } catch (error) {
      this.addResult('Custom Dimensions', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testEdgeCases(): Promise<void> {
    // Test with very small dimensions
    try {
      const settings: ConversionSettings = {
        characterSet: 'basic',
        customCharacters: '',
        size: 'custom',
        customWidth: 10,
        customHeight: 10,
        colorMode: 'blackwhite',
        backgroundColor: 'transparent'
      }
      
      const result = await convertImageToASCII(this.testImage!, settings)
      this.addResult('Minimum Dimensions', result.length > 50, undefined, 0,
        `10x10 conversion produced ${result.length} chars`)
    } catch (error) {
      this.addResult('Minimum Dimensions', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test with large dimensions
    try {
      const settings: ConversionSettings = {
        characterSet: 'basic',
        customCharacters: '',
        size: 'custom',
        customWidth: 200,
        customHeight: 150,
        colorMode: 'blackwhite',
        backgroundColor: 'transparent'
      }
      
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      this.addResult('Large Dimensions', result.length > 10000 && time < 30000, undefined, time,
        `200x150 conversion: ${result.length} chars in ${time}ms`)
    } catch (error) {
      this.addResult('Large Dimensions', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test validation
    try {
      const invalidSettings: ConversionSettings = {
        characterSet: 'custom',
        customCharacters: '',
        size: 'custom',
        customWidth: 5,
        customHeight: 600,
        colorMode: 'blackwhite',
        backgroundColor: 'transparent'
      }
      
      const errors = validateSettings(invalidSettings)
      this.addResult('Settings Validation', errors.length > 0, undefined, 0,
        `Found ${errors.length} validation errors: ${errors.join(', ')}`)
    } catch (error) {
      this.addResult('Settings Validation', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testPerformance(): Promise<void> {
    const settings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'medium',
      customWidth: 80,
      customHeight: 60,
      colorMode: 'blackwhite',
      backgroundColor: 'transparent'
    }

    // Test performance optimization
    try {
      // Get image dimensions for testing
      const imageWidth = 800
      const imageHeight = 600
      const outputWidth = 80
      const outputHeight = 60
      
      const canHandle = canHandleProcessing(imageWidth, imageHeight, outputWidth, outputHeight)
      const estimatedTime = estimateProcessingTime(imageWidth, imageHeight, outputWidth, outputHeight)
      const optimizedDims = optimizeImageDimensions(1000, 800, 80)
      
      this.addResult('Performance Analysis', canHandle.canHandle && estimatedTime.estimatedSeconds > 0, undefined, 0,
        `Can handle: ${canHandle.canHandle}, Est. time: ${estimatedTime.estimatedSeconds}s, Optimized: ${optimizedDims.width}x${optimizedDims.height}`)
    } catch (error) {
      this.addResult('Performance Analysis', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test output size estimation for different modes
    try {
      const blackWhiteEstimate = estimateOutputSize(settings)
      const grayscaleEstimate = estimateOutputSize({ ...settings, colorMode: 'grayscale' })
      const colorEstimate = estimateOutputSize({ ...settings, colorMode: 'color' })
      
      const hasCorrectEstimates = blackWhiteEstimate.bytes < grayscaleEstimate.bytes && 
                                 grayscaleEstimate.bytes === colorEstimate.bytes
      
      this.addResult('Output Size Estimation', hasCorrectEstimates && blackWhiteEstimate.chars > 0, undefined, 0,
        `B&W: ${blackWhiteEstimate.bytes}B, Gray: ${grayscaleEstimate.bytes}B, Color: ${colorEstimate.bytes}B`)
    } catch (error) {
      this.addResult('Output Size Estimation', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test shared utilities
    try {
      const { calculateOptimalChunkSize } = await import('./workerShared')
      const chunk50 = calculateOptimalChunkSize(50)
      const chunk200 = calculateOptimalChunkSize(200)
      const chunk500 = calculateOptimalChunkSize(500)
      
      const hasValidChunkSizes = chunk50 < chunk200 && chunk200 < chunk500
      
      this.addResult('Shared Utilities', hasValidChunkSizes, undefined, 0,
        `Chunk sizes: 50h→${chunk50}, 200h→${chunk200}, 500h→${chunk500}`)
    } catch (error) {
      this.addResult('Shared Utilities', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testFullWorkflow(): Promise<void> {
    // Test complete conversion workflow
    try {
      const settings: ConversionSettings = {
        characterSet: 'extended',
        customCharacters: '',
        size: 'medium',
        customWidth: 80,
        customHeight: 60,
        colorMode: 'color',
        backgroundColor: 'transparent'
      }
      
      const start = Date.now()
      const result = await convertImageToASCII(this.testImage!, settings)
      const time = Date.now() - start
      
      const hasContent = result.length > 1000
      const hasColorSpans = result.includes('<span') && result.includes('color:rgb(')
      const hasNewlines = result.includes('\n')
      
      this.addResult('Full Workflow', hasContent && hasColorSpans && hasNewlines, undefined, time,
        `Complete color conversion: ${result.length} chars in ${time}ms`)
    } catch (error) {
      this.addResult('Full Workflow', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private async testExportFormats(): Promise<void> {
    // Test text export (plain)
    try {
      const settings: ConversionSettings = {
        characterSet: 'basic',
        customCharacters: '',
        size: 'small',
        customWidth: 40,
        customHeight: 30,
        colorMode: 'blackwhite',
        backgroundColor: 'transparent'
      }
      
      const result = await convertImageToASCII(this.testImage!, settings)
      
      // Simulate text export
      const textBlob = new Blob([result], { type: 'text/plain' })
      const isValidText = textBlob.size > 100 && textBlob.type === 'text/plain'
      
      this.addResult('Text Export Format', isValidText, undefined, 0,
        `Text blob: ${textBlob.size} bytes`)
    } catch (error) {
      this.addResult('Text Export Format', false, error instanceof Error ? error.message : 'Unknown error')
    }

    // Test HTML export (for PNG/SVG conversion)
    try {
      const settings: ConversionSettings = {
        characterSet: 'basic',
        customCharacters: '',
        size: 'small',
        customWidth: 40,
        customHeight: 30,
        colorMode: 'color',
        backgroundColor: 'transparent'
      }
      
      const result = await convertImageToASCII(this.testImage!, settings)
      
      const hasValidHTML = result.includes('<span') && result.includes('</span>')
      
      this.addResult('HTML Export Format', hasValidHTML, undefined, 0,
        `HTML format ready for PNG/SVG export`)
    } catch (error) {
      this.addResult('HTML Export Format', false, error instanceof Error ? error.message : 'Unknown error')
    }
  }

  private addResult(name: string, passed: boolean, error?: string, time?: number, output?: string): void {
    this.results.push({ name, passed, error, time, output })
  }

  private printResults(): void {
    console.log('\n📊 Test Results Summary:')
    console.log('=' .repeat(80))
    
    let passed = 0
    let failed = 0
    
    this.results.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL'
      const timeStr = result.time ? ` (${result.time}ms)` : ''
      const outputStr = result.output ? ` - ${result.output}` : ''
      const errorStr = result.error ? ` - ERROR: ${result.error}` : ''
      
      console.log(`${status} ${result.name}${timeStr}${outputStr}${errorStr}`)
      
      if (result.passed) passed++
      else failed++
    })
    
    console.log('=' .repeat(80))
    console.log(`✅ PASSED: ${passed}`)
    console.log(`❌ FAILED: ${failed}`)
    console.log(`📈 SUCCESS RATE: ${Math.round((passed / (passed + failed)) * 100)}%`)
    console.log('\n🎯 ASCII Converter Testing Complete!')
  }
}

// Export for browser testing
export async function runComprehensiveTests(): Promise<TestResult[]> {
  const tester = new ASCIIConverterTester()
  return await tester.runAllTests()
} 