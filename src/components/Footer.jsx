function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white/90 border-t border-brand-charcoal/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Address */}
          <div className="md:col-span-6 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white block">
              Infant Mary Church
            </span>
            <p className="text-brand-grey text-xs md:text-sm max-w-sm leading-relaxed text-white/60">
              Katipalla, Mangaluru, Karnataka 575030. <br />
              Established in 1968, dedicated to spiritual fellowship and community service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#timings" className="hover:text-white transition-colors">Mass Timings</a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">News & Updates</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Contact
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Email: contact@infantmarychurch.org <br />
              Phone: +91 824 240XXXX <br />
              Parish Office Hours: 9:00 AM — 5:00 PM
            </p>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] text-white/40 gap-4">
          <p>© 2026 Infant Mary Church. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
