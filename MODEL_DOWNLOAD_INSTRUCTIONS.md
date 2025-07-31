# Hướng dẫn tải và đặt các file mô hình AI cho eKYC SDK

Ứng dụng eKYC SDK cần các file mô hình AI đầy đủ để hoạt động chính xác. Hiện tại thư mục `models/` chỉ có các file weights_manifest.json mà thiếu các file shard cần thiết, gây lỗi tải mô hình.

## Các file mô hình cần tải về:

- face_expression_model-shard1  
- face_expression_model-weights_manifest.json  
- face_landmark_68_model-shard1  
- face_landmark_68_model-weights_manifest.json  
- face_recognition_model-shard1  
- face_recognition_model-shard2  
- face_recognition_model-weights_manifest.json  
- tiny_face_detector_model-shard1  
- tiny_face_detector_model-weights_manifest.json  

## Các URL tải file:

- https://vaytieudung.github.io/shinhanbank/models/face_expression_model-shard1  
- https://vaytieudung.github.io/shinhanbank/models/face_expression_model-weights_manifest.json  
- https://vaytieudung.github.io/shinhanbank/models/face_landmark_68_model-shard1  
- https://vaytieudung.github.io/shinhanbank/models/face_landmark_68_model-weights_manifest.json  
- https://vaytieudung.github.io/shinhanbank/models/face_recognition_model-shard1  
- https://vaytieudung.github.io/shinhanbank/models/face_recognition_model-shard2  
- https://vaytieudung.github.io/shinhanbank/models/face_recognition_model-weights_manifest.json  
- https://vaytieudung.github.io/shinhanbank/models/tiny_face_detector_model-shard1  
- https://vaytieudung.github.io/shinhanbank/models/tiny_face_detector_model-weights_manifest.json  

## Hướng dẫn tải và đặt file:

1. Tải từng file từ các URL trên về máy tính của bạn.  
2. Đặt tất cả các file vào thư mục `models/` trong thư mục gốc của dự án eKYC SDK.  
3. Đảm bảo tên file giữ nguyên như trên.  
4. Khởi động lại server local và chạy lại ứng dụng.

## Lưu ý:

- Việc tải file mô hình về và phục vụ trực tiếp từ server local sẽ tránh lỗi CORS và lỗi 404 khi tải mô hình.  
- Nếu bạn muốn sử dụng CDN, cần đảm bảo server CDN hỗ trợ CORS và các file tồn tại.  
- Bạn có thể sử dụng các công cụ như `wget` hoặc trình duyệt để tải file.

---

Nếu bạn cần tôi hỗ trợ tự động tải và đặt các file này, vui lòng cho biết.
