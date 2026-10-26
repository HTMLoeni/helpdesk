import { useState } from 'react'

export const AduanPublik = ({ data: propData }) => {
  const defaultData = [
    { 
      id: 1, 
      tiket: '#TKT-8842', 
      kategori: 'Infrastruktur', 
      judul: 'Penanganan Jalan Ambles di Tikungan Jembatan Kali Putih', 
      status: 'Selesai', 
      lokasi: 'Jl. Kaliurang KM 9.2, Depok, Sleman', 
      instansi: 'Dinas Pekerjaan Umum & Tata Ruang', 
      tanggal: '24 Okt 2024, 09:15 WIB', 
      gambarAwal: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80', 
      pengadap: 'Bambang W. (Kecamatan Berbah)', 
      rating: 5.0,
      deskripsi: 'Ruas jalan aspal ambles sekitar 30 cm membahayakan pengendara motor saat malam hari, terutama saat hujan berat. Tim Bina Marga telah melakukan pengecoran talud dan pelapisan hotmix baru.'
    },
    { 
      id: 2, 
      tiket: '#TKT-8839', 
      kategori: 'Lingkungan', 
      judul: 'Timbunan Sampah Liar & Bau di Pinggir Saluran Irigasi Desa', 
      status: 'Diproses', 
      lokasi: 'Desa Mengkid, Kecamatan Mlati', 
      instansi: 'Dinas Lingkungan Hidup & Satpol PP', 
      tanggal: '23 Okt 2024, 14:30 WIB', 
      gambarAwal: 'https://images.unsplash.com/photo-1611288875650-705332f143c7?auto=format&fit=crop&w=600&q=80', 
      pengadap: 'Anonim (Identitas Terlindungi)', 
      rating: 4.0,
      deskripsi: 'Warga luar desa membuang sampah kantong plastik sembarangan sehingga menyumbat saluran air petani saat musim tanam. Diperlukan pengangkutan kontainer truk DLH dan pemasangan spanduk larangan.'
    },
    { 
      id: 3, 
      tiket: '#TKT-8831', 
      kategori: 'Pelayanan Umum', 
      judul: 'Kendala Aktivasi Identitas Kependudukan Digital (IKD) di Loket', 
      status: 'Diverifikasi', 
      lokasi: 'Loket Dukcapil Kecamatan Mlati', 
      instansi: 'Dinas Kependudukan & Catatan Sipil', 
      tanggal: '22 Okt 2024, 10:00 WIB', 
      gambarAwal: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80', 
      pengadap: 'Siti Rahmawati (Kecamatan Mlati)', 
      rating: 4.8,
      deskripsi: 'Warga lansia mengalami kendala saat verifikasi data IKD di kecamatan. Memohon penambahan loket khusus asistensi disabilitas dan kelompok rentan di kantor Dukcapil.'
    },
  ];

  const items = propData && propData.length > 0 ? propData : defaultData
  const [selectedFilter, setSelectedFilter] = useState('Semua')

  const filteredItems = items.filter(item => {
    if (selectedFilter === 'Semua') return true
    if (selectedFilter === 'Selesai') return item.status === 'Selesai'
    return (item.kategori || '').toLowerCase().includes(selectedFilter.toLowerCase())
  })

  return (
    <section className="w-full py-space-xl bg-surface-container-low/50" id="aduan-publik">
      <div className="max-w-7xl mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Transparansi Informasi Publik</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Daftar Pengaduan Warga Terbuka</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              Aduan masyarakat yang telah terverifikasi dan dipublikasikan secara terbuka untuk pengawasan partisipatif bersama warga daerah.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container rounded-xl">
            {['Semua', 'Infrastruktur', 'Lingkungan', 'Pelayanan Umum', 'Selesai'].map(filter => (
              <button 
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm transition-all ${
                  selectedFilter === filter 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'bg-transparent hover:bg-surface-container-lowest text-on-surface-variant'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {filteredItems.map((pengaduan) => {
            const badgeClass = 
              pengaduan.status === 'Selesai' 
                ? 'bg-secondary-container text-on-secondary-container' 
                : pengaduan.status === 'Diproses' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-surface-container-high text-on-surface'

            return (
              <div key={pengaduan.tiket} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-caption text-on-surface-variant">{pengaduan.tiket}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-semibold ${badgeClass}`}>
                      {pengaduan.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-2">{pengaduan.judul}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-3">
                      {pengaduan.deskripsi || 'Rincian aduan masyarakat yang telah dikoordinasikan dengan instansi terkait untuk tindak lanjut operasional lapangan.'}
                    </p>
                  </div>
                  <div className="h-44 rounded-xl overflow-hidden bg-surface-container relative">
                    <img 
                      className="w-full h-full object-cover" 
                      src={pengaduan.gambarAwal || 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80'} 
                      alt={pengaduan.judul} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-caption font-caption backdrop-blur-xs">
                      Dokumentasi Lapangan
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 text-caption font-caption text-on-surface-variant pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">account_circle</span>
                      <span>Pelapor: {pengaduan.pengadap || 'Warga'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-outline">apartment</span>
                      <span className="truncate">{pengaduan.instansi}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between text-caption font-caption border-t border-surface-container">
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-bold">{pengaduan.rating || '5.0'}</span>
                    <span className="text-on-surface-variant">(Puas)</span>
                  </div>
                  <a className="text-primary font-label-sm text-label-sm hover:underline inline-flex items-center gap-0.5 font-semibold" href="#lacak-tiket">
                    Rincian Respon <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default AduanPublik;
