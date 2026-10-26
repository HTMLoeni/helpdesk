export const ProcessSteps = () => {
  const steps = [
    { num: '01', title: 'Tulis Laporan', desc: 'Isi formulir pengaduan dengan jelas, sertakan alamat lokasi kejadian, pilih instansi tujuan, dan unggah foto bukti autentik.' },
    { num: '02', title: 'Verifikasi Admin', desc: 'Admin Diskominfo/LPSE memvalidasi keabsahan berkas dalam 24 jam dan mendisposisikan tiket aduan langsung ke dinas teknis yang berwenang.' },
    { num: '03', title: 'Aksi Dinas Teknis', desc: 'OPD pelaksana menerjunkan tim ke lapangan, melakukan perbaikan fisik, dan mengunggah foto laporan hasil penanganan ke dalam sistem.' },
    { num: '04', title: 'Tuntas & Dinilai', desc: 'Warga menerima notifikasi kelulusan aduan, dapat mengunduh surat bukti penanganan, serta memberikan rating kepuasan (SKM).' },
  ];

  return (
    <section className="w-full py-space-xl bg-surface" id="alur-faq">
      <div className="max-w-7xl mx-auto px-margin flex flex-col gap-space-lg">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">Transparansi Pelayanan</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">4 Langkah Mudah &amp; Transparan</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Setiap aduan yang masuk dijamin ditindaklanjuti secara akuntabel dengan tahapan pengawasan yang jelas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
          {steps.map((step) => (
            <div key={step.num} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container flex flex-col items-start gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container font-headline-sm text-headline-sm font-bold">
                {step.num}
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">{step.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
