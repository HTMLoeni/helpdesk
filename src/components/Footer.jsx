export const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-margin grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-2 flex flex-col gap-space-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">LAPOR-DAERAH</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg mt-space-xs">
            Kanal resmi aspirasi dan pengaduan online masyarakat daerah yang transparan, akuntabel, dan responsif sesuai standar pelayanan publik terpadu (SP4N-LAPOR).
          </p>
          <span className="font-caption text-caption text-outline mt-space-sm">
            Dikelola oleh Dinas Komunikasi, Informatika, dan Statistik Daerah &copy; 2024
          </span>
        </div>
        <div>
          <p className="font-title-md text-title-md text-on-surface mb-space-sm font-semibold">Layanan Publik</p>
          <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <li><a className="hover:text-primary transition-colors" href="#lapor-form">Formulir Pengaduan Warga</a></li>
            <li><a className="hover:text-primary transition-colors" href="#lacak-tiket">Pencarian Resi &amp; Tiket</a></li>
            <li><a className="hover:text-primary transition-colors" href="#aduan-publik">Transparansi Aduan Terbuka</a></li>
            <li><a className="hover:text-primary transition-colors" href="#alur-faq">Alur Penanganan &amp; FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="font-title-md text-title-md text-on-surface mb-space-sm font-semibold">Bantuan &amp; Kontak</p>
          <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">call</span>
              <span>Call Center: <strong>112</strong> (Bebas Pulsa)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">chat</span>
              <span>WhatsApp: 0811-9292-000</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">mail</span>
              <span>Email: lapor@pemda.go.id</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
              <span>Gedung Balai Warga Lt. 1, Pusat Pelayanan Terpadu</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

