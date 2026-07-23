'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, UploadCloud } from 'lucide-react'
import { compressImage } from '../../../../lib/utils'
import churchImg from '../../../../assets/church2.jpg'

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
    if (!token) {
      router.push('/admin')
    }
  }, [])

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${sessionStorage.getItem('admin_token')}`
  })

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
        headers: getAuthHeaders(),
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
    <div className="relative min-h-screen bg-[#faf8f5] text-[#1a2638] selection:bg-[#c5a059]/20 pb-24 overflow-x-hidden">
      {/* Background Graphic matching Admin Landing page */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat opacity-[0.42] pointer-events-none z-0 bg-cover lg:bg-[length:100%_auto]" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(250, 248, 245, 0.5) 0%, rgba(250, 248, 245, 0.8) 100%), url(${churchImg.src})`
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-25 bg-white/40 backdrop-blur-md border-b border-white/50 px-8 py-5 flex items-center gap-4">
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
      <main className="relative z-10 max-w-[1450px] mx-auto px-8 pt-28">
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-semibold shadow-sm border ${
            message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
              : message.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-blue-50 border-blue-200 text-blue-800 animate-pulse'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Media & Previews (1/3rd width) */}
          <div className="lg:col-span-4 bg-white/40 border border-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#1a2638] border-b border-[#1a2638]/5 pb-3 flex items-center gap-2">
              Media & Scheduling
            </h2>

            {/* Date Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                Display Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. July 10, 2026"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 text-[#1a2638] text-sm font-semibold"
                required
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 text-[#1a2638] text-sm font-semibold"
              >
                <option value="News">News</option>
                <option value="Announcements">Announcement</option>
                <option value="Blog">Blog</option>
              </select>
            </div>

            {/* Poster Upload */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e]">
                Poster Image (Required)
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#1a2638] text-xs bg-white/50 cursor-pointer"
                required
              />
            </div>

            {/* Gallery Upload */}
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e]">
                Add Gallery Images (Optional)
              </label>
              <input
                id="gallery-input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setGalleryFiles(Array.from(e.target.files))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-[#1a2638] text-xs bg-white/50 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Article Details & Text Editors (2/3rds width) */}
          <div className="lg:col-span-8 bg-white/40 border border-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h2 className="font-serif text-lg font-bold text-[#1a2638] border-b border-[#1a2638]/5 pb-3">
                Article Content
              </h2>

              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 text-[#1a2638] text-base font-semibold"
                  required
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Summary (Short text for Homepage Card)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief snippet (max 180 chars)"
                  rows={2}
                  maxLength={180}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 text-[#1a2638] text-sm"
                  required
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                  Full Content / Article Text (for Read More Page)
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe the full announcement details here. Standard paragraphs will align beautifully as justified blocks..."
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 text-[#1a2638] text-sm leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Action Buttons Container */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#1a2638]/5">
              <Link
                href="/admin/announcements"
                className="px-6 py-3 bg-white/80 border border-slate-200 text-[#69788e] hover:text-[#1a2638] hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-[#9e6b00] to-[#d49b00] text-white hover:opacity-95 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <UploadCloud size={16} />
                {isSubmitting ? 'Uploading...' : 'Publish Announcement'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
