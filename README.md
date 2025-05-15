# SIPSPONTREN - Sistem Informasi Pengelolaan Surat Pondok Pesantren

SIPSPONTREN adalah sistem informasi berbasis web yang dirancang untuk memudahkan proses pengajuan, pengelolaan, dan penerbitan surat di lingkungan pondok pesantren atau institusi sejenis. Sistem ini menyediakan antarmuka yang intuitif untuk pengguna (santri/staf) dan administrator, serta mendukung alur kerja yang terstruktur dan efisien.

## ✨ Fitur Unggulan

### 🔐 Autentikasi Pengguna
- Login berbasis email dan password.
- Otentikasi aman sebelum akses ke sistem.

### 🧑‍💼 Dashboard Admin
- Rekap data pengajuan surat berdasarkan status.
- Tampilkan 5 pengajuan terbaru.
- Sidebar navigasi cepat antar halaman admin.

### 📬 Manajemen Pengajuan Surat (Admin)
- Melihat seluruh daftar pengajuan.
- Menyetujui atau menolak pengajuan.
- Melihat detail pengajuan dengan satu klik.
- Pencarian surat berdasarkan kata kunci.

### 👥 Manajemen Pengguna (Admin)
- Menampilkan daftar pengguna lengkap dengan identitas.
- Pencarian pengguna dan pengelolaan akun (edit/hapus).
- Dialog untuk mengubah role dan password pengguna.
- Import pengguna melalui file Excel.
- Unduh template Excel untuk input massal.

### 🧾 Kelola Template Surat
- Melihat daftar template surat yang tersedia.
- Filter dan pencarian berdasarkan ketersediaan.
- Mengaktifkan / menonaktifkan template surat.
- Reset dan ubah nomenklatur surat.

### 👤 Dashboard Pengguna
- Ringkasan total pengajuan surat dan statusnya.
- Navigasi cepat ke formulir pengajuan surat.

### ✍️ Pengajuan Surat (User)
- Pilih jenis surat dan isi data yang dibutuhkan.
- Formulir yang adaptif sesuai jenis surat yang dipilih.

### 📜 Riwayat Pengajuan Surat
- Daftar seluruh pengajuan beserta statusnya.
- Filter riwayat berdasarkan status.
- Unduh surat yang telah disetujui.

### 🙋‍♂️ Profil Pengguna
- Informasi detail akun pengguna.
- Menampilkan daftar pengajuan terakhir.
- Logout yang mudah dan cepat.

---

## 📸 Antarmuka Pengguna

SIPSPONTREN dirancang dengan tampilan yang modern, ringan, dan mudah digunakan baik oleh admin maupun user. Sidebar navigasi konsisten di setiap halaman untuk memastikan pengalaman pengguna yang lancar.

---

## ⚙️ Teknologi yang Digunakan

- **Frontend**: Next.js + Tailwindcss + shadcn 
- **Backend**: Next.js API Route
- **Database**: NeonDB + PostgreSQL
- **Claude Storage**: Firebase
- **Autentikasi**: Better Auth
- **Fitur Tambahan**:
  - Import/Export Excel
  - Role-based Access Control (RBAC)

---

## 🚀 Cara Menjalankan Proyek

```bash
# 1. Clone repositori ini
git clone https://github.com/username/sipspontren.git
cd sipspontren

# 2. Install dependensi
npm install   # atau yarn install

# 3. Buat file .env 
# enviroment untuk authentikasi
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
# enviroment untuk claude storage firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
# enviroment untuk database
DATABASE_URL=

# 4. generate model database
npx prisma generate
# 5. push database
npx prisma db push

# 6. Jalankan development server
npm run dev   # atau yarn dev

# 7. Buka di browser
http://localhost:3000
