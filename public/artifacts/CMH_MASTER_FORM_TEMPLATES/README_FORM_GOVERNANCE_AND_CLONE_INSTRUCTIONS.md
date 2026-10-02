# KHO LƯU TRỮ VÀ QUẢN TRỊ FORM MẪU CHUẨN SSOT (CMH MASTER FORM TEMPLATES)
## HỆ SINH THÁI XUẤT NHẬP KHẨU GSS TRADE HUB — MIO & G-SS CO.,LTD

> **Mục đích:** Thư mục này là **KHO LƯU TRỮ GỐC CHỈ ĐỌC (READ-ONLY MASTER REPOSITORY)** chứa toàn bộ các biểu mẫu chứng từ chuẩn hóa của hệ sinh thái CMH theo **Kiến trúc 6 Nhánh Trụ Cột Chuẩn SSOT (The 6 Pillar Dossier Architecture)**.  
> ⛔ **QUY TẮC AN TOÀN BẤT KHẢ XÂM PHẠM (RULE R16 & /cmh-form):**  
> 1. **KHÔNG SỬA TRỰC TIẾP TRONG MASTER:** Tuyệt đối không chỉnh sửa trực tiếp trên các file form mẫu trong thư mục này khi tác nghiệp đơn hàng.  
> 2. **KHÔNG CLONE PHẲNG RA ĐƠN HÀNG:** Tuyệt đối **CẤM** clone toàn bộ thư mục này thành một folder phẳng cho đơn hàng mới. Việc gom chung CI (giá bán), PO NCC (giá vốn 337k) và contact khách ngoại vào 1 folder phẳng sẽ dẫn tới rủi ro rò rỉ dữ liệu cực kỳ nguy hiểm cho lái xe hoặc các bên dịch vụ!  
> 3. **CƠ CHẾ PHÂN NHÁNH 6 TRỤ CỘT THỤ HƯỞNG:** Khi khởi tạo đơn hàng mới, hệ thống tự động tạo thư mục gốc `DOSSIER_<ORDER_ID>_<CONTRACT_CODE>/` và phân nhánh thành **6 thư mục con theo đối tượng thụ hưởng**, sau đó mới clone từng form mẫu tương ứng vào đúng thư mục con. (Hồ sơ Hải quan và hồ sơ gửi Đại lý dịch vụ cửa khẩu đã được hợp nhất thành 1 nhánh duy nhất `02_CUS` để triệt tiêu hoàn toàn sự trùng lặp).

---

## BẢNG QUY HOẠCH 6 CHUỖI HỌ NAME ID (6-PILLAR MASTER REPOSITORY)

Cú pháp chuẩn hóa: `[HỌ_SỐ]_[HỌ_CODE]_[MÃ_FORM]_[TÊN_CHỨNG_TỪ]_[PHIÊN_BẢN].[ext]`

### HỌ 01 — `01_BUY` (Khách Hàng Ngoại / Foreign Buyer)
*Đối tượng thụ hưởng:* Bên Mua nước ngoài, Ngân hàng thanh toán quốc tế (MB Bank USD).  
*Ràng buộc:* 100% tiếng Anh thương mại quốc tế, giá bán ngoại thương, điều khoản Incoterms 2020, tài khoản USD `9489773866038`.

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `01_BUY_FRM-TRD-01...` | **Master Sales Framework Agreement (HĐ Khung Ngoại thương Dài hạn)** | `.docx` · `.pdf` · `.md` | **Portrait (A4 Dọc) — Đa trang** | Song ngữ Anh - Việt, Incoterms 2020, Bảo lưu quyền sở hữu, Cọc T/T không hoàn lại, NCNDA chế tài 100.000 USD, Trọng tài VIAC Hà Nội. |
| `01_BUY_FRM-TRD-02...` | **Buyer Purchase Order (PO Khách ngoại)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Kế thừa Addendum 01 PO đơn 269901; T/T 2 đợt (40%-60%). |
| `01_BUY_FRM-TRD-03...` | **Commercial Invoice (Hóa đơn Thương mại)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Chuẩn hóa TT 219/2013 hoàn thuế GTGT 0% và tài khoản USD MB Bank. |
| `01_BUY_FRM-TRD-04...` | **Packing List (Bảng kê Đóng gói)** | `.docx` · `.pdf` · `.md` | Landscape (A4 Ngang) — 1 Trang | Chuẩn 10 cột, 4 ghi chú pháp lý và ô để ngỏ Late-Binding cho seal, trạm cân. |
| `01_BUY_FRM-TRD-05...` | **Payment Instruction (Chỉ dẫn Thanh toán)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Hướng dẫn điện chuyển tiền T/T vào MB Bank USD SWIFT `MSCBVNVX`. |

