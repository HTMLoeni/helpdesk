-- Row Level Security policies for table public.pengaduan
-- Replaces the "Demo allow all access" policy from schema.sql

-- Hapus policy demo yang membuka semua akses ke semua role
drop policy if exists "Demo allow all access" on public.pengaduan;

-- Pilihan desain kebijakan:
--
-- 1. INSERT, UPDATE, DELETE dibatasi hanya untuk role `authenticated`
--    (pengguna yang sudah login melalui Supabase Auth). Admin yang mengelola
--    data pengaduan melalui halaman /manajemen-pengaduan harus terautentikasi
--    terlebih dahulu, sehingga hanya mereka yang dapat menulis data.
--
-- 2. SELECT dibuka untuk role `anon` (publik) karena data pengaduan juga
--    ditampilkan di halaman publik (rute /) sehingga warga tanpa login masih
--    dapat melihat daftar pengaduan. Role `authenticated` juga diizinkan SELECT
--    untuk keperluan admin.
--
-- Kebijakan dipisah per aksi dan per role agar intent masing-masing eksplisit
-- dan mudah diaudit.

-- Select: publik (anon) boleh membaca data untuk ditampilkan di halaman publik
create policy "Public can read pengaduan"
    on public.pengaduan
    for select
    to anon
    using (true);

-- Select: pengguna yang sudah login boleh membaca data
create policy "Authenticated can read pengaduan"
    on public.pengaduan
    for select
    to authenticated
    using (true);

-- Insert: hanya pengguna yang sudah login boleh menambahkan data
create policy "Authenticated can insert pengaduan"
    on public.pengaduan
    for insert
    to authenticated
    with check (true);

-- Update: hanya pengguna yang sudah login boleh memperbarui data
create policy "Authenticated can update pengaduan"
    on public.pengaduan
    for update
    to authenticated
    using (true)
    with check (true);

-- Delete: hanya pengguna yang sudah login boleh menghapus data
create policy "Authenticated can delete pengaduan"
    on public.pengaduan
    for delete
    to authenticated
    using (true);
