import priestImg from '../assets/Fr-Santhosh-Lobo-1-958x1198.jpg'
import priestBg from '../assets/priest_bg.jpg'

function ParishPriest() {
  return (
    <section className="relative py-24 border-t border-slate-100 bg-[#faf8f5] overflow-hidden z-0">
      {/* Abstract gold/white line background with gradient fade from left to right */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none z-0" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(250, 248, 245, 1) 0%, rgba(250, 248, 245, 0.95) 45%, rgba(250, 248, 245, 0.35) 100%), url(${priestBg})`
        }}
      />
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 z-0" />

      <div className="mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Column: Framed Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/5] bg-white p-3 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-brand-charcoal/5 transform hover:scale-[1.01] transition-transform duration-300 z-10">
              
              {/* Hollow Gold Ring Accent Frame matching Hero style */}
              <div 
                className="absolute -inset-2.5 rounded-2xl border-[3px] border-transparent -z-10 shadow-md"
                style={{
                  background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #9e6b00, #ffea85, #d49b00, #ffea85, #9e6b00) border-box',
                  backgroundSize: '100% 100%, 200% auto',
                  animation: 'gold-flow 6s ease-in-out infinite'
                }}
              />
              
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
            
            <div className="relative pl-6 md:pl-8 border-l-3 border-brand-orange/40 my-8 md:my-10">
              <p className="text-brand-grey text-sm md:text-base italic font-light leading-loose font-serif text-[#4b5563]">
                "Welcome to our parish community. Infant Mary Church stands as a beacon of faith, hope, and togetherness. Let us walk this spiritual journey hand in hand, strengthening our bonds of fellowship and service to one another."
              </p>
            </div>
            
            <div className="pt-4 border-t border-brand-charcoal/5 max-w-[240px]">
              <p className="text-brand-charcoal font-bold text-xs tracking-wider uppercase">
                Parish Priest
              </p>
              <p className="text-brand-grey text-[11px] font-light">
                Infant Mary Church, Katipalla
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ParishPriest
