'use client'

import { useCallback, useState, useRef } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  uploadedImage: File | null
  imageUrl: string
}

// Sample images functionality removed as requested

const MAX_FILE_SIZE = 300 * 1024 * 1024 // 300MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/tiff']

export default function ImageUpload({ onImageUpload, uploadedImage, imageUrl }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [isRejected, setIsRejected] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Please upload a valid image file (JPG, PNG, WebP, GIF, HEIC, TIFF)'
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 300MB'
    }
    return null
  }

  const processFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setIsRejected(true)
      setTimeout(() => {
        setIsRejected(false)
        setError('')
      }, 3000)
      return
    }

    setError('')
    onImageUpload(file)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true)
    }
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processFile(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processFile(file)
    }
  }

// Sample image handler removed

  const clearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(imageUrl)
    }
    onImageUpload(null as any) // This will clear the image
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="card">
        <h2 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-accent-pink" />
          Upload Image
        </h2>

        {!uploadedImage ? (
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 min-h-[200px] flex flex-col justify-center
              ${isDragActive ? 'drag-active' : 'border-accent-pink/30 hover:border-accent-pink/50'}
              ${isRejected ? 'drag-reject' : ''}
            `}
            onDrag={handleDrag}
            onDragStart={handleDrag}
            onDragEnd={handleDrag}
            onDragOver={handleDrag}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-accent-pink/10 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-accent-pink" />
                </div>
              </div>
              
              <div>
                <p className="text-xl font-medium text-primary-text">
                  Drop your image here or <span className="text-accent-pink cursor-pointer hover:text-accent-peach transition-colors">browse</span>
                </p>
                <p className="text-sm text-primary-text-secondary mt-3">
                  Supports JPG, PNG, WebP, GIF, HEIC, TIFF up to 300MB
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-status-error/10 border border-status-error/20 rounded-lg">
                <p className="text-status-error text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative bg-primary-bg-secondary rounded-xl p-4">
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 w-8 h-8 bg-status-error/20 hover:bg-status-error/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-status-error" />
              </button>
              
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-primary-bg rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-primary-text truncate">{uploadedImage.name}</p>
                  <p className="text-sm text-primary-text-secondary">
                    {(uploadedImage.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-status-success rounded-full"></div>
                    <span className="text-sm text-status-success">Ready to convert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Images section removed */}
    </div>
  )
} 