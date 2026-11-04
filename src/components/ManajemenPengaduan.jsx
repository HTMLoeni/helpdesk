import { useState } from 'react'
import { Link } from 'react-router-dom'

export const ManajemenPengaduan = () => {
  const [activeTicketId, setActiveTicketId] = useState('TKT-2025-1049')
  const [detailPelapor, setDetailPelapor] = useState('Bambang Hermawan')
  const [detailLokasi, setDetailLokasi] = useState('Jl. Ahmad Yani No. 84, RT 02/07')
  const [statusSelect, setStatusSelect] = useState('diverifikasi')
  const [responseNote, setResponseNote] = useState(
    'Laporan telah diverifikasi oleh petugas verifikator Diskominfo. Tim URC Dinas PUPR dijadwalkan turun ke lokasi pada pukul 14:00 WIB hari ini.',
  )
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

  const handleSelectComplaint = (ticketId) => {
    setActiveTicketId(ticketId)

    if (ticketId === 'TKT-2025-1049') {
      setDetailPelapor('Bambang Hermawan')
      setDetailLokasi('Jl. Ahmad Yani No. 84, RT 02/07')
      setStatusSelect('diverifikasi')
      setResponseNote(
        'Laporan telah diverifikasi oleh petugas verifikator Diskominfo. Tim URC Dinas PUPR dijadwalkan turun ke lokasi pada pukul 14:00 WIB hari ini.',
      )
    } else if (ticketId === 'TKT-2025-1048') {
      setDetailPelapor('Siti Nurhaliza')
      setDetailLokasi('Kecamatan Sukamaju Baru')
      setStatusSelect('diproses')
      setResponseNote(
        'Blanko KTP-el telah tiba dari Ditjen Dukcapil Kemendagri. Dokumen Saudara sedang dalam antrean cetak.',
      )
    } else if (ticketId === 'TKT-2025-1047') {
      setDetailPelapor('Hendra Wijaya')
      setDetailLokasi('Tanggul Kali RT 04/RW 02')
      setStatusSelect('diproses')
      setResponseNote(
        'Armada truk sampah DLH sektor barat telah dikerahkan untuk evakuasi timbunan sampah liar.',
      )
    } else if (ticketId === 'TKT-2025-1046') {
      setDetailPelapor('Dewi Anggraini')
      setDetailLokasi('Jl. Diponegoro KM 4.2')
      setStatusSelect('selesai')
      setResponseNote(
        'Perbaikan 4 titik lampu penerangan jalan umum telah selesai 100% oleh tim Dishub.',
      )
    } else if (ticketId === 'TKT-2025-1045') {
      setDetailPelapor('Anonim (Warga RW 04)')
      setDetailLokasi('Perum Griya Lestari Blok C')
      setStatusSelect('selesai')
      setResponseNote(
        'Kebocoran pipa induk PDAM telah diperbaiki dan pasokan air kembali normal.',
      )
    } else if (ticketId === 'TKT-2025-1044') {
      setDetailPelapor('Agus Pratama')
      setDetailLokasi('Mall Sentral Niaga Kav. 12')
      setStatusSelect('ditolak')
      setResponseNote(
        'Aduan tidak dapat ditindaklanjuti karena objek sengketa berada di ranah properti swasta komersial murni di luar wewenang Pemda.',
      )
    }

    showToast(`Tiket #${ticketId} Aktif`, 'Data lengkap tiket dimuat ke panel tindakan.')
  }

  const handleSubmitTanggapan = (e) => {
    e.preventDefault()
    showToast('Pembaruan Disimpan!', `Status dan tanggapan resmi #${activeTicketId} berhasil dipublikasikan ke warga.`)
  }

  const handleKirimNotifPimpinan = () => {
    showToast('Eskalasi Terkirim', 'Ringkasan aduan diteruskan ke meja asisten daerah & Sekda.')
  }

  const handleOpenWalkIn = () => {
    setWalkInModalOpen(true)
  }

  const handleCloseWalkIn = () => {
    setWalkInModalOpen(false)
  }

  const handleSimpanAduanManual = (e) => {
    e.preventDefault()
    setWalkInModalOpen(false)
    showToast(
      'Tiket Diterbitkan!',
      'Pengaduan walk-in berhasil didaftarkan ke sistem dengan nomor #TKT-2025-1050.',
    )
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
    `hover:bg-surface-container-low/80 cursor-pointer transition-colors${activeTicketId === ticketId ? ' bg-primary-fixed/20' : ''}`

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
                  1.284
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
                  42
                </span>
              </div>
              <div className="mt-space-sm">
                <div className="font-headline-lg text-headline-lg text-error font-extrabold tracking-tight">
                  42
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
                  86
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
                  158
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
                  978
                </div>
                <span className="font-caption text-caption text-primary font-semibold">
                  Tingkat tuntas 94.2%
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
                    4.8
                  </span>
                  <span className="font-body-sm text-body-sm text-outline">/ 5.0</span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant">
                  Dari 812 ulasan publik
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
                  <option value="all">Semua Status (1.284)</option>
                  <option value="baru">Baru / Belum Ditelaah (42)</option>
                  <option value="diverifikasi">
                    Diverifikasi{' & '}Disposisi (86)
                  </option>
                  <option value="diproses">Sedang Diproses OPD (158)</option>
                  <option value="selesai">Selesai Teratasi (978)</option>
                  <option value="ditolak">Ditolak / Invalid (20)</option>
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
                  <option value="pupr">
                    Dinas PUPR{' & '}Penataan Ruang
                  </option>
                  <option value="dlh">Dinas Lingkungan Hidup (DLH)</option>
                  <option value="disdukcapil">Disdukcapil Layanan Warga</option>
                  <option value="dishub">Dinas Perhubungan (Dishub)</option>
                  <option value="satpolpp">
                    Satpol PP{' & '}Ketertiban Umum
                  </option>
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
                  Menampilkan 6 dari 42 data mendesak
                </span>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                      <th className="py-3 px-4">No. Tiket</th>
                      <th className="py-3 px-4">Pelapor{' & '}Status</th>
                      <th className="py-3 px-4">Kategori & Uraian Masalah</th>
                      <th className="py-3 px-4">Lokasi & OPD Tujuan</th>
                      <th className="py-3 px-4 text-center">Bukti</th>
                      <th className="py-3 px-4 text-center">Kepuasan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm divide-y-0 text-on-surface" id="complaintTableBody">
                    {/* Row 1 */}
                    <tr className={rowClasses('TKT-2025-1049')} onClick={() => handleSelectComplaint('TKT-2025-1049')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-primary font-bold whitespace-nowrap">
                        #TKT-2025-1049
                        <div className="font-caption text-caption text-outline font-normal">24 Menit lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface">Bambang Hermawan</div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Baru
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Infrastruktur Jalan
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Lubang jalan aspal sedalam 20cm dekat pertigaan lampu merah menyebabkan pengendara motor tergelincir semalam.
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Jl. Ahmad Yani No. 84, RT 02/07</span>
                        </div>
                        <div className="text-secondary font-label-sm text-label-sm mt-0.5">Dinas PUPR</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Lihat Foto_Jalan_Rusak.jpg" type="button">
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-outline">
                        -
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1049')
                          }}
                          type="button"
                        >
                          Tinjau
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className={rowClasses('TKT-2025-1048')} onClick={() => handleSelectComplaint('TKT-2025-1048')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-on-surface font-semibold whitespace-nowrap">
                        #TKT-2025-1048
                        <div className="font-caption text-caption text-outline font-normal">2 Jam lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface">Siti Nurhaliza</div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Diverifikasi
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Pelayanan KTP-el
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Keterlambatan pencetakan blanko KTP-el pemula sudah lewat 3 minggu dari batas jadwal pengambilan di loket kecamatan.
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Kecamatan Sukamaju Baru</span>
                        </div>
                        <div className="text-secondary font-label-sm text-label-sm mt-0.5">Disdukcapil</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Bukti_Resi_Pengambilan.pdf" type="button">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-outline">
                        -
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-dim transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1048')
                          }}
                          type="button"
                        >
                          Kelola
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className={rowClasses('TKT-2025-1047')} onClick={() => handleSelectComplaint('TKT-2025-1047')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-on-surface font-semibold whitespace-nowrap">
                        #TKT-2025-1047
                        <div className="font-caption text-caption text-outline font-normal">5 Jam lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface">Hendra Wijaya</div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span> Diproses
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Sampah Liar
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Timbunan sampah liar di pinggir tanggul kali menimbulkan bau menyengat dan tersumbat saat hujan deras.
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Tanggul Kali RT 04/RW 02</span>
                        </div>
                        <div className="text-secondary font-label-sm text-label-sm mt-0.5">Dinas Lingkungan Hidup</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Timbunan_Sampah.png" type="button">
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-outline">
                        -
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-dim transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1047')
                          }}
                          type="button"
                        >
                          Kelola
                        </button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className={rowClasses('TKT-2025-1046')} onClick={() => handleSelectComplaint('TKT-2025-1046')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-on-surface font-semibold whitespace-nowrap">
                        #TKT-2025-1046
                        <div className="font-caption text-caption text-outline font-normal">1 Hari lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface">Dewi Anggraini</div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Selesai
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Penerangan Jalan (PJU)
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Lampu PJU sepanjang jalan protokol padam 4 titik berturut-turut, membahayakan pelintas malam.
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Jl. Diponegoro KM 4.2</span>
                        </div>
                        <div className="text-secondary font-label-sm text-label-sm mt-0.5">Dinas Perhubungan</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="PJU_Mati.jpg" type="button">
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-primary font-bold">
                        <span className="inline-flex items-center gap-0.5">
                          5.0{' '}
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-dim transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1046')
                          }}
                          type="button"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className={rowClasses('TKT-2025-1045')} onClick={() => handleSelectComplaint('TKT-2025-1045')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-on-surface font-semibold whitespace-nowrap">
                        #TKT-2025-1045
                        <div className="font-caption text-caption text-outline font-normal">2 Hari lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1.5">
                          <span className="">Anonim / Warga RW 04</span>
                          <span className="material-symbols-outlined text-[16px] text-primary" title="Identitas Dirahasiakan">
                            lock
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Selesai
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Air Bersih PDAM
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Aliran pipa PDAM mati total sejak 2 hari tanpa pemberitahuan giliran aliran air bersih.
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Perum Griya Lestari Blok C</span>
                        </div>
                        <div className="text-secondary font-label-sm text-label-sm mt-0.5">PDAM Tirta Daerah</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Meteran_PDAM.jpg" type="button">
                          <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-primary font-bold">
                        <span className="inline-flex items-center gap-0.5">
                          4.0{' '}
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-dim transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1045')
                          }}
                          type="button"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                    {/* Row 6 */}
                    <tr className={rowClasses('TKT-2025-1044')} onClick={() => handleSelectComplaint('TKT-2025-1044')}>
                      <td className="py-3.5 px-4 font-label-md text-label-md font-mono text-on-surface font-semibold whitespace-nowrap">
                        #TKT-2025-1044
                        <div className="font-caption text-caption text-outline font-normal">3 Hari lalu</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-label-md text-label-md font-semibold text-on-surface">Agus Pratama</div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span> Ditolak
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <span className="inline-block px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-caption text-caption font-semibold mb-1">
                          Kewenangan Swasta
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                          Sengketa iuran renovasi ruko kawasan niaga swasta (bukan fasum milik pemerintah daerah).
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          <span className="">Mall Sentral Niaga Kav. 12</span>
                        </div>
                        <div className="text-outline font-label-sm text-label-sm mt-0.5">Non-Pemerintah</div>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button className="p-1.5 rounded-lg bg-surface-container text-outline hover:bg-surface-container-high transition-colors" title="Berkas_Perjanjian.pdf" type="button">
                          <span className="material-symbols-outlined text-[18px]">description</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap font-label-md text-label-md text-outline">
                        -
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-dim transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectComplaint('TKT-2025-1044')
                          }}
                          type="button"
                        >
                          Arsip
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-space-lg py-space-md bg-surface-container-low/40 flex flex-wrap items-center justify-between gap-space-sm">
                <span className="font-caption text-caption text-on-surface-variant">
                  Menampilkan 1 - 6 dari total 1.284 pengaduan tersimpan
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="p-1.5 rounded-lg bg-surface-container text-outline hover:text-on-surface disabled:opacity-50"
                    disabled
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-bold" type="button">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm" type="button">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm" type="button">
                    3
                  </button>
                  <span className="px-1 text-outline">...</span>
                  <button className="px-3 py-1 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm" type="button">
                    214
                  </button>
                  <button
                    className="p-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
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
                    Kapasitas penanganan{' & '}tindak lanjut 30 hari terakhir
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Semua Instansi Siaga
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Dinas PUPR</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">482</span>
                  <span className="font-caption text-caption text-primary">91% selesai</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Lingkungan Hidup</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">294</span>
                  <span className="font-caption text-caption text-primary">96% selesai</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Disdukcapil</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">186</span>
                  <span className="font-caption text-caption text-primary">98% selesai</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Dishub PJU</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">142</span>
                  <span className="font-caption text-caption text-primary">94% selesai</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Satpol PP</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">98</span>
                  <span className="font-caption text-caption text-primary">89% selesai</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant truncate">Dinas Kesehatan</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">82</span>
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
                  #{activeTicketId}
                </span>
              </div>
              {/* Pelapor & Ringkasan Cepat */}
              <div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-on-surface-variant">Pelapor Terdaftar</span>
                    <span className="font-label-md text-label-md text-on-surface font-bold" id="detailPelapor">
                      {detailPelapor}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                  <span className="font-caption text-caption text-on-surface" id="detailLokasi">
                    {detailLokasi}
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm italic">
                  "Lubang jalan aspal sedalam 20cm dekat pertigaan lampu merah menyebabkan pengendara motor tergelincir semalam."
                </div>
                <div className="mt-1 flex flex-col gap-1">
                  <span className="font-caption text-caption text-on-surface-variant font-medium">
                    Lampiran Bukti Pelapor (1 Berkas):
                  </span>
                  <div className="relative w-full h-36 rounded-lg overflow-hidden group cursor-pointer shadow-sm">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-alt="Close up photographic evidence showing an asphalt road pothole 20cm deep surrounded by loose gravel and hazard signs on an Indonesian urban street during overcast daylight"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgGmKRysuxMRE8a8PsXaC99XNJ7RPGGht4T4HfObWv-R8gv0HFRErhv0AGqKmso5bISxnGEde93-FZzB4IgLUO_ZkmcmtThXLTZPuvUiipqgKSVU6I46lryQKQjKDlIZ0MXxeYgTjmEQOWne2RIKZvifjwOZzpgrrVjowpxDK76yWHuXzsjevnv8_in647fl2qHJD7KHcybzXkCcvWLJn_Yzo24QrWiXjNlnJreaaxCaksJ0lLNy-u"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-white font-caption text-caption font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">zoom_in</span> Foto_Jalan_Rusak_01.jpg (1.8 MB)
                      </span>
                    </div>
                  </div>
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
                      value={statusSelect}
                      onChange={(e) => setStatusSelect(e.target.value)}
                    >
                      <option value="baru">1. Baru Masuk (Antrean Tinjau)</option>
                      <option selected value="diverifikasi">
                        2. Diverifikasi{' & '}Teruskan Disposisi
                      </option>
                      <option value="diproses">3. Sedang Ditindaklanjuti OPD</option>
                      <option value="selesai">4. Selesai (Solusi Tuntas)</option>
                      <option value="ditolak">5. Tolak (Bukan Kewenangan / Spam)</option>
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
                      value="pupr"
                    >
                      <option selected value="pupr">Dinas PUPR (Bidang Bina Marga)</option>
                      <option value="dlh">Dinas Lingkungan Hidup (DLH)</option>
                      <option value="disdukcapil">Disdukcapil (Pelayanan Adminduk)</option>
                      <option value="dishub">Dinas Perhubungan (Dishub)</option>
                      <option value="satpolpp">
                        Satpol PP{' & '}Damkar
                      </option>
                      <option value="dinkes">
                        Dinas Kesehatan{' & '}Puskesmas
                      </option>
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
                    value={responseNote}
                    onChange={(e) => setResponseNote(e.target.value)}
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
                    <span className="">Simpan{' & '}Kirim Update</span>
                  </button>
                  <button
                    className="p-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                    onClick={handleKirimNotifPimpinan}
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
                      <span className="text-outline">10:14 WIB - Oleh Sistem Gateway</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5"></span>
                    <div className="flex flex-col">
                      <span className="text-on-surface font-medium">
                        Disposisi Awal ke Bidang Bina Marga PUPR
                      </span>
                      <span className="text-outline">10:28 WIB - Oleh Budi Santoso (Admin)</span>
                    </div>
                  </div>
                </div>
              </div>
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
                    Nama Lengkap Warga Pelapor *
                  </label>
                  <input
                    className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Contoh: Ibu Rina Suryani"
                    required
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Nomor WhatsApp / HP Aktif *
                  </label>
                  <input
                    className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="08xxxxxxxxxx"
                    required
                    type="tel"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Kategori Masalah *
                  </label>
                  <select
                    className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    required
                  >
                    <option value="">-- Pilih Kategori --</option>
                    <option value="infrastruktur">
                      Infrastruktur{' & '}Jalan Rusak
                    </option>
                    <option value="adminduk">Kependudukan (KTP/KK/Akta)</option>
                    <option value="lingkungan">
                      Sampah{' & '}Kebersihan Lingkungan
                    </option>
                    <option value="pju">Penerangan Jalan Umum</option>
                    <option value="bansos">
                      Bantuan Sosial{' & '}Kesejahteraan
                    </option>
                    <option value="kesehatan">Layanan Puskesmas / RSUD</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                    Dinas OPD Tujuan
                  </label>
                  <select
                    className="p-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low">
                <input className="w-4 h-4 text-primary rounded accent-primary cursor-pointer" id="anonCheck" type="checkbox" />
                <label className="font-caption text-caption text-on-surface cursor-pointer" htmlFor="anonCheck">
                  Rahasiakan identitas warga di papan pantau publik (Status Privasi: Terproteksi).
                </label>
              </div>
              <div className="flex items-center justify-end gap-space-sm pt-space-sm">
                <button className="px-space-md py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md" onClick={handleCloseWalkIn} type="button">
                  Batalkan
                </button>
                <button className="px-space-lg py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-semibold" type="submit">
                  Simpan{' & '}Terbitkan Tiket Resmi
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
