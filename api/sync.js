// Vercel Serverless Function: Đồng bộ trạng thái Buồng lái CMH-TSC lên Vercel KV Storage (Upstash Redis)
// Tuân thủ nghiêm ngặt nguyên tắc của Giám đốc: APPEND & UPDATE ONLY (CẤM TUYỆT ĐỐI XÓA MẤT DỮ LIỆU GỐC)

const BASELINE_SUPPLIERS = [
  { id: "SUP_THIEN_LONG", skuCode: "QGG", name: "Thiên Long Phú Thọ", taxId: "5400512548", product: "Snack Quẩy Giòn Giòn", priceIncVat: 363960.00, pricePreVat: 337000.00, quoteUsd: 15.80, vatRate: 0.08, promoBuyBase: 100, promoFreeRate: 0, promoNote: "Chưa áp dụng KM", spec: "22g x 300 cốc/thùng", dimL: 585, dimW: 270, dimH: 497, cbm: 0.0785, dims: "585x270x497 mm", grossWeight: 7.80, netWeight: 6.60, cont45Qty: 817, cont40Qty: 699, howoQty: 994 },
  { id: "SUP_LOI_DAT_MY_DEO_CAY", skuCode: "MDC", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Mỳ dẻo cay", priceIncVat: 359999.64, pricePreVat: 333333.00, quoteUsd: 15.65, vatRate: 0.08, promoBuyBase: 100, promoFreeRate: 8, promoNote: "Mua 100 thùng km 8 thùng", spec: "300 PCS/thùng (~8.18kg)", dimL: 450, dimW: 328, dimH: 189, cbm: 0.0279, dims: "450x328x189 mm", grossWeight: 8.18, netWeight: 7.20, cont45Qty: 2300, cont40Qty: 1962, howoQty: 2795 },
  { id: "SUP_LOI_DAT_MY_CAY", skuCode: "MCT", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Mỳ Cây Thơm Ngon", priceIncVat: 619999.92, pricePreVat: 574074.00, quoteUsd: 25.50, vatRate: 0.08, promoBuyBase: 100, promoFreeRate: 3, promoNote: "Mua 100 thùng km 3 thùng", spec: "500 PCS/thùng (12.85kg)", dimL: 620, dimW: 430, dimH: 400, cbm: 0.1066, dims: "620x430x400 mm", grossWeight: 12.85, netWeight: 11.50, cont45Qty: 585, cont40Qty: 514, howoQty: 688 },
  { id: "SUP_LOI_DAT_XIEN_NUONG", skuCode: "VXN", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Vị Xiên Nướng", priceIncVat: 359999.64, pricePreVat: 333333.00, quoteUsd: 15.65, vatRate: 0.08, promoBuyBase: 100, promoFreeRate: 0, promoNote: "Chưa có KM cố định (Tuỳ chỉnh)", spec: "300 PCS/thùng (~8.85kg)", dimL: 530, dimW: 440, dimH: 310, cbm: 0.0723, dims: "530x440x310 mm", grossWeight: 8.85, netWeight: 7.80, cont45Qty: 876, cont40Qty: 756, howoQty: 1094 },
  { id: "SUP_LOI_DAT_MY_TOM_HUM", skuCode: "MTH", name: "Lợi Đạt Hải Phòng", taxId: "[CHỜ CUNG CẤP]", product: "Snack Lợi Đạt Mỳ Tôm Hùm", priceIncVat: 359999.64, pricePreVat: 333333.00, quoteUsd: 15.65, vatRate: 0.08, promoBuyBase: 100, promoFreeRate: 2, promoNote: "Mua 100 thùng km 2 thùng", spec: "300 PCS/thùng (~8.95kg)", dimL: 530, dimW: 430, dimH: 340, cbm: 0.0775, dims: "530x430x340 mm", grossWeight: 8.95, netWeight: 7.90, cont45Qty: 752, cont40Qty: 648, howoQty: 1033 }
];

function upgradeLoiDatSuppliers(list) {
  if (!Array.isArray(list)) return BASELINE_SUPPLIERS;
  const loiDatUpdates = {
    'SUP_LOI_DAT_MY_DEO_CAY': { priceIncVat: 359999.64, pricePreVat: 333333.00, promoBuyBase: 100, promoFreeRate: 8, promoNote: 'Mua 100 thùng km 8 thùng' },
    'SUP_LOI_DAT_MY_CAY':     { priceIncVat: 619999.92, pricePreVat: 574074.00, promoBuyBase: 100, promoFreeRate: 3, promoNote: 'Mua 100 thùng km 3 thùng' },
    'SUP_LOI_DAT_XIEN_NUONG': { priceIncVat: 359999.64, pricePreVat: 333333.00, promoBuyBase: 100, promoFreeRate: 0, promoNote: 'Chưa có KM cố định (Tuỳ chỉnh)' },
    'SUP_LOI_DAT_MY_TOM_HUM': { priceIncVat: 359999.64, pricePreVat: 333333.00, promoBuyBase: 100, promoFreeRate: 2, promoNote: 'Mua 100 thùng km 2 thùng' }
  };
  return list.map(s => {
    if (!s || !s.id) return s;
    const u = loiDatUpdates[s.id];
    if (u) {
      const oldPre = Number(s.pricePreVat) || 0;
      const isOldPrice = Math.abs(oldPre - 337962.63) < 5 || Math.abs(oldPre - 337963) < 5 || Math.abs(oldPre - 578703.63) < 5 || Math.abs(oldPre - 578704) < 5 || oldPre === 0;
      if (isOldPrice) {
        s.priceIncVat = u.priceIncVat;
        s.pricePreVat = u.pricePreVat;
      }
      if (s.promoBuyBase === undefined || Number(s.promoBuyBase) <= 0) s.promoBuyBase = u.promoBuyBase;
      if (s.promoFreeRate === undefined || s.promoFreeRate === null) s.promoFreeRate = u.promoFreeRate;
      if (!s.promoNote) s.promoNote = u.promoNote;
    } else {
      if (s.promoBuyBase === undefined || Number(s.promoBuyBase) <= 0) s.promoBuyBase = 100;
      if (s.promoFreeRate === undefined || s.promoFreeRate === null) s.promoFreeRate = 0;
    }
    return s;
  });
}

const BASELINE_CARRIERS = [
  { 
    id: "CARRIER_VINH_THANH", 
    name: "Vận Tải Vĩnh Thành (Chính Thức)", 
    taxId: "3200722417", 
    howoRate: 22000000, 
    demHowoDomestic: 2000000, 
    demHowoBorder: 2500000, 
    contLbRate: 22000000,
    contSvnRate: 35000000, 
    contMkdRate: 38000000,
    demContBorder: 2500000,
    freeTimeCont: 48, 
    demCont: 3000000,
    carrierVatRate: 0.08
  },
  { 
    id: "CARRIER_HIEP_MANH", 
    name: "Tập Đoàn Hiệp Mạnh (Dự Phòng)", 
    taxId: "2803082035", 
    howoRate: 22000000, 
    demHowoDomestic: 2000000, 
    demHowoBorder: 2500000, 
    contLbRate: 22000000,
    contSvnRate: 35000000, 
    contMkdRate: 38000000,
    demContBorder: 2500000,
    freeTimeCont: 48, 
    demCont: 3000000,
    carrierVatRate: 0.08
  },
  { 
    id: "CARRIER_DUC_LONG", 
    name: "Đức Long Logistics QL9", 
    taxId: "3001854992", 
    howoRate: 21500000, 
    demHowoDomestic: 1800000, 
    demHowoBorder: 2400000, 
    contLbRate: 21500000,
    contSvnRate: 34500000, 
    contMkdRate: 37500000,
    demContBorder: 2400000,
    freeTimeCont: 48, 
    demCont: 3200000,
    carrierVatRate: 0.08
  },
  { 
    id: "CARRIER_HOANG_HA", 
    name: "Hoàng Hà Container Transit", 
    taxId: "0201948577", 
    howoRate: 23000000, 
    demHowoDomestic: 2000000, 
    demHowoBorder: 2500000, 
    contLbRate: 23000000,
    contSvnRate: 34000000, 
    contMkdRate: 37000000,
    demContBorder: 2500000,
    freeTimeCont: 48, 
    demCont: 3200000,
    carrierVatRate: 0.08
  }
];

const BASELINE_AGENTS = [
  { 
    id: "AGT_BINH_AN", 
    name: "Bình An Logistics (Forwarder Trọn Gói / HQ Lao Bảo)", 
    taxId: "3200727091", 
    desc: "HQ Lao Bảo & C/O Form D (3M) + Biên phòng (1.5M) + Quá cảnh Lào & Bến bãi trọn gói", 
    customsFee: 3000000, 
    coFee: 1000000, 
    borderGuard: 1500000, 
    laoTransitFee: 2000000, 
    inspectionFee: 1000000, 
    inspectionOtFee: 2000000, 
    coExpressFee: 2000000, 
    transitThb: 0,
    fxThbRate: 730,
    laoTransitD8: 4300000, 
    lolo: 2000000,
    vnDocs: 3000000, 
    borderGuardOld: 1500000,
    laoTransit: 4300000 
  },
  { 
    id: "AGT_NGAN_HUNG", 
    name: "Ngân Hùng Logistics (Quá cảnh Lào & Hiện trường)", 
    taxId: "3200854911", 
    desc: "Tờ khai D8/T1 + Áp tải + Kẹp chì Lào (EWEC QL9) & HQ Lao Bảo", 
    customsFee: 3000000, 
    coFee: 1000000, 
    borderGuard: 1500000, 
    laoTransitFee: 2000000, 
    inspectionFee: 1000000, 
    inspectionOtFee: 2000000, 
    coExpressFee: 2000000, 
    transitThb: 16000,
    fxThbRate: 730,
    laoTransitD8: 11680000, 
    lolo: 2000000,
    vnDocs: 3000000, 
    laoTransit: 11680000 
  },
  { 
    id: "AGT_ANH_TAN", 
    name: "Anh Tân (Bãi Savannakhet & Hiện trường)", 
    taxId: "3200984511", 
    desc: "Cẩu bãi hạ cont LOLO + Bãi sang xe Savannakhet Dry Port & Hiện trường", 
    customsFee: 3000000, 
    coFee: 1000000, 
    borderGuard: 1500000, 
    laoTransitFee: 2000000, 
    inspectionFee: 1000000, 
    inspectionOtFee: 2000000, 
    coExpressFee: 2000000, 
    transitThb: 16000,
    fxThbRate: 730,
    laoTransitD8: 11680000, 
    lolo: 2000000,
    vnDocs: 3000000, 
    laoTransit: 11680000 
  }
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
  const STORAGE_KEY = 'CMH_TSC_STATE_SSOT_PROD_V1';

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

    function normalizeCarriersServer(carriersList) {
      const src = Array.isArray(carriersList) && carriersList.length > 0 ? carriersList : BASELINE_CARRIERS;
      const list = src.filter(Boolean).map(c => {
        const base = BASELINE_CARRIERS.find(b => b.id === c.id) || BASELINE_CARRIERS[0];
        const merged = Object.assign({}, base, c);
        merged.howoRate = Number(merged.howoRate) > 0 ? Number(merged.howoRate) : base.howoRate;
        merged.demHowoDomestic = Number.isFinite(Number(merged.demHowoDomestic)) ? Number(merged.demHowoDomestic) : base.demHowoDomestic;
        merged.demHowoBorder = Number.isFinite(Number(merged.demHowoBorder)) ? Number(merged.demHowoBorder) : base.demHowoBorder;
        merged.contLbRate = Number(merged.contLbRate) > 0 ? Number(merged.contLbRate) : merged.howoRate;
        merged.contSvnRate = Number(merged.contSvnRate) > 0 ? Number(merged.contSvnRate) : base.contSvnRate;
        merged.contMkdRate = Number(merged.contMkdRate) > 0 ? Number(merged.contMkdRate) : base.contMkdRate;
        merged.demContBorder = Number.isFinite(Number(merged.demContBorder)) ? Number(merged.demContBorder) : base.demContBorder;
        merged.demCont = Number.isFinite(Number(merged.demCont)) ? Number(merged.demCont) : base.demCont;
        merged.freeTimeCont = Number.isFinite(Number(merged.freeTimeCont)) ? Number(merged.freeTimeCont) : 48;
        merged.carrierVatRate = Number.isFinite(Number(merged.carrierVatRate)) ? Number(merged.carrierVatRate) : 0.08;
        return merged;
      });
      BASELINE_CARRIERS.forEach(baseCar => {
        if (!list.some(c => c.id === baseCar.id)) list.push(Object.assign({}, baseCar));
      });
      return list;
    }

    function normalizeAgentsServer(agentsList) {
      const src = Array.isArray(agentsList) && agentsList.length > 0 ? agentsList : BASELINE_AGENTS;
      const list = src.filter(Boolean).map(a => {
        const base = BASELINE_AGENTS.find(b => b.id === a.id) || BASELINE_AGENTS[0];
        const merged = Object.assign({}, base, a);
        merged.transitThb = Number.isFinite(Number(merged.transitThb)) ? Number(merged.transitThb) : base.transitThb;
        merged.fxThbRate = Number(merged.fxThbRate) > 0 ? Number(merged.fxThbRate) : 730;
        if (Number(merged.laoTransitD8) === 12240000 && merged.transitThb === 16000) {
          merged.laoTransitD8 = 11680000;
          merged.laoTransit = 11680000;
        }
        merged.laoTransitD8 = Number(merged.laoTransitD8) > 0 ? Number(merged.laoTransitD8) : base.laoTransitD8;
        merged.lolo = Number(merged.lolo) > 0 ? Number(merged.lolo) : base.lolo;
        return merged;
      });
      BASELINE_AGENTS.forEach(baseAgt => {
        if (!list.some(a => a.id === baseAgt.id)) list.push(Object.assign({}, baseAgt));
      });
      return list;
    }

    function sanitizeScenarioServer(scn) {
      if (!scn || typeof scn !== 'object') return scn;
      const s = Object.assign({}, scn);
      const terms = s.terms || 'CPT_SVN';
      if (!s.transportRoute) {
        if (terms === 'FCA_LB' || terms === 'DAP_LB') s.transportRoute = 'ROUTE_LAO_BAO';
        else if (terms === 'DAP_MKD' || terms === 'CIP_MKD') s.transportRoute = 'ROUTE_MUKDAHAN';
        else s.transportRoute = 'ROUTE_SAVANNAKHET';
      }
      if (!s.dossierRoute) {
        s.dossierRoute = (s.transportRoute === 'ROUTE_LAO_BAO')
          ? 'DOSSIER_VN_LAO_BAO'
          : (s.transportRoute === 'ROUTE_MUKDAHAN' ? 'DOSSIER_FULL_MUKDAHAN' : 'DOSSIER_FULL_SAVANNAKHET');
      }
      if (s.baselineOverrides && typeof s.baselineOverrides === 'object') {
        const ov = Object.assign({}, s.baselineOverrides);
        if (Number(ov.freight) === 22000000 && s.transportRoute !== 'ROUTE_LAO_BAO') {
          delete ov.freight;
        }
        const totalDemDays = (Number(s.demDomesticDays) || 0) + (Number(s.demBorderDays) || 0) + (Number(s.demContBorderDays) || 0) + (Number(s.demContDays) || 0);
        if (Number(ov.demurrage) === 2500000 && totalDemDays === 0) {
          delete ov.demurrage;
        }
        if (Number(ov.laoTransit) === 12240000) {
          delete ov.laoTransit;
        }
        s.baselineOverrides = ov;
      }
      return s;
    }

    function upgradeDefaultScenarioToCont45Svn(scenariosList) {
      if (!Array.isArray(scenariosList) || scenariosList.length === 0) return scenariosList || [];
      const targetDefId = 'SCN-CPT_SVN-CONT45-1000T-VT-DIX-260905-LAO';
      const oldDefId = 'SCN-FCA_LB-HOWO-1300T-VT-DIX-269901';
      const list = scenariosList.filter(Boolean).map(s => sanitizeScenarioServer(s));
      const curDef = list.find(s => s.isDefault);
      if (!curDef || curDef.id === oldDefId) {
        list.forEach(s => {
          s.isDefault = (s.id === targetDefId);
          if (s.id === targetDefId) {
            s.terms = s.terms || 'CPT_SVN';
            s.vehicle = s.vehicle || 'CONT_45HC';
            s.transportRoute = s.transportRoute || 'ROUTE_SAVANNAKHET';
            s.dossierRoute = s.dossierRoute || 'DOSSIER_FULL_SAVANNAKHET';
          }
          if (s.id === oldDefId) {
            s.isCompletedOrder = true;
          }
        });
      }
      const defIdx = list.findIndex(s => s.isDefault);
      if (defIdx > 0) {
        const [defItem] = list.splice(defIdx, 1);
        list.unshift(defItem);
      }
      return list;
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
    
    // Nếu KV chưa có dữ liệu, tự động khởi tạo bằng bộ SSOT Chuẩn
    if (!cloudState || !Array.isArray(cloudState.suppliers) || cloudState.suppliers.length === 0) {
      cloudState = {
        suppliers: BASELINE_SUPPLIERS,
        carriers: BASELINE_CARRIERS,
        agents: BASELINE_AGENTS,
        scenarios: [],
        activeScenarioId: 'SCN-CPT_SVN-CONT45-1000T-VT-DIX-260905-LAO',
        updatedAt: new Date().toISOString(),
        updatedBy: 'System Auto-Init (SSOT Production)'
      };
      await writeKvState(cloudState);
    } else {
      cloudState.suppliers = upgradeLoiDatSuppliers(cloudState.suppliers);
      cloudState.carriers = normalizeCarriersServer(cloudState.carriers);
      cloudState.agents = normalizeAgentsServer(cloudState.agents);
      if (Array.isArray(cloudState.scenarios)) {
        cloudState.scenarios = upgradeDefaultScenarioToCont45Svn(cloudState.scenarios);
      }
      if (!cloudState.activeScenarioId || cloudState.activeScenarioId === 'SCN-FCA_LB-HOWO-1300T-VT-DIX-269901') {
        cloudState.activeScenarioId = 'SCN-CPT_SVN-CONT45-1000T-VT-DIX-260905-LAO';
      }
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
    const existingSuppliers = Array.isArray(existing.suppliers) && existing.suppliers.length > 0 
      ? existing.suppliers 
      : BASELINE_SUPPLIERS;
    const incomingSuppliers = Array.isArray(incoming.suppliers) ? incoming.suppliers : [];
    const mergedSuppliers = [...incomingSuppliers];

    existingSuppliers.forEach(oldSup => {
      const idx = mergedSuppliers.findIndex(s => s.id === oldSup.id);
      if (idx === -1) {
        mergedSuppliers.push(oldSup);
      } else {
        mergedSuppliers[idx] = Object.assign({}, oldSup, mergedSuppliers[idx]);
      }
    });

    BASELINE_SUPPLIERS.forEach(baseSup => {
      const exists = mergedSuppliers.some(s => s.id === baseSup.id);
      if (!exists) {
        mergedSuppliers.push(baseSup);
      }
    });
    const finalSuppliers = upgradeLoiDatSuppliers(mergedSuppliers);
    mergedSuppliers.splice(0, mergedSuppliers.length, ...finalSuppliers);

    // 2. Hợp nhất Nhà xe (Carriers) - CẤM XÓA
    const existingCarriers = Array.isArray(existing.carriers) && existing.carriers.length > 0
      ? existing.carriers
      : BASELINE_CARRIERS;
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

    BASELINE_CARRIERS.forEach(baseCar => {
      if (!mergedCarriers.some(c => c.id === baseCar.id)) {
        mergedCarriers.push(baseCar);
      }
    });

    // 3. Hợp nhất Đại lý (Agents) - CẤM XÓA
    const existingAgents = Array.isArray(existing.agents) && existing.agents.length > 0
      ? existing.agents
      : BASELINE_AGENTS;
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

    BASELINE_AGENTS.forEach(baseAgt => {
      if (!mergedAgents.some(a => a.id === baseAgt.id)) {
        mergedAgents.push(baseAgt);
      }
    });

    // 4. Hợp nhất Kịch bản (Scenarios) - Có phân quyền xóa cho Giám đốc bằng mã xác thực (Hash SHA-256 hoặc PIN)
    const expectedPin = process.env.EXECUTIVE_PIN || process.env.DIRECTOR_PIN || '2505';
    const expectedPinHash = '9060ce5653093cd9bff480cb01ff0e3a790e6f545e214a3dd85841daabac7848';
    const superPinHash = '56a3a46a3ba4fb713fd3e4cfa51a5748abf2c2662fefb0b5a863fdef34572255';
    const incomingPin = String(incoming.adminPin || incoming.pin || '').trim();
    const isAuthorizedAdmin = (
      incomingPin === expectedPinHash ||
      incomingPin === superPinHash ||
      incomingPin === expectedPin ||
      incomingPin === '2505'
    );
    let mergedScenarios;

    if (isAuthorizedAdmin) {
      // Khi Giám đốc xác thực quyền Admin, cho phép áp dụng danh sách mới (xóa kịch bản trên Cloud)
      mergedScenarios = Array.isArray(incoming.scenarios) ? [...incoming.scenarios] : [];
    } else {
      // Chế độ bảo vệ mặc định: Append & Update Only (Cấm xóa mất kịch bản)
      const existingScenarios = Array.isArray(existing.scenarios) ? existing.scenarios : [];
      const incomingScenarios = Array.isArray(incoming.scenarios) ? incoming.scenarios : [];
      mergedScenarios = [...incomingScenarios];
      existingScenarios.forEach(oldScn => {
        const idx = mergedScenarios.findIndex(s => s.id === oldScn.id);
        if (idx === -1) {
          mergedScenarios.push(oldScn);
        } else {
          mergedScenarios[idx] = Object.assign({}, oldScn, mergedScenarios[idx]);
        }
      });
    }

    mergedScenarios = upgradeDefaultScenarioToCont45Svn(mergedScenarios);
    let resolvedActiveScnId = incoming.activeScenarioId || existing.activeScenarioId || 'SCN-CPT_SVN-CONT45-1000T-VT-DIX-260905-LAO';

    const normalizedCarriers = normalizeCarriersServer(mergedCarriers);
    const normalizedAgents = normalizeAgentsServer(mergedAgents);

    // 5. Hợp nhất Sổ cái Đơn hàng đã chốt (Locked Orders Ledger) - CẤM XÓA
    const existingLockedOrders = Array.isArray(existing.lockedOrders) ? existing.lockedOrders : [];
    const incomingLockedOrders = Array.isArray(incoming.lockedOrders) ? incoming.lockedOrders : [];
    const mergedLockedOrders = [...incomingLockedOrders];
    existingLockedOrders.forEach(oldOrd => {
      if (!mergedLockedOrders.some(o => o.contractNo === oldOrd.contractNo)) {
        mergedLockedOrders.push(oldOrd);
      }
    });

    const finalState = {
      suppliers: mergedSuppliers,
      carriers: normalizedCarriers,
      agents: normalizedAgents,
      scenarios: mergedScenarios,
      lockedOrders: mergedLockedOrders,
      activeScenarioId: resolvedActiveScnId,
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
