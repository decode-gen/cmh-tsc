# CMH-TSC — BUỒNG LÁI MÔ PHỎNG ĐỊNH GIÁ & P&L NGOẠI THƯƠNG
### Hệ sinh thái MIO & G-SS CO.,LTD (Satellite Distribution Package)

> **Kho chứa độc lập (Satellite Repository) phục vụ triển khai lên Vercel.**  
> Hoàn toàn cách ly khỏi Monorepo trung tâm `coltdgss-mio-hub` nhằm bảo vệ tuyệt đối bí mật kinh doanh, hồ sơ hải quan, chi phí vốn và cơ sở dữ liệu nội bộ.

---

## 🛡️ TÍNH NĂNG BẢO MẬT TÍCH HỢP SẴN

1. **Anti-Indexing / Anti-Scraping:** Toàn bộ file và API đều gắn header `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` và `robots.txt` chặn đứng 100% bọ tìm kiếm (Google, Bing).
2. **Serverless Exchange Rate Proxy (`/api/rates`):** Lấy tỷ giá tự động, chiết khấu rủi ro -250 VNĐ và đồng bộ tỷ giá Baht Thái, có cache 1 tiếng trên CDN Edge.
3. **Chất lượng In & Xuất PDF A4 Retina 376 DPI:** Sinh trực tiếp trên trình duyệt, không phụ thuộc thư viện ngoài nặng nề.
4. **Vercel Password Protection Ready:** Sẵn sàng kích hoạt lớp bảo vệ mật khẩu toàn diện ở tầng mạng Edge của Vercel.

---

## 🚀 HƯỚNG DẪN ĐẨY LÊN GITHUB & KẾT NỐI VERCEL

### Bước 1: Đẩy mã nguồn lên GitHub độc lập
Thực hiện các lệnh sau ngay tại thư mục này:

```bash
git init -b main
git add .
git commit -m "feat(tsc): initialize isolated CMH-TSC satellite package for Vercel"
git remote add origin https://github.com/decode-gen/cmh-tsc.git
git push -u origin main --force
```

### Bước 2: Kết nối & Triển khai trên Vercel
1. Đăng nhập [vercel.com](https://vercel.com) -> Nhấn **Add New Project**.
2. Chọn kho GitHub: **`decode-gen/cmh-tsc`**.
3. **Framework Preset:** Chọn **Other**.
4. **Build Command:** Để trống (None).
5. **Output Directory:** Để trống (hoặc `.`).
6. Nhấn **Deploy**. Quá trình triển khai hoàn tất trong khoảng 10-15 giây.

### Bước 3: Kích hoạt Bảo vệ Mật khẩu (Password Protection)
1. Trên Vercel Dashboard của dự án, vào **Settings** -> **Deployment Protection**.
2. Bật tính năng **Password Protection**.
3. Đặt mật khẩu truy cập cho Ban Điều Hành.
4. Lưu cấu hình. Mọi lượt truy cập vào trang web sẽ lập tức yêu cầu nhập mật khẩu bảo vệ trước khi hiển thị bất kỳ nội dung nào.

---
© 2026 CÔNG TY TNHH GLOBAL SOLUTION SERVICE. All rights reserved.
