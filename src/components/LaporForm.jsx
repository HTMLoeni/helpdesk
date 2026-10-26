import { useState } from 'react'

export const LaporForm = ({ onAddTicket }) => {
  const [formData, setFormData] = useState({
    kategori: 'Infrastruktur & Jalan',
    instansi: 'Dinas Pekerjaan Umum & Penataan Ruang',
    judul: '',
    deskripsi: '',
    lokasi: '',
    nama: '',
    kontak: '',
    isAnonim: false,
    gambar: null
  })

  const [submittedTicket, setSubmittedTicket] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const instansiOptions = {
    'Infrastruktur & Jalan': 'Dinas Pekerjaan Umum & Penataan Ruang',
    'Lingkungan Hidup': 'Dinas Lingkungan Hidup & Kebersihan',
    'Pelayanan Kependudukan': 'Dinas Kependudukan & Pencatatan Sipil',
    'Ketertiban & Keamanan': 'Satuan Polisi Pamong Praja (Satpol PP)',
    'Kesehatan': 'Dinas Kesehatan & RSUD Daerah',
    'Sosial & Bansos': 'Dinas Sosial',
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'kategori') {
      setFormData(prev => ({
        ...prev,
        kategori: value,
        instansi: instansiOptions[value] || 'Dinas Terkait'
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, gambar: imageUrl }))
    }
  }

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, gambar: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.judul.trim() || !formData.deskripsi.trim() || !formData.lokasi.trim()) {
      alert('Harap lengkapi judul, deskripsi, dan lokasi aduan Anda.')
      return
    }

    setIsSubmitting(true)

    // Generate Ticket ID
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const newTicketCode = `#TKT-${randomNum}`
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    const newTicket = {
      id: Date.now(),
      tiket: newTicketCode,
      kategori: formData.kategori,
      instansi: formData.instansi,
      judul: formData.judul,
      deskripsi: formData.deskripsi,
      lokasi: formData.lokasi,
      pengadap: formData.isAnonim ? 'Anonim (Identitas Terlindungi)' : (formData.nama.trim() || 'Warga'),
      status: 'Diverifikasi',
      tanggal: `${today}, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      gambarAwal: formData.gambar || 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=600&q=80',
      rating: 5.0
    }

    setTimeout(() => {
      if (onAddTicket) {
        onAddTicket(newTicket)
      }
      setSubmittedTicket(newTicket)
      setIsSubmitting(false)
      // Reset form
      setFormData({
        kategori: 'Infrastruktur & Jalan',
        instansi: 'Dinas Pekerjaan Umum & Penataan Ruang',
        judul: '',
        deskripsi: '',
        lokasi: '',
        nama: '',
        kontak: '',
        isAnonim: false,
        gambar: null
      })
    }, 600)
  }

  return (
    <section className="w-full py-space-xl bg-surface" id="lapor-form">
      <div className="max-w-4xl mx-auto px-margin">
        <div className="text-center mb-space-lg">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
            Layanan Pengaduan Mandiri
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1 font-bold">
            Sampaikan Laporan / Pengaduan Baru
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-2">
            Isi rincian pengaduan dengan data yang valid agar segera dapat diverifikasi dan ditindaklanjuti oleh dinas teknis terkait.
          </p>
        </div>

        {submittedTicket && (
          <div className="mb-space-lg p-6 rounded-2xl bg-secondary-container/50 border border-secondary-container flex flex-col md:flex-row items-center justify-between gap-4 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold">Laporan Berhasil Diterbitkan!</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Nomor Tiket Anda: <strong className="font-mono text-primary font-bold text-base">{submittedTicket.tiket}</strong>. Simpan nomor ini untuk melacak perkembangan aduan Anda.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a href="#lacak-tiket" className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all">
                Lacak Tiket Sekarang
              </a>
              <button 
                type="button" 
                onClick={() => setSubmittedTicket(null)}
                className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                title="Tutup Notifikasi"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-surface-container-lowest rounded-3xl shadow-sm border border-surface-container p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                  Pilih Kategori Masalah <span className="text-error">*</span>
                </label>
                <select 
                  name="kategori" 
                  value={formData.kategori}
                  onChange={handleChange} 
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all"
                  required
                >
                  <option value="Infrastruktur & Jalan">Infrastruktur, Jalan &amp; Jembatan</option>
                  <option value="Lingkungan Hidup">Lingkungan Hidup, Sampah &amp; Drainase</option>
                  <option value="Pelayanan Kependudukan">Pelayanan Kependudukan &amp; Perizinan</option>
                  <option value="Ketertiban & Keamanan">Ketertiban Umum &amp; Satpol PP</option>
                  <option value="Kesehatan">Kesehatan &amp; Pelayanan Rumah Sakit</option>
                  <option value="Sosial & Bansos">Bantuan Sosial &amp; Kemiskinan</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                  Dinas Tujuan Terdisposisi
                </label>
                <input 
                  type="text" 
                  value={formData.instansi} 
                  readOnly 
                  className="w-full px-4 py-3 rounded-xl bg-surface-container/60 border border-outline-variant text-on-surface-variant cursor-not-allowed text-body-md font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-label-md text-label-md text-on-surface font-semibold">
                  Judul Laporan / Ringkasan Pokok Aduan <span className="text-error">*</span>
                </label>
                <span className="text-caption text-caption text-outline">{formData.judul.length}/100</span>
              </div>
              <input 
                type="text" 
                name="judul" 
                maxLength={100}
                value={formData.judul}
                onChange={handleChange} 
                placeholder="Contoh: Aspal Rusak Berlubang Parah di Depan Puskesmas Depok" 
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all"
                required
              />
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                Lokasi Kejadian Lengkap <span className="text-error">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3.5 text-outline text-[20px]">location_on</span>
                <input 
                  type="text" 
                  name="lokasi" 
                  value={formData.lokasi}
                  onChange={handleChange} 
                  placeholder="Nama jalan, RT/RW, nomor rumah, atau patokan lokasi spesifik" 
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-label-md text-label-md text-on-surface font-semibold">
                  Rincian Kronologi / Deskripsi Masalah <span className="text-error">*</span>
                </label>
                <span className="text-caption text-caption text-outline">{formData.deskripsi.length}/500</span>
              </div>
              <textarea 
                name="deskripsi" 
                maxLength={500}
                value={formData.deskripsi}
                onChange={handleChange} 
                rows={4} 
                placeholder="Jelaskan secara rinci kondisi lapangan, sejak kapan terjadi, dampak terhadap warga sekitar..." 
                className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all resize-y"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                  Nama Pelapor
                </label>
                <input 
                  type="text" 
                  name="nama" 
                  disabled={formData.isAnonim}
                  value={formData.isAnonim ? 'Identitas Dirahasiakan (Anonim)' : formData.nama}
                  onChange={handleChange} 
                  placeholder="Masukkan nama lengkap Anda" 
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all ${formData.isAnonim ? 'bg-surface-container opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                  Nomor Kontak / WhatsApp
                </label>
                <input 
                  type="tel" 
                  name="kontak" 
                  disabled={formData.isAnonim}
                  value={formData.isAnonim ? '-' : formData.kontak}
                  onChange={handleChange} 
                  placeholder="08xxxxxxxxxx (untuk konfirmasi SMS/WA)" 
                  className={`w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-body-md text-on-surface transition-all ${formData.isAnonim ? 'bg-surface-container opacity-60 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3 border border-surface-container">
              <input 
                type="checkbox" 
                id="isAnonimClean"
                name="isAnonim"
                checked={formData.isAnonim}
                onChange={handleChange}
                className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="isAnonimClean" className="text-body-sm text-on-surface cursor-pointer select-none">
                <strong>Lapor Sebagai Anonim (Rahasia):</strong> Nama dan nomor kontak Anda tidak akan ditampilkan kepada publik maupun petugas teknis lapangan demi kenyamanan dan perlindungan identitas pelapor.
              </label>
            </div>

            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2 font-semibold">
                Unggah Foto Bukti Kejadian (Opsional)
              </label>

              {formData.gambar ? (
                <div className="relative rounded-2xl overflow-hidden border border-surface-container bg-surface-container-low p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img 
                    src={formData.gambar} 
                    alt="Pratinjau Foto Bukti" 
                    className="w-32 h-24 object-cover rounded-xl shadow-xs"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <p className="font-title-md text-on-surface font-semibold">Foto Bukti Berhasil Dipilih</p>
                    <p className="text-caption text-on-surface-variant">Foto ini akan dilampirkan bersama tiket laporan Anda.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 rounded-xl bg-error/10 text-error hover:bg-error/20 font-label-sm font-semibold transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    Hapus Foto
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-outline-variant rounded-2xl p-6 text-center hover:bg-surface-container-low transition-colors">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    id="fotoBuktiClean"
                    className="hidden"
                  />
                  <label htmlFor="fotoBuktiClean" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[28px]">add_a_photo</span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-medium">Klik untuk memilih foto bukti dari perangkat Anda</span>
                    <span className="text-caption text-caption text-on-surface-variant">Mendukung format JPG, PNG maks 5MB</span>
                  </label>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-bold"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[22px]">progress_activity</span>
                  <span>Menerbitkan Laporan...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[22px]">send</span>
                  <span>Kirim Laporan Resmi</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LaporForm
