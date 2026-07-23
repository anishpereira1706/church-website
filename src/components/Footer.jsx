'use client'

import { useState, useEffect } from 'react'
import { DEFAULT_SETTINGS } from '../lib/defaults'

function Footer() {
  const [contact, setContact] = useState(DEFAULT_SETTINGS.contact)
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SETTINGS.socialLinks)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data.success && data.data) {
          if (data.data.contact) setContact(data.data.contact)
          if (data.data.socialLinks) setSocialLinks(data.data.socialLinks)
        }
      } catch (err) {
        console.error('Failed to load footer settings:', err)
      }
    }
    loadSettings()
  }, [])

  return (
    <footer className="bg-[#0b1017] text-white/80 relative overflow-hidden">
      {/* Premium Thin Gold Divider Line at the top */}
      <div className="h-[2px] w-full bg-gold-gradient" />

      <div className="w-full px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/50">
          
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
              {contact.address} <br />
              Established in 1968, dedicated to spiritual fellowship, community growth, and service.
            </p>

            {/* Social Icons Group */}
            <div className="flex gap-3 pt-2">
              {socialLinks.instagram && socialLinks.instagram !== '#' && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all duration-300 border border-white/5"
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              {socialLinks.facebook && socialLinks.facebook !== '#' && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all duration-300 border border-white/5"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
              )}
              {socialLinks.youtube && socialLinks.youtube !== '#' && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all duration-300 border border-white/5"
                  aria-label="YouTube"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
              )}
            </div>
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
              {contact.email && <>Email: {contact.email} <br /></>}
              {contact.phone && <>Phone: {contact.phone} <br /></>}
              {contact.officeHours && <>Parish Office Hours: {contact.officeHours}</>}
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
