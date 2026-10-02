# HƯỚNG DẪN QUY TRÌNH KẾ TOÁN & KIỂM SOÁT THUẾ SAU KHI XUẤT HÓA ĐƠN
## ĐƠN HÀNG XUẤT KHẨU SNACK QUẨY GIÒN GIÒN SANG THÁI LAN (HĐ: GSSDIX_FCA_269901)
### MÃ TÀI LIỆU: KT-SOP-00 | DÀNH RIÊNG CHO BỘ PHẬN TÀI CHÍNH KẾ TOÁN G-SS CO.,LTD

> **Căn cứ pháp lý cốt lõi:**
> - Luật Thuế Giá trị gia tăng & Thông tư số 219/2013/TT-BTC, Thông tư số 130/2016/TT-BTC.
> - Luật Quản lý thuế & Thông tư số 80/2021/TT-BTC ngày 29/09/2021.
> - Luật Thuế Thu nhập Doanh nghiệp & Thông tư số 78/2014/TT-BTC, Thông tư số 96/2015/TT-BTC.
> - Nghị định số 123/2020/NĐ-CP & Thông tư số 78/2021/TT-BTC về Hóa đơn điện tử.

---

### TỔNG QUAN ĐƠN HÀNG & CÁC CON SỐ QUYẾT TOÁN CỐT LÕI (SSOT)
- **Doanh thu xuất khẩu (FCA Lao Bảo):** **`534.204.320 VNĐ`** ($20,540.00 USD @ tỷ giá 26.008 VND/USD).
- **Tổng Chi phí thực tế (chưa thuế GTGT):** **`487.985.122 VNĐ`** (Giá vốn Thiên Long 438,1M + Vận tải & lưu xe Vĩnh Thành 26,63M + Logistics Bình An 15,3M + Bốc xếp 2,5M + Hồ sơ 2M + Khách sạn NV 0,74M + Lệ phí 0,27M + Phí ngân hàng quốc tế 2 đợt $94 USD quy đổi 2,44M).
- **Lợi nhuận Kế toán trước thuế (EBT):** **`46.219.198 VNĐ`** (Biên gộp: **8,65%**).
- **Thuế TNDN 20% phải nộp:** **`9.243.840 VNĐ`** *(nếu có Bảng kê 01/TNDN cho 2,5M bốc xếp)* hoặc **`9.743.840 VNĐ`** *(nếu loại trừ B4)*.
- **★ LÃI RÒNG TẦNG 1 (TIỀN TƯƠI TRONG KỲ):** **`36.975.358 VNĐ`** (ROS 1: **6,92%**).
- **★★ DÒNG TIỀN HOÀN THUẾ GTGT 0% THU VỀ:** **`+38.461.630 VNĐ`** *(Thiên Long 35.048.000 đ + Vĩnh Thành 2.130.370 đ + Bình An 1.224.000 đ + Khách sạn 59.260 đ)*.
- **★★ LỢI NHUẬN RÒNG TỔNG THỂ DÀI HẠN (TẦNG 2 SAU HOÀN THUẾ):** **`74.936.988 – 75.436.988 VNĐ`** (Tỷ suất sinh lời sau thuế **ROS đạt 14,03% – 14,12%**).

---

### BỘ QUY TẮC ĐẶT TÊN MÃ ĐƠN HÀNG (ORDER ID) & MÃ HỢP ĐỒNG / PO XNK (QUY CHUẨN BAN GIÁM ĐỐC)

1. **Cấu trúc Mã đơn hàng nội bộ (Short Order ID):** `YYMMDDNN`
   - `YY`: 2 chữ số cuối của năm tạo nháp / bắt đầu lên phương án (ví dụ: `26` cho năm 2026).
   - `MM`: Tháng tạo nháp đơn hàng (ví dụ: `9` cho tháng 09, `10` cho tháng 10).
   - `DD`: Ngày tạo nháp đơn hàng trong tháng (ví dụ: `9` cho ngày 09, `15` cho ngày 15, `27` cho ngày 27).
   - `NN`: Số thứ tự đơn hàng được thành lập trong ngày hôm đó (`01`, `02`, `03`...).

