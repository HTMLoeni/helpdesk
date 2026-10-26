export const CTABanner = () => {
  return (
    <section className="w-full py-space-lg bg-surface" id="cta-banner">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="p-space-lg lg:p-space-xl rounded-3xl bg-primary text-on-primary shadow-lg flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                Legalitas Pelaporan Warga
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold">
              Unduh Bukti Registrasi Tiket &amp; Berita Acara Penyelesaian
            </h2>
            <p className="font-body-md text-body-md text-on-primary/90 mt-1">
              Setiap aduan yang terselesaikan secara tuntas memiliki arsip Berita Acara Digital yang dapat Anda simpan atau cetak untuk keperluan administratif instansi RT/RW atau institusi terkait.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full lg:w-auto shrink-0">
            <a 
              className="w-full sm:w-auto px-space-lg py-3.5 rounded-xl bg-surface-container-lowest text-primary font-title-md text-title-md shadow-md text-center hover:bg-surface-container transition-colors font-bold" 
              href="#lacak-tiket"
            >
              Cari &amp; Unduh Dokumen
            </a>
            <a 
              className="w-full sm:w-auto px-space-lg py-3.5 rounded-xl bg-secondary-container text-on-secondary-container font-title-md text-title-md text-center hover:opacity-90 transition-opacity font-semibold" 
              href="#alur-faq"
            >
              Panduan Format Aduan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
