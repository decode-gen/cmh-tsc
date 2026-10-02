# ASEAN TRADE IN GOODS AGREEMENT (ATIGA)
## CERTIFICATE OF ORIGIN — FORM D (13 BOXES)
### (MASTER TEMPLATE — MÃ BIỂU MẪU: FRM-COD-01)

> **Căn cứ pháp lý:** Hiệp định Thương mại Hàng hóa ASEAN (ATIGA), Thông tư số 22/2016/TT-BCT và Thông tư số 10/2022/TT-BCT của Bộ Công Thương.  
> **Nguyên tắc kế thừa SSOT:** Kế thừa 100% bản chốt 13 Box chuẩn ATIGA từ hồ sơ xuất khẩu thực tế.  
> **Quy tắc bảo toàn:** Giữ cố định pháp nhân G-SS (MST 0109469047, CEO Tower, Tu Liem Ward, Người ký Box 11: NGUYEN VAN TRUNG — Director). Toàn bộ dữ liệu đơn hàng được tham số hóa thành `[TÊN_THAM_SỐ]`.  
> ⛔ **QUY TẮC BẤT DI BẤT DỊCH (FAIL-STOP LOCK):**  
> 1. Box 2: Ghi đúng tên nước nhập khẩu ASEAN (Tuyệt đối KHÔNG ghi tên nước quá cảnh).  
> 2. Box 7: Tuyệt đối KHÔNG ghi dòng Third Country Invoicing (TCI) nếu là giao dịch bán hàng trực tiếp 2 bên.  
> 3. Box 13: Tuyệt đối KHÔNG tích `Issued Retroactively` nếu cấp trong thời hạn 03 ngày kể từ ngày khởi hành.

---

### BẢNG QUẢN TRỊ 13 Ô (BOX 1 ĐẾN BOX 13) CHUẨN FORM D

