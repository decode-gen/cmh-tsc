# FRM-LOG-01 — TRUCKING WAYBILL MASTER TEMPLATE
## VẬN ĐƠN ĐƯỜNG BỘ NỘI ĐỊA / BẢN LƯU VẬN TẢI (MASTER TEMPLATE)

> **Mã biểu mẫu CMH:** `FRM-LOG-01_TRUCKING_WAYBILL_MASTER_TEMPLATE`  
> **Bộ định dạng SSOT:** `.docx` · `.pdf` · `.md`  
> **Căn cứ nghiệp vụ:** Skill `/cmh-form` · `/cmh-law` · `/cmh-tkhq` · `/cmh-co-form-d`  
> **Chuẩn trình bày:** Khổ ngang A4 Landscape, 1 trang in duy nhất, Pure Black `#000000` (Rule R13).

---

### 1. BẢNG DỮ LIỆU ĐỊNH DANH CÁC BÊN (PARTIES IDENTIFICATION)

| Chỉ tiêu (Field) | Thông tin chi tiết (Template Binding) | Ghi chú quản trị (`/cmh-form`) |
| :--- | :--- | :--- |
| **BÊN GỬI HÀNG (SHIPPER)** | **GLOBAL SOLUTION SERVICE CO., LTD (G-SS CO.,LTD)**<br/>18th Floor, CEO Tower, Plot HH2-1, Me Tri Ha New Urban Area, Pham Hung Street, Tu Liem Ward, Hanoi, Vietnam<br/>Hotline: `+84 966 688 525` \| MST: `0109469047` \| Email: `trungnv.gss@gmail.com` | **Tầng 1 (Cần có):** Cố định SSOT ADN G-SS, không sửa đổi. |
| **ĐƠN VỊ VẬN TẢI (CARRIER)** | **[CARRIER_COMPANY_NAME_EN]**<br/>([CARRIER_COMPANY_NAME_VN])<br/>[CARRIER_ADDRESS]<br/>Hotline: [CARRIER_HOTLINE] \| MST: [CARRIER_TAX_ID] \| Email: [CARRIER_EMAIL] | **Tầng 1 (Cần có):** Nạp động theo pháp nhân nhà xe được chọn. |
| **BÊN NHẬN HÀNG (CONSIGNEE)** | **[CONSIGNEE_COMPANY_NAME]**<br/>ADD: [CONSIGNEE_ADDRESS]<br/>Tax ID: [CONSIGNEE_TAX_ID]<br/>*Delivery Coordination: Via Notify Party / Shipper* | **Tầng 2 (Cần giấu):** Giấu 100% SĐT, email riêng của khách mua ngoại. |
| **BÊN THÔNG BÁO (NOTIFY PARTY)** | **Same as Consignee**<br/>Authorized Representative at Border Gate: Mr/Ms: `.......................................` (+84 `..............................`)<br/>Customs / Border Clearance Contact: `....................................................................................` | **Tầng 3 (Để ngỏ):** Đại diện hiện trường tại cửa khẩu. |

---

### 2. THÔNG SỐ VẬN CHUYỂN & LỘ TRÌNH (ROUTING & FREIGHT)

| Chỉ tiêu (Field) | Chi tiết thực địa (Operational Details) |
| :--- | :--- |
| **Place of receipt / Nơi nhận hàng** | [PLACE_OF_RECEIPT_WAREHOUSE] |
| **TERM / Điều kiện giao hàng** | TERM: [INCOTERMS_DELIVERY_TERM] (INCOTERMS 2020) |
| **Port of discharge / Cửa khẩu xuất** | [DESTINATION_BORDER_GATE] |
| **Place of delivery / Nơi giao hàng** | [FINAL_DELIVERY_DESTINATION] |
| **Border Clearance / Hải quan cửa khẩu** | [CUSTOMS_OFFICE_NAME] (Branch Code: [CUSTOMS_BRANCH_CODE]) |
| **Freight / Cước phí vận tải** | **FREIGHT PREPAID (GSS ACCOUNT)** |

---

### 3. MÔ TẢ HÀNG HÓA & TRỌNG LƯỢNG (COMMODITY MANIFEST)

| COMMODITY / DESCRIPTION OF GOODS | G.W (KGS) | QUANTITY (Carton) | MEASUREMENT (CBM) |
| :--- | :---: | :---: | :---: |
| **[COMMODITY_NAME_EN] ([COMMODITY_NAME_VN])**<br/>• HS Code: **[HS_CODE]** \| Origin: **[ORIGIN_COUNTRY] (ATIGA C/O Form D)**<br/>• Specification: [PACKAGING_SPECIFICATION] (Total: [TOTAL_RETAIL_UNITS])<br/>• Invoice Ref: **[INVOICE_NO]** \| Net Weight: **[NET_WEIGHT] KGS** | [GROSS_WEIGHT] | [TOTAL_CARTONS] | [TOTAL_CBM] |
| **TOTAL / TỔNG CỘNG:** *[TOTAL_WORDS_VIETNAMESE] / [TOTAL_WORDS_ENGLISH]* | **[GROSS_WEIGHT]** | **[TOTAL_CARTONS]** | **[TOTAL_CBM]** |

---

### 4. ĐIỀU KHOẢN VẬN HÀNH & KÝ NHẬN (CARRIER TERMS & SIGNATURE)

```
+-------------------------------------------------------+-------------------------------------------------------------+
|    TERMS & CONDITIONS / ĐIỀU KHOẢN VẬN CHUYỂN BẮT BUỘC|                FOR AND ON BEHALF OF CARRIER                 |
| 1. Hàng hóa giao nhận nguyên đai nguyên kiện kẹp chì. |                   [CARRIER_COMPANY_NAME_EN]                 |
| 2. Vận tải cam kết bảo mật 100% bí mật thương mại.    |                  ([CARRIER_COMPANY_NAME_VN])                |
| 3. Lái xe kiểm đếm số lượng thực tế khi bốc xếp.      |                                                             |
| THÔNG TIN ĐIỀN BỔ SUNG TẠI HIỆN TRƯỜNG / LATE-BINDING: |            Authorized Signature & Official Seal             |
| • Giờ bốc hàng: ....h...., Ngày ..../..../2026        |                   [CARRIER_DIRECTOR_NAME]                   |
| • Số Seal HQ: ................ \| Cân: .......... KGS |                Giám đốc / Managing Director                 |
+-------------------------------------------------------+-------------------------------------------------------------+
```