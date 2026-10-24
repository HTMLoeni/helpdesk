---
name: Sistem Desain Layanan Aspirasi Daerah
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#42493c'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#72796b'
  outline-variant: '#c2c9b8'
  surface-tint: '#386a1e'
  primary: '#36671c'
  on-primary: '#ffffff'
  primary-container: '#4e8133'
  on-primary-container: '#f8ffed'
  inverse-primary: '#9dd67d'
  secondary: '#4c662e'
  on-secondary: '#ffffff'
  secondary-container: '#cbeaa4'
  on-secondary-container: '#506a32'
  tertiary: '#9d3b3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#bd5353'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b8f396'
  primary-fixed-dim: '#9dd67d'
  on-primary-fixed: '#082100'
  on-primary-fixed-variant: '#215105'
  secondary-fixed: '#ceeda7'
  secondary-fixed-dim: '#b2d08d'
  on-secondary-fixed: '#0f2000'
  on-secondary-fixed-variant: '#354e19'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b1'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#81262a'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

Sistem desain ini dirancang untuk platform pelayanan aspirasi dan pengaduan masyarakat terpadu tingkat daerah. Karakter utama antarmuka memadukan kewibawaan institusi publik dengan keterbukaan layanan digital kontemporer: terpercaya (*trustworthy*), transparan, responsif, dan mudah diakses oleh seluruh lapisan masyarakat (*civic-centered*).

Gaya visual mengadopsi **Corporate / Modern Civic Tech** dengan sentuhan humanis:
- **Kejernihan Informasi**: Menghilangkan birokrasi visual yang kaku demi alur pelaporan yang ringkas, transparan, dan tidak mengintimidasi warga.
- **Keterbukaan & Akuntabilitas**: Menekankan status pelaporan yang eksplisit, alur penyelesaian terstruktur, dan penanda verifikasi yang jelas.
- **Kenyamanan Visual**: Kombinasi warna hijau daun (*forest green*) yang menenangkan dipadukan dengan permukaan netral bersih untuk meminimalkan beban kognitif warga yang sedang menyampaikan keluhan mendesak.

## Colors

Palet warna dibangun di atas fondasi nuansa hijau alami yang mencerminkan pertumbuhan, integritas, dan stabilitas daerah, diseimbangkan dengan warna netral berstandar aksesibilitas WCAG AAA untuk teks tubuh:

- **Primary (`#689D4B`)**: *Forest / Emerald Green*. Digunakan untuk elemen tindakan utama (CTA pengaduan, verifikasi, konfirmasi), tautan aktif, dan status "Selesai".
- **Secondary (`#91AE6E`)**: *Leaf Olive Green*. Digunakan untuk aksen pendukung, kartu ringkasan kategori positif, progres bertahap, dan sorotan statistik.
- **Tertiary / Alert (`#D96868`)**: *Coral Rose*. Digunakan khusus untuk peringatan darurat, pelaporan kritis berkategori bahaya, status "Ditolak/Dibatalkan", dan pembatalan berkas.
- **Background Netral (`#F2F2F2`)**: *Off-white* bersih yang mengurangi silau layar dibanding putih murni, memberikan latar kontras yang nyaman bagi mata.
- **Permukaan & Konten Teks**:
  - `Text Primary`: Slate gelap (`#1E293B`) untuk keterbacaan tajam pada instruksi, judul, dan isi pengaduan.
  - `Text Secondary`: Slate medium (`#334155` dan `#64748B`) untuk metadata, stempel waktu, dan label pelengkap.
  - `Border Subtil`: Slate netral halus (`#E2E8F0`) untuk pembatas kartu dan formulir tanpa menghasilkan kekacauan visual.
- **Status Palet Tambahan (Khusus Portal Aspirasi)**:
  - *Baru*: Biru netral (`#2563EB` / Latar `#EFF6FF`)
  - *Diverifikasi*: Ungu instansi (`#7C3AED` / Latar `#F5F3FF`)
  - *Diproses*: Amber/Kuning hangat (`#D97706` / Latar `#FEF3C7`)
  - *Selesai*: Hijau primer (`#689D4B` / Latar `#F0F7ED`)
  - *Ditolak*: Coral rose (`#D96868` / Latar `#FDF2F2`)

