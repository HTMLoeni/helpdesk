import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabaseApi } from '../supabaseClient'

const STATUS_OPTIONS = [
  { value: 'baru', label: '1. Baru Masuk (Antrean Tinjau)' },
  { value: 'diverifikasi', label: '2. Diverifikasi & Teruskan Disposisi' },
  { value: 'diproses', label: '3. Sedang Ditindaklanjuti OPD' },
  { value: 'selesai', label: '4. Selesai (Solusi Tuntas)' },
  { value: 'ditolak', label: '5. Tolak (Bukan Kewenangan / Spam)' },
]

export const ManajemenPengaduan = () => {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterKeyword, setFilterKeyword] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterOpd, setFilterOpd] = useState('all')
  const [filterDate, setFilterDate] = useState('month')
  const [walkInModalOpen, setWalkInModalOpen] = useState(false)
  const [toast, setToast] = useState({ open: false, title: '', desc: '' })

  const showToast = (title, desc) => {
    setToast({ open: true, title, desc })
    setTimeout(() => {
      setToast({ open: false, title: '', desc: '' })
    }, 3500)
  }

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await supabaseApi.getAll()
      setTickets(data)
    } catch (err) {
      setError(err.message || 'Gagal memuat data pengaduan.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const handleSelectComplaint = (ticketId) => {
    const ticket = tickets.find((t) => t.nomor_tiket === ticketId)
    if (!ticket) return
    setSelectedTicket(ticket)
    showToast(`Tiket #${ticketId} Aktif`, 'Data lengkap tiket dimuat ke panel tindakan.')
  }

  const handleSubmitTanggapan = async (e) => {
    e.preventDefault()
    if (!selectedTicket) return
    try {
      await supabaseApi.update(selectedTicket.id, {
        status: STATUS_OPTIONS.find((s) => s.value === selectedTicket.status) ? selectedTicket.status : 'baru',
      })
      showToast('Pembaruan Disimpan!', `Status dan tanggapan resmi #${selectedTicket.nomor_tiket} berhasil dipublikasikan ke warga.`)
    } catch (err) {
      showToast('Error', err.message || 'Gagal menyimpan pembaruan.')
    }
  }

  const handleUpdateStatus = (newStatus) => {
    if (!selectedTicket) return
    setSelectedTicket({ ...selectedTicket, status: newStatus })
  }

  const handleDeleteTicket = async (e, ticketId) => {
    e.stopPropagation()
    if (!window.confirm('Hapus data tiket ini? Tindakan tidak dapat diurungkan.')) return
    try {
      const ticket = tickets.find((t) => t.nomor_tiket === ticketId)
      await supabaseApi.remove(ticket.id)
      setTickets(tickets.filter((t) => t.id !== ticket.id))
      if (selectedTicket && selectedTicket.id === ticket.id) {
        setSelectedTicket(null)
      }
      showToast('Tiket Dihapus', `Data #${ticketId} berhasil dihapus.`)
    } catch (err) {
      showToast('Error', err.message || 'Gagal menghapus data tiket.')
    }
  }

  const handleOpenWalkIn = () => {
    setWalkInModalOpen(true)
  }

  const handleCloseWalkIn = () => {
    setWalkInModalOpen(false)
  }

  const handleSimpanAduanManual = async (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const payload = {
      nomor_tiket: formData.get('nomor_tiket') || `TKT-${Date.now()}`,
      nama_pelapor: formData.get('nama_pelapor') || '',
      kategori_layanan: formData.get('kategori_layanan') || '',
      isi_laporan: formData.get('isi_laporan') || '',
      lokasi_kejadian: formData.get('lokasi_kejadian') || '',
      instansi_tujuan: formData.get('instansi_tujuan') || '',
      lampiran_bukti: formData.get('lampiran_bukti') || null,
      rating_kepuasan: formData.get('rating_kepuasan') ? parseInt(formData.get('rating_kepuasan'), 10) : null,
      status: 'baru',
    }
    try {
      await supabaseApi.insert(payload)
      setWalkInModalOpen(false)
      form.reset()
      await fetchTickets()
      showToast('Tiket Diterbitkan!', 'Pengaduan walk-in berhasil didaftarkan ke sistem.')
    } catch (err) {
      showToast('Error', err.message || 'Gagal menyimpan pengaduan walk-in.')
    }
  }

  const handleEkspor = () => {
    showToast(
      'Mengunduh Laporan...',
      'Format Excel/PDF rekapitulasi sedang di-generate oleh server Diskominfo.',
    )
  }

  const handleResetFilter = () => {
    setFilterKeyword('')
    setFilterStatus('all')
    setFilterOpd('all')
    setFilterDate('month')
  }

  const rowClasses = (ticketId) =>
    `hover:bg-surface-container-low/80 cursor-pointer transition-colors${selectedTicket?.nomor_tiket === ticketId ? ' bg-primary-fixed/20' : ''}`

  const filteredTickets = tickets.filter((t) => {
    const matchKeyword =
      !filterKeyword ||
      t.nomor_tiket.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      t.nama_pelapor.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      t.lokasi_kejadian.toLowerCase().includes(filterKeyword.toLowerCase())
    const matchStatus = filterStatus === 'all' || t.status === filterStatus
    const matchOpd = filterOpd === 'all' || t.instansi_tujuan.toLowerCase().includes(filterOpd.toLowerCase())
    return matchKeyword && matchStatus && matchOpd
  })

  return (
    <div className="bg-background font-body-md text-on-surface antialiased">
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between py-space-lg">
        <div className="flex flex-col">
          <div className="px-space-lg pb-space-lg flex items-center gap-space-sm">
            <img
              alt="Logo LAPOR-DAERAH"
              className="h-10 w-10 object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1URqGufw98CJQQwVYZj8qcOrdQtOENNcUVJc2Ts_X4PW25j8NWn5OHVdnLW9cPCHHEbpps14o8pxDlqjXcj9bsg2FEi_GGvD1lE8nYrf76tneOtIFvRbDBiIjwAn2ro2c8bGk321pG8iA09X82DkyhF5vlzjKYbdccrVBzw5UojvK7vc_hHpI4NNGCbeT-JKFMoxaF6zUN2iKsu9_a68dSBjaxNC7i3p8DIcp1Csver8G35_Gs0i28rrdM"
            />
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-primary tracking-tight leading-tight">
                LAPOR ADMIN
              </span>
              <span className="font-caption text-caption text-on-surface-variant">Sistem Helpdesk Pemda</span>
            </div>
          </div>
          <div className="px-space-md mb-space-sm">
            <span className="px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Navigasi Petugas
            </span>
          </div>
          <nav className="flex flex-col gap-1 px-space-md" data-active-classes="bg-primary-container text-on-primary-container font-semibold rounded-lg">
            <a
              aria-current="page"
              className="flex items-center gap-3 px-space-md py-2.5 transition-colors bg-primary-container text-on-primary-container font-semibold rounded-lg"
              data-path="manajemen-pengaduan"
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">inbox</span>
              <span className="font-label-md text-label-md">Manajemen Tiket</span>
            </a>
            <Link
              to="/"
              className="flex items-center gap-3 px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              data-path="portal-pengaduan-masyarakat"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
              <span className="font-label-md text-label-md">Lihat Portal Publik</span>
            </Link>
          </nav>
        </div>
        <div className="px-space-lg pt-space-md flex flex-col gap-space-xs">
          <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">Diskominfo Daerah</span>
            </div>
            <span className="font-caption text-caption text-on-surface-variant">
              Server Sinkronisasi Aktif
            </span>
          </div>
        </div>
      </aside>
      <div className="pl-64 flex flex-col min-h-screen">
        <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-margin">
          <div className="flex items-center gap-space-sm flex-1 max-w-md">
            <div className="flex items-center gap-2 w-full px-space-md py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">search</span>
              <span className="font-body-sm text-body-sm text-outline">
                Cari nomor tiket (#LAPOR-XXXXX)...
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 rounded-lg text-primary hover:bg-surface-container-high transition-colors font-label-md text-label-md"
              data-path="portal-pengaduan-masyarakat"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="">Ke Portal Publik</span>
            </Link>
            <button
              aria-label="Notifikasi Aduan Baru"
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-tertiary rounded-full ring-2 ring-surface-container-lowest"></span>
            </button>
            <div className="flex items-center gap-space-sm pl-space-sm">
              <div className="flex flex-col text-right hidden md:flex">
                <span className="font-label-md text-label-md text-on-surface">Pak Budi Santoso</span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Admin Helpdesk Teknis
                </span>
              </div>
              <img
                alt="Pak Budi Santoso"
                className="w-10 h-10 rounded-full object-cover border border-surface-container shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWeI6dka7SXTzOJfCuSVJPgfHnF7jtMjZGCXM984b9XbUVO7SphEhTsi7eE8kcI0CSbZy_xBKILxqFWk-ZefC0dB84W1weU6FKLYlAZ0JHXbQT9o8tJypiSZo-t71Wbhh_0R8g5Ap9BYfnkhLLycmedy0AoMf0ZwYjM2guTv2khPLKNUATnfhdKJDGB2PD7-ut4X_y_mdkcH5TVwOCB3lUd8m6jgukJLv9tKM88KB9K6VBRAMADL2f"
              />
            </div>
          </div>
        </header>
        <main className="relative pt-16 bg-background flex-1 w-full">
          <div className="flex flex-col w-full">
            <section className="w-full bg-surface-container-lowest px-margin py-space-sm flex flex-wrap items-center justify-between gap-space-sm shadow-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="p-2 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">shield_person</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                      Sistem Helpdesk Terpadu
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      Tingkat Pemerintahan Daerah
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                    Pusat Kendali Pengaduan{' & '}Aspirasi Warga
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm flex-wrap">
                <div className="hidden xl:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  <span className="font-caption text-caption">
                    SLA Rata-rata Penanganan:{' '}
                    <strong className="text-on-surface">2.4 Hari Kerja</strong>
                  </span>
                </div>
                <button
                  className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
                  id="btnEkspor"
                  type="button"
                  onClick={handleEkspor}
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  <span className="">Ekspor Rekap (XLS/PDF)</span>
                </button>
                <button
                  className="flex items-center gap-2 px-space-md py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors shadow-sm font-label-md text-label-md"
                  id="btnTambahAduan"
                  type="button"
                  onClick={handleOpenWalkIn}
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span className="">+ Input Pengaduan Walk-in</span>
                </button>
              </div>
            </section>

            {/* Metric Summary Bento Grid */}
            <section className="px-margin pt-space-lg pb-space-md">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-space-md">
                {/* Total */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      Total Aduan Masuk
                    </span>
                    <span className="p-1.5 rounded-lg bg-surface-container-low text-primary material-symbols-outlined text-[18px]">
                      inbox
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                      {tickets.length}
                    </div>
                    <div className="flex items-center gap-1 font-caption text-caption text-primary mt-1">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      <span className="">+12% bln ini</span>
                    </div>
                  </div>
                </div>
                {/* Baru */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between ring-1 ring-error/20">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-error font-medium">Baru (Verifikasi)</span>
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold animate-pulse">
                      {tickets.filter((t) => t.status === 'baru').length}
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-headline-lg text-headline-lg text-error font-extrabold tracking-tight">
                      {tickets.filter((t) => t.status === 'baru').length}
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Prioritas respon{' < '}4 jam
                    </span>
                  </div>
                </div>
                {/* Disposisi */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      Disposisi OPD
                    </span>
                    <span className="p-1.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed material-symbols-outlined text-[18px]">
                      forward_to_inbox
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-headline-lg text-headline-lg text-secondary font-extrabold tracking-tight">
                      {tickets.filter((t) => t.status === 'diverifikasi').length}
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Menunggu aksi dinas
                    </span>
                  </div>
                </div>
                {/* Diproses */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      Sedang Ditindak
                    </span>
                    <span className="p-1.5 rounded-lg bg-surface-container-high text-on-surface material-symbols-outlined text-[18px]">
                      build
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                      {tickets.filter((t) => t.status === 'diproses').length}
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Penanganan di lapangan
                    </span>
                  </div>
                </div>
                {/* Selesai */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-primary font-medium">
                      Selesai Teratasi
                    </span>
                    <span className="p-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed material-symbols-outlined text-[18px]">
                      verified
                    </span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="font-headline-lg text-headline-lg text-primary font-extrabold tracking-tight">
                      {tickets.filter((t) => t.status === 'selesai').length}
                    </div>
                    <span className="font-caption text-caption text-primary font-semibold">
                      Tingkat tuntas {tickets.length > 0 ? ((tickets.filter((t) => t.status === 'selesai').length / tickets.length) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
                {/* Kepuasan */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-caption text-caption text-on-surface-variant font-medium">
                      Indeks Kepuasan
                    </span>
                    <div className="flex items-center text-primary">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </div>
                  </div>
                  <div className="mt-space-sm">
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
                        {tickets.length > 0 ? (tickets.reduce((sum, t) => sum + (t.rating_kepuasan || 0), 0) / tickets.filter((t) => t.rating_kepuasan).length || 0).toFixed(1) : 4.8}
                      </span>
                      <span className="font-body-sm text-body-sm text-outline">/ 5.0</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      Dari ulasan publik
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Filter & Live Query Toolbar */}
            <section className="px-margin py-space-sm">
              <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
                <div className="relative flex-1 min-w-[280px]">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                  <input
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    id="filterKeyword"
                    placeholder="Cari nomor tiket (#TKT-2025-...), nama pelapor, lokasi, atau kata kunci..."
                    type="text"
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-space-sm">
                  <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-outline">filter_list</span>
                    <select
                      className="bg-transparent text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
                      id="filterStatus"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">Semua Status</option>
                      <option value="baru">Baru / Belum Ditelaah</option>
                      <option value="diverifikasi">Diverifikasi & Disposisi</option>
                      <option value="diproses">Sedang Diproses OPD</option>
                      <option value="selesai">Selesai Teratasi</option>
                      <option value="ditolak">Ditolak / Invalid</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-outline">account_balance</span>
                    <select
                      className="bg-transparent text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
                      id="filterOpd"
                      value={filterOpd}
                      onChange={(e) => setFilterOpd(e.target.value)}
                    >
                      <option value="all">Semua OPD Penanggung Jawab</option>
                      <option value="pupr">Dinas PUPR & Penataan Ruang</option>
                      <option value="dlh">Dinas Lingkungan Hidup (DLH)</option>
                      <option value="disdukcapil">Disdukcapil Layanan Warga</option>
                      <option value="dishub">Dinas Perhubungan (Dishub)</option>
                      <option value="satpolpp">Satpol PP & Ketertiban Umum</option>
                      <option value="dinkes">Dinas Kesehatan (Dinkes)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-low px-space-sm py-1.5 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                    <select
                      className="bg-transparent text-on-surface font-label-md text-label-md focus:outline-none cursor-pointer"
                      id="filterDate"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                    >
                      <option value="month">30 Hari Terakhir</option>
                      <option value="today">Hari Ini (24 Jam)</option>
                      <option value="week">7 Hari Terakhir</option>
                      <option value="year">Tahun Berjalan (2025)</option>
                    </select>
                  </div>
                  <button
                    className="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                    id="btnResetFilter"
                    title="Reset Saringan"
                    type="button"
                    onClick={handleResetFilter}
                  >
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Main Workstation Layout: Table + Action Drawer */}
            <section className="px-margin py-space-md grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              {/* Left Column: Data Table */}
              <div className="lg:col-span-8 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
                  <div className="px-space-lg py-space-md bg-surface-container-low/60 flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        Daftar Pengaduan Masuk
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        Tabel Sinkron 8 Kolom
                      </span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">
                      {loading ? 'Memuat...' : filteredTickets.length === 0 ? 'Tidak ada data.' : `Menampilkan ${filteredTickets.length} data`}
                    </span>
                  </div>

                  {loading ? (
                    <div className="p-space-lg flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-[40px] text-outline animate-pulse">hourglass_empty</span>
                      <span className="font-caption text-caption text-on-surface-variant mt-space-sm">Memuat data pengaduan...</span>
                    </div>
                  ) : filteredTickets.length === 0 ? (
                    <div className="p-space-lg flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-[40px] text-outline opacity-40">inbox</span>
                      <span className="font-caption text-caption text-on-surface-variant mt-space-sm">Tidak ada data pengaduan yang ditemukan.</span>
                    </div>
                  ) : error ? (
                    <div className="p-space-lg flex flex-col items-center justify-center text-center">
                      <span className="material-symbols-outlined text-[40px] text-error">error_outline</span>
                      <span className="font-caption text-caption text-error mt-space-sm">{error}</span>
                      <button
                        className="mt-space-md px-3 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm"
                        type="button"
                        onClick={fetchTickets}
                      >
                        Coba Lagi
                      </button>
                    </div>
                  ) : (
                    <div className="w-full overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                            <th className="py-3 px-4">No. Tiket</th>
                            <th className="py-3 px-4">Pelapor & Status</th>
                            <th className="py-3 px-4">Kategori & Uraian Masalah</th>
                            <th className="py-3 px-4">Lokasi & OPD Tujuan</th>
                            <th className="py-3 px-4 text-center">Bukti</th>
                            <th className="py-3 px-4 text-center">Kepuasan</th>
                            <th className="py-3 px-4 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="font-body-sm text-body-sm divide-y-0 text-on-surface">
                          {filteredTickets.map((ticket) => {
                            const statusLabels = {
                              baru: 'Baru',
                              diverifikasi: 'Diverifikasi',
                              diproses: 'Diproses',
                              selesai: 'Selesai',
                              ditolak: 'Ditolak',
                            }
                            const statusBadgeClasses = {
                              baru: 'bg-error-container text-on-error-container',
                              diverifikasi: 'bg-secondary-fixed text-on-secondary-fixed',
                              diproses: 'bg-surface-container-highest text-on-surface',
                              selesai: 'bg-primary-fixed text-on-primary-fixed',
                              ditolak: 'bg-error-container text-on-error-container',
                            }
                            return (
                              <tr key={ticket.id} className={rowClasses(ticket.nomor_tiket)} onClick={() => handleSelectComplaint(ticket.nomor_tiket)}>
                                <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-primary font-bold whitespace-nowrap">
                                  #{ticket.nomor_tiket}
                                  <div className="font-caption text-caption text-outline font-normal">{ticket.created_at ? new Date(ticket.created_at).toLocaleString('id-ID') : '-'}</div>
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <div className="font-label-md text-label-md font-semibold text-on-surface">{ticket.nama_pelapor}</div>
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full ${statusBadgeClasses[ticket.status] || 'bg-surface-container-high'} font-label-sm text-label-sm font-bold`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {statusLabels[ticket.status] || ticket.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 max-w-xs">
                                  <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                                    {ticket.kategori_layanan}
                                  </span>
                                  <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">{ticket.isi_laporan}</p>
                                </td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                                    <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                                    <span className="">{ticket.lokasi_kejadian}</span>
                                  </div>
                                  <div className="text-secondary font-label-sm text-label-sm mt-0.5">{ticket.instansi_tujuan}</div>
                                </td>
                                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                  {ticket.lampiran_bukti ? (
                                    <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Lihat Bukti" type="button">
                                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                                    </button>
                                  ) : (
                                    <span className="font-caption text-caption text-outline">-</span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-outline">
                                  {ticket.rating_kepuasan !== null && ticket.rating_kepuasan !== undefined ? ticket.rating_kepuasan : '-'}
                                </td>
                                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                  <button
                                    className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleSelectComplaint(ticket.nomor_tiket)
                                    }}
                                    type="button"
                                  >
                                    Tinjau
                                  </button>
                                  <button
                                    className="ml-2 px-3 py-1.5 rounded-lg bg-error text-on-error font-label-sm text-label-sm font-semibold hover:bg-error-container transition-colors"
                                    onClick={(e) => handleDeleteTicket(e, ticket.nomor_tiket)}
                                    type="button"
                                    title="Hapus Tiket"
                                  >
                                    Hapus
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="px-space-lg py-space-md bg-surface-container-low/40 flex flex-wrap items-center justify-between gap-space-sm">
                    <span className="font-caption text-caption text-on-surface-variant">
                      {filteredTickets.length === 0 ? 'Tidak ada data.' : `Menampilkan ${filteredTickets.length} dari total ${tickets.length} pengaduan tersimpan`}
                    </span>
                  </div>
                </div>

                {/* OPD Overview */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        Sebaran Beban Tugas 6 OPD Utama
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        Kapasitas penanganan & tindak lanjut 30 hari terakhir
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">
                      Semua Instansi Siaga
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm">
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Dinas PUPR</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('pup')).length}</span>
                      <span className="font-caption text-caption text-primary">91% selesai</span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Lingkungan Hidup</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('lingkungan') || t.instansi_tujuan.toLowerCase().includes('dlh')).length}</span>
                      <span className="font-caption text-caption text-primary">96% selesai</span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Disdukcapil</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('dukcapil')).length}</span>
                      <span className="font-caption text-caption text-primary">98% selesai</span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Dishub PJU</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('hub')).length}</span>
                      <span className="font-caption text-caption text-primary">94% selesai</span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Satpol PP</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('satpol')).length}</span>
                      <span className="font-caption text-caption text-primary">89% selesai</span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                      <span className="font-caption text-caption text-on-surface-variant truncate">Dinas Kesehatan</span>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">{tickets.filter((t) => t.instansi_tujuan.toLowerCase().includes('kesehatan')).length}</span>
                      <span className="font-caption text-caption text-primary">97% selesai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Quick Action Drawer */}
              <div className="lg:col-span-4 flex flex-col gap-space-md sticky top-20">
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
                  <div className="flex items-center justify-between pb-space-sm bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">assignment_turned_in</span>
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        Penanganan Tiket
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-mono font-bold text-label-sm" id="activeTicketPill">
                      #{selectedTicket?.nomor_tiket || '-'}
                    </span>
                  </div>

                  {!selectedTicket ? (
                    <div className="p-space-md flex flex-col items-center justify-center text-center opacity-50">
                      <span className="material-symbols-outlined text-[40px] text-outline">assignment</span>
                      <span className="font-caption text-caption text-on-surface-variant mt-space-sm">Pilih tiket dari tabel</span>
                    </div>
                  ) : (
                    <>
                      {/* Pelapor & Ringkasan Cepat */}
                      <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="font-caption text-caption text-on-surface-variant">Pelapor Terdaftar</span>
                            <span className="font-label-md text-label-md text-on-surface font-bold" id="detailPelapor">
                              {selectedTicket.nama_pelapor}
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="font-caption text-caption text-on-surface" id="detailLokasi">
                            {selectedTicket.lokasi_kejadian}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm italic">
                          "{selectedTicket.isi_laporan}"
                        </div>
                        <div className="mt-1 flex flex-col gap-1">
                          <span className="font-caption text-caption text-on-surface-variant font-medium">
                            Lampiran Bukti Pelapor ({selectedTicket.lampiran_bukti ? '1 Berkas' : '0 Berkas'}):
                          </span>
                          {selectedTicket.lampiran_bukti ? (
                            <div className="relative w-full h-36 rounded-lg overflow-hidden group cursor-pointer shadow-sm">
                              <img
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                data-alt="Foto bukti pengaduan"
                                src={selectedTicket.lampiran_bukti}
                                onError={(e) => {
                                  e.target.onerror = null
                                  e.target.src = 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80'
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                                <span className="text-white font-caption text-caption font-semibold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[16px]">zoom_in</span> Bukti Tiket
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="font-caption text-caption text-outline text-center">Tidak ada lampiran bukti.</span>
                          )}
                        </div>
                      </div>

                      {/* Form Tindak Lanjut Admin */}
                      <form className="flex flex-col gap-space-md" id="actionForm" onSubmit={handleSubmitTanggapan}>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="statusSelect">
                            Perbarui Status Tiket:
                          </label>
                          <div className="relative">
                            <select
                              className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
                              id="statusSelect"
                              value={selectedTicket.status}
                              onChange={(e) => handleUpdateStatus(e.target.value)}
                            >
                              {STATUS_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                              expand_more
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="opdDisposisi">
                            Disposisi Unit Kerja (OPD):
                          </label>
                          <div className="relative">
                            <select
                              className="w-full px-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none cursor-pointer"
                              id="opdDisposisi"
                              value={selectedTicket.instansi_tujuan || 'pupr'}
                            >
                              <option selected value="pupr">Dinas PUPR (Bidang Bina Marga)</option>
                              <option value="dlh">Dinas Lingkungan Hidup (DLH)</option>
                              <option value="disdukcapil">Disdukcapil (Pelayanan Adminduk)</option>
                              <option value="dishub">Dinas Perhubungan (Dishub)</option>
                              <option value="satpolpp">Satpol PP & Damkar</option>
                              <option value="dinkes">Dinas Kesehatan & Puskesmas</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                              account_balance
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <label className="font-label-sm text-label-sm text-on-surface font-semibold" htmlFor="responseNote">
                              Tanggapan Resmi Aparatur:
                            </label>
                            <span className="font-caption text-caption text-primary flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">send_to_mobile</span> Notifikasi WA Aktif
                            </span>
                          </div>
                          <textarea
                            className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                            id="responseNote"
                            placeholder="Tuliskan jawaban tindak lanjut yang santun dan jelas untuk pelapor..."
                            rows="3"
                            defaultValue={selectedTicket.isi_laporan}
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                            Lampiran Berita Acara / Foto Perbaikan (Opsional):
                          </span>
                          <div className="p-3 rounded-lg bg-surface-container-low border border-dashed border-outline-variant flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-outline text-[20px]">upload_file</span>
                              <span className="font-caption text-caption text-on-surface-variant">
                                Pilih foto perbaikan / PDF telaah OPD...
                              </span>
                            </div>
                            <span className="font-label-sm text-label-sm text-primary font-bold">Unggah</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-sm pt-2">
                          <button
                            className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            type="submit"
                          >
                            <span className="material-symbols-outlined text-[18px]">save</span>
                            <span className="">Simpan & Kirim Update</span>
                          </button>
                          <button
                            className="p-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                            onClick={() => showToast('Eskalasi Terkirim', 'Ringkasan aduan diteruskan ke meja asisten daerah & Sekda.')}
                            title="Eskalasi ke Pimpinan Daerah / Bupati / Walikota"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px] text-tertiary">priority_high</span>
                          </button>
                        </div>
                      </form>

                      {/* Audit Trail */}
                      <div className="pt-space-sm border-t border-surface-container">
                        <span className="font-caption text-caption text-outline font-semibold uppercase tracking-wider block mb-2">
                          Riwayat Audit Verifikasi
                        </span>
                        <div className="flex flex-col gap-2 font-caption text-caption">
                          <div className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
                            <div className="flex flex-col">
                              <span className="text-on-surface font-medium">Laporan Diterima dari Aplikasi Mobile</span>
                              <span className="text-outline">{selectedTicket?.created_at ? new Date(selectedTicket.created_at).toLocaleString('id-ID') : '-'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal Manual Entry / Walk-in Complaint Form */}
      <div className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm ${walkInModalOpen ? '' : 'hidden'} flex items-center justify-center p-4`} id="modalWalkIn">
        <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in flex flex-col">
          <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">support_agent</span>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Input Aduan Langsung / Walk-in Pelapor
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  Layanan Meja Pengaduan Tatap Muka Kantor Pemda
                </span>
              </div>
            </div>
            <button className="p-1 rounded-full text-outline hover:text-on-surface hover:bg-surface-container" onClick={handleCloseWalkIn} type="button">
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>
          <form className="p-space-lg flex flex-col gap-space-md max-h-[75vh] overflow-y-auto" onSubmit={handleSimpanAduanManual}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Nomor Tiket *
                </label>
                <input
                  className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Contoh: TKT-2025-1050"
                  required
                  type="text"
                  name="nomor_tiket"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Nama Lengkap Warga Pelapor *
                </label>
                <input
                  className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Contoh: Ibu Rina Suryani"
                  required
                  type="text"
                  name="nama_pelapor"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Kategori Layanan *
                </label>
                <select
                  className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                  name="kategori_layanan"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="infrastruktur">Infrastruktur & Jalan Rusak</option>
                  <option value="adminduk">Kependudukan (KTP/KK/Akta)</option>
                  <option value="lingkungan">Sampah & Kebersihan Lingkungan</option>
                  <option value="pju">Penerangan Jalan Umum</option>
                  <option value="bansos">Bantuan Sosial & Kesejahteraan</option>
                  <option value="kesehatan">Layanan Puskesmas / RSUD</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Dinas OPD Tujuan *
                </label>
                <select
                  className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  required
                  name="instansi_tujuan"
                >
                  <option value="pupr">Dinas PUPR</option>
                  <option value="dlh">Dinas Lingkungan Hidup</option>
                  <option value="disdukcapil">Disdukcapil</option>
                  <option value="dishub">Dinas Perhubungan</option>
                  <option value="satpolpp">Satpol PP</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                Lokasi Kejadian / Alamat Spesifik *
              </label>
              <input
                className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Nama jalan, patokan, RT/RW, kelurahan/desa..."
                required
                type="text"
                name="lokasi_kejadian"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                Uraian / Kronologi Keluhan Warga *
              </label>
              <textarea
                className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Jelaskan secara runtut persoalan yang dihadapi warga..."
                required
                rows="3"
                name="isi_laporan"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                Lampiran Bukti (URL Foto/Dokumen)
              </label>
              <input
                className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="https://..."
                type="url"
                name="lampiran_bukti"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                Rating Kepuasan (1-5)
              </label>
              <input
                className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                type="number"
                min="1"
                max="5"
                name="rating_kepuasan"
              />
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-sm">
              <button className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md" onClick={handleCloseWalkIn} type="button">
                Batalkan
              </button>
              <button className="px-space-lg py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold" type="submit">
                Simpan & Terbitkan Tiket Resmi
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notification Toast */}
      <div
        className={`fixed bottom-6 right-6 z-50 max-w-md bg-inverse-surface text-inverse-on-surface px-space-md py-3 rounded-xl shadow-xl transition-transform ${toast.open ? 'flex items-center gap-3' : 'hidden'}`}
        id="toastNotification"
      >
        <span className="material-symbols-outlined text-primary-fixed text-[24px]">check_circle</span>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-bold" id="toastTitle">
            {toast.title}
          </span>
          <span className="font-caption text-caption text-surface-container" id="toastDesc">
            {toast.desc}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ManajemenPengaduan