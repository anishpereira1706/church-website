import { useState } from 'react'
import fevilPoster from '../assets/FEVIL POSTER 3.jpg'
import kiethPoster from '../assets/KIETH POSTER 3.jpg'
import icymPoster from '../assets/icym_poster5.jpg'

const NEWS_ITEMS = [
  {
    id: 1,
    category: 'Announcements',
    date: 'July 3, 2026',
    title: 'Congratulations Kieth',
    desc: 'The parish community extends warm congratulations to Kieth on his outstanding performance and achievements.',
    image: kiethPoster,
    tagColor: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
  },
  {
    id: 2,
    category: 'Announcements',
    date: 'July 3, 2026',
    title: 'Congratulations Fevil',
    desc: 'We congratulate Fevil and celebrate his hard work and noteworthy success. The community wishes him the very best.',
    image: fevilPoster,
    tagColor: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
  },
  {
    id: 3,
    category: 'News',
    date: 'July 3, 2026',
    title: 'Newly Elected ICYM Office Bearers 2026-27',
    desc: 'Introducing the newly elected executive committee of the Infant Mary Church ICYM unit for the term 2026-27. We wish them a fruitful year of service and growth.',
    image: icymPoster,
    tagColor: 'bg-brand-red/10 text-brand-red border-brand-red/20'
  }
]

const CATEGORIES = ['News', 'Announcements', 'Blog']

function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('Announcements')
  const [lightboxImage, setLightboxImage] = useState(null)

  const filteredItems = NEWS_ITEMS.filter(item => item.category === activeCategory)

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
              Latest News & <span className="font-serif italic bg-gradient-to-r from-rose-500 via-[#e96b39] to-brand-red bg-clip-text text-transparent font-bold">Announcements</span>
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

        {/* Dynamic Grid Layout */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <article 
                key={item.id}
                className="group bg-white rounded-3xl border border-brand-charcoal/5 shadow-xl shadow-brand-charcoal/[0.02] hover:shadow-brand-charcoal/5 hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Poster image box */}
                <div 
                  onClick={() => setLightboxImage(item.image)}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50 cursor-zoom-in"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-brand-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-brand-charcoal text-xs font-bold uppercase tracking-wider py-2 px-4 rounded-full shadow-md">
                      View Poster
                    </span>
                  </div>
                </div>

                {/* Card text content */}
                <div className="p-6 md:p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-grey font-medium">{item.date}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${item.tagColor}`}>
                        {item.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-brand-charcoal leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-brand-grey text-xs leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <span className="font-serif text-2xl text-brand-grey italic">No articles found in this category.</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Poster View */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-charcoal/80 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-lg w-full max-h-[90vh]">
            <img 
              src={lightboxImage} 
              alt="Poster view" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border-4 border-white"
            />
            <button 
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-brand-charcoal w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-bold transition-all"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default NewsSection
