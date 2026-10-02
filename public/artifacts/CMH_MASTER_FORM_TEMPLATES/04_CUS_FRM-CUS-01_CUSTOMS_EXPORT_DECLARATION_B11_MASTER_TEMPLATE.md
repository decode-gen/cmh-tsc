# TỔNG CỤC HẢI QUAN — HỆ THỐNG VNACCS/VCIS
## BẢN XÁC NHẬN NỘI DUNG TỜ KHAI HÀNG HÓA XUẤT KHẨU <IN THỬ>
### (MASTER TEMPLATE — MÃ BIỂU MẪU: FRM-CUS-01 — LOẠI HÌNH B11 XUẤT KINH DOANH)

> **Căn cứ pháp lý:** Luật Hải quan số 54/2014/QH13, Thông tư 38/2015/TT-BTC & Thông tư 39/2018/TT-BTC của Bộ Tài chính.  
> **Nguyên tắc kế thừa SSOT:** Kế thừa 100% cấu trúc và tiêu chí bản in thử Tờ khai VNACCS chuẩn từ hồ sơ xuất khẩu thực tế.  
> **Quy tắc bảo toàn:** Giữ cố định pháp nhân G-SS (MST 0109469047, CEO Tower, Phường Từ Liêm, Giám đốc NGUYỄN VĂN TRUNG). Toàn bộ dữ liệu đơn hàng được tham số hóa thành `[TÊN_THAM_SỐ]`, các trường phụ thuộc hiện trường để ngỏ dấu `....................`.

---

### PHẦN 1: THÔNG TIN CHUNG TỜ KHAI XUẤT KHẨU (MÃ LOẠI HÌNH B11)

