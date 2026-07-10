import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Announcement from '../../../models/Announcement'
import cloudinary from '../../../lib/cloudinary'

export async function GET(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const announcement = await Announcement.findById(id)
      if (!announcement) {
        return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: announcement })
    }

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
    const content = formData.get('content')
    const category = formData.get('category')
    const date = formData.get('date')
    const file = formData.get('file')
    const galleryFiles = formData.getAll('gallery')

    if (!title || !description || !content || !category || !date || !file) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Upload primary poster to Cloudinary
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder: 'church_announcements',
    })

    // 2. Upload gallery images in parallel (if any)
    const galleryUrls = []
    if (galleryFiles && galleryFiles.length > 0) {
      for (const gFile of galleryFiles) {
        if (gFile && gFile.size > 0) {
          const gBytes = await gFile.arrayBuffer()
          const gBuffer = Buffer.from(gBytes)
          const gFileUri = `data:${gFile.type};base64,${gBuffer.toString('base64')}`

          const gUploadResponse = await cloudinary.uploader.upload(gFileUri, {
            folder: 'church_announcements_gallery',
          })
          galleryUrls.push(gUploadResponse.secure_url)
        }
      }
    }

    // 3. Create Announcement in MongoDB
    const announcement = await Announcement.create({
      title,
      description,
      content,
      category,
      date,
      imageUrl: uploadResponse.secure_url,
      galleryUrls,
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