2. **Cấu trúc Mã Hợp đồng / PO định danh đầy đủ:** `GSS[BUYER]_[INCOTERMS]_[YYMMDDNN]`
   - `GSS`: Bên bán xuất khẩu (Công ty TNHH Global Solution Service).
   - `DIX`: Mã viết tắt Bên mua (Duangmanee Import-Export Co., Ltd).
   - `FCA`: Điều kiện thương mại quốc tế Incoterms 2020.
   - `YYMMDDNN`: Mã thời gian và số thứ tự đơn hàng.

3. **Ví dụ đối chiếu thực tế:**
   - **Đơn 269901:** Đơn hàng đầu tiên của tháng 09, bắt đầu tạo nháp và lên phương án vào ngày 09 tháng 09 năm 2026 ➔ Mã HĐ: **`GSSDIX_FCA_269901`**.
   - **Đơn thứ 2:** Được thành lập vào ngày 15 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26101501`** (Mã đơn: `26101501`).
   - **Đơn thứ 3:** Được thành lập vào ngày 27 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26102701`** (Mã đơn: `26102701`).
   - **Đơn thứ 4:** Được thành lập cùng ngày 27 tháng 10 năm 2026 ➔ PO ID: **`GSSDIX_FCA_26102702`** (Mã đơn: `26102702`).
   - *Các đơn hàng tiếp theo tiếp tục tịnh tiến theo quy tắc trên.*

---

## QUY TRÌNH 7 BƯỚC KẾ TOÁN CẦN THỰC HIỆN SAU KHI XUẤT HÓA ĐƠN

### Bước 1: Kiểm Soát & Ký Số Hóa Đơn GTGT Xuất Khẩu (0%) Trên MISA
1. **Sửa dòng diễn giải trọng lượng:** Bắt buộc sửa về đúng số thực xuất: **`Net: 8.580 kg | Gross: 11.440 kg`** (xóa bỏ số liệu nháp cũ 8.910 kg / 11.880 kg trước khi bấm ký số).
2. **Thông tin người mua:** DUANGMANEE IMPORT-EXPORT CO., LTD | Tax ID: `0495562000281` | Mukdahan, Thailand.
3. **Dẫn chiếu chứng từ:** Ghi rõ HĐ số `GSSDIX_FCA_269901`, Invoice `GSS-INV-269901`, Tờ khai B11 `107382910430`.
4. **Trị giá xuất hóa đơn:** `534.204.320 VNĐ` ($20,540.00 USD @ tỷ giá 26.008) | Thuế suất: **`0%`** | Tiền thuế: **`0 đ`**.
5. **Ký số & Lấy mã CQT:** Ký số trên MISA meInvoice, lấy mã CQT, xuất file PDF/XML lưu vào thư mục `01_HOA_DON_DAU_RA_VA_DOANH_THU` (file `KT-RA-01`).

### Bước 2: Kê Khai Thuế GTGT Kỳ Hiện Tại Trên Tờ Khai Mẫu 01/GTGT
1. **Doanh thu xuất khẩu thuế suất 0%:** Điền **`534.204.320 VNĐ`** vào **Chỉ tiêu [29]** (Hàng hóa, dịch vụ xuất khẩu chịu thuế 0%).
2. **Kê khai thuế GTGT đầu vào được khấu trừ:** Tập hợp toàn bộ hóa đơn GTGT đầu vào hợp pháp vào **Chỉ tiêu [23], [24], [25]**:
   - Hóa đơn Thiên Long: Mua 1.300 thùng hàng `438.100.000 đ` ➔ Thuế GTGT 8%: **`35.048.000 đ`**
   - Hóa đơn Vĩnh Thành (HĐ `00000217`): Cước + lưu xe `26.629.630 đ` ➔ Thuế GTGT 8%: **`2.130.370 đ`**
   - Hóa đơn Khách sạn Dư Hùng Phát (HĐ `00001188`): Tiền phòng `740.740 đ` ➔ Thuế GTGT 8%: **`59.260 đ`**
   - Hóa đơn Bình An Logistics (Debit Note DL2609298): Dịch vụ thông quan Lao Bảo `15.300.000 đ` ➔ Thuế GTGT 8%: **`1.224.000 đ`**
   - **➤ TỔNG THUẾ GTGT ĐẦU VÀO ĐƯỢC KHẤU TRỪ / HOÀN THUẾ:** **`38.461.630 VNĐ`** (Tiến độ: **12,82% / 300 triệu đồng**).

