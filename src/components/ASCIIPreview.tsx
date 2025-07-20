'use client'

import { useState } from 'react'
import { Eye, ZoomIn, ZoomOut, Monitor, Smartphone } from 'lucide-react'
import type { ConversionSettings, ProcessingState } from './TerminalGallery'

interface ASCIIPreviewProps {
  asciiArt: string
  processing: ProcessingState
  settings: ConversionSettings
}

export default function ASCIIPreview({ asciiArt, processing, settings }: ASCIIPreviewProps) {
  const [zoom, setZoom] = useState(100)
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const adjustZoom = (delta: number) => {
    setZoom(prev => Math.max(25, Math.min(200, prev + delta)))
  }

  const resetZoom = () => setZoom(100)

  const renderContent = () => {
    if (processing.isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-16 h-16 border-4 border-accent-pink/20 border-t-accent-pink rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-primary-text font-medium">{processing.stage}</p>
            <p className="text-primary-text-secondary text-sm mt-1">
              {Math.round(processing.progress)}% complete
            </p>
          </div>
        </div>
      )
    }

    if (!asciiArt) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
          <div className="w-16 h-16 bg-accent-pink/10 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-accent-pink" />
          </div>
          <div>
            <p className="text-primary-text font-medium">ASCII Preview</p>
            <p className="text-primary-text-secondary text-sm mt-1">
              Upload an image and click convert to see the ASCII art
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustZoom(-25)}
              className="p-2 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-primary-text" />
            </button>
            
            <button
              onClick={resetZoom}
              className="px-3 py-2 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg text-sm font-medium text-primary-text transition-all duration-200"
            >
              {zoom}%
            </button>
            
            <button
              onClick={() => adjustZoom(25)}
              className="p-2 bg-primary-bg-secondary hover:bg-accent-pink/10 border border-accent-pink/20 hover:border-accent-pink/40 rounded-lg transition-all duration-200"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-primary-text" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`
                p-2 border rounded-lg transition-all duration-200
                ${viewMode === 'desktop'
                  ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                  : 'border-accent-pink/20 bg-primary-bg-secondary text-primary-text-secondary hover:border-accent-pink/40'
                }
              `}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setViewMode('mobile')}
              className={`
                p-2 border rounded-lg transition-all duration-200
                ${viewMode === 'mobile'
                  ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                  : 'border-accent-pink/20 bg-primary-bg-secondary text-primary-text-secondary hover:border-accent-pink/40'
                }
              `}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ASCII Display */}
        <div 
          className={`
            border border-accent-pink/20 rounded-lg overflow-auto bg-primary-bg
            ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}
          `}
          style={{ 
            maxHeight: viewMode === 'mobile' ? '400px' : '600px'
          }}
        >
          <div className="p-4">
            <div
              className="ascii-display"
              style={{ 
                fontSize: `${zoom}%`,
                lineHeight: 1.2,
                color: settings.colorMode === 'color' ? undefined : 'currentColor'
              }}
              dangerouslySetInnerHTML={{
                __html: settings.colorMode === 'color' ? asciiArt : undefined
              }}
            >
              {settings.colorMode !== 'color' ? asciiArt : undefined}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-primary-text-secondary">
          <div className="flex items-center gap-4">
            <span>Characters: {asciiArt.replace(/<[^>]*>/g, '').length.toLocaleString()}</span>
            <span>Lines: {asciiArt.split('\n').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              settings.colorMode === 'color' ? 'bg-accent-pink' : 
              settings.colorMode === 'grayscale' ? 'bg-primary-text-secondary' : 'bg-primary-text'
            }`} />
            <span className="capitalize">{settings.colorMode} Mode</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-primary-text mb-6 flex items-center gap-2">
        <Eye className="w-5 h-5 text-accent-purple" />
        ASCII Preview
      </h2>
      
      {renderContent()}
    </div>
  )
} 