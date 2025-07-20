# 🧪 ASCII Art Converter - Comprehensive Testing Checklist

## ✅ **Build & Deployment Tests**
- [x] **Build Success**: `npm run build` completes without errors
- [x] **No TypeScript Errors**: All type checking passes
- [x] **No Linting Errors**: ESLint passes
- [x] **Metadata Warnings Fixed**: viewport/themeColor moved to proper exports
- [x] **Test Page Created**: `/test` route for automated testing

## 🖼️ **Image Upload Tests**

### **Basic Upload**
- [ ] **Drag & Drop**: Drop hampter.jpg onto upload area
- [ ] **File Picker**: Click to select hampter.jpg
- [ ] **Preview Display**: Image preview shows correctly
- [ ] **File Info**: Shows correct filename and size

### **File Validation**
- [ ] **Valid Formats**: JPEG, PNG, WebP, GIF, HEIC, TIFF accepted
- [ ] **Invalid Formats**: PDF, TXT, etc. rejected with error
- [ ] **Large Files**: 300MB limit enforced
- [ ] **Error Messages**: Clear feedback for invalid files
- [ ] **Error Clearing**: Errors clear after valid upload

## ⚙️ **Character Set Tests**

### **Basic Character Set**
- [ ] **Selection**: Basic radio button works
- [ ] **Conversion**: Uses ` .'~!:|;,_+<>i?/\|()1{}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@` characters
- [ ] **Output**: Clean ASCII art with basic characters only

### **Extended Character Set**
- [ ] **Selection**: Extended radio button works
- [ ] **Conversion**: Uses extended ASCII characters (░▒▓█▄▌▐▀)
- [ ] **Output**: More detailed ASCII art with extended characters

### **Custom Character Set**
- [ ] **Selection**: Custom radio button works
- [ ] **Input Field**: Text area appears for custom characters
- [ ] **Validation**: Empty custom set shows error
- [ ] **Conversion**: Uses only specified custom characters (e.g., ".:oO@")
- [ ] **Character Limiting**: Output uses only custom characters + spaces/newlines

## 📏 **Size Preset Tests**

### **Small (40x30)**
- [ ] **Selection**: Small button works
- [ ] **Conversion**: Output roughly 40 characters wide, 30 lines tall
- [ ] **Performance**: Fast conversion (< 2 seconds)

### **Medium (80x60)**
- [ ] **Selection**: Medium button works  
- [ ] **Conversion**: Output roughly 80 characters wide, 60 lines tall
- [ ] **Performance**: Reasonable conversion time (< 5 seconds)

### **Large (120x90)**
- [ ] **Selection**: Large button works
- [ ] **Conversion**: Output roughly 120 characters wide, 90 lines tall
- [ ] **Performance**: Slower but completes (< 10 seconds)

### **Custom Dimensions**
- [ ] **Selection**: Custom button works
- [ ] **Input Fields**: Width/height number inputs appear
- [ ] **Validation**: Min 10, Max 500 enforced
- [ ] **Conversion**: Output matches custom dimensions
- [ ] **Error Handling**: Invalid dimensions show errors

## 🎨 **Color Mode Tests**

### **Black & White**
- [ ] **Selection**: B&W button works
- [ ] **Output**: Plain text, no HTML spans
- [ ] **Appearance**: Monochrome ASCII art
- [ ] **Copy/Paste**: Works as plain text

### **Grayscale**
- [ ] **Selection**: Grayscale button works
- [ ] **Output**: HTML with gray color spans
- [ ] **Appearance**: Shades of gray ASCII art
- [ ] **Rendering**: Properly colored in preview

### **Color**
- [ ] **Selection**: Color button works
- [ ] **Output**: HTML with full color spans
- [ ] **Appearance**: Full-color ASCII art
- [ ] **Rendering**: Original colors preserved

## 🔄 **Conversion Process Tests**

### **Progress Indication**
- [ ] **Convert Button**: Changes to progress state
- [ ] **Progress Bar**: Shows processing progress
- [ ] **Stage Display**: Shows current processing stage
- [ ] **Completion**: Button returns to normal state

### **Error Handling**
- [ ] **Large Images**: Handles high-resolution images
- [ ] **Memory Limits**: Graceful handling of memory issues
- [ ] **Browser Compatibility**: Works in different browsers
- [ ] **Mobile Support**: Functions on mobile devices

## 👁️ **Preview Tests**

### **Display**
- [ ] **ASCII Output**: Rendered correctly in preview area
- [ ] **Font**: Monospace font displays properly
- [ ] **Spacing**: Character alignment maintained
- [ ] **Colors**: HTML color spans render correctly

### **Zoom Controls**
- [ ] **Zoom In**: + button increases size
- [ ] **Zoom Out**: - button decreases size
- [ ] **Zoom Limits**: 25% to 200% range enforced
- [ ] **Zoom Display**: Current zoom percentage shown

