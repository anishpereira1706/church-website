function Navbar({ currentTab, setCurrentTab }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-charcoal/5 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <button 
          onClick={() => setCurrentTab('home')} 
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-brand-charcoal group-hover:text-brand-orange transition-colors">
            Infant Mary Church
          </span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setCurrentTab('home')} 
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'home' ? 'text-brand-orange' : 'text-brand-charcoal hover:text-brand-orange'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentTab('home')} 
            className="text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer"
          >
            Mass Timings
          </button>
          <button 
            onClick={() => setCurrentTab('history')} 
            className={`text-sm font-medium transition-colors cursor-pointer ${
              currentTab === 'history' ? 'text-brand-orange' : 'text-brand-grey hover:text-brand-orange'
            }`}
          >
            Our History
          </button>
          <button 
            onClick={() => setCurrentTab('home')} 
            className="text-sm font-medium text-brand-grey hover:text-brand-orange transition-colors cursor-pointer"
          >
            Community
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentTab('home')} 
            className="text-xs font-semibold uppercase tracking-wider bg-brand-charcoal hover:bg-brand-orange text-white px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
          >
            Join Us
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
