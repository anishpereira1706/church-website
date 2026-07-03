import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HistoryTimeline from './components/HistoryTimeline'
import ParishPriest from './components/ParishPriest'
import NewsSection from './components/NewsSection'
import MassTimings from './components/MassTimings'
import Footer from './components/Footer'

function App() {
  const [currentTab, setCurrentTab] = useState('home')

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${currentTab === 'history' ? 'bg-transparent' : 'bg-white'}`}>
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