| STT | Tiêu chí trên Tờ khai VNACCS | Nội dung tham số hóa chuẩn Master Template | Căn cứ pháp lý & Quy tắc nghiệp vụ |
| :---: | :--- | :--- | :--- |
| 01 | **Mã loại hình / Phân loại kiểm tra** | `[MA_LOAI_HINH: B11]` (Xuất kinh doanh) \| Mã phân loại: `[MA_PHAN_LOAI_KT: 00]` | Xuất khẩu thương mại thông thường |
| 02 | **Mã số thuế người xuất khẩu** | `0109469047` | Giấy chứng nhận ĐKKD MST G-SS |
| 03 | **Tên người xuất khẩu** | **CÔNG TY TNHH GLOBAL SOLUTION SERVICE** | Pháp nhân xuất khẩu chính thức |
| 04 | **Địa chỉ người xuất khẩu (CHUẨN ĐKKD)** | **Tầng 18, tòa nhà CEO Tower, Lô HH2-1, Khu đô thị Mễ Trì Hạ, đường Phạm Hùng, Phường Từ Liêm, Thành phố Hà Nội, Việt Nam** | Khớp 100% ĐKKD SSOT (.agents/enterprise-adn.json) |
| 05 | **Mã bưu chính người xuất khẩu** | `84` | Việt Nam |
| 06 | **Mã số thuế / Tax ID người nhập khẩu** | `[BUYER_TAX_CODE]` | Tax ID đối tác nhập khẩu nước ngoài |
| 07 | **Tên người nhập khẩu** | **[BUYER_COMPANY_NAME]** | Khớp 100% Sales Contract & Commercial Invoice |
| 08 | **Địa chỉ người nhập khẩu** | [BUYER_REGISTERED_ADDRESS] | Trụ sở chính thức đối tác nước ngoài |
| 09 | **Người đại diện người nhập khẩu** | [BUYER_REPRESENTATIVE_NAME] — [BUYER_POSITION] | Người ký hợp đồng phía nước ngoài |
| 10 | **Mã nước nhập khẩu** | `[IMPORTING_COUNTRY_CODE: TH/LA/KH/ID/MY...]` | Quốc gia nhập khẩu đích đến |
| 11 | **Đại lý Hải quan / Mã đại lý** | [CUSTOMS_BROKER_NAME] \| Mã: [CUSTOMS_BROKER_CODE] | Đơn vị làm dịch vụ thủ tục hải quan |
| 12 | **Số hợp đồng ngoại thương** | `[SALES_CONTRACT_NO]` (Ngày ký: `[CONTRACT_DATE]`) | Hợp đồng ngoại thương chuẩn |
| 13 | **Số vận đơn / Vận tải đơn** | `[WAYBILL_OR_BL_NO]` | Vận tải đơn đường bộ/đường biển |
| 14 | **Số lượng kiện & Loại kiện** | **[TOTAL_PACKAGES] [PACKAGE_TYPE: BX/CTN/BAG]** | Số kiện thùng carton/bao gói |
| 15 | **Tổng trọng lượng hàng (Gross Weight)** | **[TOTAL_GROSS_WEIGHT] KGM** | Trọng lượng cả bì (Bắt buộc GW > NW) |
| 16 | **Địa điểm lưu kho / Đích bảo thuế** | `[STORAGE_LOCATION_CODE]` — [STORAGE_LOCATION_NAME] | Bãi kiểm hóa / Kho ngoại quan cửa khẩu |
| 17 | **Địa điểm xếp hàng / Cửa khẩu xuất** | `[PORT_OF_LOADING_CODE]` — [PORT_OF_LOADING_NAME] | Cửa khẩu/Cảng biển xuất cảnh |
| 18 | **Địa điểm dỡ hàng / Đích nhận hàng** | `[PORT_OF_DISCHARGE_CODE]` — [PORT_OF_DISCHARGE_NAME] | Nơi dỡ hàng/nhận hàng nước bạn |
| 19 | **Phương tiện vận chuyển dự kiến** | `[TRANSPORT_MODE: O TO / TAU BIEN / MAY BAY]` | Phương thức vận tải xuất khẩu |
| 20 | **Số hiệu phương tiện (Biển số xe / Tàu)** | `........................................` *(Điền khi điều phối thực tế)* | Không ghi cứng số xe trước khi chốt điều phối |
| 21 | **Ngày hàng đi dự kiến (Departure)** | `[ESTIMATED_DEPARTURE_DATE]` | Lịch trình phương tiện đến cửa khẩu |
| 22 | **Số hóa đơn thương mại** | `[COMMERCIAL_INVOICE_NO]` | Số hóa đơn thương mại phát hành chính thức |
| 23 | **Ngày phát hành hóa đơn** | `[COMMERCIAL_INVOICE_DATE]` | Ngày phát hành hóa đơn |
| 24 | **Phương thức thanh toán** | `[PAYMENT_METHOD: KC / LC / DP / DA]` | KC=TT (Chuyển khoản T/T vào MB Bank) |
| 25 | **Điều kiện giá hóa đơn (Incoterms)** | **[INCOTERMS_TERMS] — [CURRENCY] [TOTAL_INVOICE_AMOUNT]** | Ví dụ: FCA Lao Bao Border Gate |
| 26 | **Tỷ giá tính thuế Hải quan** | `[CUSTOMS_EXCHANGE_RATE]` | Tỷ giá Tổng cục Hải quan công bố |
| 27 | **Tổng trị giá tính thuế** | `[TOTAL_CUSTOMS_VALUE_CURRENCY] [TOTAL_CUSTOMS_VALUE]` | Trị giá tính thuế xuất khẩu |

---

### PHẦN 2: VANNING & CONTAINER / PHƯƠNG TIỆN CHỞ HÀNG

| Tiêu chí | Nội dung tham số hóa chuẩn Master Template | Ghi chú tác nghiệp hiện trường |
| :--- | :--- | :--- |
| **Địa điểm xếp hàng lên xe chở hàng** | Mã: `[VANNING_LOCATION_CODE]` — Tên: [VANNING_LOCATION_NAME] | Bãi kiểm hóa / Điểm tập kết hàng |
| **Người gửi hàng / Vanning** | **CÔNG TY TNHH GLOBAL SOLUTION SERVICE** | Tầng 18, CEO Tower, Phạm Hùng, Phường Từ Liêm, Hà Nội |
| **Địa chỉ kho xếp hàng thực tế** | [ACTUAL_LOADING_FACTORY_ADDRESS] | Kho nhà máy sản xuất / Đóng hàng |
| **Phương thức chuyên chở** | [TRANSPORT_ROUTE_DESCRIPTION] | Tuyến vận tải đường bộ/đường biển quốc tế |
| **Số hiệu phương tiện (Biển số xe/Container)** | `........................................` *(Ghi số xe/mooc khi bốc hàng xong)* | Cơ chế Late-Binding điền sau |
| **Số niêm chì Hải quan (Customs Seal)** | `........................................` *(Ghi sau khi kẹp chì kiểm hóa)* | Cơ chế Late-Binding điền sau |

