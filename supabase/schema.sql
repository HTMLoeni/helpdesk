-- Supabase schema for helpdesk "pengaduan" table.
-- Safe to run multiple times (idempotent).

-- Enable UUID extension (usually already enabled in Supabase).
create extension if not exists "uuid-ossp";

-- Main table
create table if not exists public.pengaduan (
    id uuid primary key default gen_random_uuid(),
    nomor_tiket varchar not null,
    nama_pelapor varchar not null,
    kategori_layanan varchar not null,
    isi_laporan text not null,
    lokasi_kejadian varchar not null,
    instansi_tujuan varchar not null,
    lampiran_bukti varchar,
    rating_kepuasan integer,
    status varchar not null default 'baru'
        check (status in ('baru', 'diverifikasi', 'diproses', 'selesai', 'ditolak')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Trigger to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists pengaduan_set_updated_at on public.pengaduan;
create trigger pengaduan_set_updated_at
    before update on public.pengaduan
    for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.pengaduan enable row level security;

drop policy if exists "Demo allow all access" on public.pengaduan;
create policy "Demo allow all access"
    on public.pengaduan
    for all
    to anon, authenticated
    using (true)
    with check (true);

-- Sample data (5 rows, Indonesian)
insert into public.pengaduan (
    nomor_tiket, nama_pelapor, kategori_layanan, isi_laporan,
    lokasi_kejadian, instansi_tujuan, lampiran_bukti, rating_kepuasan, status
) values
(
    'TKT-2025-1049',
    'Bambang Hermawan',
    'Infrastruktur Jalan',
    'Lubang jalan aspal sedalam 20cm dekat pertigaan lampu merah menyebabkan pengendara motor tergelincir semalam.',
    'Jl. Ahmad Yani No. 84, RT 02/07',
    'Dinas PUPR',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBgGmKRysuxMRE8a8PsXaC99XNJ7RPGGht4T4HfObWv-R8gv0HFRErhv0AGqKmso5bISxnGEde93-FZzB4IgLUO_ZkmcmtThXLTZPuvUiipqgKSVU6I46lryQKQjKDlIZ0MXxeYgTjmEQOWne2RIKZvifjwOZzpgrrVjowpxDK76yWHuXzsjevnv8_in647fl2qHJD7KHcybzXkCcvWLJn_Yzo24QrWiXjNlnJreaaxCaksJ0lLNy-u',
    null,
    'baru'
),
(
    'TKT-2025-1048',
    'Siti Nurhaliza',
    'Pelayanan Kependudukan',
    'Keterlambatan pencetakan blanko KTP-el pemula sudah lewat 3 minggu dari batas jadwal pengambilan di loket kecamatan.',
    'Kecamatan Sukamaju Baru',
    'Disdukcapil',
    null,
    null,
    'diverifikasi'
),
(
    'TKT-2025-1047',
    'Hendra Wijaya',
    'Lingkungan Hidup',
    'Timbunan sampah liar di pinggir tanggul kali menimbulkan bau menyengat dan tersumbat saat hujan deras.',
    'Tanggul Kali RT 04/RW 02',
    'Dinas Lingkungan Hidup',
    null,
    null,
    'diproses'
),
(
    'TKT-2025-1046',
    'Dewi Anggraini',
    'Penerangan Jalan Umum',
    'Lampu PJU sepanjang jalan protokol padam 4 titik berturut-turut, membahayakan pelintas malam.',
    'Jl. Diponegoro KM 4.2',
    'Dinas Perhubungan',
    null,
    5,
    'selesai'
),
(
    'TKT-2025-1044',
    'Agus Pratama',
    'Kewenangan Swasta',
    'Sengketa iuran renovasi ruko kawasan niaga swasta (bukan fasum milik pemerintah daerah).',
    'Mall Sentral Niaga Kav. 12',
    'Non-Pemerintah',
    null,
    null,
    'ditolak'
);