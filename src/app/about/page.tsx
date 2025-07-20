'use client'

import Link from 'next/link'
import { ArrowLeft, Github, ExternalLink, Heart, Zap, Shield, Palette } from 'lucide-react'

export default function AboutPage() {
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
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-primary-text mb-4">
              About TerminalGallery
            </h1>
            <p className="text-xl text-primary-text-secondary max-w-3xl mx-auto">
              A modern ASCII art converter that brings the nostalgic charm of text-based graphics 
              to the digital age. Built with passion for creativity and love for terminal aesthetics.
            </p>
          </div>

          {/* About the Project */}
          <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-accent-pink" />
              The Project
            </h2>
            <div className="space-y-4 text-primary-text-secondary">
              <p>
                TerminalGallery was born from a simple idea: make ASCII art creation accessible, 
                beautiful, and fun for everyone. Whether you're a developer wanting to add some 
                flair to your terminal, an artist exploring digital mediums, or someone who just 
                loves retro aesthetics, this tool is for you.
              </p>
              <p>
                What started as a weekend project evolved into a full-featured converter with 
                advanced algorithms, multiple export formats, and a sleek interface that pays 
                homage to classic terminal design while embracing modern web technologies.
              </p>
            </div>
          </div>

          {/* Technical Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent-pink" />
                Performance
              </h3>
              <ul className="space-y-3 text-primary-text-secondary">
                <li>• Client-side processing for privacy</li>
                <li>• Web Workers for smooth performance</li>
                <li>• Optimized algorithms for speed</li>
                <li>• Memory-efficient image handling</li>
                <li>• Real-time progress tracking</li>
              </ul>
            </div>

            <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-3">
                <Shield className="w-5 h-5 text-accent-pink" />
                Privacy & Security
              </h3>
              <ul className="space-y-3 text-primary-text-secondary">
                <li>• No server uploads required</li>
                <li>• Images processed locally</li>
                <li>• No data collection or tracking</li>
                <li>• Open source transparency</li>
                <li>• Secure by design</li>
              </ul>
            </div>

            <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-3">
                <Palette className="w-5 h-5 text-accent-pink" />
                Creative Features
              </h3>
              <ul className="space-y-3 text-primary-text-secondary">
                <li>• Multiple character sets</li>
                <li>• Custom character support</li>
                <li>• Color preservation options</li>
                <li>• Flexible sizing controls</li>
                <li>• Professional export formats</li>
              </ul>
            </div>

            <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-text mb-4 flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-accent-pink" />
                Technology Stack
              </h3>
              <ul className="space-y-3 text-primary-text-secondary">
                <li>• Next.js 14 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Canvas API for image processing</li>
                <li>• Vercel for hosting</li>
              </ul>
            </div>
          </div>

          {/* About the Developer */}
          <div className="bg-primary-bg-secondary border border-accent-pink/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6">About the Developer</h2>
            <div className="space-y-4 text-primary-text-secondary">
              <p>
                <strong className="text-accent-pink">Hey there! 👋</strong> I'm a passionate developer 
                who loves creating tools that blend creativity with technology. ASCII art has always 
                fascinated me - there's something magical about turning pixels into characters and 
                creating art within the constraints of text.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open source projects, or diving deep into the world of terminal aesthetics and 
                retro computing. I believe that great software should be both powerful and 
                delightful to use.
              </p>
              <p>
                This project represents my love for clean code, beautiful interfaces, and the 
                timeless appeal of ASCII art. I hope it brings as much joy to your creative 
                process as it did to mine while building it!
              </p>
            </div>
          </div>

          {/* Connect Section */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary-text">Let's Connect!</h2>
            <p className="text-xl text-primary-text-secondary max-w-2xl mx-auto">
              Questions, suggestions, or just want to share your ASCII creations? 
              I'd love to hear from you!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://github.com/imprevi/terminalgallery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary-bg-secondary border border-accent-pink/20 hover:border-accent-pink/60 text-primary-text px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:bg-accent-pink/5"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
              
              <button className="inline-flex items-center gap-3 bg-accent-pink hover:bg-accent-pink/90 text-primary-bg px-6 py-3 rounded-lg font-medium transition-all duration-200">
                <Heart className="w-5 h-5" />
                Share Feedback
              </button>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="bg-gradient-to-r from-accent-pink/10 to-transparent border border-accent-pink/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-primary-text mb-6 text-center">Fun Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-accent-pink">∞</div>
                <div className="text-sm text-primary-text-secondary">Character Combinations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-pink">3</div>
                <div className="text-sm text-primary-text-secondary">Export Formats</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-pink">100%</div>
                <div className="text-sm text-primary-text-secondary">Client-Side Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent-pink">💖</div>
                <div className="text-sm text-primary-text-secondary">Made with Love</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary-text">Ready to Create?</h2>
            <p className="text-xl text-primary-text-secondary">
              Start turning your images into ASCII masterpieces!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-accent-pink hover:bg-accent-pink/90 text-primary-bg px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Converting
              <Palette className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 