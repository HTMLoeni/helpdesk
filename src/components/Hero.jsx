export const Hero = () => {
  return (
    <section className="w-full bg-surface-container-low/70 py-space-xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm shadow-sm">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              Kanal Resmi Pengaduan Pemerintah Daerah Terbuka &amp; Terlindungi
            </div>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface leading-tight tracking-tight">
              Sampaikan Aspirasi &amp; Pengaduan Anda Demi Pembangunan Daerah yang Lebih Baik
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Layanan aduan masyarakat terintegrasi yang responsif, transparan, dan dapat dipantau langsung perkembangannya mulai dari disposisi dinas teknis hingga penyelesaian lapangan.
            </p>
            <div className="flex flex-wrap items-center gap-space-sm pt-2">
              <a className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md shadow-md transition-all" href="#lapor-form">
                <span className="material-symbols-outlined text-[20px]">edit_document</span>
                Buat Laporan Baru
              </a>
              <a className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-primary font-title-md text-title-md shadow-sm transition-all" href="#lacak-tiket">
                <span className="material-symbols-outlined text-[20px]">search_check</span>
                Lacak Status Tiket
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-caption font-caption text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                <span>Jaminan Kerahasiaan Identitas (Anonim)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                <span>Disposisi Cepat &lt; 24 Jam Kerja</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-md">
              <div className="flex items-center justify-between pb-space-xs">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Capaian Transparansi Daerah</p>
                  <h3 className="font-title-md text-headline-sm text-on-surface">Statistik Kinerja Aduan 2024</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Real-Time</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">14.820+</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Total Laporan Masuk</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-1">Sejak Januari 2024</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">94,8%</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Tingkat Terselesaikan</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-1">14.049 aduan tuntas</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
                  <span className="font-headline-lg text-headline-lg text-secondary font-bold">2,4 Hari</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Rata Waktu Tanggap</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-1">Batas SOP maks 3 hari</span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-headline-lg text-headline-lg text-primary font-bold">4.8</span>
                    <div className="flex text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Indeks Kepuasan Warga</span>
                  <span className="font-caption text-caption text-on-surface-variant mt-1">Berdasarkan 9.240 ulasan</span>
                </div>
              </div>
              <div className="p-3 bg-surface-container-low/60 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface font-medium">Penyelesaian Bulan Ini</p>
                    <p className="font-caption text-caption text-on-surface-variant">987 dari 1.024 aduan telah rampung fisik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