## Typography

Sistem tipografi dirancang dengan pembagian peran yang tegas antara kepribadian publik dan efisiensi baca:

- **Judul & Header (`Plus Jakarta Sans`)**: Memberikan kesan modern, bersahabat, terbuka, dan optimis khas portal pelayanan masa kini. Digunakan pada identitas situs, judul tahapan pengaduan, angka ringkasan statistik, dan tajuk kartu laporan.
- **Isi Teks & Form (`Inter`)**: Menjamin netralitas tinggi, presisi pelaporan detail (seperti lokasi RT/RW, nomor identitas tiket, kronologi kejadian), dan keterbacaan optimal pada perangkat bergerak dengan kerapatan piksel bervariasi.
- **Rasio Skala Teks**: Memakai skala modular yang ramah gawai dengan substitusi ukuran dinamis pada perangkat mobile untuk mempertahankan kenyamanan navigasi tanpa merusak hierarki hierarkis konten.

## Layout & Spacing

Sistem tata letak menggunakan **Fluid Grid 12-kolom** dengan batasan lebar maksimal wadah (*container max-width*) sebesar 1280px untuk desktop dan alur satu kolom adaptif pada mobile:

- **Desktop (>= 1024px)**: 12 kolom, gutter `1.5rem` (24px), margin tepi `2rem` (32px). Form pelaporan menggunakan rasio split 8:4 (8 kolom untuk formulir kronologi dan unggah bukti, 4 kolom untuk panduan etika laporan dan status dinas terkait).
- **Tablet (768px - 1023px)**: 8 kolom, gutter `1rem` (16px), margin luar `1.5rem` (24px).
- **Mobile (< 768px)**: 4 kolom, gutter `1rem` (16px), margin luar `1rem` (16px). Seluruh elemen kartu tiket beralih ke orientasi vertikal penuh dengan navigasi jempol yang ergonomis.
- **Ritme Vertikal Komponen**: Jarak antar section utama menggunakan `space-xl`, jarak antar field formulir menggunakan `space-md`, dan jarak internal card konten menggunakan `space-lg`.

## Elevation & Depth

Kedalaman visual diwujudkan melalui perpaduan **lapisan kontras permukaan (*tonal layers*)** dan **bayangan difus terselubung (*ambient shadows*)** untuk menjaga tampilan tetap bersih, berwibawa, dan tidak berlebihan:

- **Latar Belakang Dasar**: `#F2F2F2` (Off-white canvas).
- **Kartu & Modul Utama (Level 0 - Default)**: Permukaan putih solid `#FFFFFF` dibatasi oleh border tipis `1px solid #E2E8F0` tanpa bayangan tajam, memberikan kesan teratur dan terstruktur.
- **Elevasi Mengambang (Level 1 - Kartu Berinteraksi / Dropdown)**: 
  - Bayangan: `0 4px 16px -2px rgba(30, 41, 59, 0.06), 0 2px 6px -1px rgba(30, 41, 59, 0.04)`.
  - Memberi indikasi bahwa elemen dapat diklik (seperti item tiket laporan publik pada daftar temuan).
- **Elevasi Fokus & Dialog (Level 2 - Modal Konfirmasi & Panel Unggah Bukti)**:
  - Bayangan: `0 20px 25px -5px rgba(30, 41, 59, 0.10), 0 8px 10px -6px rgba(30, 41, 59, 0.04)`.
  - Mengisolasi tugas krusial pengiriman laporan dengan backdrop overlay `rgba(30, 41, 59, 0.40)`.

## Shapes

Bahasa bentuk menggunakan profil sudut melengkung modern bersahabat (**roundedness level 2**) yang menyeimbangkan kelembutan visual portal publik dengan kerapian tata letak:

