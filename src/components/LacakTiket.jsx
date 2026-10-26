import { useState } from 'react'

export const LacakTiket = ({ tickets: propTickets }) => {
  const defaultTickets = [
    { id: 1, tiket: '#TKT-8842', kategori: 'Infrastruktur & Jalan', judul: 'Penanganan Jalan Ambles di Tikungan Kali Putih', status: 'Selesai', tanggal: '24 Okt 2024', instansi: 'Dinas Pekerjaan Umum' },
    { id: 2, tiket: '#TKT-8839', kategori: 'Lingkungan Hidup', judul: 'Timbunan Sampah Liar & Bau di Saluran Irigasi', status: 'Diproses', tanggal: '23 Okt 2024', instansi: 'Dinas Lingkungan Hidup' },
    { id: 3, tiket: '#TKT-8831', kategori: 'Pelayanan Kependudukan', judul: 'Kendala Aktivasi Identitas Kependudukan Digital', status: 'Diverifikasi', tanggal: '22 Okt 2024', instansi: 'Dinas Kependudukan' }
  ]

  const list = propTickets && propTickets.length > 0 ? propTickets : defaultTickets

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')
  const [selectedTicket, setSelectedTicket] = useState(null)

  const filteredTickets = list.filter(ticket => {
    const matchSearch = ticket.tiket.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (ticket.judul && ticket.judul.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        ticket.instansi.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStatus = filterStatus === 'Semua' ? true : ticket.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <section className="w-full py-space-xl bg-surface-container-low/60" id="lacak-tiket">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-space-lg">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Pelacakan Real-Time</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Lacak Status Pengaduan Warga</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              Pantau langsung transparansi progres penanganan aduan Anda secara online dengan memasukkan kode tiket pengaduan.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {['Semua', 'Diverifikasi', 'Diproses', 'Selesai'].map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
                  filterStatus === status 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-4 md:p-6 mb-space-md">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[22px]">search</span>
              <input
                type="text"
                placeholder="Cari berdasarkan Kode Tiket (misal: #TKT-8842), instansi, atau pokok masalah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label-sm shrink-0"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Table of tickets */}
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant border-b border-surface-container text-label-md font-label-md">
                  <th className="p-4 pl-6">No</th>
                  <th className="p-4">Kode Tiket</th>
                  <th className="p-4">Pokok Aduan</th>
                  <th className="p-4">Instansi Tujuan</th>
                  <th className="p-4">Tanggal Registrasi</th>
                  <th className="p-4">Status Progres</th>
                  <th className="p-4 pr-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-sm text-on-surface">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => {
                    const badgeClass = 
                      ticket.status === 'Selesai' 
                        ? 'bg-secondary-container text-on-secondary-container' 
                        : ticket.status === 'Diproses' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-surface-container-high text-on-surface'

                    return (
                      <tr key={ticket.tiket} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-4 pl-6 font-medium text-outline">{index + 1}</td>
                        <td className="p-4 font-mono font-bold text-primary">{ticket.tiket}</td>
                        <td className="p-4 max-w-xs font-medium text-on-surface">
                          <p className="truncate">{ticket.judul || 'Laporan Pengaduan Masyarakat'}</p>
                          <span className="text-caption text-caption text-on-surface-variant block">{ticket.kategori || 'Pengaduan Umum'}</span>
                        </td>
                        <td className="p-4 text-on-surface-variant">{ticket.instansi}</td>
                        <td className="p-4 text-on-surface-variant whitespace-nowrap">{ticket.tanggal}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold ${badgeClass}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedTicket(ticket)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm transition-all"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                            Rincian
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-on-surface-variant">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[40px] text-outline">search_off</span>
                        <p className="font-title-md">Tiket tidak ditemukan</p>
                        <p className="text-caption">Cek kembali nomor tiket atau filter status pencarian Anda.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Detail Tiket */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-xl border border-surface-container">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div>
                  <span className="font-mono text-primary font-bold text-lg">{selectedTicket.tiket}</span>
                  <p className="text-caption text-caption text-on-surface-variant">Terdaftar pada {selectedTicket.tanggal}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="py-4 space-y-4">
                <div>
                  <label className="text-caption text-on-surface-variant block font-medium">Status Saat Ini</label>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full text-label-sm font-label-sm font-semibold bg-secondary-container text-on-secondary-container">
                    {selectedTicket.status}
                  </span>
                </div>
                <div>
                  <label className="text-caption text-on-surface-variant block font-medium">Pokok Permasalahan</label>
                  <p className="font-title-md text-on-surface mt-0.5">{selectedTicket.judul}</p>
                </div>
                {selectedTicket.deskripsi && (
                  <div>
                    <label className="text-caption text-on-surface-variant block font-medium">Deskripsi Lengkap</label>
                    <p className="text-body-sm text-on-surface-variant mt-0.5">{selectedTicket.deskripsi}</p>
                  </div>
                )}
                {selectedTicket.lokasi && (
                  <div>
                    <label className="text-caption text-on-surface-variant block font-medium">Lokasi</label>
                    <p className="text-body-sm text-on-surface mt-0.5">{selectedTicket.lokasi}</p>
                  </div>
                )}
                <div>
                  <label className="text-caption text-on-surface-variant block font-medium">Instansi Pelaksana</label>
                  <p className="text-body-sm text-on-surface font-semibold mt-0.5">{selectedTicket.instansi}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md hover:bg-primary-container transition-all"
                >
                  Tutup Rincian
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LacakTiket
