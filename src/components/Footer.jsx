function Footer() {
  return (
    <footer className="bg-[#0b1017] text-white/80 relative overflow-hidden">
      {/* Premium Thin Gold Divider Line at the top */}
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="w-full px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & Address */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              {/* Minimalist Gold Cross Icon */}
              <div className="text-brand-orange">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m-5-10h10" />
                </svg>
              </div>
              <span className="font-sans text-lg font-extrabold tracking-tight text-white">
                Infant Mary Church, Katipalla
              </span>
            </div>
            
            <p className="text-brand-grey text-xs md:text-sm max-w-sm leading-relaxed text-white/50 font-light">
              Katipalla, Mangaluru, Karnataka 575030. <br />
              Established in 1968, dedicated to spiritual fellowship, community growth, and service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#timings" className="hover:text-white transition-colors duration-200">Mass Timings</a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors duration-200">News & Updates</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Contact
            </h4>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Email: contact@infantmarychurch.org <br />
              Phone: +91 824 240XXXX <br />
              Parish Office Hours: 9:00 AM — 5:00 PM
            </p>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] text-white/40 gap-4">
          <p>© 2026 Infant Mary Church, Katipalla. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
