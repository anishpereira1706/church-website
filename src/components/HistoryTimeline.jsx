import beachImg from '../assets/beach.webp'

const MILESTONES = [
  {
    year: '1964',
    title: 'The Evacuation & Migration',
    desc: 'The construction of the New Mangalore Port Trust (NMPT) led to the evacuation of families from ancestral lands. Lal Bahadur Shastri laid the foundation stone. Nearly 200 Christian families were relocated to the dense forests of Katipalla, starting from scratch with 12.5 cents of land.'
  },
  {
    year: '1966',
    title: 'The First Holy Mass',
    desc: 'On September 8, 1966, the community built a simple cottage of bamboo and coconut palms. Rev. Fr. Claudy D’Souza celebrated the first Holy Mass in this palm cottage, marking the start of active spiritual gathering.'
  },
  {
    year: '1967',
    title: 'Foundation Stone Laid',
    desc: 'On the feast of the Nativity (Sept 8), the foundation stone for the new church was laid by Vicar General Monsignor William Louis, dedicated to "Infant Mary".'
  },
  {
    year: '1968',
    title: 'Blessing & Official Parish',
    desc: 'On September 8, 1968, the new church was blessed by Bishop Basil D’Souza. Soon after, on December 1, 1968, Katipalla was officially declared a parish, with Fr. Peter S. Noronha appointed as the first Parish Priest.'
  },
  {
    year: '1970',
    title: 'Socio-Economic Development',
    desc: 'To support the poor and unemployed, Fr. Noronha founded the Rehabilitation Social Service Centre (KRSS). The "food for work" scheme initiated massive development, generating farms, houses, and plantations.'
  },
  {
    year: '1972',
    title: 'Franciscan Sisters Convent',
    desc: 'Franciscan Sisters of St. Mary of Angels arrived on April 26, 1972. They open a health centre, stitching classes, and a Balavadi school, providing vital community support.'
  },
  {
    year: '1980',
    title: 'The Belfry & Church Bell',
    desc: 'Under Fr. Remegius Aranha, the belfry was completed. The church bell, donated by Mumbai-based businessman Timothy D’Souza, was blessed by Bishop Basil D’Souza on February 24, 1980.'
  },
  {
    year: '2006',
    title: 'Infant Mary School',
    desc: 'Dream of providing high-quality English education came alive. Infant Mary School was established, with construction starting on the modern school building.'
  },
  {
    year: '2018',
    title: 'Golden Jubilee Celebration',
    desc: 'On December 3, 2018, the parish celebrated its 50th Golden Jubilee. Bishop Peter Paul Saldanha celebrated the thanksgiving mass, honoring previous priests, leaders, and contributors.'
  }
]

function HistoryTimeline() {
  return (
    <section id="history" className="relative bg-gradient-to-b from-transparent via-white/90 to-white py-24 min-h-screen z-0">
      {/* Viewport-fixed background image with low opacity for parallax scrolling */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15] pointer-events-none -z-10" 
        style={{ backgroundImage: `url(${beachImg})` }}
      />
      
      <div className="relative mx-auto max-w-7xl px-6 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-24 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Our Journey
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            The History of <span className="font-serif italic bg-gradient-to-r from-rose-500 via-[#e96b39] to-brand-red bg-clip-text text-transparent font-bold">Infant Mary Church</span>
          </h2>
          <p className="text-brand-grey text-sm md:text-base leading-relaxed">
            From a humble bamboo tent in the forest of Katipalla to a thriving parish community, explore the key milestones that shaped our spiritual home.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-orange via-brand-red to-transparent -translate-x-[1px]" />

          {/* Timeline Items */}
          <div className="space-y-24">
            {MILESTONES.map((m, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div key={m.year} className="relative flex flex-col md:flex-row items-center justify-between">
                  
                  {/* Timeline Node Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-brand-orange border-4 border-white shadow-md -translate-x-[7px] z-10 hover:scale-125 transition-transform duration-300" />

                  {/* Left Side Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-16 text-left md:text-right">
                    {isEven ? (
                      <div className="space-y-3 group hover:translate-y-[-2px] transition-transform duration-300">
                        <span className="font-serif text-2xl font-extrabold text-brand-orange">
                          {m.year}
                        </span>
                        <h3 className="text-xl font-bold text-brand-charcoal">
                          {m.title}
                        </h3>
                        <p className="text-brand-grey text-sm leading-relaxed max-w-lg md:ml-auto">
                          {m.desc}
                        </p>
                      </div>
                    ) : (
                      // Huge decorative Year on the opposite side to balance the space
                      <div className="hidden md:flex justify-end select-none">
                        <span className="font-serif text-8xl lg:text-9xl font-black text-brand-orange/5 tracking-tighter">
                          {m.year}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Side Container */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-16 text-left">
                    {!isEven ? (
                      <div className="space-y-3 group hover:translate-y-[-2px] transition-transform duration-300">
                        <span className="font-serif text-2xl font-extrabold text-brand-orange">
                          {m.year}
                        </span>
                        <h3 className="text-xl font-bold text-brand-charcoal">
                          {m.title}
                        </h3>
                        <p className="text-brand-grey text-sm leading-relaxed max-w-lg">
                          {m.desc}
                        </p>
                      </div>
                    ) : (
                      // Huge decorative Year on the opposite side to balance the space
                      <div className="hidden md:flex justify-start select-none">
                        <span className="font-serif text-8xl lg:text-9xl font-black text-brand-orange/5 tracking-tighter">
                          {m.year}
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}

export default HistoryTimeline
