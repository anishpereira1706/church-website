'use client'

import { useState, useEffect } from 'react'
import { getOptimizedImageUrl } from '../../lib/utils'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // Form State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('News')
  const [date, setDate] = useState('')
  const [file, setFile] = useState(null)
  const [galleryFiles, setGalleryFiles] = useState([])
  
  // List State
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Check session token on load
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token === 'authenticated-session-token') {
      setIsAuthenticated(true)
      fetchAnnouncements()
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
        fetchAnnouncements()
      } else {
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setLoginError('Error connecting to authentication endpoint')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  const fetchAnnouncements = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/announcements')
      const data = await res.json()
      if (data.success) {
        setAnnouncements(data.data)
      }
    } catch (err) {
      console.error('Error fetching announcements:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage({ type: 'error', text: 'Please select a poster image.' })
      return
    }

    setIsSubmitting(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('content', content)
    formData.append('category', category)
    formData.append('date', date)
    formData.append('file', file)

    if (galleryFiles && galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) {
        formData.append('gallery', galleryFiles[i])
      }
    }

    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        setMessage({ type: 'success', text: 'Announcement published successfully!' })
        setTitle('')
        setDescription('')
        setContent('')
        setDate('')
        setFile(null)
        setGalleryFiles([])
        // Reset file input elements
        document.getElementById('file-input').value = ''
        const gInput = document.getElementById('gallery-input')
        if (gInput) gInput.value = ''
        fetchAnnouncements()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to publish announcement.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return

    try {
      const res = await fetch(`/api/announcements?id=${id}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        fetchAnnouncements()
      } else {
        alert(data.error || 'Failed to delete announcement')
      }
    } catch (err) {
      alert('Connection error while deleting')
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-brand-charcoal/5">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
              Admin Control Panel
            </span>
            <h1 className="font-serif text-3xl font-light text-[#1a2638]">
              Infant Mary Church
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-slate-50/50 text-[#1a2638]"
                required
              />
              {loginError && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#9e6b00] to-[#d49b00] text-white font-bold rounded-lg hover:opacity-95 transition-opacity cursor-pointer shadow-md"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">
              Control Dashboard
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-[#1a2638]">
              Manage Announcements
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#69788e] hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-brand-charcoal/5 space-y-6">
              <h2 className="text-lg font-bold text-[#1a2638] pb-2 border-b border-slate-100">
                New Announcement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-1.5">
                    Title
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

                <div className="grid grid-cols-2 gap-4">
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
                    rows={5}
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#1a2638] hover:bg-[#1a2638]/95 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Uploading...' : 'Publish Announcement'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Live Feed List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-brand-charcoal/5">
              <h2 className="text-lg font-bold text-[#1a2638] pb-2 border-b border-slate-100 mb-6">
                Active Feeds ({announcements.length})
              </h2>

              {isLoading ? (
                <p className="text-sm text-[#69788e] italic">Loading feeds...</p>
              ) : announcements.length === 0 ? (
                <p className="text-sm text-[#69788e] italic">No active announcements. Create one to get started.</p>
              ) : (
                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto pr-2">
                  {announcements.map((ann) => (
                    <div key={ann._id} className="py-4 flex gap-4 items-center justify-between group">
                      <div className="flex gap-4 items-center">
                        <img
                          src={getOptimizedImageUrl(ann.imageUrl, 200)}
                          alt={ann.title}
                          className="w-16 h-16 object-cover rounded-lg border border-slate-100"
                        />
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-[#c5a059]/10 text-[#c5a059] rounded text-[10px] font-bold uppercase tracking-wider">
                            {ann.category}
                          </span>
                          <h3 className="font-bold text-[#1a2638] text-sm line-clamp-1">
                            {ann.title}
                          </h3>
                          <p className="text-[11px] text-[#69788e]">
                            {ann.date}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(ann._id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete announcement"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
