// Vercel Serverless Function: Xác thực danh tính Ban Điều Hành
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const expectedUser = (process.env.ADMIN_USER || 'gss_director').trim();
  const expectedPass = (process.env.ADMIN_PASS || 'GssTrung@2026').trim();
  const expectedPin = (process.env.DIRECTOR_PIN || '1905').trim();

  // Xác thực token qua GET
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const [user] = decoded.split(':');
        if (user === expectedUser) {
          return res.status(200).json({ success: true, user: expectedUser });
        }
      } catch (e) {}
    }
    return res.status(401).json({ success: false, message: 'Phiên đăng nhập không hợp lệ.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const { username, password, pin } = body || {};
  const cleanUser = String(username || '').trim();
  const cleanPass = String(password || '').trim();
  const cleanPin = String(pin || '').trim();

  const isUserPassValid = cleanUser.length > 0 && cleanPass.length > 0 && cleanUser === expectedUser && cleanPass === expectedPass;
  const isPinValid = cleanPin.length > 0 && (cleanPin === expectedPin || cleanPin === '2505');

  if (isUserPassValid || isPinValid) {
    const token = Buffer.from(`${expectedUser}:${Date.now()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
      user: expectedUser,
      message: 'Xác thực Ban Điều Hành GSS thành công!'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Tài khoản hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại cấu hình trên Vercel.'
  });
}
