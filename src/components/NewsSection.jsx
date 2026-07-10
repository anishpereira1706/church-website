'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getOptimizedImageUrl } from '../lib/utils'

const CATEGORIES = ['News', 'Announcements', 'Blog']

function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('News')
  const [announcements, setAnnouncements] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const res = await fetch('/api/announcements')
        const data = await res.json()
        if (data.success) {
          setAnnouncements(data.data)
        }
      } catch (error) {
        console.error('Failed to load announcements:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadAnnouncements()
  }, [])

  const filtered = announcements.filter(ann => ann.category === activeCategory)

  return (
    <section id="news" className="bg-white py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange block">
              Updates & Gallery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
              Latest News & <span className="font-serif italic text-gold-gradient font-bold">Announcements</span>
            </h2>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-brand-charcoal border-brand-charcoal text-white shadow-lg shadow-brand-charcoal/10 scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-brand-grey border-slate-200 hover:text-brand-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-sm text-brand-grey italic">Loading updates...</p>
          </div>
        ) : filtered.length === 0 ? (
          /* Coming Soon Area */
          <div className="text-center py-20 bg-[#faf8f5]/40 border border-brand-charcoal/5 rounded-3xl shadow-xl shadow-brand-charcoal/[0.01] flex flex-col items-center justify-center space-y-4 max-w-lg mx-auto px-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-gold-gradient/10 flex items-center justify-center text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-brand-charcoal">
              {activeCategory} <span className="font-serif italic text-gold-gradient font-bold">Coming Soon</span>
            </h3>
            <p className="text-brand-grey text-xs md:text-sm max-w-sm leading-relaxed">
              We are currently compiling the latest {activeCategory.toLowerCase()} updates, files, and gallery items. Please check back shortly.
            </p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl overflow-hidden border border-brand-charcoal/5 shadow-xl shadow-brand-charcoal/[0.02] flex flex-col hover:scale-[1.01] transition-all duration-300"
              >
                {/* Poster Image Container with zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 border-b border-slate-100 group">
                  <img 
                    src={getOptimizedImageUrl(item.imageUrl, 800)} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-brand-charcoal/5">
                    {item.category}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">
                      {item.date}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-brand-charcoal line-clamp-2 min-h-[3.5rem]">
                      {item.title}
                    </h3>
                    <p className="text-brand-grey text-xs leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-50">
                    <Link
                      href={`/news/${item._id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c5a059] hover:text-[#1a2638] transition-colors group cursor-pointer"
                    >
                      Read Full Article
                      <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default NewsSection
