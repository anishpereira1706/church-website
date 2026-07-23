import { NextResponse } from 'next/server'
import { generateToken } from '../../../../lib/auth'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      // Generate a proper HMAC-based token for the session
      const token = generateToken(password)
      return NextResponse.json({ success: true, token })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
