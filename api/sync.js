// Vercel Serverless Function: Đồng bộ trạng thái Buồng lái CMH-TSC lên Vercel KV Storage
// Tuân thủ nghiêm ngặt nguyên tắc của Giám đốc: APPEND & UPDATE ONLY (CẤM TUYỆT ĐỐI XÓA MẤT DỮ LIỆU GỐC)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  const STORAGE_KEY = 'CMH_TSC_STATE_SSOT_V1';

  async function readKvState() {
    if (!kvUrl || !kvToken) return null;
    try {
      const resp = await fetch(`${kvUrl}/get/${STORAGE_KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      if (!data || data.result === null || data.result === undefined) return null;
      const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      return parsed;
    } catch (e) {
      console.error("KV read error:", e);
      return null;
    }
  }

  async function writeKvState(stateObj) {
    if (!kvUrl || !kvToken) return false;
    try {
      const resp = await fetch(`${kvUrl}/set/${STORAGE_KEY}`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${kvToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(typeof stateObj === 'string' ? stateObj : JSON.stringify(stateObj))
      });
      return resp.ok;
    } catch (e) {
      console.error("KV write error:", e);
      return false;
    }
  }

  if (req.method === 'GET') {
    if (!kvUrl || !kvToken) {
      return res.status(200).json({
        success: false,
        kvConnected: false,
        message: 'Vercel KV Storage chưa được kết nối trên Vercel Dashboard.'
      });
    }

    const cloudState = await readKvState();
    return res.status(200).json({
      success: true,
      kvConnected: true,
      state: cloudState,
      updatedAt: cloudState?.updatedAt || null
    });
  }

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

    const existing = (await readKvState()) || {};

    // 1. Hợp nhất Nhà cung cấp (Suppliers) - CẤM XÓA
    const existingSuppliers = Array.isArray(existing.suppliers) ? existing.suppliers : [];
    const incomingSuppliers = Array.isArray(incoming.suppliers) ? incoming.suppliers : [];
    const mergedSuppliers = [...incomingSuppliers];

    existingSuppliers.forEach(oldSup => {
      const exists = mergedSuppliers.some(s => s.id === oldSup.id);
      if (!exists) {
        mergedSuppliers.push(oldSup);
      }
    });

    // 2. Hợp nhất Nhà xe (Carriers) - CẤM XÓA
    const existingCarriers = Array.isArray(existing.carriers) ? existing.carriers : [];
    const incomingCarriers = Array.isArray(incoming.carriers) ? incoming.carriers : [];
    const mergedCarriers = [...incomingCarriers];
    existingCarriers.forEach(oldCar => {
      if (!mergedCarriers.some(c => c.id === oldCar.id)) {
        mergedCarriers.push(oldCar);
      }
    });

    // 3. Hợp nhất Đại lý (Agents) - CẤM XÓA
    const existingAgents = Array.isArray(existing.agents) ? existing.agents : [];
    const incomingAgents = Array.isArray(incoming.agents) ? incoming.agents : [];
    const mergedAgents = [...incomingAgents];
    existingAgents.forEach(oldAgt => {
      if (!mergedAgents.some(a => a.id === oldAgt.id)) {
        mergedAgents.push(oldAgt);
      }
    });

    // 4. Hợp nhất Kịch bản (Scenarios) - CẤM XÓA
    const existingScenarios = Array.isArray(existing.scenarios) ? existing.scenarios : [];
    const incomingScenarios = Array.isArray(incoming.scenarios) ? incoming.scenarios : [];
    const mergedScenarios = [...incomingScenarios];
    existingScenarios.forEach(oldScn => {
      if (!mergedScenarios.some(s => s.id === oldScn.id)) {
        mergedScenarios.push(oldScn);
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
