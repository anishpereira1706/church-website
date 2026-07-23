'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, PlusCircle, Settings, LogOut, Shield, Eye, EyeOff } from 'lucide-react'
import churchImg from '../../assets/church2.jpg'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showLoginToast, setShowLoginToast] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Check session token on load
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (isLoggingIn) return
    setLoginError('')
    setIsLoggingIn(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('admin_token', data.token)
        setShowLoginToast(true)
        setTimeout(() => setIsAuthenticated(true), 600)
        setTimeout(() => setShowLoginToast(false), 3600)
      } else {
        setLoginError('Invalid administrator password')
      }
    } catch (err) {
      setLoginError('Connection error. Please try again.')
    } finally {
      setIsLoggingIn(false)
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-slate-50/50 text-[#1a2638]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#69788e] hover:text-[#1a2638] transition-colors rounded-lg hover:bg-slate-100 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {loginError && (
                <p className="text-xs text-red-500 mt-2 font-medium">
                  {loginError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-gradient-to-r from-[#9e6b00] to-[#d49b00] text-white font-bold rounded-lg hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
            >
              {isLoggingIn ? 'Authenticating...' : 'Log In'}
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
      {/* Login Success Toast */}
      {showLoginToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-right">
          <div className="flex items-center gap-3 px-6 py-3.5 bg-emerald-50/90 backdrop-blur-md border border-emerald-200/60 rounded-xl shadow-lg shadow-emerald-900/5">
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-800">Login Successful</p>
              <p className="text-[11px] text-emerald-600 font-medium">Welcome to the admin dashboard</p>
            </div>
            <button
              onClick={() => setShowLoginToast(false)}
              className="ml-2 p-1 hover:bg-emerald-100 rounded-full text-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

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
          <div className="md:col-span-7 flex flex-col gap-6">
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

            {/* Card 3: Site Settings */}
            <Link
              href="/admin/settings"
              className="group bg-white/40 border border-white/50 backdrop-blur-md hover:bg-white/70 hover:border-[#c5a059]/40 p-6 rounded-2xl shadow-xl shadow-brand-charcoal/[0.01] hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-between cursor-pointer gap-6 flex-grow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300 shrink-0">
                  <Settings size={22} />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-serif text-lg font-medium text-[#1a2638]">
                    Site Settings
                  </h3>
                  <p className="text-brand-grey text-xs font-light leading-relaxed">
                    Manage mass timings, parish priest profile, contact info, and social links.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] group-hover:translate-x-1 transition-transform shrink-0">
                Open →
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
