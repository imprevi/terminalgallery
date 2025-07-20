'use client'

import { useState } from 'react'
import Header from './Header'
import ImageUpload from './ImageUpload'
import ConversionControls from './ConversionControls'
import ASCIIPreview from './ASCIIPreview'
import ExportControls from './ExportControls'
import { convertImageToASCII } from '@/lib/asciiConverter'
import type { ConversionSettings, ProcessingState } from '@/types'

export default function TerminalGallery() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [asciiArt, setAsciiArt] = useState<string>('')
  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    stage: '',
    progress: 0
  })
  
  const [settings, setSettings] = useState<ConversionSettings>({
    characterSet: 'basic',
    customCharacters: '',
    size: 'medium',
    customWidth: 80,
    customHeight: 40,
    colorMode: 'blackwhite',
    backgroundColor: 'transparent'
  })

  const handleImageUpload = (file: File) => {
    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    
    // Get image dimensions for aspect ratio calculation
    const img = new Image()
    img.onload = () => {
      setSettings(prev => ({
        ...prev,
        imageWidth: img.width,
        imageHeight: img.height
      }))
    }
    img.src = url
  }

  const handleSettingsChange = (newSettings: Partial<ConversionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    setProcessing({
      isProcessing: true,
      stage: 'Starting conversion...',
      progress: 0
    })

    try {
      // Update progress during conversion
      setProcessing(prev => ({
        ...prev,
        stage: 'Loading image...',
        progress: 10
      }))

      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 100))

      setProcessing(prev => ({
        ...prev,
        stage: 'Converting to ASCII...',
        progress: 30
      }))

      // Perform the actual conversion
      const result = await convertImageToASCII(selectedFile, settings)

      setProcessing(prev => ({
        ...prev,
        stage: 'Finalizing...',
        progress: 90
      }))

      // Small delay before completion
      await new Promise(resolve => setTimeout(resolve, 200))

      // Set the result
      setAsciiArt(result)

      // Complete the process
      setProcessing({
        isProcessing: false,
        stage: 'Complete!',
        progress: 100
      })

    } catch (error) {
      console.error('Conversion failed:', error)
      setProcessing({
        isProcessing: false,
        stage: 'Error occurred',
        progress: 0
      })
      
      // Reset processing state after showing error
      setTimeout(() => {
        setProcessing({
          isProcessing: false,
          stage: '',
          progress: 0
        })
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Image Upload Section */}
        <section>
          <ImageUpload 
            onImageUpload={handleImageUpload}
            uploadedImage={selectedFile}
            imageUrl={imageUrl}
          />
        </section>

        {/* Conversion Controls */}
        {selectedFile && (
          <section>
            <ConversionControls 
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onConvert={handleConvert}
              canConvert={!!selectedFile && !processing.isProcessing}
              processing={processing}
            />
          </section>
        )}

        {/* ASCII Preview */}
        {asciiArt && (
          <section>
            <ASCIIPreview 
              asciiArt={asciiArt} 
              processing={processing}
              settings={settings}
            />
          </section>
        )}

        {/* Export Controls */}
        {asciiArt && selectedFile && (
          <section>
            <ExportControls 
              asciiArt={asciiArt}
              originalFileName={selectedFile.name}
              settings={settings}
            />
          </section>
        )}
      </main>
    </div>
  )
} 