# eKYC SDK - Document Verification System

Hệ thống xác thực giấy tờ và khuôn mặt sử dụng AI, được clone từ Shinhan Financer eKYC SDK.

## 🚀 Tính năng

- ✅ Xác thực nhiều loại giấy tờ (CMND/CCCD, Hộ chiếu, Bằng lái xe)
- ✅ Nhận diện khuôn mặt với AI
- ✅ Hỗ trợ đa ngôn ngữ (Tiếng Việt/English)
- ✅ Giao diện responsive, tương thích mobile
- ✅ Bảo mật cao với kiểm tra HTTPS và quyền camera
- ✅ Fallback mode khi camera không khả dụng

## 🛠️ Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI Libraries**: Face-API.js, jsQR
- **UI Framework**: Custom CSS với Tailwind-inspired design
- **Animation**: Lottie.js
- **Positioning**: Popper.js

## 📱 Demo

Truy cập: [https://yourusername.github.io/ekyc-sdk](https://yourusername.github.io/ekyc-sdk)

## 🔧 Cài đặt và chạy local

1. Clone repository:
```bash
git clone https://github.com/yourusername/ekyc-sdk.git
cd ekyc-sdk
```

2. Chạy local server:
```bash
# Sử dụng Python
python3 -m http.server 8000

# Hoặc sử dụng Node.js
npx serve .

# Hoặc sử dụng Live Server extension trong VS Code
```

3. Mở trình duyệt và truy cập: `http://localhost:8000`

📁 Cấu trúc Project hoàn chỉnh:
ekyc-sdk/
├── 📄 index.html                    # Trang chính ứng dụng
├── 📁 css/
│   └── 📄 styles.css               # Responsive CSS với oval face frame
├── 📁 js/
│   ├── 📄 app.js                   # Logic chính với 3 tính năng mới
│   ├── 📄 face-api.min.js          # Face detection library
│   ├── 📄 jsQR.js                  # QR code detection
│   ├── 📄 lottie.min.js            # Animation library
│   └── 📄 popper.min.js            # Positioning library
├── 📁 models/                      # AI models cho face detection
│   ├── 📄 face_expression_model-weights_manifest.json
│   ├── 📄 face_landmark_68_model-weights_manifest.json
│   ├── 📄 face_recognition_model-weights_manifest.json
│   └── 📄 tiny_face_detector_model-weights_manifest.json
├── 📁 .github/workflows/
│   └── 📄 deploy.yml               # Auto-deploy GitHub Actions
├── 📄 README.md                    # Tài liệu chính
├── 📄 DEPLOY.md                    # Hướng dẫn deploy chi tiết
├── 📄 PROJECT_STRUCTURE.md         # Cấu trúc project
├── 📄 LICENSE                      # MIT License
├── 📄 package.json                 # Project metadata
└── 📄 .gitignore                   # Git ignore rul
```

## 🎯 Hướng dẫn sử dụng

1. **Chọn loại giấy tờ**: Click vào một trong 4 loại giấy tờ
2. **Đọc hướng dẫn**: Xem hướng dẫn chụp ảnh trong modal
3. **Chụp ảnh giấy tờ**: Chụp mặt trước và mặt sau
4. **Xác thực khuôn mặt**: Đặt mặt vào khung oval
5. **Hoàn thành**: Hệ thống sẽ chuyển hướng sau khi xác thực thành công

## 🔒 Bảo mật

- Kiểm tra HTTPS trước khi truy cập camera
- Xác thực quyền truy cập camera
- Kiểm tra tương thích trình duyệt
- Xử lý lỗi toàn diện với fallback mode

## 🌐 Tương thích trình duyệt

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

---

⭐ Nếu project này hữu ích, hãy cho một star nhé!
