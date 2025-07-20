import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TerminalGallery - ASCII Art Generator',
  description: 'Convert images to beautiful ASCII art with terminal aesthetics. Upload any image and create stunning text-based artwork.',
  keywords: ['ascii art', 'image converter', 'terminal', 'text art', 'image to text'],
  authors: [{ name: 'TerminalGallery' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1a1a1a',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-primary-bg text-primary-text antialiased`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
} 