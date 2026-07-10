'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, PlusCircle, Clock, MapPin, LogOut, Shield } from 'lucide-react'

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
      <main className="min-h-screen bg-[#faf8f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-brand-charcoal/[0.04] border border-brand-charcoal/5">
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
    <div className="h-screen w-screen flex flex-col justify-between overflow-hidden bg-[#faf8f5] text-[#1a2638]">
      {/* Premium Header */}
      <header className="bg-white border-b border-[#1a2638]/5 px-8 py-5 flex items-center justify-between shrink-0">
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

      {/* Main Console Hub - Grid of cards */}
      <main className="flex-grow p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Manage News */}
          <Link
            href="/admin/announcements"
            className="group bg-white p-8 rounded-2xl border border-[#1a2638]/5 shadow-xl shadow-brand-charcoal/[0.01] hover:shadow-brand-charcoal/[0.04] hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                <FileText size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-medium text-[#1a2638]">
                  Manage News & Feed
                </h2>
                <p className="text-brand-grey text-sm font-light leading-relaxed">
                  View, edit, or delete existing newsletters, announcements, and blog notices.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Open Panel →
            </span>
          </Link>

          {/* Card 2: Create Announcement */}
          <Link
            href="/admin/announcements/new"
            className="group bg-white p-8 rounded-2xl border border-[#1a2638]/5 shadow-xl shadow-brand-charcoal/[0.01] hover:shadow-brand-charcoal/[0.04] hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-white transition-colors duration-300">
                <PlusCircle size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-medium text-[#1a2638]">
                  Create New Announcement
                </h2>
                <p className="text-brand-grey text-sm font-light leading-relaxed">
                  Publish a new event, sermon summaries, or notices with primary posters and gallery photos.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#c5a059] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Create Form →
            </span>
          </Link>

          {/* Card 3: Mass Timings (Disabled for now) */}
          <div
            className="bg-white/60 p-8 rounded-2xl border border-slate-100 flex flex-col justify-between opacity-70 cursor-not-allowed space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Clock size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-medium text-[#1a2638]">
                  Mass Timings
                </h2>
                <p className="text-brand-grey text-sm font-light leading-relaxed">
                  Update schedules for Sunday and weekday masses, seasonal feasts, and services.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              Coming Soon
            </span>
          </div>

          {/* Card 4: Wards (Disabled for now) */}
          <div
            className="bg-white/60 p-8 rounded-2xl border border-slate-100 flex flex-col justify-between opacity-70 cursor-not-allowed space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl font-medium text-[#1a2638]">
                  Parish Wards & Gurkars
                </h2>
                <p className="text-brand-grey text-sm font-light leading-relaxed">
                  Manage the directory of Wards, contact details for Ward representatives, and schedules.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              Coming Soon
            </span>
          </div>
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="bg-white border-t border-[#1a2638]/5 px-8 py-4 text-center shrink-0">
        <p className="text-[10px] text-[#69788e] uppercase tracking-widest font-semibold">
          Infant Mary Catholic Church, Katipalla • Secure Access Console
        </p>
      </footer>
    </div>
  )
}
