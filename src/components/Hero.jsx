import churchImg from '../assets/church.jpg'
import landingBg from '../assets/landing_bg.jpg'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white min-h-[calc(100vh-80px)] flex items-stretch z-0">
      {/* Section background image with low opacity - styled with bg-fixed and absolute -top-20 to offset the sticky navbar and fit the viewport */}
      <div 
        className="absolute -top-20 bottom-0 left-0 right-0 bg-cover bg-center bg-fixed bg-no-repeat opacity-[0.13] pointer-events-none z-0 scale-x-[-1]" 
        style={{ backgroundImage: `url(${landingBg})` }}
      />
      
      {/* Animated orange/peach glows here and there for premium depth */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/8 rounded-full blur-[110px] animate-float-slow z-0 pointer-events-none" />
      <div className="absolute -bottom-32 left-[30%] w-[550px] h-[550px] bg-brand-red/5 rounded-full blur-[130px] animate-float-reverse z-0 pointer-events-none" />
      <div className="absolute top-12 right-12 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] animate-float-slow z-0 pointer-events-none" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pl-6 md:pl-16 lg:pr-0 z-10">
        {/* Left Side: Premium Typography & CTA */}
        <div className="lg:col-span-7 space-y-8 pr-6 pt-12 md:pt-20 pb-16 md:pb-24 self-start relative z-10">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] text-brand-charcoal">
              A sanctuary of <span className="font-serif italic bg-gradient-to-r from-rose-500 via-[#e96b39] to-brand-red bg-clip-text text-transparent font-bold">faith</span>, hope & love.
            </h1>
            <p className="text-brand-grey text-base md:text-lg leading-relaxed max-w-xl">
              We welcome you to Infant Mary Church, a space dedicated to worship, community growth, and spiritual journey. Join us in celebrating faith and togetherness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#timings" 
              className="px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-red text-white font-medium rounded-full shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 hover:scale-[1.02] transition-all duration-300"
            >
              View Mass Timings
            </a>
            <a 
              href="#history" 
              className="px-8 py-4 bg-white border border-brand-charcoal/10 hover:bg-slate-50 text-brand-charcoal font-medium rounded-full transition-all duration-300"
            >
              Our Story
            </a>
          </div>
        </div>

        {/* Right Side: Semicircle Image attaching directly to the right edge and top edge */}
        <div className="lg:col-span-5 w-full flex justify-end items-start relative z-10">
          <div className="relative w-[115%] lg:w-[125%] h-[320px] md:h-[500px] lg:h-[550px] aspect-[4/4.5] ml-auto">
            
            {/* Ribbon Wave 2 (Bright Orange/Red Gradient Wave) - Only keeping the orange/red wave behind the image */}
            <div className="absolute top-0 bottom-4 -left-4 right-0 rounded-l-full bg-gradient-to-tr from-orange-200 via-brand-orange to-brand-red -z-20 transform rotate-2 shadow-md" />

            {/* Semicircle image container attached to the edge and top */}
            <div className="relative w-full h-full rounded-l-full overflow-hidden shadow-2xl border-4 border-t-0 border-r-0 border-white z-10">
              <img 
                src={churchImg} 
                alt="Infant Mary Church" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
