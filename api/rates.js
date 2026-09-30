// Vercel Serverless Function: Proxy tỷ giá an toàn & cache trên Edge CDN
export default async function handler(req, res) {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'User-Agent': 'CMH-TSC/4.0' }
    });
    
    if (!response.ok) {
      throw new Error(`Open Exchange Rates API status: ${response.status}`);
    }

    const data = await response.json();
    const rawVnd = data?.rates?.VND || 25790;
    const rawThb = data?.rates?.THB || 33.59;

    // Chiết khấu dự phòng rủi ro 250 VND theo chuẩn quản trị CMH-TSC
    const safeVnd = Math.round(rawVnd - 250);
    const safeThb = Number((rawThb * 0.98).toFixed(2));
    const safeThbVnd = Math.round(safeVnd / rawThb);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      rates: {
        rawUsdVnd: rawVnd,
        safeUsdVnd: safeVnd,
        rawUsdThb: rawThb,
        safeUsdThb: safeThb,
        safeThbVnd: safeThbVnd,
        discount: 250,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Rates fetch error:", error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: false,
      fallback: true,
      rates: {
        rawUsdVnd: 25790,
        safeUsdVnd: 25540,
        rawUsdThb: 33.59,
        safeUsdThb: 32.92,
        safeThbVnd: 760,
        discount: 250,
        updatedAt: new Date().toISOString()
      },
      error: error.message
    });
  }
}
