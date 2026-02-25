const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const TOKEN_KEY = "phone-engine-admin-token";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  const payload = `admin:${Date.now()}`;
  return Buffer.from(payload).toString("base64");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    if (!decoded.startsWith("admin:")) return false;
    const timestamp = parseInt(decoded.split(":")[1], 10);
    const hoursDiff = (Date.now() - timestamp) / (1000 * 60 * 60);
    return hoursDiff < 24;
  } catch {
    return false;
  }
}

export { TOKEN_KEY };
