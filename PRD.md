# TerminalGallery - Product Requirements Document (PRD)

## 📋 Project Overview

**Project Name**: TerminalGallery  
**Description**: A web-based ASCII art generator that converts images (including GIFs) into colorized or black & white ASCII art with user galleries and sharing capabilities.  
**Target Audience**: General public with artistic interests  
**Goals**: Fun project, portfolio piece, potential monetization through tips  

## 🎯 Core Value Proposition

- **Instant Conversion**: Upload any image and get beautiful ASCII art in seconds
- **High Quality**: Wallpaper-grade resolution output with professional algorithms  
- **User-Friendly**: Terminal aesthetic but approachable for general users
- **Versatile**: Support for static images and animated GIFs
- **Shareable**: Public galleries and easy export options

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14+ (App Router)
- **Hosting**: Vercel
- **Processing**: Client-side (Web Workers for performance)
- **Styling**: Tailwind CSS with custom dark cheesecake theme
- **State Management**: React hooks + Context API

### Backend Stack
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/username/password)
- **File Storage**: Supabase Storage
- **Payments**: Stripe (tip jar)
- **Analytics**: Vercel Analytics

### Processing Requirements
- **File Size Limit**: 300MB uploads
- **Supported Formats**: JPG, PNG, WebP, GIF, HEIC, TIFF
- **Processing**: Luminance-based color mapping algorithm
- **Performance**: Web Workers to prevent UI blocking
- **Progress**: Real-time percentage indicators

## 🎨 Design System

### Color Scheme (Dark Cheesecake Variant)
```css
/* Primary Colors */
--bg-primary: #1a1a1a;        /* Dark background */
--bg-secondary: #2d2d2d;      /* Card backgrounds */
--text-primary: #f5f5f5;      /* Main text */
--text-secondary: #b8b8b8;    /* Secondary text */

/* Accent Colors (from cheesecake theme) */
--accent-pink: #ff6b9d;       /* Primary pink */
--accent-peach: #ffa07a;      /* Secondary peach */
--accent-cream: #fff8dc;      /* Highlight cream */
--accent-purple: #c19a6b;     /* Muted purple */

/* Status Colors */
--success: #4ade80;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;
```

### Typography
- **Primary Font**: JetBrains Mono (monospace for terminal feel)
- **Secondary Font**: Inter (for UI elements)
- **ASCII Display**: Courier New (consistent character spacing)

### UI Principles
- Terminal-inspired but modern and clean
- Pink accent colors for interactive elements
- Smooth animations and transitions
- Mobile-first responsive design

## ⚡ Core Features Specification

### 1. Image Upload System
**Requirements:**
- Drag & drop interface
- Click to upload button
- Multiple file selection support
- Real-time file validation
- Progress indicators during upload
- 300MB file size limit
- Support: JPG, PNG, WebP, GIF, HEIC, TIFF

**User Flow:**
1. User drags image or clicks upload
2. File validation occurs instantly
3. Preview thumbnail appears
4. User can proceed to conversion options

### 2. ASCII Conversion Engine
**Character Sets:**
- **Basic ASCII**: `.,:;!*#@` (10 characters)
- **Extended ASCII**: Full 70-character set for detail
- **Custom Sets**: User-defined character combinations
- **Selection UI**: Checkbox grid for character picking

**Conversion Options:**
- **Size Presets**: Small (80x60), Medium (120x90), Large (200x150)
- **Custom Dimensions**: User-defined width/height
- **Color Mode**: Full color, grayscale, black & white
- **Algorithm**: Luminance-based mapping (0.299*R + 0.587*G + 0.114*B)

**Processing:**
- Client-side conversion using Canvas API
- Web Workers for heavy processing
- Chunked processing for large images
- Real-time progress percentage
- Live preview updates (if performance allows)

### 3. GIF Animation Support
**Requirements:**
- Extract individual frames from GIF
- Convert each frame to ASCII
- Reassemble as animated ASCII
- Preserve timing and loop settings
- Export as animated text or video file

### 4. Output & Export System
**Preview:**
- Real-time ASCII display in monospace font
- Zoom in/out functionality
- Mobile-responsive auto-sizing
- Copy entire ASCII with one click

**Export Options:**
- **Text File**: .txt download with user naming
- **Image File**: PNG with ASCII rendered in monospace font
- **Copy to Clipboard**: Instant copy for pasting
- **Default Naming**: terminalgallery_01, terminalgallery_02, etc.
- **Custom Naming**: User can rename before download

### 5. Sample Images
**Included Samples:**
- Portrait photo (face detail test)
- Landscape photo (color range test)
- High contrast image (edge detection test)
- Simple logo (clarity test)
- Animated GIF (motion test)

## 👤 User System (Phase 2)

