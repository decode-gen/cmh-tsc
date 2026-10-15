// Vercel Serverless Function: Đồng bộ trạng thái Buồng lái CMH-TSC lên Vercel KV Storage (Upstash Redis)
// Tuân thủ nghiêm ngặt nguyên tắc của Giám đốc: APPEND & UPDATE ONLY (CẤM TUYỆT ĐỐI XÓA MẤT DỮ LIỆU GỐC)

const BASELINE_SUPPLIERS = [
  { id: "SUP_THIEN_LONG", name: "Thiên Long Phú Thọ", taxId: "5400512548", product: "Snack Quẩy Giòn Giòn", pricePreVat: 337000, vatRate: 0.08, spec: "22g x 300 cốc/thùng", cbm: 0.0785, dims: "585x270x497 mm", cont45Qty: 1000, cont40Qty: 800, howoQty: 1300 },
  { id: "SUP_LOI_DAT_MY_DEO_CAY", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Mỳ dẻo cay", pricePreVat: 337963, vatRate: 0.08, spec: "300 PCS/thùng (~8.18kg)", cbm: 0.0279, dims: "450x328x189 mm", cont45Qty: 2814, cont40Qty: 2250, howoQty: 3650 },
  { id: "SUP_LOI_DAT_MY_CAY", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Mỳ Cây Thơm Ngon", pricePreVat: 578704, vatRate: 0.08, spec: "500 PCS/thùng (12.85kg)", cbm: 0.1066, dims: "620x430x400 mm", cont45Qty: 736, cont40Qty: 580, howoQty: 950 },
  { id: "SUP_LOI_DAT_XIEN_NUONG", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Vị Xiên Nướng", pricePreVat: 337963, vatRate: 0.08, spec: "300 PCS/thùng (~8.85kg)", cbm: 0.0723, dims: "530x440x310 mm", cont45Qty: 1086, cont40Qty: 850, howoQty: 1400 },
  { id: "SUP_LOI_DAT_MY_TOM_HUM", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Mỳ Tôm Hùm", pricePreVat: 337963, vatRate: 0.08, spec: "300 PCS/thùng (~8.95kg)", cbm: 0.0775, dims: "530x430x340 mm", cont45Qty: 1013, cont40Qty: 800, howoQty: 1300 }
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Quét URL và Token Vercel KV / Upstash Redis
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const STORAGE_KEY = 'CMH_TSC_STATE_SSOT_V2';

  // Helper đọc từ KV qua REST (Xử lý an toàn chuỗi JSON lồng nhau)
  async function readKvState() {
    if (!kvUrl || !kvToken) return null;
    try {
      const resp = await fetch(`${kvUrl}/get/${STORAGE_KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      if (!data || data.result === null || data.result === undefined) return null;
      
      let parsed = data.result;
      while (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch (e) {
          break;
        }
      }
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch (e) {
      console.error("KV read error:", e);
      return null;
    }
  }

  // Helper ghi vào KV qua REST
  async function writeKvState(stateObj) {
    if (!kvUrl || !kvToken) return false;
    try {
      const jsonStr = typeof stateObj === 'string' ? stateObj : JSON.stringify(stateObj);
      const resp = await fetch(`${kvUrl}/set/${STORAGE_KEY}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonStr)
      });
      return resp.ok;
    } catch (e) {
      console.error("KV write error:", e);
      return false;
    }
  }

  // GET: Trả về trạng thái Cloud mới nhất
  if (req.method === 'GET') {
    if (!kvUrl || !kvToken) {
      return res.status(200).json({
        success: false,
        kvConnected: false,
        message: 'Vercel KV Storage chưa được kết nối trên Vercel Dashboard.'
      });
    }

    let cloudState = await readKvState();
    
    // Nếu KV chưa có dữ liệu, tự động khởi tạo bằng BASELINE_SUPPLIERS
    if (!cloudState || !Array.isArray(cloudState.suppliers) || cloudState.suppliers.length === 0) {
      cloudState = {
        suppliers: BASELINE_SUPPLIERS,
        carriers: [],
        agents: [],
        scenarios: [],
        updatedAt: new Date().toISOString(),
        updatedBy: 'System Auto-Init'
      };
      await writeKvState(cloudState);
    }

    return res.status(200).json({
      success: true,
      kvConnected: true,
      state: cloudState,
      updatedAt: cloudState?.updatedAt || null
    });
  }

  // POST: Đồng bộ và Lưu trạng thái mới
  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }

    const incoming = body || {};

    if (!kvUrl || !kvToken) {
      return res.status(200).json({
        success: false,
        kvConnected: false,
        message: 'Vercel KV Storage chưa kết nối. Dữ liệu đang được lưu cục bộ trên máy của bạn.',
        state: incoming
      });
    }

    // Đọc trạng thái hiện có trên Cloud
    const existing = (await readKvState()) || {};

    // ============================================================
    // THUẬT TOÁN BẢO VỆ CHỈ ĐẠO CỦA GIÁM ĐỐC: "CHỈ DUY NHẤT VIỆC XÓA LÀ KHÔNG ĐƯỢC"
    // (IMMUTABLE MERGE: UPDATE & APPEND ONLY - CẤM TUYỆT ĐỐI XÓA MẤT)
    // ============================================================

    // 1. Hợp nhất Nhà cung cấp (Suppliers):
    // Phải luôn bảo toàn 100% BASELINE_SUPPLIERS và tất cả NCC đã từng tồn tại trên Cloud
    const existingSuppliers = Array.isArray(existing.suppliers) && existing.suppliers.length > 0 
      ? existing.suppliers 
      : BASELINE_SUPPLIERS;
    const incomingSuppliers = Array.isArray(incoming.suppliers) ? incoming.suppliers : [];

    // Danh sách ban đầu lấy từ incoming (cập nhật thông số mới nhất mà Giám đốc vừa sửa)
    const mergedSuppliers = [...incomingSuppliers];

    // Khôi phục lại toàn bộ NCC từ existing nếu bị thiếu trên incoming (ngăn chặn hành vi bấm xóa trên UI)
    existingSuppliers.forEach(oldSup => {
      const idx = mergedSuppliers.findIndex(s => s.id === oldSup.id);
      if (idx === -1) {
        // Tự động khôi phục lại bản ghi bị thiếu
        mergedSuppliers.push(oldSup);
      } else {
        // Cập nhật các trường, giữ lại các thông số cấu trúc
        mergedSuppliers[idx] = Object.assign({}, oldSup, mergedSuppliers[idx]);
      }
    });

    // Đảm bảo 5 sản phẩm cốt lõi luôn luôn có mặt
    BASELINE_SUPPLIERS.forEach(baseSup => {
      const exists = mergedSuppliers.some(s => s.id === baseSup.id);
      if (!exists) {
        mergedSuppliers.push(baseSup);
      }
    });

    // 2. Hợp nhất Nhà xe (Carriers) - CẤM XÓA
    const existingCarriers = Array.isArray(existing.carriers) ? existing.carriers : [];
    const incomingCarriers = Array.isArray(incoming.carriers) ? incoming.carriers : [];
    const mergedCarriers = [...incomingCarriers];
    existingCarriers.forEach(oldCar => {
      const idx = mergedCarriers.findIndex(c => c.id === oldCar.id);
      if (idx === -1) {
        mergedCarriers.push(oldCar);
      } else {
        mergedCarriers[idx] = Object.assign({}, oldCar, mergedCarriers[idx]);
      }
    });

    // 3. Hợp nhất Đại lý (Agents) - CẤM XÓA
    const existingAgents = Array.isArray(existing.agents) ? existing.agents : [];
    const incomingAgents = Array.isArray(incoming.agents) ? incoming.agents : [];
    const mergedAgents = [...incomingAgents];
    existingAgents.forEach(oldAgt => {
      const idx = mergedAgents.findIndex(a => a.id === oldAgt.id);
      if (idx === -1) {
        mergedAgents.push(oldAgt);
      } else {
        mergedAgents[idx] = Object.assign({}, oldAgt, mergedAgents[idx]);
      }
    });

    // 4. Hợp nhất Kịch bản (Scenarios) - CẤM XÓA
    const existingScenarios = Array.isArray(existing.scenarios) ? existing.scenarios : [];
    const incomingScenarios = Array.isArray(incoming.scenarios) ? incoming.scenarios : [];
    const mergedScenarios = [...incomingScenarios];
    existingScenarios.forEach(oldScn => {
      const idx = mergedScenarios.findIndex(s => s.id === oldScn.id);
      if (idx === -1) {
        mergedScenarios.push(oldScn);
      } else {
        mergedScenarios[idx] = Object.assign({}, oldScn, mergedScenarios[idx]);
      }
    });

    const finalState = {
      suppliers: mergedSuppliers,
      carriers: mergedCarriers,
      agents: mergedAgents,
      scenarios: mergedScenarios,
      activeScenarioId: incoming.activeScenarioId || existing.activeScenarioId || null,
      updatedAt: new Date().toISOString(),
      updatedBy: 'GSS Director (Solo-Operator)'
    };

    const savedOk = await writeKvState(finalState);

    return res.status(200).json({
      success: savedOk,
      kvConnected: true,
      state: finalState,
      message: savedOk 
        ? '✅ Đã đồng bộ an toàn lên Vercel KV Cloud (Toàn bộ dữ liệu được bảo vệ vĩnh viễn, không bị xóa)!'
        : '⚠️ Không thể ghi dữ liệu lên Vercel KV, vui lòng kiểm tra kết nối.'
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
