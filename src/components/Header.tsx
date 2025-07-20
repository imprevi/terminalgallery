'use client'

export default function Header() {
  return (
    <header className="border-b border-accent-pink/20 bg-primary-bg-secondary/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Clean Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <span className="font-mono text-accent-pink text-2xl font-bold">[</span>
              <span className="font-mono text-primary-text text-xl font-bold mx-1">ASCII</span>
              <span className="font-mono text-accent-pink text-2xl font-bold">]</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-text">TerminalGallery</h1>
              <p className="text-sm text-primary-text-secondary">Convert images to ASCII art</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <span className="text-primary-text-secondary hover:text-accent-pink transition-colors duration-200 cursor-pointer">How it Works</span>
            <span className="text-primary-text-secondary hover:text-accent-pink transition-colors duration-200 cursor-pointer">About</span>
          </nav>
        </div>
      </div>
    </header>
  )
} 