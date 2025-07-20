'use client'

import Link from 'next/link'
import { ArrowLeft, Upload, Settings, Eye, Download } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-accent-pink/20 bg-primary-bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-accent-pink" />
              <div className="flex items-center">
                <span className="font-mono text-accent-pink text-2xl font-bold">[</span>
                <span className="font-mono text-primary-text text-xl font-bold mx-1">ASCII</span>
                <span className="font-mono text-accent-pink text-2xl font-bold">]</span>
              </div>
              <span className="text-xl font-bold text-primary-text">TerminalGallery</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary-text mb-4">
              How It Works
            </h1>
            <p className="text-xl text-primary-text-secondary max-w-2xl mx-auto">
              Transform any image into stunning ASCII art in just a few simple steps. 
              Our converter uses advanced algorithms to preserve detail and character.
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <div className="grid gap-8 md:gap-12">
            
            {/* Step 1: Upload */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-accent-pink mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-text mb-2">Step 1</h3>
                  <h4 className="text-lg font-semibold text-accent-pink">Upload Image</h4>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold text-primary-text">1. Choose Your Image</h3>
                <div className="space-y-3 text-primary-text-secondary">
                  <p>• <strong>Drag & Drop:</strong> Simply drag your image onto the upload area</p>
                  <p>• <strong>Click to Browse:</strong> Use the file picker to select from your device</p>
                  <p>• <strong>Supported Formats:</strong> JPEG, PNG, WebP, GIF, HEIC, TIFF</p>
                  <p>• <strong>Size Limit:</strong> Up to 300MB (perfect for high-resolution images)</p>
                  <p>• <strong>Pro Tip:</strong> High contrast images work best for ASCII conversion</p>
                </div>
              </div>
            </div>

            {/* Step 2: Configure */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6 text-center">
                  <Settings className="w-12 h-12 text-accent-pink mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-text mb-2">Step 2</h3>
                  <h4 className="text-lg font-semibold text-accent-pink">Configure Settings</h4>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold text-primary-text">2. Customize Your Output</h3>
                <div className="space-y-4">
                  
                  <div>
                    <h4 className="text-lg font-semibold text-accent-pink mb-2">Character Sets:</h4>
                    <div className="space-y-2 text-primary-text-secondary ml-4">
                      <p>• <strong>Basic:</strong> Standard ASCII characters for clean, simple output</p>
                      <p>• <strong>Extended:</strong> Special characters (░▒▓█) for more detail</p>
                      <p>• <strong>Custom:</strong> Define your own character set (e.g., ".:oO@")</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-accent-pink mb-2">Size Options:</h4>
                    <div className="space-y-2 text-primary-text-secondary ml-4">
                      <p>• <strong>Small (40×30):</strong> Quick preview, social media friendly</p>
                      <p>• <strong>Medium (80×60):</strong> Balanced detail and size</p>
                      <p>• <strong>Large (120×90):</strong> Maximum detail for printing</p>
                      <p>• <strong>Custom:</strong> Set exact dimensions (10-500 range)</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-accent-pink mb-2">Color Modes:</h4>
                    <div className="space-y-2 text-primary-text-secondary ml-4">
                      <p>• <strong>Black & White:</strong> Classic monochrome ASCII</p>
                      <p>• <strong>Grayscale:</strong> Shades of gray for more depth</p>
                      <p>• <strong>Full Color:</strong> Preserve original image colors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Convert */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6 text-center">
                  <Eye className="w-12 h-12 text-accent-pink mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-text mb-2">Step 3</h3>
                  <h4 className="text-lg font-semibold text-accent-pink">Convert & Preview</h4>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold text-primary-text">3. Generate Your ASCII Art</h3>
                <div className="space-y-3 text-primary-text-secondary">
                  <p>• <strong>Hit Convert:</strong> Our algorithm processes your image in real-time</p>
                  <p>• <strong>Watch Progress:</strong> Live progress bar shows conversion stages</p>
                  <p>• <strong>Instant Preview:</strong> See your ASCII art immediately</p>
                  <p>• <strong>Zoom Controls:</strong> Adjust preview size (25% to 200%)</p>
                  <p>• <strong>View Modes:</strong> Switch between desktop and mobile previews</p>
                </div>
              </div>
            </div>

            {/* Step 4: Export */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="w-full md:w-1/3">
                <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6 text-center">
                  <Download className="w-12 h-12 text-accent-pink mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-text mb-2">Step 4</h3>
                  <h4 className="text-lg font-semibold text-accent-pink">Export & Share</h4>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-2xl font-bold text-primary-text">4. Save Your Creation</h3>
                <div className="space-y-4">
                  
                  <div>
                    <h4 className="text-lg font-semibold text-accent-pink mb-2">Export Options:</h4>
                    <div className="space-y-2 text-primary-text-secondary ml-4">
                      <p>• <strong>Text File (.txt):</strong> Plain text for forums, emails, terminals</p>
                      <p>• <strong>PNG Image:</strong> Ultra-high resolution (3x scaling) with transparency</p>
                      <p>• <strong>SVG Vector:</strong> Infinite quality, perfect for printing</p>
                      <p>• <strong>Copy to Clipboard:</strong> Instant sharing to any app</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-accent-pink mb-2">Best Practices:</h4>
                    <div className="space-y-2 text-primary-text-secondary ml-4">
                      <p>• Use PNG for social media posts and presentations</p>
                      <p>• Use SVG for professional printing and scalable graphics</p>
                      <p>• Use TXT for terminal displays and code documentation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips & Tricks Section */}
          <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6">💡 Pro Tips for Amazing Results</h2>
            <div className="grid md:grid-cols-2 gap-6 text-primary-text-secondary">
              <div>
                <h3 className="text-lg font-semibold text-accent-pink mb-3">Image Selection:</h3>
                <ul className="space-y-2">
                  <li>• High contrast images work best</li>
                  <li>• Clear subjects with defined edges</li>
                  <li>• Avoid cluttered backgrounds</li>
                  <li>• Portrait orientation often works well</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent-pink mb-3">Settings Optimization:</h3>
                <ul className="space-y-2">
                  <li>• Start with medium size for balance</li>
                  <li>• Extended characters for more detail</li>
                  <li>• Color mode for vibrant results</li>
                  <li>• Custom characters for artistic effects</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ready to Start */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary-text">Ready to Create ASCII Art?</h2>
            <p className="text-xl text-primary-text-secondary">
              Start converting your images into beautiful ASCII masterpieces!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-accent-pink hover:bg-accent-pink/90 text-primary-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Converting
              <Upload className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 