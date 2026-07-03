import { useState } from 'react'

function Navbar({ currentTab, setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (tab) => {
    setCurrentTab(tab)
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/5 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal group-hover:text-brand-orange transition-colors">
            Infant Mary Church
          </span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'home' ? 'text-brand-orange' : 'text-brand-charcoal hover:text-brand-orange'
            }`}
          >
            Home
          </button>
          <a 
            href="#timings" 
            className="text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer"
          >
            Mass Timings
          </a>
          <button 
            onClick={() => handleNavClick('history')} 
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'history' ? 'text-brand-orange' : 'text-brand-grey hover:text-brand-orange'
            }`}
          >
            Our History
          </button>
          <a 
            href="#news" 
            className="text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer"
          >
            News & Events
          </a>
        </nav>

        {/* Join Us (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#timings" 
            className="text-xs font-semibold uppercase tracking-wider bg-brand-charcoal hover:bg-brand-orange text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
          >
            Join Us
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brand-charcoal hover:text-brand-orange transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-brand-charcoal/5 shadow-xl flex flex-col p-6 space-y-4 animate-fade-in z-50">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`text-left text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'home' ? 'text-brand-orange' : 'text-brand-charcoal'
            }`}
          >
            Home
          </button>
          <a 
            href="#timings" 
            onClick={() => setIsOpen(false)}
            className="text-left text-sm font-semibold uppercase tracking-wider text-brand-grey hover:text-brand-orange transition-colors"
          >
            Mass Timings
          </a>
          <button 
            onClick={() => handleNavClick('history')} 
            className={`text-left text-sm font-semibold uppercase tracking-wider transition-colors ${
              currentTab === 'history' ? 'text-brand-orange' : 'text-brand-grey'
            }`}
          >
            Our History
          </button>
          <a 
            href="#news" 
            onClick={() => setIsOpen(false)}
            className="text-left text-sm font-semibold uppercase tracking-wider text-brand-grey hover:text-brand-orange transition-colors"
          >
            News & Events
          </a>
          <a 
            href="#timings" 
            onClick={() => setIsOpen(false)}
            className="text-center text-xs font-semibold uppercase tracking-wider bg-brand-charcoal hover:bg-brand-orange text-white py-3 rounded-full transition-all duration-300 shadow-sm block"
          >
            Join Us
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
