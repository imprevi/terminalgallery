# TerminalGallery 🎨

A beautiful ASCII art generator with terminal aesthetics. Convert any image into stunning text-based artwork with customizable character sets, sizes, and color modes.

## ✨ Features

### Phase 1 (Current) - Core ASCII Conversion
- 🖼️ **Image Upload**: Drag & drop or click to upload (supports JPG, PNG, WebP, GIF, HEIC, TIFF up to 300MB)
- 🎭 **Character Sets**: Basic ASCII, Extended ASCII, or custom character combinations
- 📏 **Size Options**: Small (80×60), Medium (120×90), Large (200×150), or custom dimensions
- 🎨 **Color Modes**: Full color, grayscale, or black & white conversion
- 👀 **Live Preview**: Real-time ASCII art preview with zoom controls
- 💾 **Export Options**: Download as text file, PNG image, or copy to clipboard
- 📱 **Mobile Responsive**: Works beautifully on all devices
- 🎯 **Easy Upload**: Simple drag & drop interface for any image
- ⚡ **Performance Optimized**: Web Workers and smart image processing

### Phase 2 (Planned) - User System & Galleries
- 👤 User accounts with email/username/password
- 🖼️ Personal galleries with public/private controls
- 🎛️ Custom preset saving and sharing
- 🔍 Gallery browsing and discovery

### Phase 3 (Planned) - Advanced Features & API
- 🔌 RESTful API for external developers
- 💳 Stripe tip jar integration
- 🎬 Animated GIF to ASCII conversion
- 📊 Analytics and usage tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ascii-art
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Ready to use!**
   - No additional setup required - upload your own images directly

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **Processing**: Client-side Canvas API with Web Workers
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Database** (Phase 2): Supabase
- **Payments** (Phase 3): Stripe

## 🎯 Design Philosophy

TerminalGallery combines the aesthetic appeal of terminal interfaces with modern web design:

- **Dark Cheesecake Theme**: Inspired by MonkeyType's cheesecake theme with dark variants
- **Terminal Aesthetics**: Monospace fonts and ASCII art styling
- **Modern UX**: Smooth animations, responsive design, and intuitive controls
- **Performance First**: Client-side processing with Web Workers for smooth experience

## 📁 Project Structure

```
ascii-art/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles and theme
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── TerminalGallery.tsx    # Main app component
│   │   ├── Header.tsx             # Header with ASCII logo
│   │   ├── ImageUpload.tsx        # File upload & samples
│   │   ├── ConversionControls.tsx # Settings panel
│   │   ├── ASCIIPreview.tsx       # Preview component
│   │   └── ExportControls.tsx     # Download/copy options
│   └── lib/                 # Utilities
│       ├── asciiConverter.ts      # Core conversion algorithm
│       ├── performanceOptimizer.ts # Performance utilities
│       └── testRunner.ts          # Test framework
├── public/                  # Static assets
├── PRD.md                   # Product Requirements Document
└── package.json
```

## 🛠️ Core Algorithm

The ASCII conversion uses luminance-based mapping with performance optimization:

1. **Image Loading**: Canvas API loads and optimizes image data
2. **Luminance Calculation**: `0.299*R + 0.587*G + 0.114*B`
3. **Character Mapping**: Maps luminance values to ASCII character intensity
4. **Color Preservation**: Wraps characters in colored spans for full-color mode
5. **Chunked Processing**: Processes large images in optimized chunks using Web Workers
6. **Performance Monitoring**: Built-in performance tracking and optimization

## 🎮 Usage

1. **Upload an Image**: Drag & drop or click to select an image file
2. **Choose Settings**: 
   - Select character set (Basic, Extended, or Custom)
   - Pick output size (Small, Medium, Large, or Custom)
   - Choose color mode (Color, Grayscale, or Black & White)
3. **Convert**: Click "Convert to ASCII" and watch the progress
4. **Preview**: View the result with zoom controls and mobile/desktop views
5. **Export**: Download as text file, PNG image, or copy to clipboard

## 🔧 Configuration

### Character Sets
- **Basic**: `.,:;!*#@` (10 characters, good for simple images)
- **Extended**: 70+ characters including punctuation and letters (detailed output)
- **Custom**: Define your own character set

### Size Presets
- **Small**: 80×60 characters (quick preview)
- **Medium**: 120×90 characters (balanced quality/speed)
- **Large**: 200×150 characters (high detail)
- **Custom**: Up to 500×500 characters (wallpaper-grade)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Set up custom domain if desired

### Manual Build
```bash
npm run build
npm start
```

### Development
```bash
npm run dev
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing
- Automatic test suite runs in development mode
- Tests cover character sets, size presets, validation, and performance
- Performance monitoring with detailed console reporting

### Adding New Features
1. Follow the component structure in `src/components/`
2. Update the main `TerminalGallery.tsx` component for new functionality
3. Add any utilities to `src/lib/`
4. Update this README and PRD.md

## ⚡ Performance Features

- **Auto Image Optimization**: Large images automatically resized for optimal performance
- **Smart Chunk Processing**: Dynamic chunk sizes based on output dimensions
- **Memory Management**: Built-in memory usage validation and warnings
- **Web Worker Processing**: Non-blocking conversion in separate thread
- **Performance Monitoring**: Detailed timing and performance reports
- **Browser Compatibility**: Graceful fallbacks for older browsers

## 📋 Roadmap

- ✅ **Phase 1**: Core ASCII conversion functionality with performance optimization
- ⏳ **Phase 2**: User accounts and galleries (3-4 weeks)
- ⏳ **Phase 3**: API and advanced features (2-3 weeks)

See `PRD.md` for detailed specifications and development phases.

## 🤝 Contributing

This is currently a personal project, but suggestions and feedback are welcome!

## 📄 License

MIT License - see LICENSE file for details

## 🎉 Acknowledgments

- Inspired by MonkeyType's beautiful cheesecake theme
- ASCII art conversion techniques from various online resources
- Terminal aesthetic inspiration from developer tools and IDEs

---

**TerminalGallery** - Where images become art through the beauty of text ✨ 