export const FAQ = () => {
  const faqs = [
    { 
      q: 'Apakah identitas saya aman jika melaporkan pungutan liar atau pelanggaran oknum?', 
      a: 'Sangat aman. Sistem LAPOR-DAERAH menyediakan fitur "Anonim" dan "Rahasia". Ketika dicentang, identitas nama, NIK, dan nomor kontak Anda dienkripsi sehingga petugas teknis dinas sekalipun tidak dapat melihat data pribadi Anda.' 
    },
    { 
      q: 'Berapa lama batas maksimal sebuah laporan ditindaklanjuti oleh dinas?', 
      a: 'Berdasarkan Peraturan Kepala Daerah dan SOP SP4N, verifikasi awal dilakukan maksimal 1x24 jam kerja. Untuk aduan bersifat pelayanan administrasi, diselesaikan 1-3 hari kerja. Untuk kerusakan infrastruktur jalan dan fisik, respon tanggap darurat maksimal 3x24 jam.' 
    },
    { 
      q: 'Bagaimana jika pengaduan saya ditolak oleh tim verifikator?', 
      a: 'Laporan ditolak umumnya karena: 1) Bukti foto tidak ada/buram, 2) Kewenangan berada di ranah Pemerintah Pusat / Instansi Vertikal (misal: Kementerian PUPR / Kepolisian), atau 3) Mengandung ujaran kebencian. Alasan penolakan akan tertera detail di halaman Lacak Tiket dan Anda dapat mengajukan revisi data ulang.' 
    },
    { 
      q: 'Apakah saya mendapatkan tanda bukti lapor resmi yang berkekuatan hukum?', 
      a: 'Ya. Setelah laporan diverifikasi, Anda dapat mengunduh Lembar Tanda Terima Pengaduan Digital (Format PDF) yang dilengkapi Barcode Verifikasi Tanda Tangan Elektronik Balai Sertifikasi Elektronik (BSrE).' 
    },
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-low/40" id="faq">
      <div className="max-w-4xl mx-auto px-margin flex flex-col gap-space-lg">
        <div className="text-center">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Pusat Bantuan Warga</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">Pertanyaan yang Sering Diajukan (FAQ)</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Temukan jawaban cepat seputar tata kelola perlindungan identitas dan tindak lanjut aduan.</p>
        </div>
        <div className="flex flex-col gap-space-sm">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group p-space-md rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container transition-all" open={idx === 0}>
              <summary className="flex items-center justify-between cursor-pointer font-title-md text-title-md text-on-surface list-none font-semibold">
                <span>{faq.q}</span>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm pt-space-xs border-t border-surface-container">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