- **Komponen Kecil & Kontrol Input (`rounded-lg` / 0.5rem - 8px)**: Kolom teks (*text fields*), dropdown pilihan dinas, tombol filter, dan checkbox.
- **Kartu Informasi & Kontainer (`rounded-xl` / 1rem - 16px hingga `rounded-2xl` / 1.5rem - 24px)**: Panel tiket laporan, wadah unggahan dokumen/foto bukti, dan ringkasan metrik instansi.
- **Elemen Identifikasi Cepat (Pill / `rounded-full`)**: Tag status (Baru, Selesai, Diproses) dan avatar identitas anonim pelapor.

## Components

### 1. Tombol (Buttons)
- **Primary CTA ("Kirim Pengaduan", "Ajukan Aspirasi")**: Latar belakang solid Forest Green (`#689D4B`), teks putih, font `Plus Jakarta Sans` semi-bold 14px, radius `rounded-lg` (8px), padding vertikal 12px dan horizontal 20px. State hover menggunakan saturasi lebih gelap (`#57853E`) dengan transisi halus 150ms.
- **Secondary ("Simpan Draf", "Pantau Tiket")**: Latar belakang putih dengan border `1.5px solid #689D4B`, teks hijau `#689D4B`.
- **Tertiary / Destructive ("Batalkan Laporan")**: Latar belakang transparan atau soft-coral (`#FDF2F2`), teks `#D96868`.

### 2. Lencana Status (Status Badges)
Berbentuk *capsule/pill* (`rounded-full`), padding 4px 12px, teks `label-sm` (12px, font-weight 600):
- **Baru**: Teks `#1D4ED8`, latar `#EFF6FF`, border `#DBEAFE`.
- **Diverifikasi**: Teks `#6D28D9`, latar `#F5F3FF`, border `#EDE9FE`.
- **Diproses**: Teks `#B45309`, latar `#FEF3C7`, border `#FDE68A`.
- **Selesai**: Teks `#2E691A`, latar `#F0F7ED`, border `#C6E2BD`.
- **Ditolak**: Teks `#B91C1C`, latar `#FDF2F2`, border `#FECACA`.

### 3. Kartu Pengaduan (Complaint Cards)
- Permukaan putih murni, padding 20px (`space-lg`), sudut `rounded-xl` (16px), border `1px solid #E2E8F0`.
- Memuat: Nomor Registrasi Tiket (misal: `#LAPOR-72819`) dengan teks monospaced/semi-bold, lencana status di pojok kanan atas, tajuk persoalan, cuplikan kronologi singkat (2 baris max dengan elipsis), ikon lokasi kecamatan/desa, dan stempel waktu pembaruan terakhir.

### 4. Input Fields & Form Controls
- Latar putih `#FFFFFF`, border `1px solid #CBD5E1`, sudut `rounded-lg` (8px), teks `body-md` Slate `#1E293B`.
- State fokus: Outline ring 3px berwarna Forest Green lembut (`rgba(104, 157, 75, 0.25)`) dengan border utama `#689D4B`.
- State error: Border `#D96868` disertai teks bantuan peringatan berukuran `caption` di bawah kolom.
- Area Unggah Bukti Lampiran: Area drop-zone dengan garis putus-putus (`border-dashed 2px #CBD5E1`), ikon lampiran foto/dokumen, teks instruksi jelas, dan indikator batas ukuran berkas (maks. 5MB).

### 5. Checkboxes, Radios, & Privasi Pelapor
- Tombol pilihan privasi mencolok: Opsi toggle/radio untuk **"Lapor sebagai Anonim"** atau **"Lapor sebagai Rahasia"** dengan indikator gembok hijau untuk menjamin perlindungan identitas warga.
- Checkbox persetujuan fakta: Warna centang Forest Green aktif berukuran 18x18px dengan sudut `rounded` (4px).

### 6. Timeline Alur Tindak Lanjut (Tracking Stepper)
- Komponen runtutan vertikal atau horizontal yang menampilkan tahapan proses pengaduan secara transparan: Dari penerimaan oleh admin daerah, telaah dinas teknis, aksi lapangan, hingga pengunggahan bukti penyelesaian bagi publik.