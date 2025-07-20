'use client'

import { Settings, Play, Loader } from 'lucide-react'
import type { ConversionSettings, ProcessingState } from './TerminalGallery'
import { ASCII_SETS, SIZE_PRESETS } from '@/lib/asciiConverter'

interface ConversionControlsProps {
  settings: ConversionSettings
  onSettingsChange: (settings: Partial<ConversionSettings>) => void
  onConvert: () => void
  canConvert: boolean
  processing: ProcessingState
}

export default function ConversionControls({
  settings,
  onSettingsChange,
  onConvert,
  canConvert,
  processing
}: ConversionControlsProps) {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-primary-text mb-6 flex items-center gap-2">
        <Settings className="w-5 h-5 text-accent-peach" />
        Conversion Settings
      </h2>

      <div className="space-y-6">
        {/* Character Set Selection */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-3">
            Character Set
          </label>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="basic"
                name="characterSet"
                checked={settings.characterSet === 'basic'}
                onChange={() => onSettingsChange({ characterSet: 'basic' })}
                className="w-4 h-4 text-accent-pink border-accent-pink/30 focus:ring-accent-pink"
              />
              <label htmlFor="basic" className="flex-1">
                <div className="text-primary-text font-medium">Basic ASCII</div>
                <div className="text-primary-text-secondary text-sm font-ascii">
                  {ASCII_SETS.basic}
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="extended"
                name="characterSet"
                checked={settings.characterSet === 'extended'}
                onChange={() => onSettingsChange({ characterSet: 'extended' })}
                className="w-4 h-4 text-accent-pink border-accent-pink/30 focus:ring-accent-pink"
              />
              <label htmlFor="extended" className="flex-1">
                <div className="text-primary-text font-medium">Extended ASCII</div>
                <div className="text-primary-text-secondary text-sm font-ascii break-all">
                  {ASCII_SETS.extended.substring(0, 40)}...
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="custom"
                name="characterSet"
                checked={settings.characterSet === 'custom'}
                onChange={() => onSettingsChange({ characterSet: 'custom' })}
                className="w-4 h-4 text-accent-pink border-accent-pink/30 focus:ring-accent-pink"
              />
              <label htmlFor="custom" className="flex-1">
                <div className="text-primary-text font-medium">Custom</div>
                {settings.characterSet === 'custom' && (
                  <input
                    type="text"
                    value={settings.customCharacters}
                    onChange={(e) => onSettingsChange({ customCharacters: e.target.value })}
                    placeholder="Enter your characters..."
                    className="input-field mt-2 w-full font-ascii"
                  />
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-3">
            Output Size
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(SIZE_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => onSettingsChange({ size: key as any })}
                className={`
                  p-3 rounded-lg border transition-all duration-200 text-left
                  ${settings.size === key
                    ? 'border-accent-pink bg-accent-pink/10 text-primary-text'
                    : 'border-accent-pink/20 bg-primary-bg-secondary hover:border-accent-pink/40 text-primary-text-secondary hover:text-primary-text'
                  }
                `}
              >
                <div className="font-medium capitalize">{key}</div>
                <div className="text-sm opacity-80">{preset.width}×{preset.height}</div>
              </button>
            ))}
          </div>

          {/* Custom Size Inputs */}
          <div className="mt-3">
            <button
              onClick={() => onSettingsChange({ size: 'custom' })}
              className={`
                w-full p-3 rounded-lg border transition-all duration-200 text-left
                ${settings.size === 'custom'
                  ? 'border-accent-pink bg-accent-pink/10 text-primary-text'
                  : 'border-accent-pink/20 bg-primary-bg-secondary hover:border-accent-pink/40 text-primary-text-secondary hover:text-primary-text'
                }
              `}
            >
              <div className="font-medium">Custom</div>
              <div className="text-sm opacity-80">Define your own dimensions</div>
            </button>

            {settings.size === 'custom' && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-primary-text-secondary mb-1">Width</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={settings.customWidth}
                    onChange={(e) => onSettingsChange({ customWidth: parseInt(e.target.value) || 120 })}
                    className="input-field w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-primary-text-secondary mb-1">Height</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={settings.customHeight}
                    onChange={(e) => onSettingsChange({ customHeight: parseInt(e.target.value) || 90 })}
                    className="input-field w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Color Mode */}
        <div>
          <label className="block text-sm font-medium text-primary-text mb-3">
            Color Mode
          </label>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => onSettingsChange({ colorMode: 'color' })}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-left
                ${settings.colorMode === 'color'
                  ? 'border-accent-pink bg-accent-pink/10 text-primary-text'
                  : 'border-accent-pink/20 bg-primary-bg-secondary hover:border-accent-pink/40 text-primary-text-secondary hover:text-primary-text'
                }
              `}
            >
              <div className="font-medium">Full Color</div>
              <div className="text-sm opacity-80">Preserve original colors</div>
            </button>

            <button
              onClick={() => onSettingsChange({ colorMode: 'grayscale' })}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-left
                ${settings.colorMode === 'grayscale'
                  ? 'border-accent-pink bg-accent-pink/10 text-primary-text'
                  : 'border-accent-pink/20 bg-primary-bg-secondary hover:border-accent-pink/40 text-primary-text-secondary hover:text-primary-text'
                }
              `}
            >
              <div className="font-medium">Grayscale</div>
              <div className="text-sm opacity-80">Convert to shades of gray</div>
            </button>

            <button
              onClick={() => onSettingsChange({ colorMode: 'blackwhite' })}
              className={`
                p-3 rounded-lg border transition-all duration-200 text-left
                ${settings.colorMode === 'blackwhite'
                  ? 'border-accent-pink bg-accent-pink/10 text-primary-text'
                  : 'border-accent-pink/20 bg-primary-bg-secondary hover:border-accent-pink/40 text-primary-text-secondary hover:text-primary-text'
                }
              `}
            >
              <div className="font-medium">Black & White</div>
              <div className="text-sm opacity-80">High contrast monochrome</div>
            </button>
          </div>
        </div>

        {/* Convert Button */}
        <div className="pt-6 border-t border-accent-pink/20">
          <button
            onClick={onConvert}
            disabled={!canConvert}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 text-lg
              ${canConvert
                ? 'bg-accent-pink hover:bg-accent-pink/90 text-primary-bg shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-primary-bg-secondary text-primary-text-secondary cursor-not-allowed'
              }
            `}
          >
            {processing.isProcessing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Converting...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Convert to ASCII</span>
              </>
            )}
          </button>

          {processing.isProcessing && (
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-primary-text-secondary">{processing.stage}</span>
                <span className="text-accent-pink font-medium">{Math.round(processing.progress)}%</span>
              </div>
              <div className="w-full bg-primary-bg-secondary rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-accent-pink h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${processing.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 