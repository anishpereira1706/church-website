'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Shield, Save, Church, User, Mail, Link2, Plus, Trash2 } from 'lucide-react'
import { DEFAULT_SETTINGS } from '../../../lib/defaults'
import churchImg from '../../../assets/church2.jpg'

const SECTIONS = [
  { id: 'massTimings', label: 'Mass Timings', icon: Church },
  { id: 'parishPriest', label: 'Parish Priest', icon: User },
  { id: 'contact', label: 'Contact Info', icon: Mail },
  { id: 'socialLinks', label: 'Social Links', icon: Link2 },
]

export default function SiteSettingsPage() {
  const router = useRouter()

  // Form state for each section
  const [massTimings, setMassTimings] = useState(DEFAULT_SETTINGS.massTimings)
  const [parishPriest, setParishPriest] = useState(DEFAULT_SETTINGS.parishPriest)
  const [contact, setContact] = useState(DEFAULT_SETTINGS.contact)
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SETTINGS.socialLinks)

  const [activeSection, setActiveSection] = useState('massTimings')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', text }

  // Verify auth and load settings
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin')
      return
    }
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/settings')
      const data = await res.json()
      if (data.success && data.data) {
        const s = data.data
        if (s.massTimings) setMassTimings(s.massTimings)
        if (s.parishPriest) setParishPriest(s.parishPriest)
        if (s.contact) setContact(s.contact)
        if (s.socialLinks) setSocialLinks(s.socialLinks)
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const showToast = (type, text) => {
    setToast({ type, text })
    setTimeout(() => setToast(null), 3000)
  }

  // ---- Mass Timing helpers ----
  const updateWeekdayMass = (index, field, value) => {
    setMassTimings(prev => {
      const updated = [...prev.weekdayMasses]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, weekdayMasses: updated }
    })
  }
  const addWeekdayMass = () => {
    setMassTimings(prev => ({
      ...prev,
      weekdayMasses: [...prev.weekdayMasses, { label: '', time: '', period: 'AM', language: '' }]
    }))
  }
  const removeWeekdayMass = (index) => {
    setMassTimings(prev => ({
      ...prev,
      weekdayMasses: prev.weekdayMasses.filter((_, i) => i !== index)
    }))
  }

  const updateSundayMass = (index, field, value) => {
    setMassTimings(prev => {
      const updated = [...prev.sundayMasses]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, sundayMasses: updated }
    })
  }
  const addSundayMass = () => {
    setMassTimings(prev => ({
      ...prev,
      sundayMasses: [...prev.sundayMasses, { label: '', time: '', period: 'AM', language: '' }]
    }))
  }
  const removeSundayMass = (index) => {
    setMassTimings(prev => ({
      ...prev,
      sundayMasses: prev.sundayMasses.filter((_, i) => i !== index)
    }))
  }

  // ---- Save handler ----
  const handleSave = async () => {
    const token = sessionStorage.getItem('admin_token')
    setIsSaving(true)

    try {
      const body = {
        massTimings,
        parishPriest,
        contact,
        socialLinks,
      }

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.success) {
        showToast('success', 'Settings saved successfully!')
      } else {
        showToast('error', data.error || 'Failed to save settings.')
      }
    } catch (err) {
      showToast('error', 'Connection error. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // ---- Render helpers ----
  const renderMassTimingsForm = () => (
    <div className="space-y-8">
      {/* Weekday Masses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#1a2638] uppercase tracking-wider">Weekday Masses</h3>
          <button
            type="button"
            onClick={addWeekdayMass}
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#c5a059] hover:bg-[#c5a059]/10 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={14} />
            Add Entry
          </button>
        </div>
        <div className="space-y-3">
          {massTimings.weekdayMasses.map((m, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 p-3 bg-white/50 border border-slate-200/60 rounded-xl">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Label</label>
                <input
                  value={m.label}
                  onChange={(e) => updateWeekdayMass(i, 'label', e.target.value)}
                  placeholder="e.g. Daily Mass (Mon — Thu, Sat)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <div className="w-20">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Time</label>
                <input
                  value={m.time}
                  onChange={(e) => updateWeekdayMass(i, 'time', e.target.value)}
                  placeholder="6:45"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <div className="w-20">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Period</label>
                <select
                  value={m.period}
                  onChange={(e) => updateWeekdayMass(i, 'period', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Language</label>
                <input
                  value={m.language}
                  onChange={(e) => updateWeekdayMass(i, 'language', e.target.value)}
                  placeholder="Konkani"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <button
                type="button"
                onClick={() => removeWeekdayMass(i)}
                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sunday Masses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#1a2638] uppercase tracking-wider">Sunday Masses</h3>
          <button
            type="button"
            onClick={addSundayMass}
            className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#c5a059] hover:bg-[#c5a059]/10 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={14} />
            Add Entry
          </button>
        </div>
        <div className="space-y-3">
          {massTimings.sundayMasses.map((m, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 p-3 bg-white/50 border border-slate-200/60 rounded-xl">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Label</label>
                <input
                  value={m.label}
                  onChange={(e) => updateSundayMass(i, 'label', e.target.value)}
                  placeholder="e.g. Morning Mass"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <div className="w-20">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Time</label>
                <input
                  value={m.time}
                  onChange={(e) => updateSundayMass(i, 'time', e.target.value)}
                  placeholder="7:15"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <div className="w-20">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Period</label>
                <select
                  value={m.period}
                  onChange={(e) => updateSundayMass(i, 'period', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#69788e] mb-1">Language</label>
                <input
                  value={m.language}
                  onChange={(e) => updateSundayMass(i, 'language', e.target.value)}
                  placeholder="Konkani"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSundayMass(i)}
                className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderParishPriestForm = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Priest Name</label>
        <input
          value={parishPriest.name}
          onChange={(e) => setParishPriest({ ...parishPriest, name: e.target.value })}
          placeholder="Fr. Santhosh Lobo"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Photo URL</label>
        <input
          value={parishPriest.photoUrl}
          onChange={(e) => setParishPriest({ ...parishPriest, photoUrl: e.target.value })}
          placeholder="https://... (leave blank to use default photo)"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 font-mono text-xs"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Welcome Message</label>
        <textarea
          value={parishPriest.message}
          onChange={(e) => setParishPriest({ ...parishPriest, message: e.target.value })}
          placeholder="Priest's welcome message..."
          rows={4}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 leading-relaxed"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Title</label>
        <input
          value={parishPriest.title}
          onChange={(e) => setParishPriest({ ...parishPriest, title: e.target.value })}
          placeholder="Parish Priest"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Location</label>
        <input
          value={parishPriest.location}
          onChange={(e) => setParishPriest({ ...parishPriest, location: e.target.value })}
          placeholder="Infant Mary Church, Katipalla"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
    </div>
  )

  const renderContactForm = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Email</label>
        <input
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="contact@infantmarychurch.org"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Phone</label>
        <input
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="+91 824 240XXXX"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Address</label>
        <textarea
          value={contact.address}
          onChange={(e) => setContact({ ...contact, address: e.target.value })}
          placeholder="Katipalla, Mangaluru, Karnataka 575030."
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Office Hours</label>
        <input
          value={contact.officeHours}
          onChange={(e) => setContact({ ...contact, officeHours: e.target.value })}
          placeholder="9:00 AM — 5:00 PM"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60"
        />
      </div>
    </div>
  )

  const renderSocialLinksForm = () => (
    <div className="space-y-5">
      <p className="text-[11px] text-[#69788e] font-light leading-relaxed">
        Enter full URLs including <span className="font-mono text-[#c5a059]">https://</span>. Leave blank to hide the icon.
      </p>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Instagram URL</label>
        <input
          value={socialLinks.instagram}
          onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
          placeholder="https://instagram.com/..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 font-mono text-xs"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">Facebook URL</label>
        <input
          value={socialLinks.facebook}
          onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
          placeholder="https://facebook.com/..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 font-mono text-xs"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#69788e] mb-1.5">YouTube URL</label>
        <input
          value={socialLinks.youtube}
          onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
          placeholder="https://youtube.com/..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40 bg-white/60 font-mono text-xs"
        />
      </div>
    </div>
  )

  const renderFormBySection = () => {
    switch (activeSection) {
      case 'massTimings': return renderMassTimingsForm()
      case 'parishPriest': return renderParishPriestForm()
      case 'contact': return renderContactForm()
      case 'socialLinks': return renderSocialLinksForm()
      default: return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[#69788e] text-sm font-light italic">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-[#1a2638] selection:bg-[#c5a059]/20 pb-24 overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-center bg-no-repeat opacity-[0.42] pointer-events-none z-0 bg-cover lg:bg-[length:100%_auto]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(250, 248, 245, 0.5) 0%, rgba(250, 248, 245, 0.8) 100%), url(${churchImg.src})`
        }}
      />

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-right">
          <div className={`flex items-center gap-3 px-5 py-3 ${
            toast.type === 'success'
              ? 'bg-emerald-50/90 border-emerald-200/60'
              : 'bg-rose-50/90 border-rose-200/60'
          } backdrop-blur-md border rounded-xl shadow-lg`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
            }`}>
              {toast.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <p className={`text-xs font-bold ${
              toast.type === 'success' ? 'text-emerald-800' : 'text-rose-800'
            }`}>{toast.text}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-25 bg-white/40 backdrop-blur-md border-b border-white/50 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 hover:bg-slate-50 rounded-lg text-[#69788e] hover:text-[#1a2638] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-1">
              <Shield size={12} />
              Admin Panel
            </span>
            <h1 className="font-serif text-2xl text-[#1a2638]">Site Settings</h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-5 py-3 bg-gradient-to-r from-[#9e6b00] to-[#d49b00] text-white hover:opacity-95 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1450px] mx-auto px-8 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Section Navigation */}
          <div className="lg:col-span-3 space-y-2 lg:sticky lg:top-24">
            <div className="bg-white/40 border border-white/50 backdrop-blur-md p-4 rounded-2xl shadow-xl space-y-1">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    activeSection === section.id
                      ? 'bg-[#c5a059]/10 text-[#c5a059] font-bold shadow-sm border border-[#c5a059]/20'
                      : 'text-[#69788e] hover:text-[#1a2638] hover:bg-white/50'
                  }`}
                >
                  <section.icon size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Active Section Form */}
          <div className="lg:col-span-9">
            <div className="bg-white/40 border border-white/50 backdrop-blur-md p-8 rounded-2xl shadow-xl">
              <div className="pb-5 mb-6 border-b border-[#1a2638]/5 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#1a2638]">
                  {SECTIONS.find(s => s.id === activeSection)?.label}
                </h2>
              </div>
              {renderFormBySection()}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