---

### HỌ 02 — `02_CUS` (Hải Quan & Đại Lý Dịch Vụ Cửa Khẩu / Customs & Clearance Brokerage)
*Đối tượng thụ hưởng:* Chi cục Hải quan cửa khẩu, Đội giám sát HQ, Đại lý dịch vụ khai thuê hải quan (Bình An Logistics...).  
*Ràng buộc:* **HỢP NHẤT TOÀN DIỆN:** Toàn bộ hồ sơ xuất trình hải quan và hồ sơ hợp đồng/ủy quyền giao dịch với bên làm dịch vụ thông quan cửa khẩu được gom tại đây, triệt tiêu 100% việc nhân đôi tài liệu.

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `02_CUS_FRM-CUS-01...` | **Tờ khai Hải quan Xuất khẩu B11 (VNACCS)** | `.xls` · `.md` | Spreadsheet BIFF8 (3 Trang in) | Kế thừa từ tệp VNACCS người dùng; chuẩn 176 dòng × 30 cột, ngắt trang dòng 81 & 144. |
| `02_CUS_FRM-CUS-02...` | **Phiếu Bổ sung Thông tin Doanh nghiệp Hải quan** | `.docx` · `.pdf` · `.md` | Official Risk Form (7 Trang) | Kế thừa tệp 284 dòng 21 chỉ tiêu quản lý rủi ro GSS (MST 0109469047). |
| `02_CUS_FRM-CUS-03...` | **BOM Định Mức Nguyên Phụ Liệu Xuất Khẩu** | `.docx` · `.pdf` · `.md` | Landscape (A4 Ngang) | Bảng kê định mức tiêu hao nguyên phụ liệu sản xuất bánh snack phục vụ đối soát hải quan. |
| `02_CUS_FRM-CUS-04...` | **Letter of Introduction (Giấy Giới Thiệu)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Giấy giới thiệu nhân sự/đại lý làm việc trực tiếp với Chi cục Hải quan cửa khẩu. |
| `02_CUS_FRM-BRO-01...` | **Hợp Đồng Dịch Vụ Khai Thuê Hải Quan** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) | Hợp đồng đại lý làm thủ tục hải quan tại Chi cục Cửa khẩu xuất. |
| `02_CUS_FRM-BRO-02...` | **Giấy Ủy Quyền Làm Thủ Tục Thông Quan Cửa Khẩu**| `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Văn bản ủy quyền hợp pháp của Giám đốc GSS cho đại lý dịch vụ cửa khẩu. |

---

### HỌ 03 — `03_SUP` (Nhà Cung Cấp / Nhà Máy Sản Xuất Domestic Supplier)
*Đối tượng thụ hưởng:* Xưởng sản xuất bánh snack, Kho thành phẩm xưởng.  
*Ràng buộc:* Giá vốn nội địa (337.000 đ), bao gồm công bốc xếp lên xe, cam kết ATTP/ISO 22000, cam kết bồi thường thiệt hại thuế, thanh toán MB Bank VND `2991116668888`.

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `03_SUP_FRM-PRO-01...` | **Master Domestic Supply Agreement (HĐ Khung Cung ứng Xưởng Dài hạn)**| `.docx` · `.pdf` · `.md` | **Portrait (A4 Dọc) — Đa trang** | Kế thừa HĐ Thiên Long; bốc xếp lên xe trọn gói, đổi trả 100% trong 24h, bảo lãnh bồi thường hoàn thuế GTGT 0%, NCNDA nội địa, Tòa án Hà Nội. |
| `03_SUP_FRM-PRO-02...` | **Supplier Purchase Order (PO Nhà cung cấp - PL01)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — Chuẩn mực | Kế thừa PL01 mua hàng Thiên Long; 4 điều khoản giao nhận kho xưởng. |
| `03_SUP_FRM-PRO-03...` | **Factory Delivery Note (Biên bản Bàn giao Xưởng)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Biên bản nghiệm thu số lượng và kiểm đếm tại cửa kho xưởng. |
| `03_SUP_FRM-PRO-04...` | **Quality Inspection Certificate (Chứng thư Chất lượng)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Phiếu kiểm nghiệm chất lượng lô hàng đạt chuẩn xuất khẩu. |

---

### HỌ 04 — `04_LOG` (Logistics, Vận Tải Nội Địa & Lái Xe Domestic Carrier)
*Đối tượng thụ hưởng:* Đơn vị vận tải (Vĩnh Thành), Điều phối xe, Lái xe container/xe tải.  
*Ràng buộc:* **BẢO VỆ TẦNG 2 TUYỆT ĐỐI:** Ẩn 100% giá vốn 337k và ẩn SĐT/email riêng của khách ngoại. Giữ quy tắc 1-Page Invariant cho Waybill và PL01 điều xe. Cam kết dôi dư xe phụ & chế tài NDA 200 Triệu Đồng.

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `04_LOG_FRM-LOG-00...` | **Master Logistics Framework Agreement (HĐ Khung Vận tải Đường bộ Dài hạn)**| `.docx` · `.pdf` · `.md` | **Portrait (A4 Dọc) — Đa trang** | Cước trọn gói, Cam kết bảo lãnh dôi dư xe phụ (Contingency Over-Volume Guarantee), Bồi thường 100% mất mát/ướt hỏng, Chống nhảy cóc NDA phạt 200M, GPS SLA. |
| `04_LOG_FRM-LOG-01...` | **Trucking Waybill (Vận đơn Đường bộ Nội địa)** | `.docx` · `.pdf` · `.md` | **Landscape (A4 Ngang) — 1 Trang** | Kế thừa bản Vĩnh Thành; chuẩn song ngữ, FREIGHT PREPAID, ô điền dấu '...'. |
| `04_LOG_FRM-LOG-02...` | **Transport Dispatch Order (Đơn điều xe PL01)** | `.docx` · `.pdf` · `.md` | **Portrait (A4 Dọc) — 1 Trang** | Lệnh điều xe container lấy hàng tại xưởng Phú Thọ chạy cửa khẩu Lao Bảo. |
| `04_LOG_FRM-LOG-03...` | **Cargo Handover Record (Biên bản Giao nhận 2 Chặng)**| `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Bàn giao hàng hóa chặng 1 (Kho xưởng -> Xe) và chặng 2 (Xe -> Cửa khẩu). |
| `04_LOG_FRM-LOG-04...` | **Container Measurement Slip (Biên bản Đo Khoang)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Xác nhận thể tích thực tế xếp hàng và số hiệu niêm phong chì. |

