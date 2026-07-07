import { useState } from 'react'

const CATEGORIES = ['News', 'Announcements', 'Blog']

function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('News')

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

        {/* Coming Soon Area */}
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
      </div>
    </section>
  )
}

export default NewsSection
