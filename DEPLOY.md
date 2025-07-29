# 🚀 Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Chuẩn bị Repository trên GitHub

### 1.1 Tạo Repository mới
1. Đăng nhập vào [GitHub](https://github.com)
2. Click nút **"New"** hoặc **"+"** → **"New repository"**
3. Đặt tên repository: `ekyc-sdk` (hoặc tên bạn muốn)
4. Chọn **Public** (để sử dụng GitHub Pages miễn phí)
5. **KHÔNG** check "Add a README file" (vì chúng ta đã có sẵn)
6. Click **"Create repository"**

### 1.2 Copy URL Repository
Sau khi tạo xong, copy URL repository (dạng: `https://github.com/username/ekyc-sdk.git`)

## Bước 2: Upload Code lên GitHub

### Cách 1: Sử dụng Git Command Line (Khuyến nghị)

```bash
# 1. Khởi tạo git trong thư mục project
git init

# 2. Thêm tất cả files
git add .

# 3. Commit đầu tiên
git commit -m "Initial commit: eKYC SDK with face recognition"

# 4. Thêm remote origin (thay YOUR_USERNAME và REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/ekyc-sdk.git

# 5. Push lên GitHub
git branch -M main
git push -u origin main
```

### Cách 2: Upload trực tiếp qua GitHub Web

1. Vào repository vừa tạo trên GitHub
2. Click **"uploading an existing file"**
3. Kéo thả tất cả files và folders vào
4. Viết commit message: "Initial commit: eKYC SDK"
5. Click **"Commit changes"**

## Bước 3: Kích hoạt GitHub Pages

### 3.1 Vào Settings
1. Trong repository, click tab **"Settings"**
2. Scroll xuống phần **"Pages"** (bên trái sidebar)

### 3.2 Cấu hình Source
1. Trong **"Source"**, chọn **"Deploy from a branch"**
2. Chọn branch **"main"** 
3. Chọn folder **"/ (root)"**
4. Click **"Save"**

### 3.3 Chờ Deploy
- GitHub sẽ mất 1-5 phút để deploy
- Bạn sẽ thấy URL: `https://YOUR_USERNAME.github.io/ekyc-sdk`

## Bước 4: Cập nhật Links trong Code

### 4.1 Cập nhật README.md
Thay `yourusername` bằng username GitHub thực của bạn:
```markdown
## 📱 Demo
Truy cập: [https://YOUR_USERNAME.github.io/ekyc-sdk](https://YOUR_USERNAME.github.io/ekyc-sdk)
```

### 4.2 Cập nhật package.json
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/ekyc-sdk",
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/ekyc-sdk.git"
  }
}
```

## Bước 5: Cập nhật Code (nếu cần)

```bash
# Sau khi sửa code
git add .
git commit -m "Update: description of changes"
git push origin main
```

## 🔧 Troubleshooting

### Lỗi thường gặp:

#### 1. **404 Error khi truy cập GitHub Pages**
- **Nguyên nhân**: Repository là Private
- **Giải pháp**: Chuyển repository thành Public trong Settings

#### 2. **CSS/JS không load**
- **Nguyên nhân**: Đường dẫn tương đối
- **Giải pháp**: Đã sử dụng đường dẫn tương đối trong code, không cần sửa

#### 3. **Face detection không hoạt động**
- **Nguyên nhân**: GitHub Pages chạy trên HTTPS, cần quyền camera
- **Giải pháp**: Đã có error handling và fallback mode

#### 4. **Models không load được**
- **Nguyên nhân**: File models quá lớn hoặc đường dẫn sai
- **Giải pháp**: Đã sử dụng CDN cho face-api.js

## 🎯 Kiểm tra Deploy thành công

1. **Truy cập URL**: `https://YOUR_USERNAME.github.io/ekyc-sdk`
2. **Kiểm tra các tính năng**:
   - ✅ Giao diện hiển thị đúng
   - ✅ Chọn loại giấy tờ
   - ✅ Modal hướng dẫn
   - ✅ Camera interface
   - ✅ Chuyển ngôn ngữ
   - ✅ Responsive trên mobile

## 📱 Custom Domain (Tùy chọn)

Nếu bạn có domain riêng:

1. Tạo file `CNAME` trong root directory:
```
yourdomain.com
```

2. Cấu hình DNS:
```
Type: CNAME
Name: www (hoặc @)
Value: YOUR_USERNAME.github.io
```

## 🔄 Auto Deploy với GitHub Actions (Nâng cao)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

---

## 🎉 Hoàn thành!

Sau khi làm theo các bước trên, bạn sẽ có:
- ✅ Repository trên GitHub
- ✅ Website live trên GitHub Pages
- ✅ URL công khai để chia sẻ
- ✅ Tự động deploy khi có thay đổi

**URL cuối cùng**: `https://YOUR_USERNAME.github.io/ekyc-sdk`

Thay `YOUR_USERNAME` bằng username GitHub thực của bạn!
