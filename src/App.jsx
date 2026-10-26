import { useState } from 'react'
import TopNotification from './components/TopNotification'
import Header from './components/Header'
import Hero from './components/Hero'
import LaporForm from './components/LaporForm'
import LacakTiket from './components/LacakTiket'
import AduanPublik from './components/AduanPublik'
import ProcessSteps from './components/ProcessSteps'
import FAQ from './components/FAQ'
import CTABanner from './components/CTABanner'
import Footer from './components/Footer'
import { pengaduanData } from './data'

function App() {
  const [tickets, setTickets] = useState(pengaduanData)

  const handleAddTicket = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev])
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <TopNotification />
      <Header />
      <main className="flex-1">
        <Hero />
        <LaporForm onAddTicket={handleAddTicket} />
        <LacakTiket tickets={tickets} />
        <AduanPublik data={tickets} />
        <ProcessSteps />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
