import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Announcement from '../../../models/Announcement'
import cloudinary from '../../../lib/cloudinary'

export async function GET() {
  try {
    await dbConnect()
    const announcements = await Announcement.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: announcements })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await dbConnect()
    const formData = await req.formData()
    
    const title = formData.get('title')
    const description = formData.get('description')
    const category = formData.get('category')
    const date = formData.get('date')
    const file = formData.get('file')

    if (!title || !description || !category || !date || !file) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Convert file to base64 data URI for Cloudinary
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'church_announcements',
    })

    // Create Announcement in MongoDB
    const announcement = await Announcement.create({
      title,
      description,
      category,
      date,
      imageUrl: uploadResponse.secure_url,
    })

    return NextResponse.json({ success: true, data: announcement }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const deleted = await Announcement.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
