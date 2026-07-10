'use client'

import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HistoryTimeline from './components/HistoryTimeline'
import ParishPriest from './components/ParishPriest'
import NewsSection from './components/NewsSection'
import MassTimings from './components/MassTimings'
import Footer from './components/Footer'

function App() {
  const [currentTab, setCurrentTab] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef(null)

  // Initialize Lenis Momentum Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    // When tab changes, reset scroll position and recalculate DOM bounds
    if (lenisRef.current) {
      if (window.location.hash) {
        const hash = window.location.hash
        setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.resize()
            lenisRef.current.scrollTo(hash, { offset: -80, duration: 1.4 })
          }
        }, 150)
      } else {
        lenisRef.current.scrollTo(0, { immediate: true })
        setTimeout(() => {
          if (lenisRef.current) lenisRef.current.resize()
        }, 50)
      }
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      } else {
        setScrollProgress(0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentTab])

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${currentTab === 'history' ? 'bg-transparent' : 'bg-brand-peach'}`}>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-rose-500 via-brand-orange to-brand-red z-[9999] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex-grow">
        {currentTab === 'home' ? (
          <>
            <Hero />
            <ParishPriest />
            <NewsSection />
            <MassTimings />
          </>
        ) : (
          <HistoryTimeline />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