---

### HỌ 05 — `05_COD` (Chứng Nhận Xuất Xứ Hàng Hóa C/O Mẫu D eCoSys)
*Đối tượng thụ hưởng:* Phòng Quản lý Xuất nhập khẩu (Bộ Công Thương) / VCCI, Hệ thống eCoSys.  
*Ràng buộc:* Vector PDF 2 trang chuẩn, 13 Box ATIGA, không tích bẫy Retroactive Box 13, chuẩn hóa Box 2 & Box 7.

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `05_COD_FRM-COD-01...` | **Certificate of Origin Form D (C/O Mẫu D 13 Box)** | `.pdf` · `.md` | Official eCoSys Vector (2 Trang) | Bảo toàn Quốc huy, con dấu điện tử, QR Code, triệt tiêu 3 bẫy pháp lý. |
| `05_COD_FRM-COD-02...` | **Bản Cam Kết Xuất Xứ Của Nhà Sản Xuất** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Cam kết nguyên liệu đạt tiêu chí RVC / CTC theo hiệp định ATIGA. |
| `05_COD_FRM-COD-03...` | **Thuyết Minh Quy Trình Sản Xuất Bánh Snack** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 2 Trang | Sơ đồ và diễn giải các công đoạn phối trộn, đùn ép, chiên, tẩm vị, đóng gói. |
| `05_COD_FRM-COD-04...` | **Bảng Kê Hóa Đơn GTGT Mua Nguyên Liệu Đầu Vào** | `.docx` · `.pdf` · `.md` | Landscape (A4 Ngang) | Bảng kê số hóa đơn điện tử bột mì, dầu ăn, bao bì phục vụ xét cấp C/O. |

---

### HỌ 06 — `06_FIN` (Tài Chính, Kế Toán & Hoàn Thuế GTGT 0% Internal Audit)
*Đối tượng thụ hưởng:* Ban Giám đốc, Kế toán trưởng GSS, Đoàn thanh tra hoàn thuế Cục Thuế Hà Nội.  
*Ràng buộc:* Lưu trữ nội bộ tuyệt mật, đối soát 3 góc (Dòng tiền ngân hàng - Tờ khai hải quan - Hóa đơn GTGT 0%).