### Authentication
**Method**: Email + Username + Password
- Email required for account creation
- Username for display and login
- Standard password requirements
- Password reset via email
- No social login initially

**User Flow:**
1. User enters email, username, password
2. Email verification sent
3. User verifies and account activates
4. Can login with username OR email

### User Galleries
**Gallery Features:**
- Personal gallery for each user
- Public by default (user can make private)
- Individual piece privacy controls
- View count tracking
- Creation date sorting
- Tag system for organization

**Gallery UI:**
- Grid layout with thumbnails
- Filter by public/private
- Search within gallery
- Bulk actions (delete, privacy toggle)

### Custom Presets
**Preset System:**
- Save character set preferences
- Save size and color preferences
- Name custom presets
- Share presets with other users
- Import/export preset files

## 💰 Monetization Strategy

### Tip Jar System
**Integration**: Stripe Payment Links
- Simple "Buy me a coffee" style tips
- Preset amounts: $3, $5, $10, custom
- One-time payments only
- No subscription model
- Tip attribution on public galleries

**Implementation:**
- Stripe Payment Links for simplicity
- Webhook handling for tip confirmation
- Thank you page with download links
- Optional tip during export process

## 📱 Mobile Optimization

### Responsive Design
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **ASCII Display**: Auto-adjust character count to screen width
- **Upload**: Touch-friendly drag & drop zones
- **Navigation**: Hamburger menu on mobile
- **Export**: Native share API integration

### Performance
- **Image Compression**: Auto-compress on mobile uploads
- **Progressive Loading**: Lazy load gallery images
- **Offline Support**: Cache converted ASCII art
- **Touch Gestures**: Pinch to zoom ASCII preview

## 🔄 Development Phases

## Phase 1: Core ASCII Conversion (MVP)
**Timeline**: 2-3 weeks  
**Goal**: Working ASCII art generator with basic features

### Features:
✅ **Image Upload System**
- Drag & drop interface
- File validation and size limits
- Progress indicators

✅ **ASCII Conversion Engine**
- Basic and extended character sets
- Size presets (Small/Medium/Large/Custom)
- Color and B&W modes
- Luminance-based conversion algorithm
- Web Worker processing

✅ **Real-time Preview**
- Live ASCII display
- Progress percentage
- Responsive preview sizing

✅ **Export System**
- Download as text file
- Download as image (PNG)
- Copy to clipboard
- Custom file naming

✅ **Basic UI/UX**
- Dark cheesecake theme implementation
- Single-page application
- Mobile-responsive design
- Sample images for testing

### Technical Tasks:
1. Next.js project setup with Tailwind CSS
2. Image upload component with drag & drop
3. ASCII conversion algorithm implementation
4. Web Worker setup for processing
5. Canvas API for image-to-ASCII conversion
6. Export functionality (text, image, clipboard)
7. Responsive UI implementation
8. Progress bar and loading states
9. Sample image integration
10. Mobile optimization

### Success Criteria:
- User can upload any supported image format
- Conversion completes within reasonable time
- ASCII output is high quality and accurate
- All export options work correctly
- UI is responsive and intuitive
- Performance is smooth on various devices

---

## Phase 2: User System & Galleries
**Timeline**: 3-4 weeks  
**Goal**: User accounts, galleries, and social features

### Features:
✅ **Authentication System**
- Email/username/password registration
- Login with username or email
- Password reset functionality
- Email verification

✅ **User Galleries**
- Personal gallery for each user
- Public/private gallery settings
- Individual piece privacy controls
- Gallery browsing and discovery

✅ **Enhanced Features**
- Save custom character set presets
- Batch image processing
- Advanced export options
- User profile management

✅ **Database Integration**
- Supabase setup and configuration
- User data management
- Gallery and artwork storage
- Search and filtering

### Technical Tasks:
1. Supabase project setup and configuration
2. Authentication system implementation
3. User registration and login flows
4. Database schema design for users and galleries
5. Gallery CRUD operations
6. File storage for user artwork
7. Privacy controls implementation
8. Search and filtering functionality
9. User profile management
10. Custom preset system

### Success Criteria:
- Users can create accounts and login securely
- Galleries function correctly with privacy controls
- User data is stored and retrieved efficiently
- Search and filtering work as expected
- Custom presets save and load properly

---

## Phase 3: Advanced Features & API
**Timeline**: 2-3 weeks  
**Goal**: API access, monetization, and advanced features

### Features:
✅ **API System**
- RESTful API for external developers
- API key management
- Rate limiting and usage tracking
- Documentation and examples

✅ **Monetization**
- Stripe tip jar integration
- Payment processing and webhooks
- Thank you pages and confirmations

✅ **Advanced Features**
- GIF to animated ASCII conversion
- Social sharing capabilities
- Analytics and usage tracking
- Performance optimizations

✅ **Polish & Launch**
- SEO optimization
- Error handling improvements
- Performance monitoring
- Production deployment

