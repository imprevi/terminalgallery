'use client'

import { useState } from 'react'
import { Download, Copy, FileText, Image as ImageIcon, Check } from 'lucide-react'
import type { ConversionSettings } from './TerminalGallery'

interface ExportControlsProps {
  asciiArt: string
  originalFileName: string
  settings: ConversionSettings
}

export default function ExportControls({ asciiArt, originalFileName, settings }: ExportControlsProps) {
  const [copied, setCopied] = useState(false)
  const [exportCount, setExportCount] = useState(1)

  // Generate default filename
  const generateFileName = (extension: string) => {
    const baseName = originalFileName.replace(/\.[^/.]+$/, '') || 'terminalgallery'
    const countStr = exportCount < 10 ? `0${exportCount}` : String(exportCount)
    return `${baseName}_${countStr}.${extension}`
  }

  // Copy ASCII art to clipboard
  const copyToClipboard = async () => {
    try {
      // Remove HTML tags for plain text copy
      const plainText = asciiArt.replace(/<[^>]*>/g, '')
      await navigator.clipboard.writeText(plainText)
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = asciiArt.replace(/<[^>]*>/g, '')
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Download ASCII art as text file
  const downloadAsText = () => {
    const plainText = asciiArt.replace(/<[^>]*>/g, '')
    const blob = new Blob([plainText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = generateFileName('txt')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setExportCount(prev => prev + 1)
  }

  // Download ASCII art as SVG (Vector)
  const downloadAsSVG = () => {
    const fontSize = 16
    const lineHeight = fontSize * 1.1
    const charWidth = fontSize * 0.6
    const padding = 32

    const lines = asciiArt.split('\n')
    const maxLineLength = Math.max(...lines.map(line => line.replace(/<[^>]*>/g, '').length))
    
    const width = maxLineLength * charWidth + (padding * 2)
    const height = lines.length * lineHeight + (padding * 2)

    // Create SVG content
    let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .ascii-text {
        font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: ${fontSize}px;
        font-weight: normal;
        text-anchor: start;
        dominant-baseline: text-before-edge;
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#1a1a1a"/>
`

    // Add text elements for each line
    lines.forEach((line, index) => {
      const y = padding + index * lineHeight

      if (settings.colorMode === 'color' && line.includes('<span')) {
        // Parse colored text for SVG
        let x = padding
        const parser = new DOMParser()
        const doc = parser.parseFromString(`<div>${line}</div>`, 'text/html')
        const div = doc.querySelector('div')
        
        if (div) {
          Array.from(div.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent || ''
              if (text.trim()) {
                svgContent += `  <text x="${x}" y="${y}" class="ascii-text" fill="#f5f5f5">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>\n`
                x += text.length * charWidth
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const text = element.textContent || ''
              const style = element.getAttribute('style')
              const colorMatch = style?.match(/color:\s*([^;]+)/)
              const color = colorMatch ? colorMatch[1] : '#f5f5f5'
              
              if (text.trim()) {
                svgContent += `  <text x="${x}" y="${y}" class="ascii-text" fill="${color}">${text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>\n`
                x += text.length * charWidth
              }
            }
          })
        }
      } else {
        // Plain text
        const plainLine = line.replace(/<[^>]*>/g, '')
        if (plainLine.trim()) {
          svgContent += `  <text x="${padding}" y="${y}" class="ascii-text" fill="#f5f5f5">${plainLine.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</text>\n`
        }
      }
    })

    svgContent += '</svg>'

    // Create and download SVG file
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = generateFileName('svg')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    setExportCount(prev => prev + 1)
  }

  // Download ASCII art as image (PNG) - Ultra High Quality
  const downloadAsImage = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      console.error('Could not get canvas context')
      return
    }

    // High quality settings (3x scaling for excellent quality without browser limits)
    // This creates images at 3x resolution - perfect balance of quality and performance
    const scaleFactor = 3 // 3x resolution for crisp output without exceeding canvas limits
    const fontSize = 24 // Larger font size for excellent detail retention
    const lineHeight = fontSize * 1.1 // Optimal line spacing for readability
    const padding = 0 // No padding - just the text
    
    const lines = asciiArt.split('\n')
    const maxLineLength = Math.max(...lines.map(line => line.replace(/<[^>]*>/g, '').length))
    
    // First, calculate dimensions using a temporary measurement
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return
    
    // Use temp canvas to measure text accurately
    tempCtx.font = `${fontSize}px 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace`
    const charWidth = tempCtx.measureText('M').width
    
    // Calculate base dimensions
    const baseWidth = maxLineLength * charWidth + (padding * 2)
    const baseHeight = lines.length * lineHeight + (padding * 2)
    
    // Check canvas size limits (most browsers limit to ~32,767 pixels)
    const finalWidth = baseWidth * scaleFactor
    const finalHeight = baseHeight * scaleFactor
    const maxCanvasSize = 16384 // Conservative limit for better compatibility
    
    let activeScale = scaleFactor
    
    if (finalWidth > maxCanvasSize || finalHeight > maxCanvasSize) {
      // Fallback to lower quality if too large
      activeScale = Math.min(maxCanvasSize / baseWidth, maxCanvasSize / baseHeight, 2)
      canvas.width = baseWidth * activeScale
      canvas.height = baseHeight * activeScale
    } else {
      // Set canvas to high resolution (final size)
      canvas.width = finalWidth
      canvas.height = finalHeight
    }
    
    // Get fresh context after resizing
    const freshCtx = canvas.getContext('2d')
    if (!freshCtx) return
    
    // Scale the context for high resolution rendering
    freshCtx.scale(activeScale, activeScale)
    
    // Enable maximum quality rendering
    freshCtx.imageSmoothingEnabled = false // Keep crisp edges
    
    // No background - transparent PNG
    // (Skip background fill to keep transparency)
    
    // Set ultra-high quality font with perfect spacing
    freshCtx.font = `bold ${fontSize}px 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace`
    freshCtx.textBaseline = 'top'
    freshCtx.textAlign = 'left'
    
    // Additional quality settings for ultra-crisp text
    freshCtx.globalCompositeOperation = 'source-over'
    freshCtx.shadowColor = 'transparent'
    freshCtx.shadowBlur = 0
    
    // Enable text hinting for perfect character rendering
    freshCtx.fillStyle = '#f5f5f5'
    
    // Draw ASCII art
    lines.forEach((line, index) => {
      const y = padding + index * lineHeight
      
      if (settings.colorMode === 'color' && line.includes('<span')) {
        // Parse colored text
        let x = padding
        const parser = new DOMParser()
        const doc = parser.parseFromString(`<div>${line}</div>`, 'text/html')
        const div = doc.querySelector('div')
        
        if (div) {
          Array.from(div.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              freshCtx.fillStyle = '#f5f5f5' // Default text color
              freshCtx.fillText(node.textContent || '', x, y)
              x += (node.textContent || '').length * charWidth
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element
              const style = element.getAttribute('style')
              const colorMatch = style?.match(/color:\s*([^;]+)/)
              
              if (colorMatch) {
                freshCtx.fillStyle = colorMatch[1]
              }
              
              freshCtx.fillText(element.textContent || '', x, y)
              x += (element.textContent || '').length * charWidth
            }
          })
        }
      } else {
        // Plain text
        freshCtx.fillStyle = '#f5f5f5'
        const plainLine = line.replace(/<[^>]*>/g, '')
        freshCtx.fillText(plainLine, padding, y)
      }
    })
    
    // Convert to blob and download with high quality
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = generateFileName('png')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        
        setExportCount(prev => prev + 1)
      }
    }, 'image/png', 1.0) // Maximum quality
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-primary-text mb-6 flex items-center gap-2">
        <Download className="w-5 h-5 text-accent-cream" />
        Export Options
      </h2>

      <div className="space-y-4">
        {/* Copy to Clipboard */}
        <button
          onClick={copyToClipboard}
          className="w-full p-4 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent-pink/10 rounded-lg flex items-center justify-center">
            {copied ? (
              <Check className="w-5 h-5 text-status-success" />
            ) : (
              <Copy className="w-5 h-5 text-accent-pink" />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-primary-text">
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </div>
            <div className="text-sm text-primary-text-secondary">
              Copy ASCII art as plain text
            </div>
          </div>
        </button>

        {/* Download as Text */}
        <button
          onClick={downloadAsText}
          className="w-full p-4 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent-peach/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-accent-peach" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-primary-text">Download as Text</div>
            <div className="text-sm text-primary-text-secondary">
              Save as {generateFileName('txt')}
            </div>
          </div>
        </button>

        {/* Download as PNG */}
        <button
          onClick={downloadAsImage}
          className="w-full p-4 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent-purple/10 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-accent-purple" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-primary-text">Download as PNG</div>
            <div className="text-sm text-primary-text-secondary">
              Save as {generateFileName('png')} (Transparent, no borders)
            </div>
          </div>
        </button>

        {/* Download as SVG */}
        <button
          onClick={downloadAsSVG}
          className="w-full p-4 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent-cream/10 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-accent-cream" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <div className="font-medium text-primary-text">Download as SVG</div>
            <div className="text-sm text-primary-text-secondary">
              Save as {generateFileName('svg')} (Infinite quality vector)
            </div>
          </div>
        </button>

        {/* File Info */}
        <div className="pt-4 border-t border-accent-pink/20">
          <div className="text-sm text-primary-text-secondary space-y-1">
            <div className="flex justify-between">
              <span>File format:</span>
              <span className="text-primary-text">Text (.txt) / PNG (.png) / Vector (.svg)</span>
            </div>
            <div className="flex justify-between">
              <span>Character count:</span>
              <span className="text-primary-text">
                {asciiArt.replace(/<[^>]*>/g, '').length.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated size:</span>
              <span className="text-primary-text">
                {(asciiArt.replace(/<[^>]*>/g, '').length / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 