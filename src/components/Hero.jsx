import { useScroll, useTransform, motion } from 'framer-motion'
import churchImg from '../assets/church.jpg'
import landingBg from '../assets/landing_bg.jpg'
import landingVideo from '../assets/64058-509542719_medium_1.mp4'

const EMBERS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: `${3 + Math.random() * 4}px`,
  delay: `${Math.random() * -15}s`, // Negative delay makes them start immediately animated on load!
  duration: `${10 + Math.random() * 10}s`,
  drift: `${-100 + Math.random() * 200}px`
}))

function Hero() {
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 800], [0, 120]) // GPU-accelerated parallax scroll offset

  return (
    <section
      className="relative overflow-hidden bg-white min-h-[calc(100vh-80px)] flex items-stretch z-0"
      style={{ clipPath: 'inset(0px)' }}
    >
      {/* Section background video - fixed to viewport, clipped inside section boundaries (Desktop only) */}
      <video
        className="hidden md:block fixed top-0 left-0 w-full h-full object-cover opacity-[0.22] pointer-events-none z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={landingVideo} type="video/mp4" />
      </video>

      {/* Parallax background image (Mobile only) */}
      <motion.div
        className="block md:hidden absolute -top-24 bottom-0 left-0 right-0 bg-cover bg-center bg-no-repeat opacity-[0.08] pointer-events-none z-0 scale-x-[-1]"
        style={{ 
          backgroundImage: `url(${landingBg})`,
          y: yBg
        }}
      />

      {/* Rising Gold Embers/Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {EMBERS.map(ember => (
          <div
            key={ember.id}
            className="absolute rounded-full bg-gold-gradient blur-[0.5px]"
            style={{
              left: ember.left,
              bottom: '-20px',
              width: ember.size,
              height: ember.size,
              animation: `ember-rise ${ember.duration} linear infinite`,
              animationDelay: ember.delay,
              '--drift': ember.drift,
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Animated orange/peach glows here and there for premium depth */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-orange/8 rounded-full blur-[110px] animate-float-slow z-0 pointer-events-none" />
      <div className="absolute -bottom-32 left-[30%] w-[550px] h-[550px] bg-brand-red/5 rounded-full blur-[130px] animate-float-reverse z-0 pointer-events-none" />
      <div className="absolute top-12 right-12 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] animate-float-slow z-0 pointer-events-none" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-stretch px-6 md:pl-16 md:pr-0 z-10">
        {/* Left Side: Premium Typography & CTA */}
        <div className="lg:col-span-7 space-y-8 pr-6 pt-12 md:pt-28 lg:pt-32 pb-6 md:pb-24 self-start relative z-10">
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] text-brand-charcoal">
              A sanctuary of <span className="font-serif italic text-gold-gradient font-bold">faith</span>, hope & love.
            </h1>
            <p className="text-brand-grey text-sm md:text-base leading-relaxed max-w-xl">
              We welcome you to Infant Mary Church, a space dedicated to worship, community growth, and spiritual journey. Join us in celebrating faith and togetherness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-8 md:mt-16">
            <a
              href="#timings"
              className="px-8 py-4 bg-gold-gradient text-brand-charcoal font-bold rounded-full shadow-lg shadow-brand-orange/10 hover:shadow-brand-orange/20 hover:scale-[1.02] transition-all duration-300"
            >
              View Mass Timings
            </a>
          </div>
        </div>

        {/* Right Side: Semicircle Image on desktop, fully circular image on mobile */}
        <div className="lg:col-span-5 w-full flex justify-center md:justify-end items-stretch relative z-10 -mt-6 md:mt-0 md:px-0">
          <div className="relative w-[260px] h-[260px] md:w-[115%] lg:w-[125%] md:h-full aspect-square md:aspect-auto mx-auto md:ml-auto">

            {/* Hollow Gold Ring Accent Frame */}
            <div
              className="absolute -inset-2.5 md:-inset-4 rounded-full md:rounded-l-full md:rounded-r-none border-[3.5px] md:border-[5px] border-transparent -z-20 shadow-md"
              style={{
                background: 'linear-gradient(#faf8f5, #faf8f5) padding-box, linear-gradient(135deg, #9e6b00, #ffea85, #d49b00, #ffea85, #9e6b00) border-box',
                backgroundSize: '100% 100%, 200% auto',
                animation: 'gold-flow 6s ease-in-out infinite'
              }}
            />

            {/* Edge-Glow Shadow Layer */}
            <div className="absolute inset-0 rounded-full md:rounded-l-full md:rounded-r-none shadow-[0_-15px_50px_rgba(197,160,89,0.15)] -z-10 pointer-events-none" />

            {/* Semicircle image container attached to the edge and top on desktop, circular on mobile */}
            <div className="relative w-full h-full rounded-full md:rounded-l-full md:rounded-r-none overflow-hidden border-4 md:border-t-0 md:border-r-0 md:border-b-0 border-white z-10">
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
