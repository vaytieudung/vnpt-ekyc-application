# 📁 Cấu trúc Project eKYC SDK

## 🗂️ Tổng quan thư mục

```
ekyc-sdk/
├── 📄 index.html                    # Trang chính của ứng dụng
├── 📁 css/
│   └── 📄 styles.css               # Stylesheet chính với responsive design
├── 📁 js/
│   └── 📄 app.js                   # Logic ứng dụng với AI integration
├── 📁 models/                      # AI models cho face detection
│   ├── 📄 face_expression_model-weights_manifest.json
│   ├── 📄 face_landmark_68_model-weights_manifest.json
│   ├── 📄 face_recognition_model-weights_manifest.json
│   └── 📄 tiny_face_detector_model-weights_manifest.json
├── 📁 .github/
│   └── 📁 workflows/
│       └── 📄 deploy.yml           # GitHub Actions auto-deploy
├── 📄 README.md                    # Tài liệu chính
├── 📄 DEPLOY.md                    # Hướng dẫn deploy chi tiết
├── 📄 PROJECT_STRUCTURE.md         # File này - cấu trúc project
├── 📄 LICENSE                      # MIT License
├── 📄 package.json                 # Project metadata
└── 📄 .gitignore                   # Git ignore rules
```

## 📋 Chi tiết từng file

### 🎯 Core Files

#### `index.html`
- **Mục đích**: Trang chính của ứng dụng
- **Nội dung**: 
  - HTML structure cho toàn bộ UI
  - Document selection interface
  - Camera capture interface
  - Face verification interface
  - Modal dialogs
- **Dependencies**: Links to CSS, JS và CDN libraries

#### `css/styles.css`
- **Mục đích**: Styling cho toàn bộ ứng dụng
- **Features**:
  - Responsive design (mobile-first)
  - Modern gradient backgrounds
  - Card-based UI components
  - Modal styling
  - Camera interface styling
  - Face verification với oval frame
  - Error handling UI
  - Loading animations

#### `js/app.js`
- **Mục đích**: Logic chính của ứng dụng
- **Classes**: `EKYCApp` - Main application class
- **Features**:
  - Multi-language support (VI/EN)
  - Camera access management
  - Face detection integration
  - Document capture workflow
  - Error handling & fallback modes
  - Security checks (HTTPS, browser support)
  - Auto-redirect after completion

### 🤖 AI Models

#### `models/` directory
- **face_expression_model**: Nhận diện cảm xúc khuôn mặt
- **face_landmark_68_model**: Phát hiện 68 điểm landmark trên mặt
- **face_recognition_model**: Nhận diện và so sánh khuôn mặt
- **tiny_face_detector_model**: Phát hiện khuôn mặt nhanh và nhẹ

### 📚 Documentation

#### `README.md`
- Tổng quan project
- Hướng dẫn cài đặt
- Tính năng chính
- Demo link
- Contribution guidelines

#### `DEPLOY.md`
- Hướng dẫn deploy lên GitHub Pages từng bước
- Troubleshooting common issues
- Custom domain setup
- Auto-deploy configuration

#### `PROJECT_STRUCTURE.md`
- File này - giải thích cấu trúc project
- Chi tiết từng file và thư mục
- Dependencies và relationships

### ⚙️ Configuration Files

#### `package.json`
- Project metadata
- Scripts for development
- Dependencies information
- Repository links

#### `.gitignore`
- Loại trừ files không cần thiết
- Node modules, logs, temp files
- IDE specific files

#### `LICENSE`
- MIT License
- Copyright information
- Usage permissions

#### `.github/workflows/deploy.yml`
- GitHub Actions configuration
- Auto-deploy to GitHub Pages
- Build and deployment pipeline

## 🔗 Dependencies & Libraries

### CDN Libraries (loaded in index.html):
- **Face-API.js**: `https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js`
- **jsQR**: `https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js`
- **Lottie**: `https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js`
- **Popper.js**: `https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js`

### Internal Dependencies:
- `css/styles.css` ← `index.html`
- `js/app.js` ← `index.html`
- `models/*` ← `js/app.js`

## 🚀 Workflow

### Development Flow:
1. **Local Development**: `python3 -m http.server 8000`
2. **Code Changes**: Edit HTML/CSS/JS files
3. **Testing**: Test in browser with camera permissions
4. **Commit**: `git add . && git commit -m "message"`
5. **Deploy**: `git push origin main`

### Auto-Deploy Flow:
1. **Push to main branch**
2. **GitHub Actions triggers**
3. **Build process runs**
4. **Deploy to GitHub Pages**
5. **Live at**: `https://username.github.io/ekyc-sdk`

## 📱 Browser Compatibility

### Supported Browsers:
- ✅ Chrome 60+ (Desktop & Mobile)
- ✅ Firefox 55+ (Desktop & Mobile)  
- ✅ Safari 11+ (Desktop & Mobile)
- ✅ Edge 79+
- ✅ Samsung Internet 8.0+

### Required Features:
- `getUserMedia()` API
- `Canvas` API
- `Fetch` API
- `Promise` support
- `ES6` features

## 🔒 Security Features

### Implemented Checks:
- ✅ HTTPS requirement validation
- ✅ Camera permission verification
- ✅ Browser compatibility detection
- ✅ Error handling with fallback modes
- ✅ Resource cleanup on page unload

### Privacy Considerations:
- 🔒 No data sent to external servers
- 🔒 Camera streams stopped after use
- 🔒 Local processing only
- 🔒 No persistent storage of images

## 📊 File Sizes (Approximate)

```
index.html          ~8KB
css/styles.css      ~15KB
js/app.js          ~35KB
models/*.json      ~2KB each
README.md          ~5KB
Total Project      ~70KB (excluding CDN libraries)
```

## 🎯 Next Steps for Enhancement

### Potential Improvements:
1. **PWA Support**: Add service worker và manifest
2. **Offline Mode**: Cache resources for offline use
3. **Real Backend**: Connect to actual verification API
4. **Analytics**: Add usage tracking
5. **A/B Testing**: Different UI variations
6. **Performance**: Optimize loading times
7. **Accessibility**: WCAG compliance improvements

---

📝 **Note**: Cấu trúc này được thiết kế để dễ maintain, scale và deploy. Mỗi component có responsibility rõ ràng và loosely coupled.
