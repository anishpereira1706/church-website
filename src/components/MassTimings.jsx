'use client'

import { useState, useEffect } from 'react'
import { DEFAULT_SETTINGS } from '../lib/defaults'

function MassTimings() {
  const [weekdayMasses, setWeekdayMasses] = useState(DEFAULT_SETTINGS.massTimings.weekdayMasses)
  const [sundayMasses, setSundayMasses] = useState(DEFAULT_SETTINGS.massTimings.sundayMasses)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success && data.data?.massTimings) {
          const mt = data.data.massTimings
          if (mt.weekdayMasses?.length) setWeekdayMasses(mt.weekdayMasses)
          if (mt.sundayMasses?.length) setSundayMasses(mt.sundayMasses)
        }
      } catch (err) {
        console.error('Failed to load mass timings:', err)
      }
    }
    loadSettings()
  }, [])

  return (
    <section id="timings" className="bg-[#fcfcfc] py-24 border-t border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Liturgy Schedule
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            Join Us in <span className="font-serif italic text-gold-gradient font-bold">Worship & Prayer</span>
          </h2>
          <p className="text-brand-grey text-sm md:text-base leading-relaxed">
            Participate in our daily and weekend celebrations. We welcome everyone to gather in faith and fellowship.
          </p>
        </div>

        {/* Unified Directory Board Layout */}
        <div className="bg-white border border-brand-charcoal/5 rounded-3xl shadow-2xl shadow-brand-charcoal/[0.03] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Column 1: Daily & Weekday Liturgies */}
            <div className="p-8 md:p-12 space-y-8 hover:bg-slate-50/50 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className="text-brand-orange font-serif text-2xl italic font-bold">01.</span>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-wider">Weekday Masses</h3>
              </div>
              
              <div className="space-y-6">
                {weekdayMasses.map((mass, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block text-xs uppercase tracking-wider text-brand-grey">{mass.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif font-black text-brand-orange">{mass.time}</span>
                      <span className="text-xs font-bold text-brand-charcoal uppercase">{mass.period}</span>
                      <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">{mass.language}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Sunday Liturgies */}
            <div className="p-8 md:p-12 space-y-8 bg-slate-50/20 hover:bg-slate-50/50 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className="text-brand-orange font-serif text-2xl italic font-bold">02.</span>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-wider">Sunday Celebrations</h3>
              </div>
              
              <div className="space-y-6">
                {sundayMasses.map((mass, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="block text-xs uppercase tracking-wider text-brand-grey">{mass.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-serif font-black text-brand-orange">{mass.time}</span>
                      <span className="text-xs font-bold text-brand-charcoal uppercase">{mass.period}</span>
                      <span className={`text-xs font-medium ml-auto px-2 py-0.5 rounded ${
                        mass.language === 'Faith Study'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-brand-orange/10 text-brand-orange'
                      }`}>{mass.language}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default MassTimings
