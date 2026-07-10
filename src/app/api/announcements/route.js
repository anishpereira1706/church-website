import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Announcement from '../../../models/Announcement'
import cloudinary from '../../../lib/cloudinary'

/**
 * Extracts Cloudinary public_id from a secure URL.
 */
function getPublicIdFromUrl(url) {
  if (!url || !url.includes('cloudinary.com')) return null
  try {
    const parts = url.split('/upload/')
    if (parts.length < 2) return null
    
    const pathAfterUpload = parts[1]
    const pathParts = pathAfterUpload.split('/')
    
    // Strip version segment if present (e.g. 'v1783058336')
    if (pathParts[0].startsWith('v') && !isNaN(pathParts[0].substring(1))) {
      pathParts.shift()
    }
    
    const publicIdWithExtension = pathParts.join('/')
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "")
    return publicId
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error)
    return null
  }
}

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

    const announcement = await Announcement.findById(id)
    if (!announcement) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 })
    }

    // Delete primary image from Cloudinary
    if (announcement.imageUrl) {
      const publicId = getPublicIdFromUrl(announcement.imageUrl)
      if (publicId) {
        try {
          await cloudinary.uploader.destroy(publicId)
        } catch (cErr) {
          console.error('Failed to delete primary image from Cloudinary:', cErr)
        }
      }
    }

    // Delete gallery images from Cloudinary
    if (announcement.galleryUrls && announcement.galleryUrls.length > 0) {
      for (const url of announcement.galleryUrls) {
        const publicId = getPublicIdFromUrl(url)
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId)
          } catch (cErr) {
            console.error('Failed to delete gallery image from Cloudinary:', cErr)
          }
        }
      }
    }

    await Announcement.findByIdAndDelete(id)
    return NextResponse.json({ success: true, data: announcement })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await dbConnect()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const announcement = await Announcement.findById(id)
    if (!announcement) {
      return NextResponse.json({ success: false, error: 'Announcement not found' }, { status: 404 })
    }

    const formData = await req.formData()
    
    // Update text fields only if they have changed to prevent redundant database modifications
    if (formData.has('title') && announcement.title !== formData.get('title')) {
      announcement.title = formData.get('title')
    }
    if (formData.has('description') && announcement.description !== formData.get('description')) {
      announcement.description = formData.get('description')
    }
    if (formData.has('content') && announcement.content !== formData.get('content')) {
      announcement.content = formData.get('content')
    }
    if (formData.has('category') && announcement.category !== formData.get('category')) {
      announcement.category = formData.get('category')
    }
    if (formData.has('date') && announcement.date !== formData.get('date')) {
      announcement.date = formData.get('date')
    }

    // Handle poster deletion if requested
    const deletePoster = formData.get('deletePoster') === 'true'
    if (deletePoster && announcement.imageUrl) {
      const oldPublicId = getPublicIdFromUrl(announcement.imageUrl)
      if (oldPublicId) {
        try {
          await cloudinary.uploader.destroy(oldPublicId)
        } catch (cErr) {
          console.error('Failed to delete old poster from Cloudinary:', cErr)
        }
      }
      announcement.imageUrl = ''
    }

    // Handle new poster image (optional)
    const file = formData.get('file')
    if (file && file.size > 0 && typeof file !== 'string') {
      // Delete old poster image from Cloudinary
      if (announcement.imageUrl) {
        const oldPublicId = getPublicIdFromUrl(announcement.imageUrl)
        if (oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId)
          } catch (cErr) {
            console.error('Failed to delete old poster from Cloudinary:', cErr)
          }
        }
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileUri = `data:${file.type};base64,${buffer.toString('base64')}`

      const uploadResponse = await cloudinary.uploader.upload(fileUri, {
        folder: 'church_announcements',
      })
      announcement.imageUrl = uploadResponse.secure_url
    }

    // Handle specific gallery image deletions if requested
    const deletedUrlsJson = formData.get('deletedGalleryUrls')
    if (deletedUrlsJson) {
      try {
        const deletedUrls = JSON.parse(deletedUrlsJson)
        if (deletedUrls && deletedUrls.length > 0) {
          for (const url of deletedUrls) {
            const publicId = getPublicIdFromUrl(url)
            if (publicId) {
              try {
                await cloudinary.uploader.destroy(publicId)
              } catch (cErr) {
                console.error('Failed to delete specific image from Cloudinary:', cErr)
              }
            }
          }
          // Remove deleted URLs from the announcement's array
          announcement.galleryUrls = announcement.galleryUrls.filter(url => !deletedUrls.includes(url))
        }
      } catch (pErr) {
        console.error('Error parsing deletedGalleryUrls:', pErr)
      }
    }

    const galleryFiles = formData.getAll('gallery')
    if (galleryFiles && galleryFiles.length > 0) {
      const newGalleryUrls = []
      for (const gFile of galleryFiles) {
        if (gFile && gFile.size > 0 && typeof gFile !== 'string') {
          const gBytes = await gFile.arrayBuffer()
          const gBuffer = Buffer.from(gBytes)
          const gFileUri = `data:${gFile.type};base64,${gBuffer.toString('base64')}`

          const gUploadResponse = await cloudinary.uploader.upload(gFileUri, {
            folder: 'church_announcements_gallery',
          })
          newGalleryUrls.push(gUploadResponse.secure_url)
        }
      }
      announcement.galleryUrls = [...announcement.galleryUrls, ...newGalleryUrls]
    }

    await announcement.save()
    return NextResponse.json({ success: true, data: announcement })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
