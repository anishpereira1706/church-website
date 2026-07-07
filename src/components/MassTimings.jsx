function MassTimings() {
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
                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Daily Mass (Mon — Thu, Sat)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">6:45</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">AM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">Konkani</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Friday Evening Mass</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">5:30</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">PM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">Konkani</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Saturday Evening Mass</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">5:00</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">PM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">Konkani</span>
                  </div>
                </div>
              </div>
              

            </div>

            {/* Column 2: Sunday Liturgies */}
            <div className="p-8 md:p-12 space-y-8 bg-slate-50/20 hover:bg-slate-50/50 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <span className="text-brand-orange font-serif text-2xl italic font-bold">02.</span>
                <h3 className="text-lg font-bold text-brand-charcoal uppercase tracking-wider">Sunday Celebrations</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Morning Mass</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">7:15</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">AM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">Konkani</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Catechism Classes</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">8:45</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">AM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-slate-100 px-2 py-0.5 rounded text-slate-700">Faith Study</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="block text-xs uppercase tracking-wider text-brand-grey">Children's Mass</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-serif font-black text-brand-orange">10:00</span>
                    <span className="text-xs font-bold text-brand-charcoal uppercase">AM</span>
                    <span className="text-xs text-brand-grey font-medium ml-auto bg-brand-orange/10 px-2 py-0.5 rounded text-brand-orange">Konkani</span>
                  </div>
                </div>
              </div>
              

            </div>


          </div>
        </div>

      </div>
    </section>
  )
}

export default MassTimings
