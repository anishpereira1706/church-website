'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, PlusCircle, Clock, MapPin, LogOut, Shield } from 'lucide-react'
import churchImg from '../../assets/church2.jpg'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // Check session token on load
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token === 'authenticated-session-token') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('admin_token', data.token)
        setIsAuthenticated(true)
      } else {
        setLoginError('Invalid administrator password')
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return (
      <main className="relative min-h-screen bg-[#faf8f5] flex items-center justify-center px-6 overflow-hidden">
        {/* Background image matching landing page */}
        <div 
          className="fixed inset-0 bg-center bg-no-repeat opacity-[0.35] pointer-events-none z-0 bg-cover lg:bg-[length:100%_auto]" 
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(250, 248, 245, 0.6) 0%, rgba(250, 248, 245, 0.85) 100%), url(${churchImg.src})`
          }}
        />
        <div className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-[#1a2638]/5">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a059] flex items-center justify-center gap-1.5">
              <Shield size={14} />
              Admin Control Panel
            </span>
            <h1 className="font-serif text-3xl font-light text-[#1a2638]">
              Infant Mary Church
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#69788e] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-slate-50/50 text-[#1a2638]"
                required
              />
              {loginError && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#9e6b00] to-[#d49b00] text-white font-bold rounded-lg hover:opacity-95 transition-opacity cursor-pointer shadow-md"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#faf8f5] text-[#1a2638]">
      {/* Background image matching landing page */}
      <div 
        className="fixed inset-0 bg-center bg-no-repeat opacity-[0.42] pointer-events-none z-0 bg-cover lg:bg-[length:100%_auto]" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(250, 248, 245, 0.5) 0%, rgba(250, 248, 245, 0.8) 100%), url(${churchImg.src})`
        }}
      />
      {/* Premium Header */}
      <header className="relative z-10 bg-white/40 backdrop-blur-md border-b border-white/50 px-8 py-5 flex items-center justify-between shrink-0">
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-1">
            <Shield size={12} />
            Administrator Console
          </span>
          <h1 className="font-serif text-2xl text-[#1a2638]">
            Infant Mary Church Dashboard
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#69788e] hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </header>

      {/* Main Console Hub */}
      <main className="relative z-10 flex-grow p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Panel: Welcome & Status Info */}
          <div className="md:col-span-5 bg-white/40 border border-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.01] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] block">
                System Status: Online
              </span>
              <h2 className="font-serif text-2xl text-[#1a2638] font-light leading-tight">
                Welcome Back, <br />
                <span className="font-bold text-[#c5a059] italic font-serif">Administrator</span>
              </h2>
              <p className="text-brand-grey text-sm font-light leading-relaxed">
                Use this secure portal to update the parish community on news, feast celebrations, and notice board changes.
              </p>
            </div>
            
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase font-bold tracking-wider text-[#69788e]">
                Connected to MongoDB Database
              </span>
            </div>
          </div>

          {/* Right Panel: Actions */}
          <div className="md:col-span-7 flex flex-col justify-between gap-6">
            {/* Card 1: Manage News */}
            <Link
              href="/admin/announcements"
              className="group bg-white/40 border border-white/50 backdrop-blur-md hover:bg-white/70 hover:border-[#c5a059]/40 p-6 rounded-2xl shadow-xl shadow-brand-charcoal/[0.01] hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-between cursor-pointer gap-6 flex-grow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300 shrink-0">
                  <FileText size={22} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-medium text-[#1a2638]">
                    Manage News & Feed
                  </h3>
                  <p className="text-brand-grey text-xs font-light leading-relaxed">
                    View, edit, or delete existing newsletters, announcements, and notices.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] group-hover:translate-x-1 transition-transform shrink-0">
                Open →
              </span>
            </Link>

            {/* Card 2: Create Announcement */}
            <Link
              href="/admin/announcements/new"
              className="group bg-white/40 border border-white/50 backdrop-blur-md hover:bg-white/70 hover:border-[#c5a059]/40 p-6 rounded-2xl shadow-xl shadow-brand-charcoal/[0.01] hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-between cursor-pointer gap-6 flex-grow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300 shrink-0">
                  <PlusCircle size={22} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-medium text-[#1a2638]">
                    Create New Post
                  </h3>
                  <p className="text-brand-grey text-xs font-light leading-relaxed">
                    Publish a new news item, notice, or event with poster and gallery photos.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] group-hover:translate-x-1 transition-transform shrink-0">
                Create →
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="relative z-10 bg-white/45 backdrop-blur-md border-t border-[#1a2638]/5 px-8 py-4 text-center shrink-0">
        <p className="text-[10px] text-[#69788e] uppercase tracking-widest font-semibold">
          Infant Mary Catholic Church, Katipalla • Secure Access Console
        </p>
      </footer>
    </div>
  )
}
