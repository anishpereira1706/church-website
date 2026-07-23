import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import SiteSetting from '../../../models/SiteSetting'
import { validateRequest } from '../../../lib/auth'
import { DEFAULT_SETTINGS } from '../../../lib/defaults'

/**
 * GET /api/settings
 * Public — returns the current site settings merged with defaults.
 */
export async function GET() {
  try {
    await dbConnect()
    let settings = await SiteSetting.findOne({ key: 'main' })

    if (!settings) {
      // Create the document with defaults so it can be edited later
      settings = await SiteSetting.create({ key: 'main', ...DEFAULT_SETTINGS })
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

/**
 * PUT /api/settings
 * Protected — only authenticated admins can update settings.
 */
export async function PUT(req) {
  if (!validateRequest(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }

  try {
    await dbConnect()
    const body = await req.json()

    // Build update object — only allow known top-level keys
    const allowedKeys = ['massTimings', 'parishPriest', 'contact', 'socialLinks']
    const update = {}
    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        update[key] = body[key]
      }
    }

    const settings = await SiteSetting.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { new: true, upsert: true }
    )

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