| Mã File Chuẩn Hóa | Tên Chứng Từ | Định Dạng File | Chuẩn Layout | Căn Cứ & Kế Thừa SSOT |
| :--- | :--- | :---: | :---: | :--- |
| `06_FIN_FRM-FIN-01...` | **Phương Án Dự Toán & Quyết Toán Chi Phí Đơn Hàng** | `.docx` · `.pdf` · `.md` | Landscape (A4 Ngang) | Bảng phân tích giá vốn, cước vận tải, chi phí cửa khẩu, lợi nhuận ròng. |
| `06_FIN_FRM-FIN-02...` | **Hóa Đơn GTGT Điện Tử Xuất Khẩu 0% (MISA)** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) — 1 Trang | Mẫu hóa đơn GTGT điện tử xuất khẩu thuế suất 0% theo TT 219/2013/TT-BTC. |
| `06_FIN_FRM-FIN-03...` | **Hồ Sơ Kiểm Toán & Đối Soát Hoàn Thuế GTGT 0%** | `.docx` · `.pdf` · `.md` | Portrait (A4 Dọc) | Bộ checklist đối soát 12 tiêu chí bắt buộc để được hoàn thuế GTGT. |

---

## QUY TRÌNH KHỞI TẠO HỒ SƠ ĐƠN HÀNG MỚI (6-PILLAR CLONE PROTOCOL)

Khi phát sinh đơn hàng mới, quy trình triển khai chuẩn như sau:

```bash
# BƯỚC 1: Khởi tạo thư mục gốc đơn hàng theo mã hợp đồng & mã đơn
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>

# BƯỚC 2: Tạo cấu trúc 6 thư mục con theo đúng 6 Trụ cột Thụ hưởng
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/01_BUY_GUI_KHACH_HANG_<BUYER>
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/02_CUS_HAI_QUAN_VA_DICH_VU_THONG_QUAN
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/03_SUP_HO_SO_NCC_<SUPPLIER>
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/04_LOG_VAN_TAI_KHO_BAI_<CARRIER>
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/05_COD_HO_SO_KHAI_CO_FORM_D_ECOSYS
mkdir -p domains/supply-chain-trade/automations/xnk-dossier/artifacts/HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/06_FIN_TAI_CHINH_HOAN_THUE_NOI_BO

# BƯỚC 3: Clone chọn lọc các biểu mẫu từ MASTER sang từng thư mục con tương ứng
cp CMH_MASTER_FORM_TEMPLATES/01_BUY_* HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/01_BUY_GUI_KHACH_HANG_<BUYER>/
cp CMH_MASTER_FORM_TEMPLATES/04_CUS_* HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/02_CUS_HAI_QUAN_VA_DICH_VU_THONG_QUAN/
cp CMH_MASTER_FORM_TEMPLATES/02_SUP_* HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/03_SUP_HO_SO_NCC_<SUPPLIER>/
cp CMH_MASTER_FORM_TEMPLATES/03_LOG_* HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/04_LOG_VAN_TAI_KHO_BAI_<CARRIER>/
cp CMH_MASTER_FORM_TEMPLATES/05_COD_* HO_SO_XUAT_KHAU_<CONTRACT_CODE>_<ORDER_ID>/05_COD_HO_SO_KHAI_CO_FORM_D_ECOSYS/

# BƯỚC 4: Chạy script nạp tham số đơn hàng (Customer, Số lượng, Trọng lượng, Đơn giá)
python scripts/render_order_dossier.py --order-id=<ORDER_ID> --contract=<CONTRACT_CODE>
```

---

## NGUYÊN TẮC BẤT BIẾN: RULE R19 — CLONE & INJECT, NEVER RECREATE

1. **Phôi Gốc Bất Biến:** Mọi file `.docx` trong thư mục này là khuôn mẫu chuẩn mực đã được kiểm định pháp lý, kiểm soát viền đen thuần `#000000` và ngân sách 1 trang.
2. **Cấm Tuyệt Đối Tự Vẽ Bằng Code:** Tuyệt đối không dùng `python-docx`, `reportlab` hay bất kỳ thư viện nào tự code dựng lại form từ đầu.
3. **Thao Tác Duy Nhất Được Phép:** Sử dụng `scripts/master_template_binder.py` để copy phôi nhị phân `.docx`, thay thế các chuỗi `[PLACEHOLDER]` tại chỗ, và xuất bản PDF chuẩn xác bằng Microsoft Word COM (`WINWORD.EXE`). Mọi điều khoản, bảng biểu (10 cột PKL, 8 cột CI, căn cứ hoàn thuế GTGT 0% TT 219) được bảo toàn 100%.

