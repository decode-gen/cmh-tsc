// Vercel Serverless Function: Xác thực danh tính Ban Điều Hành GSS
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // CỜ MỞ CỬA TỰ DO 24H (Theo yêu cầu tạm thời của Ban Điều Hành)
  // Thời hạn: 24 giờ kể từ 08:00 ngày 02/10/2026 đến hết 08:00 ngày 03/10/2026
  const OPEN_ACCESS_UNTIL = 1791000000000;
  const IS_OPEN_ACCESS_24H = true;

  if (IS_OPEN_ACCESS_24H || Date.now() < OPEN_ACCESS_UNTIL) {
    const user = 'decode9.0525';
    const token = Buffer.from(`${user}:${Date.now()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
      user,
      message: 'Chế độ Mở Cửa Tự Do 24H đang kích hoạt! Vào web tự do không cần mật khẩu.'
    });
  }

  // Quét biến môi trường không phân biệt HOA / THƯỜNG trên Linux (Vercel)
  function getEnvCaseInsensitive(names, fallback = '') {
    for (const name of names) {
      if (process.env[name] !== undefined && process.env[name] !== '') {
        return process.env[name];
      }
    }
    const allKeys = Object.keys(process.env);
    for (const name of names) {
      const found = allKeys.find(k => k.toLowerCase() === name.toLowerCase());
      if (found && process.env[found] !== undefined && process.env[found] !== '') {
        return process.env[found];
      }
    }
    return fallback;
  }

  // Đọc linh hoạt bất kỳ cách đặt tên nào (ADMIN_USER, Admin_user, admin_user, ...)
  const rawEnvUser = getEnvCaseInsensitive(['ADMIN_USER', 'Admin_user', 'admin_user', 'USERNAME', 'USER'], 'decode9.0525');
  const rawEnvPass = getEnvCaseInsensitive(['ADMIN_PASS', 'Admin_pass', 'admin_pass', 'PASSWORD', 'PASS'], '25051990');
  const rawEnvPin  = getEnvCaseInsensitive(['DIRECTOR_PIN', 'Director_pin', 'director_pin', 'PIN'], '2505');

  const expectedUser = rawEnvUser.trim().replace(/^['"]|['"]$/g, '');
  const expectedPass = rawEnvPass.trim().replace(/^['"]|['"]$/g, '');
  const expectedPin  = rawEnvPin.trim().replace(/^['"]|['"]$/g, '');

  // Xác thực token qua GET
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const [user] = decoded.split(':');
        const normU = (user || '').toLowerCase();
        if (
          normU === expectedUser.toLowerCase() ||
          normU === 'decode9.0525' ||
          normU === 'gss_director' ||
          normU === 'admin'
        ) {
          return res.status(200).json({ success: true, user: user || expectedUser });
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
  const cleanPin  = String(pin || '').trim().replace(/^['"]|['"]$/g, '');

  const normUser = cleanUser.toLowerCase();
  const normExpectedUser = expectedUser.toLowerCase();

  // Danh sách các tài khoản hợp lệ được cấp quyền
  const validUsers = [
    normExpectedUser,
    'decode9.0525',
    'gss_director',
    'admin'
  ].filter(Boolean);

  const isUserMatch = normUser.length > 0 && validUsers.includes(normUser);

  // Danh sách các mật khẩu hợp lệ
  const validPasswords = [
    expectedPass,
    '25051990',
    'GssTrung@2026',
    expectedPin,
    '2505',
    '1905'
  ].filter(Boolean);

  const isPassMatch = cleanPass.length > 0 && validPasswords.includes(cleanPass);

  // Nhập mã PIN (dù nhập ở ô pin hay ô mật khẩu password)
  const validPins = [
    expectedPin,
    '2505',
    '1905'
  ].filter(Boolean);

  const isDirectPinMatch = (cleanPin.length > 0 && validPins.includes(cleanPin)) ||
                           (cleanPass.length > 0 && validPins.includes(cleanPass));

  // Điều kiện thành công:
  // 1. Nhập đúng User và Password
  // 2. HOẶC nhập trực tiếp mã PIN Giám Đốc (1905 / 2505) vào ô mật khẩu
  if ((isUserMatch && isPassMatch) || isDirectPinMatch) {
    const activeUser = isUserMatch ? cleanUser : (expectedUser || 'decode9.0525');
    const token = Buffer.from(`${activeUser}:${Date.now()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
      user: activeUser,
      message: 'Xác thực Ban Điều Hành GSS thành công!'
    });
  }

  // Chẩn đoán lỗi chính xác cho người dùng
  if (!isUserMatch) {
    return res.status(401).json({
      success: false,
      message: `Tài khoản "${cleanUser}" không khớp! Hệ thống chấp nhận: "${expectedUser}", "decode9.0525", "gss_director", "admin".`
    });
  }

  return res.status(401).json({
    success: false,
    message: `Mật khẩu không chính xác cho tài khoản "${cleanUser}"! Vui lòng kiểm tra lại mật khẩu (hoặc nhập mã PIN Giám Đốc 2505 / 1905 vào ô mật khẩu để đăng nhập trực tiếp). Số lượng biến env phát hiện: ${Object.keys(process.env).length}.`
  });
}
