import priestImg from '../assets/Fr-Santhosh-Lobo-1-958x1198.jpg'

function ParishPriest() {
  return (
    <section className="bg-[#fcfcfc] py-24 border-t border-slate-100 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Framed Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] bg-white p-3 rounded-2xl shadow-xl shadow-brand-charcoal/5 border border-brand-charcoal/5 transform hover:scale-[1.01] transition-transform duration-300">
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 rounded-[20px] border border-brand-orange/20 -z-10" />
              
              <img 
                src={priestImg} 
                alt="Fr. Santhosh Lobo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Right Column: Title, Name & Message */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-orange block">
                Our Parish Priest
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
                Fr. Santhosh Lobo
              </h2>
            </div>
            
            <div className="relative pl-6 border-l-2 border-brand-orange/40">
              <p className="text-brand-grey text-base md:text-lg italic font-light leading-relaxed font-serif text-[#4b5563]">
                "Welcome to our parish community. Infant Mary Church stands as a beacon of faith, hope, and togetherness. Let us walk this spiritual journey hand in hand, strengthening our bonds of fellowship and service to one another."
              </p>
            </div>
            
            <div className="pt-2">
              <p className="text-brand-charcoal font-bold text-sm tracking-wide uppercase">
                Fr. Santhosh Lobo
              </p>
              <p className="text-brand-grey text-xs">
                Parish Priest, Infant Mary Church
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ParishPriest
