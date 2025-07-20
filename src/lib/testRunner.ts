// Test runner for TerminalGallery core functionality
import { ASCII_SETS, SIZE_PRESETS, validateSettings, estimateOutputSize } from './asciiConverter'
import { optimizeImageDimensions, canHandleProcessing, estimateProcessingTime } from './performanceOptimizer'
import type { ConversionSettings } from '@/types'

// Test results interface
interface TestResult {
  name: string
  passed: boolean
  message: string
}

// Run all tests
export function runAllTests(): TestResult[] {
  const results: TestResult[] = []

  results.push(testCharacterSets())
  results.push(testSizePresets())
  results.push(testSettingsValidation())
  results.push(testPerformanceOptimization())
  results.push(testOutputEstimation())

  return results
}

// Test character sets
function testCharacterSets(): TestResult {
  try {
    const basicSet = ASCII_SETS.basic
    const extendedSet = ASCII_SETS.extended

    if (!basicSet || basicSet.length === 0) {
      return { name: 'Character Sets', passed: false, message: 'Basic ASCII set is empty' }
    }

    if (!extendedSet || extendedSet.length === 0) {
      return { name: 'Character Sets', passed: false, message: 'Extended ASCII set is empty' }
    }

    if (extendedSet.length <= basicSet.length) {
      return { name: 'Character Sets', passed: false, message: 'Extended set should be larger than basic set' }
    }

    return { name: 'Character Sets', passed: true, message: `Basic: ${basicSet.length} chars, Extended: ${extendedSet.length} chars` }
  } catch (error) {
    return { name: 'Character Sets', passed: false, message: `Error: ${error}` }
  }
}

// Test size presets
function testSizePresets(): TestResult {
  try {
    const presets = ['small', 'medium', 'large'] as const
    
    for (const preset of presets) {
      const size = SIZE_PRESETS[preset]
      if (!size || size.width <= 0 || size.height <= 0) {
        return { name: 'Size Presets', passed: false, message: `Invalid ${preset} preset` }
      }
    }

    // Check that sizes are properly ordered
    if (SIZE_PRESETS.small.width >= SIZE_PRESETS.medium.width ||
        SIZE_PRESETS.medium.width >= SIZE_PRESETS.large.width) {
      return { name: 'Size Presets', passed: false, message: 'Size presets not properly ordered' }
    }

    return { name: 'Size Presets', passed: true, message: 'All presets valid and properly ordered' }
  } catch (error) {
    return { name: 'Size Presets', passed: false, message: `Error: ${error}` }
  }
}

// Test settings validation
function testSettingsValidation(): TestResult {
  try {
    // Valid settings
    const validSettings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'medium',
      customWidth: 120,
      customHeight: 90,
      colorMode: 'color',
      backgroundColor: 'transparent'
    }

    let errors = validateSettings(validSettings)
    if (errors.length > 0) {
      return { name: 'Settings Validation', passed: false, message: `Valid settings failed: ${errors.join(', ')}` }
    }

    // Invalid custom character set
    const invalidCustom: ConversionSettings = {
      ...validSettings,
      characterSet: 'custom',
      customCharacters: ''
    }

    errors = validateSettings(invalidCustom)
    if (errors.length === 0) {
      return { name: 'Settings Validation', passed: false, message: 'Should reject empty custom character set' }
    }

    // Invalid custom dimensions
    const invalidDimensions: ConversionSettings = {
      ...validSettings,
      size: 'custom',
      customWidth: 1000,
      customHeight: 1000
    }

    errors = validateSettings(invalidDimensions)
    if (errors.length === 0) {
      return { name: 'Settings Validation', passed: false, message: 'Should reject oversized dimensions' }
    }

    return { name: 'Settings Validation', passed: true, message: 'Validation working correctly' }
  } catch (error) {
    return { name: 'Settings Validation', passed: false, message: `Error: ${error}` }
  }
}

// Test performance optimization
function testPerformanceOptimization(): TestResult {
  try {
    // Test image optimization
    const optimized = optimizeImageDimensions(4000, 3000, 1920)
    if (!optimized.wasResized) {
      return { name: 'Performance Optimization', passed: false, message: 'Large image should be resized' }
    }

    const notOptimized = optimizeImageDimensions(800, 600, 1920)
    if (notOptimized.wasResized) {
      return { name: 'Performance Optimization', passed: false, message: 'Small image should not be resized' }
    }

    // Test processing capability check
    const canHandle = canHandleProcessing(800, 600, 120, 90)
    if (!canHandle.canHandle) {
      return { name: 'Performance Optimization', passed: false, message: 'Should handle reasonable dimensions' }
    }

    const cantHandle = canHandleProcessing(8000, 6000, 1000, 800)
    if (cantHandle.canHandle) {
      return { name: 'Performance Optimization', passed: false, message: 'Should reject oversized processing' }
    }

    return { name: 'Performance Optimization', passed: true, message: 'Performance checks working correctly' }
  } catch (error) {
    return { name: 'Performance Optimization', passed: false, message: `Error: ${error}` }
  }
}

// Test output estimation
function testOutputEstimation(): TestResult {
  try {
    const settings: ConversionSettings = {
      characterSet: 'basic',
      customCharacters: '',
      size: 'medium',
      customWidth: 120,
      customHeight: 90,
      colorMode: 'color',
      backgroundColor: 'transparent'
    }

    const estimate = estimateOutputSize(settings)
    
    if (estimate.chars !== 120 * 90) {
      return { name: 'Output Estimation', passed: false, message: 'Character count calculation incorrect' }
    }

    if (estimate.bytes <= 0) {
      return { name: 'Output Estimation', passed: false, message: 'Byte estimation should be positive' }
    }

    // Test processing time estimation
    const timeEstimate = estimateProcessingTime(800, 600, 120, 90)
    if (timeEstimate.estimatedSeconds <= 0) {
      return { name: 'Output Estimation', passed: false, message: 'Time estimation should be positive' }
    }

    return { name: 'Output Estimation', passed: true, message: 'Output estimation working correctly' }
  } catch (error) {
    return { name: 'Output Estimation', passed: false, message: `Error: ${error}` }
  }
}

// Log test results to console
export function logTestResults(results: TestResult[]): void {
  console.log('🧪 TerminalGallery Test Results:')
  console.log('================================')
  
  results.forEach(result => {
    const icon = result.passed ? '✅' : '❌'
    console.log(`${icon} ${result.name}: ${result.message}`)
  })

  const passedCount = results.filter(r => r.passed).length
  const totalCount = results.length
  const passRate = ((passedCount / totalCount) * 100).toFixed(1)

  console.log('================================')
  console.log(`📊 Results: ${passedCount}/${totalCount} tests passed (${passRate}%)`)
  
  if (passedCount === totalCount) {
    console.log('🎉 All tests passed! TerminalGallery is ready to go!')
  } else {
    console.log('⚠️  Some tests failed. Please review the issues above.')
  }
} 