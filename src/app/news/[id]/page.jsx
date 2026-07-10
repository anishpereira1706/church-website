'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, Image as ImageIcon, X } from 'lucide-react'
import { getOptimizedImageUrl } from '../../../lib/utils'

export default function AnnouncementDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [announcement, setAnnouncement] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeLightboxImage, setActiveLightboxImage] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/announcements?id=${id}`)
        const data = await res.json()
        if (data.success) {
          setAnnouncement(data.data)
        } else {
          setError(data.error || 'Failed to load announcement details.')
        }
      } catch (err) {
        console.error('Error fetching details:', err)
        setError('An unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#69788e] text-sm font-light italic">Loading article details...</p>
        </div>
      </div>
    )
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">!</div>
          <h2 className="font-serif text-2xl text-[#1a2638]">Unable to load post</h2>
          <p className="text-brand-grey text-sm">{error || 'The requested page could not be found.'}</p>
          <Link
            href="/"
            className="inline-block w-full py-3 bg-[#1a2638] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#1a2638]/90 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const displayContent = announcement.content || announcement.description

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a2638] selection:bg-[#c5a059]/20 selection:text-[#1a2638] pb-24">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={getOptimizedImageUrl(activeLightboxImage, 1600)}
              alt="Lightbox View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Back Header */}
      <header className="sticky top-0 bg-[#faf8f5]/85 backdrop-blur-md border-b border-[#1a2638]/5 z-30 px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#69788e] hover:text-[#1a2638] transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Homepage
        </Link>
        
        <div className="flex items-center gap-4 text-xs text-[#69788e] font-semibold">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#c5a059]/10 text-[#c5a059] rounded-full uppercase tracking-wider text-[10px]">
            <Tag size={10} />
            {announcement.category}
          </span>
          <span className="flex items-center gap-1.5 py-1 uppercase tracking-wider text-[10px]">
            <Calendar size={10} className="text-[#c5a059]" />
            {announcement.date}
          </span>
        </div>
      </header>

      {/* Main Full-Page Layout Container */}
      <main className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Framed Poster (Smaller) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 flex flex-col items-center lg:items-stretch">
            {/* Poster with Gold Accent Ring Frame */}
            <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white p-2">
              <div 
                className="absolute -inset-1 rounded-2xl border-[2.5px] border-transparent -z-10"
                style={{
                  background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #9e6b00, #ffea85, #d49b00, #ffea85, #9e6b00) border-box',
                  backgroundSize: '100% 100%, 200% auto',
                  animation: 'gold-flow 6s ease-in-out infinite'
                }}
              />
              <img
                src={getOptimizedImageUrl(announcement.imageUrl, 600)}
                alt={announcement.title}
                className="w-full h-auto object-contain rounded-xl block"
              />
            </div>
          </div>

          {/* Right Column: Title, Content & Gallery Collage */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl md:text-5xl font-light leading-[1.2] text-[#1a2638] tracking-tight">
                {announcement.title}
              </h1>
              <div className="h-[2px] w-20 bg-gradient-to-r from-[#c5a059] to-transparent" />
            </div>

            <article className="prose max-w-none text-brand-charcoal text-base md:text-lg leading-relaxed font-light space-y-6 text-[#374151]">
              {displayContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="white-space-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Asymmetric Collage Gallery */}
            {announcement.galleryUrls && announcement.galleryUrls.length > 0 && (
              <div className="pt-10 border-t border-slate-200 space-y-6">
                <h2 className="font-serif text-2xl font-light text-[#1a2638] flex items-center gap-2">
                  <ImageIcon size={20} className="text-[#c5a059]" />
                  Event Gallery
                </h2>

                <div className="grid grid-cols-6 gap-4 auto-rows-[140px] sm:auto-rows-[180px]">
                  {announcement.galleryUrls.map((url, i) => {
                    // Define grid classes to build an asymmetric collage layout based on index i
                    let gridClass = "col-span-2 row-span-1" // Default fallback
                    if (i % 5 === 0) {
                      gridClass = "col-span-4 row-span-2" // Large main focus
                    } else if (i % 5 === 1) {
                      gridClass = "col-span-2 row-span-2" // Tall side image
                    } else if (i % 5 === 2) {
                      gridClass = "col-span-3 row-span-1" // Wide image
                    } else if (i % 5 === 3) {
                      gridClass = "col-span-3 row-span-1" // Wide image
                    } else if (i % 5 === 4) {
                      gridClass = "col-span-6 row-span-2" // Extra wide banner
                    }
                    
                    return (
                      <div
                        key={i}
                        onClick={() => setActiveLightboxImage(url)}
                        className={`group relative bg-slate-100 rounded-2xl overflow-hidden cursor-zoom-in border border-slate-200/50 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md ${gridClass}`}
                      >
                        <img
                          src={getOptimizedImageUrl(url, 800)}
                          alt={`Gallery ${i}`}
                          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
