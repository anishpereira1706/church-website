'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit2, Trash2, Shield, Plus } from 'lucide-react'
import { getOptimizedImageUrl } from '../../../lib/utils'

export default function ManageAnnouncementsPage() {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Verify auth on mount
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token !== 'authenticated-session-token') {
      router.push('/admin')
    } else {
      fetchAnnouncements()
    }
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true)
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

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a2638] pb-12">
      {/* Header */}
      <header className="bg-white border-b border-[#1a2638]/5 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
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
              Manage News & Feed
            </h1>
          </div>
        </div>

        <Link
          href="/admin/announcements/new"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a2638] hover:bg-[#1a2638]/90 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Create New
        </Link>
      </header>

      {/* Main List Grid */}
      <main className="max-w-5xl mx-auto px-6 mt-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.03] border border-brand-charcoal/5">
          <h2 className="text-lg font-bold text-[#1a2638] pb-3 border-b border-slate-100 mb-6">
            Active Feed Posts ({announcements.length})
          </h2>

          {isLoading ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-8 h-8 border-3 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-[#69788e] italic font-light">Loading feeds...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-[#69788e] italic">No active announcements. Create one to get started.</p>
              <Link
                href="/admin/announcements/new"
                className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#c5a059] hover:underline"
              >
                Publish first post →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {announcements.map((ann) => (
                <div key={ann._id} className="py-5 flex gap-4 items-center justify-between group">
                  <div className="flex gap-4 items-center">
                    <img
                      src={getOptimizedImageUrl(ann.imageUrl, 200)}
                      alt={ann.title}
                      className="w-16 h-16 object-cover rounded-lg border border-slate-100 shadow-sm"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 bg-[#c5a059]/10 text-[#c5a059] rounded text-[10px] font-bold uppercase tracking-wider">
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-[#69788e] uppercase font-semibold">
                          {ann.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1a2638] text-sm md:text-base line-clamp-1">
                        {ann.title}
                      </h3>
                      <p className="text-xs text-brand-grey line-clamp-1 max-w-xl font-light">
                        {ann.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/announcements/edit/${ann._id}`}
                      className="p-2.5 bg-slate-50 hover:bg-[#c5a059]/10 text-[#69788e] hover:text-[#c5a059] rounded-lg transition-colors cursor-pointer border border-slate-100"
                      title="Edit Announcement"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(ann._id)}
                      className="p-2.5 bg-slate-50 hover:bg-red-50 text-[#69788e] hover:text-red-600 rounded-lg transition-colors cursor-pointer border border-slate-100"
                      title="Delete Announcement"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