### Bước 3: Thu Thập & Khóa Chứng Từ Thanh Toán Ngân Hàng Quốc Tế (MB Bank)
Theo Điều 16 Thông tư 219/2013/TT-BTC, đây là chứng từ **sống còn** để được áp dụng thuế suất 0%:
1. Thu thập **Giấy báo Có (Credit Advice)** và **Điện SWIFT MT103** từ Chi nhánh MB Bank Phùng Hưng đối với 2 đợt tiền về TK USD `9489773866038`:
   - Đợt 1 (Cọc): `$8,532.00 USD` (Quy đổi 221.896.256 VNĐ).
   - Đợt 2 (Thanh toán): `$12,008.00 USD` (Quy đổi 312.308.064 VNĐ).
   - Tổng thu: **`$20,540.00 USD`** khớp 100% với Invoice và Tờ khai B11.
2. Yêu cầu Chi nhánh MB Bank Phùng Hưng in bản giấy và đóng dấu mộc đỏ tròn vào Giấy báo Có. Kẹp vào thư mục `05_CHUNG_TU_THANH_TOAN_NGAN_HANG_MB`.

### Bước 4: Hoàn Tất Chứng Từ Chi Phí Đầu Vào Phục Vụ Quyết Toán Thuế TNDN (ĐÃ HOÀN TẤT THANH TOÁN 100%)
- **Mua hàng Thiên Long (438.100.000 đ + VAT 35.048.000 đ = 473.148.000 đ):** ĐÃ HOÀN TẤT THANH TOÁN 100% QUA MB BANK (Đợt 1 cọc 141.944.400 đ + Đợt 2 331.203.600 đ). Kẹp đủ 2 UNC ngân hàng + HĐNT 269901, PL01, Hóa đơn GTGT Thiên Long. Dư nợ = 0 đ.
- **Vận tải Vĩnh Thành (26.629.630 đ + VAT 2.130.370 đ = 28.760.000 đ):** ĐÃ HOÀN TẤT THANH TOÁN 100% QUA MB BANK (Tạm ứng 11.000.000 đ + Quyết toán 17.760.000 đ). Kẹp đủ 2 UNC ngân hàng + HĐNT vận tải, PL01 điều xe, Trucking Waybill, HĐ GTGT số `00000217`. Dư nợ = 0 đ.
- **Logistics & Hải quan Bình An (15.300.000 đ + VAT 1.224.000 đ = 16.524.000 đ):** ĐÃ HOÀN TẤT THANH TOÁN 100% QUA CHUYỂN KHOẢN NGÂN HÀNG (UNC). Kẹp UNC ngân hàng + Debit Note DL2609298, Hóa đơn GTGT dịch vụ. Dư nợ = 0 đ.
- **Chi phí xử lý hồ sơ giao hàng (2.000.000 đ):** ĐÃ THANH TOÁN XONG. Kẹp Công văn `15/CV-GSS` bản có dấu mộc Hải quan Lao Bảo + Chứng từ chuyển khoản/phiếu thu Bình An Logistics.
- **Khách sạn Dư Hùng Phát (740.740 đ + VAT 59.260 đ = 800.000 đ):** ĐÃ HOÀN TẤT THANH TOÁN (Hoàn ứng công tác phí). Kẹp HĐ GTGT số `00001188` và Giấy đề nghị thanh toán công tác phí của Đồng Thanh Tùng (file `KT-LOG-07`).
- **➤ TỔNG HỢP CÔNG NỢ PHẢI TRẢ NHÀ CUNG CẤP & ĐỐI TÁC (TK 331):** **`0 VNĐ`** (100% SẠCH NỢ, TOÀN BỘ CHỨNG TỪ UNC ĐÃ KHỚP SỔ PHỤ NGÂN HÀNG).

### Bước 5: Hợp Thức Hóa Khoản Chi Bốc Xếp 2.500.000 Đ Không Có Hóa Đơn Tại Lao Bảo
1. In file **`KT-LOG-05`** (*Bảng kê thu mua dịch vụ Mẫu 01/TNDN theo Thông tư 96/2015/TT-BTC*) có sẵn trong folder.
2. In file **`KT-LOG-06`** (*Bản cam kết Mẫu 08/CK-TNCN theo Thông tư 80/2021/TT-BTC*) có sẵn trong folder.
3. Điền thông tin và lấy chữ ký của Tổ trưởng đội cửu vạn Lao Bảo + kẹp kèm ảnh chụp CCCD 2 mặt của Tổ trưởng.
4. **Hiệu quả:** Tính trọn vẹn `2.500.000 VNĐ` vào chi phí hợp lý được trừ khi tính thuế TNDN, **tiết kiệm 500.000 VNĐ tiền thuế TNDN** cho G-SS!