| Ô (Box) | Tiêu đề nghiệp vụ quốc tế | Nội dung tham số hóa chuẩn Master Template | Căn cứ đối chiếu & Ràng buộc pháp lý |
| :---: | :--- | :--- | :--- |
| **Header** | **Reference No.** | `Reference No.: [CO_REFERENCE_NO: VN-XX YY/ZZ/NNNNN]` *(Bản nháp: `DRAFT`)* | Số tham chiếu do eCoSys (Bộ Công Thương / VCCI) cấp tự động |
| **Box 1** | **Goods Consigned from**<br>*(Exporter's business name, address, country)* | **GLOBAL SOLUTION SERVICE COMPANY LIMITED (G-SS CO., LTD)**<br>Floor 18, CEO Tower, Plot HH2-1, Me Tri Ha New Urban Area, Pham Hung Street, Tu Liem Ward, Hanoi City, Viet Nam.<br>Tax Code: 0109469047 | Khớp 100% ĐKKD SSOT của G-SS (.agents/enterprise-adn.json). Cấm dùng địa giới hành chính cũ. |
| **Box 2** | **Goods Consigned to**<br>*(Consignee's name, address, country)* | **[CONSIGNEE_COMPANY_NAME]**<br>[CONSIGNEE_OFFICIAL_ADDRESS]<br>[CONSIGNEE_COUNTRY_NAME]<br>Tax ID: [CONSIGNEE_TAX_CODE]<br>Attn: [CONSIGNEE_AUTHORIZED_PERSON] | Khớp 100% Bên Mua trong Sales Contract & Commercial Invoice. Phải là quốc gia trong khối ASEAN. |
| **Box 3** | **Means of transport and route**<br>*(as far as known)* | `Departure date: [DEPARTURE_DATE]`<br>`[TRANSPORT_MODE: BY TRUCK / BY VESSEL / BY AIR]`<br>`Route: From [PORT_OR_BORDER_OF_LOADING] (Vietnam) to [PORT_OR_BORDER_OF_DISCHARGE] ([CONSIGNEE_COUNTRY_NAME]) via [TRANSIT_COUNTRY_IF_ANY]` | Hành trình thực tế. Tuyến đường bộ ghi rõ cửa khẩu xuất và cửa khẩu đích đến. Không ghi số biển xe. |
| **Box 4** | **For Official Use** | `Preferential Treatment Given Under ASEAN Trade in Goods Agreement`<br>*(Để trống toàn bộ phần xác nhận khi xuất khẩu — Dành riêng cho Hải quan nước nhập khẩu)* | Dành cho Cơ quan Hải quan nước nhập khẩu ghi nhận ưu đãi thuế quan ATIGA khi thông quan. |
| **Box 5** | **Item number** | `[ITEM_NO: 1]` | Số thứ tự dòng hàng (1, 2, 3...) tương ứng danh mục hàng xuất khẩu. |
| **Box 6** | **Marks and numbers on packages** | `[MARKS_AND_NUMBERS: NO MARK]` | Ký mã hiệu ghi trên bao bì thùng hàng. Mặc định `NO MARK` nếu không có tem riêng. |
| **Box 7** | **Number and type of packages, description of goods, HS code** | **[COMMODITY_CUSTOMS_NAME] ([COMMODITY_TRADE_NAME_EN]) / [COMMODITY_NAME_VI]**<br>Packing: [PACKAGING_SPEC]<br>Carton size: [CARTON_SIZE] mm<br>Quantity: **[TOTAL_PACKAGES] [PACKAGE_TYPE: BOXES / CARTONS / BAGS]**<br>HS Code: **[HS_CODE_IMPORTING_COUNTRY]**<br>*(LƯỢC BỎ DÒNG TCI VÌ GIAO DỊCH TRỰC TIẾP)* | 1) Khớp 100% tên hàng, quy cách và số kiện trong Sales Contract & Packing List.<br>2) **TRIỆT TIÊU BẪY TCI:** Giao dịch trực tiếp tuyệt đối không ghi dòng bên thứ 3. |
| **Box 8** | **Origin criterion** | **[ORIGIN_CRITERION: CTH / WO / RVC 40% / CTSH / SP]** | Tiêu chí xuất xứ theo Quy tắc cụ thể mặt hàng ATIGA (PSR). Thực phẩm chế biến mặc định `CTH`. |
| **Box 9** | **Gross weight or other quantity, and value (FOB)** | **[TOTAL_GROSS_WEIGHT] KILOGRAMS** *([TOTAL_GROSS_WEIGHT] KGM)*<br>*(Net Weight: [TOTAL_NET_WEIGHT] KGM)*<br>*(FOB Value: USD [FOB_VALUE] — Chỉ bắt buộc khi áp dụng RVC)* | Khớp 100% với Packing List, Commercial Invoice và Tờ khai Hải quan B11 thực xuất. |
| **Box 10** | **Number and date of invoices** | **Invoice No.: [COMMERCIAL_INVOICE_NO]**<br>**Date: [COMMERCIAL_INVOICE_DATE]** | Khớp 100% Commercial Invoice phát hành chính thức của lô hàng. |
| **Box 11** | **Declaration by the exporter** | Produced in: **VIET NAM**<br>Exported to: **[CONSIGNEE_COUNTRY_NAME_UPPERCASE]**<br>Place and date: **HA NOI, [DECLARATION_DATE]**<br>Authorized Signatory: **NGUYEN VAN TRUNG — Director**<br>**GLOBAL SOLUTION SERVICE CO., LTD** | Cam đoan xuất xứ hàng hóa. Quốc gia đích đến bắt buộc là thành viên ASEAN. |
| **Box 12** | **Certification by Authority** | Place and date: **HA NOI, [CERTIFICATION_DATE]**<br>Certifying authority: **[CERTIFYING_AUTHORITY: VCCI / MOIT IMPORT-EXPORT MANAGEMENT OFFICE]** | Xác nhận, đóng dấu và ký tên (hoặc cấp dấu điện tử) của Tổ chức cấp C/O thẩm quyền tại VN. |
| **Box 13** | **Additional declaration (Tick boxes)** | ☐ Third Country Invoicing: `[ ]`<br>☐ Issued Retroactively: `[ ]`<br>☐ Accumulation: `[ ]`<br>☐ Exhibition: `[ ]`<br>☐ De Minimis: `[ ]`<br>☐ Back-to-Back CO: `[ ]` | Quản trị cờ đánh dấu theo bản chất lô hàng. Xuất trực tiếp và cấp đúng hạn thì để trống toàn bộ. |
