'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, UploadCloud } from 'lucide-react'
import { compressImage } from '../../../../lib/utils'

export default function CreateAnnouncementPage() {
  const router = useRouter()
  
  // Form State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('News')
  const [date, setDate] = useState('')
  const [file, setFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Verify auth on mount
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token !== 'authenticated-session-token') {
      router.push('/admin')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a poster image.' })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: 'info', text: 'Compressing high-res images in browser...' })

    try {
      // Compress primary poster file
      const compressedFile = await compressImage(file, 2000, 0.8)

      // Compress gallery files
      const compressedGallery = await Promise.all(
        galleryFiles.map(gFile => compressImage(gFile, 2000, 0.8))
      )

      setMessage({ type: 'info', text: 'Uploading files to cloud...' })

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('content', content)
      formData.append('category', category)
      formData.append('date', date)
      formData.append('file', compressedFile)

      if (compressedGallery && compressedGallery.length > 0) {
        for (let i = 0; i < compressedGallery.length; i++) {
          formData.append('gallery', compressedGallery[i])
        }
      }

      const res = await fetch('/api/announcements', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Announcement published successfully!' })
        // Clear form
        setTitle('')
        setDescription('')
        setContent('')
        setDate('')
        setFile(null)
        setGalleryFiles([])
        document.getElementById('file-input').value = ''
        const gInput = document.getElementById('gallery-input')
        if (gInput) gInput.value = ''
        
        // Redirect to list
        setTimeout(() => {
          router.push('/admin/announcements')
        }, 1500)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to publish announcement.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a2638] pb-24">
      {/* Header */}
      <header className="bg-white border-b border-[#1a2638]/5 px-8 py-5 flex items-center gap-4 sticky top-0 z-20">
        <Link
          href="/admin/announcements"
          className="p-2 hover:bg-slate-50 rounded-lg text-[#69788e] hover:text-[#1a2638] transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-1">
            <Shield size={12} />
            Admin Panel
          </span>
          <h1 className="font-serif text-2xl text-[#1a2638]">
            Publish Announcement
          </h1>
        </div>
      </header>

      {/* Main Form container */}
      <main className="max-w-3xl mx-auto px-6 mt-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.03] border border-brand-charcoal/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-sm bg-white"
                >
                  <option value="News">News</option>
                  <option value="Announcements">Announcement</option>
                  <option value="Blog">Blog</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Display Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. July 10, 2026"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Poster Image
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-xs bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Gallery Images (Optional)
                </label>
                <input
                  id="gallery-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                Summary (Short text for Homepage Card)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief snippet (max 150 chars)"
                rows={2}
                maxLength={180}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                Full Content / Article Text (for Read More Page)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe the full announcement here..."
                rows={6}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 text-[#1a2638] text-sm"
                required
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg text-xs font-medium ${
                message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex gap-4">
              <Link
                href="/admin/announcements"
                className="w-1/3 py-3 border border-slate-200 hover:bg-slate-50 text-center text-slate-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-2/3 py-3 bg-[#1a2638] hover:bg-[#1a2638]/95 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <UploadCloud size={16} />
                {isSubmitting ? 'Uploading...' : 'Publish Announcement'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