---

### PHẦN 3: CHI TIẾT DANH MỤC DÒNG HÀNG XUẤT KHẨU

| STT | Tiêu chí dòng hàng VNACCS | Nội dung tham số hóa chuẩn Master Template | Căn cứ đối chiếu |
| :---: | :--- | :--- | :--- |
| 01 | **Số thứ tự dòng hàng** | `<[ITEM_LINE_NO: 01]>` | Thứ tự dòng hàng trong tờ khai |
| 02 | **Mã số hàng hóa (HS Code)** | `[HS_CODE_8_DIGITS]` | 8 chữ số theo Biểu thuế XNK |
| 03 | **Mô tả hàng hóa chi tiết** | **[COMMODITY_CUSTOMS_NAME] ([COMMODITY_TRADE_NAME]) / [COMMODITY_NAME_VI], quy cách đóng gói: [PACKAGING_SPEC], kích thước thùng: [CARTON_SIZE] mm. Nhà sản xuất: [MANUFACTURER_NAME] (MST: [MANUFACTURER_TAX_CODE]). Hàng mới 100%** | Khớp 100% Sales Contract, Commercial Invoice, Bản tự công bố ATTP / Giấy chứng nhận chất lượng |
| 04 | **Số lượng (1) & Đơn vị tính (1)** | **[QUANTITY_1] [UNIT_1: UNK / THÙNG / CHIẾC]** | Đơn vị số lượng kiện bao gói |
| 05 | **Số lượng (2) & Đơn vị tính (2)** | **[TOTAL_NET_WEIGHT] [UNIT_2: KGM]** | Trọng lượng tịnh (Net Weight) |
| 06 | **Đơn vị tiền tệ hóa đơn** | `[CURRENCY: USD / EUR / VND]` | Đồng tiền thanh toán |
| 07 | **Đơn giá hóa đơn** | `[UNIT_PRICE]` | Đơn giá theo điều kiện giao hàng |
| 08 | **Trị giá hóa đơn** | `[TOTAL_ITEM_AMOUNT]` | Số lượng (1) × Đơn giá |
| 09 | **Trị giá tính thuế** | `[TOTAL_ITEM_CUSTOMS_VALUE]` | Trị giá hải quan |
| 10 | **Thuế suất xuất khẩu** | `[EXPORT_DUTY_RATE: 0%]` | Thuế suất XK theo biểu thuế hiện hành |
| 11 | **Số tiền thuế xuất khẩu** | `0 VND` | Miễn thuế xuất khẩu |
| 12 | **Thuế suất thuế GTGT hàng xuất khẩu** | `0%` | Khoản 1 Điều 9 Thông tư 219/2013/TT-BTC |

---

### PHẦN 4: CAM ĐOAN CỦA DOANH NGHIỆP & XÁC NHẬN CỦA HẢI QUAN CỬA KHẨU

```
Tôi cam đoan những nội dung khai báo trên đây là hoàn toàn đúng sự thật, 
nếu sai tôi xin hoàn toàn chịu trách nhiệm trước pháp luật.

            Hà Nội, Ngày ..... tháng ..... năm 2026
            NGƯỜI KHAI HẢI QUAN / DOANH NGHIỆP XUẤT KHẨU
                  (Ký, đóng dấu hoặc ký số điện tử)




                      NGUYỄN VĂN TRUNG
                          Giám đốc
              CÔNG TY TNHH GLOBAL SOLUTION SERVICE
```

*(Dành riêng cho Cơ quan Hải quan tiếp nhận và kiểm tra)*
- **Kết quả phân luồng tờ khai:** `[ ] Luồng Xanh (1)    [ ] Luồng Vàng (2)    [ ] Luồng Đỏ (3)`
- **Công chức đăng ký tờ khai:** `........................................`
- **Số biên bản bàn giao / Số niêm phong kẹp chì:** `........................................`