### Bước 6: Tập Hợp Bộ Hồ Sơ Đề Nghị Hoàn Thuế GTGT 0% (Thu Hồi 38.461.630 Đ)
Chuẩn bị bộ hồ sơ 5 thành phần theo Checklist `KT-FIN-02`:
1. Giấy đề nghị hoàn trả khoản thu NSNN (Mẫu số 01/HT) nộp điện tử qua thuedientu.gdt.gov.vn.
2. Bảng kê hóa đơn đầu vào Mẫu 01-1/HT (Thiên Long 35,05M + Vĩnh Thành 2,13M + Bình An 1,224M + Dư Hùng Phát 0,06M = 38,46M).
3. Hợp đồng xuất khẩu `GSSDIX_FCA_269901` + Commercial Invoice + Packing List.
4. Tờ khai hải quan xuất khẩu B11 (Số `107382910430`) có xác nhận thực xuất của Hải quan Lao Bảo.
5. Giấy báo Có MB Bank + Điện MT103 xác nhận tiền về $20,540.00 USD.
*Dòng tiền hoàn thuế 38.461.630 VNĐ về tài khoản sau 40 - 60 ngày kể từ ngày nộp hồ sơ (khi lũy kế đạt ≥ 300 triệu VNĐ).*

### Bước 7: Hạch Toán Định Khoản Kế Toán (Bút Toán Chuẩn Trên Phần Mềm)
1. **Ghi nhận Doanh thu xuất khẩu:**
   - Nợ TK 131 (Duangmanee): `534.204.320 đ`
   - Có TK 5111: `534.204.320 đ` (Thuế suất 0%)
2. **Nhận tiền thanh toán từ khách Thái (MB Bank):**
   - Nợ TK 1122 (USD quy đổi): `534.204.320 đ`
   - Có TK 131: `534.204.320 đ`
3. **Ghi nhận Giá vốn mua hàng Thiên Long:**
   - Nợ TK 632: `438.100.000 đ`
   - Nợ TK 1331: `35.048.000 đ`
   - Có TK 331 (Thiên Long): `473.148.000 đ`
4. **Ghi nhận Cước xe & Lưu xe Vĩnh Thành (HĐ 00000217):**
   - Nợ TK 641: `26.629.630 đ` (Cước: 22M + Lưu xe: 4,63M)
   - Nợ TK 1331: `2.130.370 đ`
   - Có TK 331 (Vĩnh Thành): `28.760.000 đ`
5. **Ghi nhận Chi phí phòng khách sạn hiện trường (HĐ 00001188):**
   - Nợ TK 641: `740.740 đ`
   - Nợ TK 1331: `59.260 đ`
   - Có TK 111 / 141 (Đồng Thanh Tùng): `800.000 đ`
6. **Ghi nhận Chi phí bốc xếp Lao Bảo (Bảng kê 01/TNDN) & Hồ sơ hủy xuất cảnh:**
   - Nợ TK 641: `4.500.000 đ` (Bốc xếp 2.5M + Hồ sơ 2M)
   - Có TK 111 / 141: `4.500.000 đ`
7. **Ghi nhận Dịch vụ Đại lý Hải quan Bình An (Debit Note DL2609298):**
   - Nợ TK 641: `15.300.000 đ`
   - Nợ TK 1331: `1.224.000 đ`
   - Có TK 331 (Bình An) / 1121 (VCB 0451000362923): `16.524.000 đ`
7b. **Ghi nhận Lệ phí Hải quan B11 & Bến bãi Lao Bảo:**
   - Nợ TK 641: `270.000 đ`
   - Có TK 111: `270.000 đ`
8. **Ghi nhận Chi phí Tài chính & Phí dịch vụ ngân hàng quốc tế (2 đợt x $47 USD = $94 USD):
   - Nợ TK 635 (Chi phí tài chính): `2.444.752 đ`
   - Có TK 1122 (TK USD MB Bank): `2.444.752 đ`
