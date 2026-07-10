'use client'

import { useState } from 'react'

function Navbar({ currentTab, setCurrentTab }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (tab) => {
    setCurrentTab(tab)
    setIsOpen(false)
    window.location.hash = '' // Clear hash on direct tab switch
  }

  const handleAnchorClick = (e, targetHash) => {
    if (currentTab !== 'home') {
      e.preventDefault()
      setCurrentTab('home')
      window.location.hash = targetHash
    }
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/5 bg-white/70 backdrop-blur-md">
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Left Side: Logo */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          {/* Minimalist Cross Icon */}
          <div className="text-brand-orange transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-5-10h10" />
            </svg>
          </div>
          <span className="font-sans text-lg md:text-xl font-extrabold tracking-tight text-brand-charcoal group-hover:text-brand-orange transition-colors">
            Infant Mary Church, Katipalla
          </span>
        </button>
        
        {/* Right Side: Desktop Navigation Links (gap expanded to 8) */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`relative py-1 text-sm font-medium transition-colors cursor-pointer group ${
              currentTab === 'home' ? 'text-brand-orange' : 'text-brand-charcoal'
            }`}
          >
            Home
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transition-transform duration-300 origin-center ${
              currentTab === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
          <a 
            href="#timings" 
            onClick={(e) => handleAnchorClick(e, '#timings')}
            className="relative py-1 text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer group"
          >
            Mass Timings
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
          </a>
          <button 
            onClick={() => handleNavClick('history')} 
            className={`relative py-1 text-sm font-medium transition-colors cursor-pointer group ${
              currentTab === 'history' ? 'text-brand-orange' : 'text-brand-grey'
            }`}
          >
            Our History
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transition-transform duration-300 origin-center ${
              currentTab === 'history' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`} />
          </button>
          <a 
            href="#news" 
            onClick={(e) => handleAnchorClick(e, '#news')}
            className="relative py-1 text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer group"
          >
            News & Events
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-orange transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100" />
          </a>
        </nav>

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
            onClick={(e) => handleAnchorClick(e, '#timings')}
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
            onClick={(e) => handleAnchorClick(e, '#news')}
            className="text-left text-sm font-semibold uppercase tracking-wider text-brand-grey hover:text-brand-orange transition-colors"
          >
            News & Events
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
