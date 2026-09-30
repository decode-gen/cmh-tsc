// Vercel Serverless Function: Xác thực danh tính Ban Điều Hành
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { username, password, pin } = req.body || {};
  const expectedUser = process.env.ADMIN_USER || 'gss_director';
  const expectedPass = process.env.ADMIN_PASS || 'GssTrung@2026';
  const expectedPin = process.env.DIRECTOR_PIN || '1905';

  const isUserPassValid = username && password && username === expectedUser && password === expectedPass;
  const isPinValid = pin && String(pin).trim() === expectedPin;

  if (isUserPassValid || isPinValid) {
    const token = Buffer.from(`${expectedUser}:${Date.now()}`).toString('base64');
    return res.status(200).json({
      success: true,
      token,
      message: 'Xác thực Ban Điều Hành GSS thành công!'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Thông tin xác thực Ban Điều Hành không hợp lệ!'
  });
}