8b. **Tạm tính Thuế TNDN 20% phải nộp (EBT = 46.219.198 đ):**
   - Nợ TK 8211: `9.243.840 đ`
   - Có TK 3334: `9.243.840 đ`
9. **Khi nhận được tiền Hoàn thuế GTGT 0% từ Kho bạc Nhà nước:**
   - Nợ TK 1121 (MB Bank VND): `38.461.630 đ`
   - Có TK 1331: `38.461.630 đ`
10. **Bút toán tất toán 100% công nợ Nhà cung cấp & Đối tác dịch vụ (Dư nợ TK 331 = 0 VNĐ):**
   - **Tất toán Thiên Long:**
     * Nợ TK 331 (Thiên Long): `473.148.000 đ`
     * Có TK 1121 (MB Bank VND): `473.148.000 đ` *(Đã chuyển khoản xong 100% qua 2 đợt UNC)*
   - **Tất toán Vận tải Vĩnh Thành:**
     * Nợ TK 331 (Vĩnh Thành): `28.760.000 đ`
     * Có TK 1121 (MB Bank VND): `28.760.000 đ` *(Đã chuyển khoản xong 100% qua 2 đợt UNC theo HĐ 00000217)*
   - **Tất toán Logistics Bình An:**
     * Nợ TK 331 (Bình An): `18.524.000 đ` *(Dịch vụ 16.524.000 đ theo DL2609298 + Xử lý CV15 2.000.000 đ)*
     * Có TK 1121 (MB Bank VND / UNC Ngân hàng): `18.524.000 đ` *(Đã chuyển khoản xong 100%)*
   - **➤ Kết luận kiểm toán:** Dư nợ phải trả Nhà cung cấp & Vận tải/Hải quan của Đơn 269901 chính thức **về 0 VNĐ (Zero-Liability)**.

---

## BẢN ĐỒ TRA CỨU HỒ SƠ TRONG THƯ MỤC '07_BO_HO_SO_KE_TOAN_THUE_DON_269901'

| Thư mục con (Subfolder) | File theo Hệ Name ID | Vai trò & Mục đích sử dụng cho Kế toán |
| :--- | :--- | :--- |
| **`01_HOA_DON_DAU_RA_VA_DOANH_THU`** | `KT-RA-01` đến `KT-RA-04` | Hóa đơn GTGT 0% MISA, Commercial Invoice, Packing List, Sales Contract phục vụ ghi nhận doanh thu và kê khai chỉ tiêu [29]. |
| **`02_TO_KHAI_HAI_QUAN_VA_CHUNG_TU_XUAT`** | `KT-HQ-01` đến `KT-HQ-03` | Tờ khai hải quan B11 thông quan, C/O Form D ATIGA, Công văn 15/CV-GSS hủy xuất cảnh xe phục vụ hoàn thuế GTGT. |
| **`03_HOA_DON_DAU_VAO_CHI_PHI_GIA_VON`** | `KT-VAO-01` đến `KT-VAO-04` | Hợp đồng mua hàng Thiên Long (bản scan dấu đỏ), PL01 1.300 thùng, Hướng dẫn HĐ GTGT 8% và Lệnh chuyển khoản phục vụ ghi nhận giá vốn TK 632. |
| **`04_HOA_DON_DAU_VAO_LOGISTICS_VA_HIEN_TRUONG`**| `KT-LOG-01` đến `KT-LOG-07` | HĐ Vĩnh Thành (`00000217`), HĐ Khách sạn (`00001188`), Bảng kê 01/TNDN bốc xếp 2.5M, Cam kết 08/CK-TNCN, Giấy thanh toán công tác phí. |
| **`05_CHUNG_TU_THANH_TOAN_NGAN_HANG_MB`** | `KT-NH-01` và `KT-NH-02` | Hướng dẫn thu thập Giấy báo Có MB Bank ($20,540 USD) và Điện SWIFT MT103 phục vụ điều kiện hoàn thuế theo Điều 16 TT 219. |
| **`06_BAO_CAO_QUYET_TOAN_VA_HOAN_THUE`** | `KT-FIN-01` và `KT-FIN-02` | Phương án tài chính P&L quyết toán thực tế (lãi ròng 81,3 - 81,8M) và Bảng kiểm soát đối soát 4 chiều (4-Way Matching Gatekeeper). |