### Technical Tasks:
1. API route development and testing
2. API documentation creation
3. Stripe payment integration
4. GIF processing implementation
5. Social sharing functionality
6. Analytics setup (Vercel Analytics)
7. SEO optimization and meta tags
8. Error boundary implementation
9. Performance monitoring setup
10. Production deployment and testing

### Success Criteria:
- API functions correctly with proper documentation
- Payment processing works without issues
- GIF conversion produces quality results
- Analytics provide useful insights
- Application is production-ready

## 📊 Success Metrics

### Phase 1 Metrics:
- **Conversion Success Rate**: >95% successful conversions
- **Average Processing Time**: <30 seconds for typical images
- **User Engagement**: Average session duration >5 minutes
- **Export Usage**: >80% of conversions result in export

### Phase 2 Metrics:
- **User Registration**: Target 100 initial users
- **Gallery Usage**: >50% of users create galleries
- **Public Sharing**: >30% of artwork made public
- **Return Users**: >40% user retention after 7 days

### Phase 3 Metrics:
- **API Usage**: Active API consumers
- **Monetization**: Tip conversion rate >5%
- **Performance**: <2 second load times
- **Growth**: Organic user acquisition

## 🚀 Launch Strategy

### Pre-Launch:
1. Beta testing with friends and family
2. Performance optimization and bug fixes
3. SEO preparation and content creation
4. Social media account setup

### Launch:
1. Product Hunt submission
2. Reddit community sharing (r/webdev, r/ascii)
3. Twitter/X announcement with demo GIF
4. Developer community outreach for API

### Post-Launch:
1. User feedback collection and iteration
2. Performance monitoring and optimization
3. Feature requests prioritization
4. Community building and engagement

## 🛠️ Technical Implementation Notes

### File Processing:
```javascript
// Core conversion algorithm structure
const convertImageToASCII = async (imageFile, options) => {
  const { characterSet, dimensions, colorMode } = options;
  
  // Load image into canvas
  const canvas = createCanvas(imageFile);
  const imageData = getImageData(canvas);
  
  // Process in chunks for large images
  const chunks = chunkImageData(imageData, dimensions);
  
  // Convert each chunk using Web Worker
  const asciiChunks = await Promise.all(
    chunks.map(chunk => processChunk(chunk, characterSet, colorMode))
  );
  
  return combineChunks(asciiChunks);
};
```

### Database Schema:
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Galleries table
CREATE TABLE galleries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Artworks table
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gallery_id UUID REFERENCES galleries(id),
  title VARCHAR NOT NULL,
  ascii_content TEXT NOT NULL,
  settings JSONB NOT NULL,
  is_public BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Performance Considerations:
- Use Web Workers for image processing to prevent UI blocking
- Implement virtual scrolling for large galleries
- Cache frequently accessed ASCII art
- Optimize images using Next.js Image component
- Use Vercel Edge Functions for API routes when needed

## 📋 Development Checklist

### Phase 1 Checklist:
- [ ] Project setup (Next.js, Tailwind, TypeScript)
- [ ] Dark cheesecake theme implementation
- [ ] Image upload component with drag & drop
- [ ] File validation and progress indicators
- [ ] ASCII conversion algorithm
- [ ] Character set selection UI
- [ ] Size and color mode controls
- [ ] Web Worker implementation
- [ ] Real-time preview component
- [ ] Export functionality (text, image, clipboard)
- [ ] Sample images integration
- [ ] Mobile responsive design
- [ ] Error handling and loading states
- [ ] Performance optimization
- [ ] Testing and bug fixes

### Phase 2 Checklist:
- [ ] Supabase project setup
- [ ] Authentication system implementation
- [ ] User registration and login flows
- [ ] Database schema creation
- [ ] Gallery CRUD operations
- [ ] File storage integration
- [ ] Privacy controls implementation
- [ ] Search and filtering functionality
- [ ] Custom preset system
- [ ] User profile management
- [ ] Batch processing feature
- [ ] Gallery browsing interface
- [ ] Testing and security review

### Phase 3 Checklist:
- [ ] API route development
- [ ] API documentation creation
- [ ] Stripe payment integration
- [ ] GIF processing implementation
- [ ] Social sharing functionality
- [ ] Analytics setup
- [ ] SEO optimization
- [ ] Error monitoring
- [ ] Performance monitoring
- [ ] Production deployment
- [ ] Launch preparation
- [ ] Post-launch monitoring

---

## 📞 Contact & Support

**Developer**: [Your Name]  
**Project Repository**: [GitHub URL]  
**Live Demo**: [Vercel URL]  
**Support Email**: [Email Address]

---

*This PRD serves as the complete roadmap for TerminalGallery development. All features, timelines, and specifications should be referenced during implementation to ensure project stays on track.* 