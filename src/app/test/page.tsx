'use client'

import { useState } from 'react'
import { runComprehensiveTests } from '@/lib/comprehensiveTest'

interface TestResult {
  name: string
  passed: boolean
  error?: string
  time?: number
  output?: any
}

export default function TestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [testing, setTesting] = useState(false)

  const runTests = async () => {
    setTesting(true)
    try {
      const testResults = await runComprehensiveTests()
      setResults(testResults)
    } catch (error) {
      console.error('Test execution failed:', error)
    }
    setTesting(false)
  }

  const passedCount = results.filter(r => r.passed).length
  const failedCount = results.filter(r => !r.passed).length
  const successRate = results.length > 0 ? Math.round((passedCount / results.length) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">🧪 ASCII Converter Comprehensive Tests</h1>
        
        <div className="text-center mb-8">
          <button
            onClick={runTests}
            disabled={testing}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            {testing ? '🔄 Running Tests...' : '🚀 Run All Tests'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="mb-8 p-6 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-bold mb-4">📊 Test Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-900 p-4 rounded">
                <div className="text-2xl font-bold text-green-400">✅ {passedCount}</div>
                <div className="text-sm">Passed</div>
              </div>
              <div className="bg-red-900 p-4 rounded">
                <div className="text-2xl font-bold text-red-400">❌ {failedCount}</div>
                <div className="text-sm">Failed</div>
              </div>
              <div className="bg-blue-900 p-4 rounded">
                <div className="text-2xl font-bold text-blue-400">{successRate}%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">📝 Detailed Results</h2>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  result.passed 
                    ? 'bg-green-900/20 border-green-400' 
                    : 'bg-red-900/20 border-red-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">
                    {result.passed ? '✅' : '❌'} {result.name}
                  </h3>
                  {result.time && (
                    <span className="text-sm text-gray-400">
                      {result.time}ms
                    </span>
                  )}
                </div>
                
                {result.output && (
                  <div className="text-sm text-gray-300 mb-2">
                    📋 {result.output}
                  </div>
                )}
                
                {result.error && (
                  <div className="text-sm text-red-400">
                    🚨 Error: {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {testing && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            <p className="mt-2">Running comprehensive tests...</p>
          </div>
        )}
      </div>
    </div>
  )
} 