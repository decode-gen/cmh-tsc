# BẢNG TỔNG HỢP CHI PHÍ, DOANH THU & QUYẾT TOÁN TÀI CHÍNH ĐA SHEET (ALL-IN-ONE MASTER WORKBOOK)
## MÃ HỒ SƠ: KT-FIN-03 | FILE EXCEL TÍCH HỢP TẬP TRUNG TOÀN HỆ THỐNG
### ĐƠN HÀNG XUẤT KHẨU SNACK QUẨY GIÒN GIÒN SANG THÁI LAN (HĐ: GSSDIX_FCA_269901)
### CÔNG TY TNHH GLOBAL SOLUTION SERVICE (G-SS CO.,LTD) — MST: 0109469047

> **Đường dẫn file Excel tính toán tập trung đa Sheet (All-In-One Master Workbook):**  
> 📊 [SO_THEO_DOI_CHI_PHI_DOANH_THU_VA_HOAN_THUE_XNK_GSS.xlsx](file:///d:/coltdgss-mio-hub/domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_THONG_QUAN_GSSDIX_FCA_269901/07_BO_HO_SO_KE_TOAN_THUE_DON_269901/SO_THEO_DOI_CHI_PHI_DOANH_THU_VA_HOAN_THUE_XNK_GSS.xlsx)  
> 📊 [KT-FIN-03_BANG_TINH_TONG_CHI_PHI_VA_QUYET_TOAN_DON_269901.xlsx](file:///d:/coltdgss-mio-hub/domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_THONG_QUAN_GSSDIX_FCA_269901/07_BO_HO_SO_KE_TOAN_THUE_DON_269901/KT-FIN-03_BANG_TINH_TONG_CHI_PHI_VA_QUYET_TOAN_DON_269901.xlsx)

---

### I. BỘ QUY TẮC ĐẶT TÊN MÃ ĐƠN HÀNG (ORDER ID) & MÃ HỢP ĐỒNG / PO XNK (CHUẨN BAN GIÁM ĐỐC)

Thực hiện chuẩn hóa định danh toàn diện hệ thống:
1. **Cấu trúc Mã đơn hàng nội bộ (Order ID):** `YYMMDDNN`
   - `YY`: 2 chữ số cuối của năm tạo nháp / bắt đầu lên phương án (ví dụ `26` cho năm 2026).
   - `MM`: Tháng tạo nháp đơn hàng (`9` cho tháng 09, `10` cho tháng 10...).
   - `DD`: Ngày tạo nháp đơn hàng (`9` cho ngày 09, `15` cho ngày 15, `27` cho ngày 27...).
   - `NN`: Số thứ tự đơn hàng được thành lập trong ngày hôm đó (`01`, `02`, `03`...).

2. **Cấu trúc Mã Hợp đồng / PO đầy đủ:** `GSS[BUYER]_[INCOTERMS]_[YYMMDDNN]`
   - `GSS`: Bên bán xuất khẩu (Công ty TNHH Global Solution Service).
   - `DIX`: Mã Bên mua (Duangmanee Import-Export Co., Ltd).
   - `FCA`: Điều kiện thương mại quốc tế Incoterms 2020.
   - `YYMMDDNN`: Mã thời gian và số thứ tự đơn hàng.

3. **Bảng ví dụ đối chiếu danh mục đơn hàng:**
   - **Đơn 269901:** Đơn hàng đầu tiên của tháng 09, bắt đầu tạo nháp vào ngày 09 tháng 09 năm 2026 ➔ Mã HĐ: **`GSSDIX_FCA_269901`**.
   - **Đơn thứ 2 (Dự kiến):** Thành lập ngày 15 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26101501`** (Mã đơn: `26101501`).
   - **Đơn thứ 3 (Dự kiến):** Thành lập ngày 27 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26102701`** (Mã đơn: `26102701`).
   - **Đơn thứ 4 (Dự kiến):** Thành lập cùng ngày 27 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26102702`** (Mã đơn: `26102702`).

---

### II. NGUYÊN TẮC QUẢN TRỊ FILE EXCEL TẬP TRUNG (ALL-IN-ONE MULTI-SHEET)
- **TUYỆT ĐỐI KHÔNG TÁCH RỜI FILE RIÊNG LẺ:** Không tạo các file rời như `...DON_26101501.xlsx`... gây phân mảnh dữ liệu.
- **TẤT CẢ NẰM TRONG 1 FILE EXCEL DUY NHẤT:** Toàn bộ đơn hàng, sổ dồn tích lũy thuế GTGT, checklist 4 bên đều nằm trong các Sheet liên kết chéo.
- **KHÔNG SỬ DỤNG THÔNG SỐ ẢO:** Đã xóa bỏ hoàn toàn số liệu giả định của các đơn chưa phát sinh. Bảng tính chỉ phản ánh đúng duy nhất số liệu thực tế đã thông quan của Đơn hàng 269901. Các dòng tiếp theo để trống sẵn sàng cho kế toán nhập liệu khi phát sinh thực tế.

---

### III. CẤU TRÚC 7 SHEET TÍCH HỢP TRONG WORKBOOK MASTER

```
SO_THEO_DOI_CHI_PHI_DOANH_THU_VA_HOAN_THUE_XNK_GSS.xlsx
├── Sheet 1: TONG_HOP_DON_HANG_VA_HOAN_THUE ★ (MASTER DASHBOARD ĐIỀU HÀNH)
│   ├── Header công ty, MST 0109469047, Thông tin 2 tài khoản MB Bank (VND & USD)
│   ├── 6 Thẻ KPI Summary thực tế:
│   │   ├── Tổng Doanh thu thực tế: 534.204.320 đ (=G15)
│   │   ├── Tổng Chi phí thực tế: 487.985.122 đ (=L15)
│   │   ├── Tổng Lợi nhuận trước thuế EBT: 46.219.198 đ (=M15)
│   │   ├── Tổng Thuế TNDN 20% tạm nộp: 9.243.840 đ (=N15)
│   │   ├── [TẦNG 1] Lãi ròng Tiền tươi trong kỳ: 36.975.358 đ (=O15) (Mint Green)
│   │   └── [TẦNG 2] Quỹ Thuế GTGT Đã Tích Lũy: 38.461.630 đ (Tiến độ 12,82% / 300M)
│   └── Bảng tổng hợp liên kết tự động bằng công thức:
│       ├── Dòng 15: Đơn 269901 (Thực tế đã thông quan B11)
│       └── Dòng 16-20: Các dòng chờ phát sinh đơn tiếp theo (Trắng sạch, không có số ảo)
│
├── Sheet 2: DON_269901 (QUYẾT TOÁN THỰC TẾ ĐƠN HÀNG 269901)
│   ├── Phần I: Doanh thu FCA & Ô nhập liệu 2 đợt USD (Đợt 1: $8,532 @ 26.008 | Đợt 2: $12,008 @ 26.008)
│   ├── Phần II: Giá vốn mua hàng Thiên Long (1.300 thùng: 438.100.000 đ + VAT 8%: 35.048.000 đ = 473.148.000 đ) ★ [ĐÃ TT 100% QUA MB BANK]
│   ├── Phần III: Chi phí vận tải Vĩnh Thành & HQ Bình An DL2609298 (42.199.630 đ + VAT: 3.354.370 đ = 45.554.000 đ) ★ [ĐÃ TT 100% QUA UNC NGÂN HÀNG]
│   ├── Phần IV: Phụ phí phát sinh & Phí ngân hàng (Bốc xếp 2.5M, CV15 2M [ĐÃ TT], Khách sạn 800k, Phí NH 2 đợt $94 = 2.444.752 đ ➔ DƯ NỢ TK 331 = 0 Đ)
│   ├── Phần V: Bảng tổng hợp P&L 2 Tầng:
│   │   ├── Lợi nhuận trước thuế EBT: 46.219.198 đ (Biên gộp: 8,65%)
│   │   ├── Thuế TNDN 20%: 9.243.840 đ
│   │   ├── ★ TẦNG 1 (Tiền tươi thực nhận ngay): 36.975.358 đ (ROS 1: 6,92%)
│   │   ├── Quỹ thuế GTGT 0% treo tích lũy: +38.461.630 đ (TK 1331)
│   │   └── ★★ TẦNG 2 (Sau khi hoàn thuế): 75.436.988 đ (ROS 2: 14,12%)
│   └── Phần VI: Khung 4 chữ ký kiểm toán (Người lập, Hiện trường, KTT, Giám đốc)
│
├── Sheet 3: DON_TEMPLATE (KHUÔN MẪU CHUẨN ĐỂ NHÂN BẢN ĐƠN MỚI)
│   └── Dành riêng cho Kế toán: Click chuột phải -> Move or Copy -> Create a copy -> Đổi tên thành DON_26101501...
│
├── Sheet 4: SO_HOAN_THUE_TK1331 (SỔ CHI TIẾT KHẤU TRỪ & HOÀN THUẾ GTGT)
│   └── Chỉ ghi nhận 5 hóa đơn thực tế của Đơn 269901 (Thiên Long, Vĩnh Thành cước, Vĩnh Thành lưu xe, Bình An DL2609298, Khách sạn). Tổng: 38.461.630 đ
│
├── Sheet 5: CHECKLIST_4_WAY_MATCHING (KIỂM TOÁN ĐỐI SOÁT 4 BÊN HOÀN THUẾ)
│   └── Bảng kiểm soát 4 trụ cột: Hợp đồng ngoại thương, Tờ khai hải quan B11, Hóa đơn GTGT, Chứng từ thanh toán ngân hàng
│
├── Sheet 6: DONG_BO_MANIFEST_269901 (DỮ LIỆU SSOT MÁY ĐỌC)
│   └── 21 trường dữ liệu máy đọc tự động từ order_manifest_269901.json
│
└── Sheet 7: HUONG_DAN_SU_DUNG (CẨM NANG THAO TÁC CHO KẾ TOÁN & BAN GIÁM ĐỐC)
    └── Tích hợp chi tiết BỘ QUY TẮC ĐẶT TÊN ĐƠN HÀNG XNK và cách nhân bản sheet đơn mới
```

---

### IV. BẢNG TỔNG HỢP THEO DÕI DỒN TÍCH LŨY HOÀN THUẾ GTGT 300 TRIỆU ĐỒNG (THỰC TẾ)

| Chỉ tiêu trên Dashboard | Đơn 269901 (Thực tế) | Các Đơn tiếp theo (Chờ phát sinh) | TỔNG CỘNG THỰC TẾ |
| :--- | :---: | :---: | :---: |
| **Doanh thu thực tế (VNĐ)** | `534.204.320 đ` | *Chờ phát sinh* | **`534.204.320 đ`** |
| **Tổng chi phí (chưa VAT)** | `487.985.122 đ` | *Chờ phát sinh* | **`487.985.122 đ`** |
| **Lợi nhuận trước thuế EBT** | `46.219.198 đ` | *Chờ phát sinh* | **`46.219.198 đ`** |
| **Thuế TNDN 20% tạm nộp** | `9.243.840 đ` | *Chờ phát sinh* | **`9.243.840 đ`** |
| **★ LÃI RÒNG TẦNG 1 (TIỀN TƯƠI)** | **`36.975.358 đ`** | *Chờ phát sinh* | **`36.975.358 đ`** |
| **Thuế GTGT 8% đơn này** | `38.461.630 đ` | *Chờ phát sinh* | `38.461.630 đ` |
| **★★ QUỸ HOÀN THUẾ LŨY KẾ** | **`38.461.630 đ`** | *Chờ phát sinh* | **`38.461.630 đ`** |
| **Số tiền còn thiếu để đủ 300M** | `261.538.370 đ` | — | **`261.538.370 đ`** |
| **Tiến độ tích lũy 300M** | `12,82%` | — | **`12,82%`** |
| **Trạng thái nộp hồ sơ** | *Đang tích lũy* | — | **ĐANG DỒN TÍCH LŨY** |
| **★★ LÃI RÒNG TẦNG 2 (SAU HOÀN THUẾ)** | **`75.436.988 đ`** | *Chờ phát sinh* | **`75.436.988 đ`** |
