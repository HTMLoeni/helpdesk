export const TopNotification = () => {
  return (
    <section className="w-full bg-secondary-container/50 text-on-secondary-container px-margin py-2 text-label-sm font-label-sm border-b border-secondary-container">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span className="font-semibold">Layanan Aktif 24/7:</span>
          <span className="hidden sm:inline">Terintegrasi dengan 34 Perangkat Daerah &amp; 12 Kecamatan Terbuka</span>
        </div>
        <div className="flex items-center gap-4 text-caption font-caption text-on-surface-variant">
          <span>Respon Darurat Cepat Hubungi <strong className="text-primary font-bold">112 (Bebas Pulsa)</strong></span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">Standar Pelayanan SP4N Daerah No. 44/2024</span>
        </div>
      </div>
    </section>
  );
};

export default TopNotification;