### **View Modes**
- [ ] **Desktop View**: Wide preview layout
- [ ] **Mobile View**: Narrow preview layout
- [ ] **Mode Toggle**: Switch between views works

## 💾 **Export Tests**

### **Text Export**
- [ ] **Download**: .txt file downloads correctly
- [ ] **Content**: Contains plain ASCII art
- [ ] **Filename**: Uses original image name + suffix
- [ ] **Character Encoding**: UTF-8 encoding preserved

### **Copy to Clipboard**
- [ ] **Copy Button**: Copies ASCII art to clipboard
- [ ] **Plain Text**: Pastes as plain text (B&W mode)
- [ ] **HTML**: Copies HTML for color modes
- [ ] **Success Feedback**: Shows "Copied!" confirmation

### **PNG Export**
- [ ] **Download**: .png file downloads correctly
- [ ] **High Resolution**: 3x scaling for crisp output
- [ ] **Transparent Background**: No black background
- [ ] **Font Rendering**: Monospace font rendered clearly
- [ ] **Colors**: Color modes exported with colors

### **SVG Export**
- [ ] **Download**: .svg file downloads correctly
- [ ] **Vector Quality**: Scalable without pixelation
- [ ] **Text Elements**: Uses proper text elements
- [ ] **Colors**: Color modes exported correctly

## 🔍 **Edge Case Tests**

### **Extreme Dimensions**
- [ ] **Minimum Size**: 10x10 conversion works
- [ ] **Maximum Size**: 500x500 conversion works (if memory allows)
- [ ] **Aspect Ratios**: Wide/tall images handled correctly
- [ ] **Square Images**: 1:1 aspect ratio works

### **Special Images**
- [ ] **Very Dark Images**: Produces ASCII with dark characters
- [ ] **Very Bright Images**: Produces ASCII with light characters
- [ ] **High Contrast**: Sharp character transitions
- [ ] **Low Contrast**: Subtle character variations

### **Browser Limits**
- [ ] **Memory Usage**: Large images don't crash browser
- [ ] **Processing Time**: Long operations don't timeout
- [ ] **File Size**: Large files processed correctly
- [ ] **Multiple Conversions**: Sequential conversions work

## 📱 **Mobile/Responsive Tests**

### **Layout**
- [ ] **Mobile View**: Responsive design works
- [ ] **Touch Interface**: Touch controls work
- [ ] **Upload**: Mobile file picker works
- [ ] **Zoom**: Touch zoom/pan works

### **Performance**
- [ ] **Mobile Processing**: Reasonable performance on mobile
- [ ] **Memory Constraints**: Respects mobile memory limits
- [ ] **Battery Usage**: Doesn't drain battery excessively

## 🚀 **Production Tests**

### **Deployment**
- [ ] **Vercel Build**: Deploys successfully
- [ ] **Live URL**: https://terminal-gallery.vercel.app works
- [ ] **Assets**: Images and fonts load correctly
- [ ] **Performance**: Good loading speeds

### **Cross-Browser**
- [ ] **Chrome**: Full functionality
- [ ] **Firefox**: Full functionality  
- [ ] **Safari**: Full functionality
- [ ] **Edge**: Full functionality

## 🎯 **Final Tests with Hampter Image**

### **Complete Workflow**
- [ ] **Upload**: hampter.jpg uploads successfully
- [ ] **Basic ASCII**: Converts with basic character set
- [ ] **Extended ASCII**: Converts with extended characters
- [ ] **Custom ASCII**: Converts with ".:oO@" characters
- [ ] **Small Size**: 40x30 conversion
- [ ] **Medium Size**: 80x60 conversion
- [ ] **Large Size**: 120x90 conversion
- [ ] **B&W Mode**: Plain text output
- [ ] **Grayscale Mode**: HTML with gray colors
- [ ] **Color Mode**: HTML with full colors
- [ ] **Text Export**: Downloads .txt file
- [ ] **PNG Export**: Downloads high-res .png
- [ ] **SVG Export**: Downloads vector .svg
- [ ] **Copy**: Copies to clipboard

### **Quality Verification**
- [ ] **Recognizable**: ASCII art resembles original hampter
- [ ] **Detail Preservation**: Important features visible
- [ ] **Character Distribution**: Good use of character range
- [ ] **Aspect Ratio**: Proportions maintained
- [ ] **Color Accuracy**: Colors match original (color mode)

---

## 📊 **Test Summary**

**Total Tests**: [ ] / [ ] Passed  
**Success Rate**: [ ]%  
**Critical Issues**: [ ]  
**Minor Issues**: [ ]  
**Ready for Production**: [ ] Yes / [ ] No

---

## 🐛 **Issues Found**

### **Critical Issues**
- [ ] None found

### **Minor Issues**  
- [ ] None found

### **Suggestions**
- [ ] None at this time

---

**Testing completed by**: _________  
**Date**: _________  
**Browser/OS**: _________ 