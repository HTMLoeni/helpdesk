import { useState, useEffect } from 'react'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-surface-container-lowest/95 backdrop-blur-md shadow-sm' : 'bg-surface/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto h-20 px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-lg">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-primary font-bold tracking-tight">LAPOR-DAERAH</span>
              <span className="font-caption text-caption text-on-surface-variant hidden sm:inline">Pemerintah Terbuka, Aspirasi Nyata</span>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            <a className="px-3 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-container font-label-md transition-colors" href="#">Beranda</a>
            <a className="px-3 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-container font-label-md transition-colors" href="#lapor-form">Buat Aduan</a>
            <a className="px-3 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-container font-label-md transition-colors" href="#lacak-tiket">Lacak Tiket</a>
            <a className="px-3 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-container font-label-md transition-colors" href="#aduan-publik">Aduan Publik</a>
            <a className="px-3 py-2 rounded-lg text-on-surface hover:text-primary hover:bg-surface-container font-label-md transition-colors" href="#alur-faq">Alur &amp; FAQ</a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md transition-colors" href="#lacak-tiket">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Cek Status
          </a>
          <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md shadow-sm transition-all" href="#lapor-form">
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            Lapor Sekarang
          </a>
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-lg text-on-surface hover:bg-surface-container"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-[24px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-b border-surface-container px-margin py-4 flex flex-col gap-2">
          <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-label-md" href="#">Beranda</a>
          <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-label-md" href="#lapor-form">Buat Aduan</a>
          <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-label-md" href="#lacak-tiket">Lacak Tiket</a>
          <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-label-md" href="#aduan-publik">Aduan Publik</a>
          <a onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-surface-container text-on-surface font-label-md" href="#alur-faq">Alur &amp; FAQ</a>
        </div>
      )}
    </header>
  )
}

export default Header
