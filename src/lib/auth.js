import crypto from 'crypto'

const SALT = 'infant-mary-church-admin-2026'

/**
 * Generates an HMAC-SHA256 token from the admin password.
 * The same function is used both server-side to generate the expected token
 * and to verify a client-supplied token.
 *
 * @param {string} password - The admin password
 * @returns {string} Hex-encoded HMAC digest
 */
export function generateToken(password) {
  return crypto.createHmac('sha256', SALT).update(password).digest('hex')
}

/**
 * Validates an incoming Next.js Request by checking its
 * Authorization: Bearer <token> header against the ADMIN_PASSWORD env var.
 *
 * GET requests are allowed through (they're public for the news section).
 *
 * @param {Request} request - The incoming Next.js request object
 * @returns {boolean} Whether the request is authorized
 */
export function validateRequest(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }

  const token = authHeader.split(' ')[1]
  if (!token) return false

  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const expectedToken = generateToken(adminPassword)

  return token === expectedToken
}
