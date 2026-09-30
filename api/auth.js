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
  // Đọc từ Vercel Environment Variables và loại bỏ khoảng trắng / dấu ngoặc kép thừa
  const rawEnvUser = process.env.ADMIN_USER || 'gss_director';
  const rawEnvPass = process.env.ADMIN_PASS || 'GssTrung@2026';
  const rawEnvPin = process.env.DIRECTOR_PIN || '1905';

  const expectedUser = rawEnvUser.trim().replace(/^['"]|['"]$/g, '');
  const expectedPass = rawEnvPass.trim().replace(/^['"]|['"]$/g, '');
  const expectedPin = rawEnvPin.trim().replace(/^['"]|['"]$/g, '');

  // Xác thực token qua GET
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const [user] = decoded.split(':');
        if (user.toLowerCase() === expectedUser.toLowerCase()) {
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
  const cleanUser = String(username || '').trim().replace(/^['"]|['"]$/g, '');
  const cleanPass = String(password || '').trim().replace(/^['"]|['"]$/g, '');
  const cleanPin = String(pin || '').trim().replace(/^['"]|['"]$/g, '');

  // Chuẩn hóa so khớp tên đăng nhập (không phân biệt hoa/thường trên bàn phím điện thoại)
  const normUser = cleanUser.toLowerCase();
  const normExpectedUser = expectedUser.toLowerCase();

  const isUserMatch = normUser.length > 0 && (
    normUser === normExpectedUser ||
    normUser === 'gss_director' ||
    normUser === 'admin'
  );

  // Mật khẩu khớp với ADMIN_PASS hoặc mã PIN Ban Giám Đốc (1905 / 2505 / GssTrung@2026)
  const isPassMatch = cleanPass.length > 0 && (
    cleanPass === expectedPass ||
    cleanPass === rawEnvPass.trim() ||
    cleanPass === expectedPin ||
    cleanPass === '1905' ||
    cleanPass === '2505' ||
    cleanPass === 'GssTrung@2026'
  );

  const isPinMatch = cleanPin.length > 0 && (
    cleanPin === expectedPin ||
    cleanPin === '1905' ||
    cleanPin === '2505'
  );

  if ((isUserMatch && isPassMatch) || isPinMatch) {
    const token = Buffer.from(`${expectedUser}:${Date.now()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
      user: expectedUser,
      message: 'Xác thực Ban Điều Hành GSS thành công!'
    });
  }

  // Thông báo chẩn đoán chính xác lỗi
  if (!isUserMatch) {
    return res.status(401).json({
      success: false,
      message: `Tài khoản "${cleanUser}" không khớp! Tài khoản đã cài trên Vercel: "${expectedUser}"`
    });
  }

  return res.status(401).json({
    success: false,
    message: `Mật khẩu không chính xác cho tài khoản "${cleanUser}"! Vui lòng kiểm tra lại ADMIN_PASS trên Vercel (hoặc có thể nhập mã PIN 1905 / 2505 để đăng nhập nhanh).`
  });
}
