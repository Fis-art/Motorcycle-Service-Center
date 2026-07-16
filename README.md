# Workshop Management System

Sistem informasi bengkel / workshop motor yang terdiri dari:

- **Backend** — REST API berbasis Node.js (Express) + MySQL
- **Frontend** — Aplikasi web React (Vite)

---

## Quick Start

```bash
# 1. Clone repo
git clone https://github.com/username/repo-name.git
cd repo-name

# 2. Setup backend
cd workshop/backend
cp .env.example .env      # lalu isi sesuai kebutuhanmu
npm install
npm run db:setup           # import struktur tabel
npm run db:seed            # (opsional) isi data contoh
npm run dev                # jalankan backend

# 3. Setup frontend (terminal baru)
cd workshop/frontend
npm install
npm run dev                # jalankan frontend
```

Buka `http://localhost:5174` untuk melihat website.

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Struktur Proyek](#struktur-proyek)
- [Setup Database (MySQL)](#setup-database-mysql)
- [Konfigurasi Environment (.env)](#konfigurasi-environment-env)
- [Menjalankan Backend](#menjalankan-backend)
- [Menjalankan Frontend](#menjalankan-frontend)
- [Akses Aplikasi](#akses-applikasi)
- [Build & Deployment](#build--deployment)
- [Kustomisasi](#kustomisasi)
- [Troubleshooting](#troubleshooting)

---

## Prasyarat

Pastikan perangkat sudah menginstal:

| Tool | Versi Minimum | Cek dengan |
|------|---------------|------------|
| Node.js | v18+ | `node -v` |
| npm | v9+ | `npm -v` |
| MySQL / MariaDB | MySQL 8.0+ / MariaDB 10.3+ | `mysql --version` |

> Frontend menggunakan Vite + React 18, backend menggunakan Express + `mysql2`.

---

## Struktur Proyek

```
workshop/
├── backend/                  # REST API (Node.js + Express + MySQL)
│   ├── config/database.js   # Koneksi pool MySQL
│   ├── controllers/         # Logika bisnis tiap endpoint
│   ├── database/
│   │   ├── schema.sql       # Struktur tabel
│   │   └── seeder.sql       # Data awal (opsional)
│   ├── middleware/          # Auth, upload, dll
│   ├── models/              # Akses data
│   ├── routes/              # Definisi rute API
│   ├── uploads/             # File hasil upload
│   ├── .env                 # Konfigurasi environment (jangan di-commit)
│   ├── .env.example         # Template environment
│   ├── app.js
│   └── server.js
└── frontend/                # Web app (React + Vite)
    ├── src/
    │   ├── config/api.js    # Instance axios (baseURL /api)
    │   ├── components/
    │   ├── pages/
    │   └── ...
    ├── index.html
    ├── vite.config.js
    └── package.json
```

Port default:
- **Backend**: `4001`
- **Frontend (dev)**: `5174`

---

## Setup Database (MySQL)

1. Pastikan service MySQL berjalan.

   ```bash
   # Linux (systemd)
   sudo systemctl start mysql

   # atau MariaDB
   sudo systemctl start mariadb
   ```

2. Buat file `.env` dari template.

   ```bash
   cd workshop/backend
   cp .env.example .env
   ```

3. Ubah isi `.env` sesuai kebutuhanmu — terutama `DB_NAME`, `DB_USER`, dan `DB_PASSWORD`.

4. Import struktur tabel (database akan otomatis dibuat oleh server).

   ```bash
   npm run db:setup
   ```

5. (Opsional) Isi data awal / contoh.

   ```bash
   npm run db:seed
   ```

> Server juga akan otomatis membuat database saat pertama kali dijalankan (`npm run dev` / `npm start`) jika database belum ada.

---

## Konfigurasi Environment (.env)

Backend membaca konfigurasi dari file `backend/.env`. Buat dari template yang sudah ada:

```bash
cp workshop/backend/.env.example workshop/backend/.env
```

Isi file `backend/.env`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=workshop_db
DB_PORT=3306

# JWT (untuk autentikasi admin)
JWT_SECRET=change_this_to_a_random_secret_string
JWT_EXPIRES_IN=7d

# Port server backend
PORT=4001
```

Penjelasan variabel:

| Variabel | Keterangan |
|----------|------------|
| `DB_HOST` | Host MySQL (biasanya `localhost`) |
| `DB_USER` | Username MySQL |
| `DB_PASSWORD` | Password MySQL |
| `DB_NAME` | Nama database (ubah sesuai keinginanmu) |
| `DB_PORT` | Port MySQL (default `3306`) |
| `JWT_SECRET` | Kunci rahasia untuk menandatangani token login |
| `JWT_EXPIRES_IN` | Masa berlaku token (mis. `7d`) |
| `PORT` | Port tempat backend dijalankan |

> **Penting:** Jangan commit file `.env` berisi secret ke repository publik. File `.env` sudah termasuk dalam `.gitignore`.

Frontend **tidak memerlukan** file `.env` karena `baseURL: '/api'` diarahkan ke backend melalui proxy Vite (`vite.config.js`). Saat production, pastikan web server mem-proxy `/api` dan `/uploads` ke backend pada port `4001`.

---

## Menjalankan Backend

Buka terminal di folder `backend`:

```bash
cd workshop/backend

# 1. Install dependencies
npm install

# 2. Jalankan dalam mode development (auto-reload via nodemon)
npm run dev

# atau jalankan langsung tanpa nodemon
npm start
```

Jika berhasil, terminal akan mencetak:

```
Database connected successfully
Server running on port 4001
```

API dapat diakses di `http://localhost:4001`.

---

## Menjalankan Frontend

Buka terminal baru di folder `frontend`:

```bash
cd workshop/frontend

# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5174`.

> Vite secara otomatis mem-proxy request `/api` dan `/uploads` ke backend di `http://localhost:4001` (lihat `vite.config.js`), sehingga tidak perlu konfigurasi CORS tambahan saat development.

---

## Akses Aplikasi

| Tujuan | URL |
|--------|-----|
| Website pengunjung (frontend dev) | http://localhost:5174 |
| Panel admin | http://localhost:5174/admin/login |
| Backend API | http://localhost:4001 |

**Login admin default:**
- Email: `admin@workshop.com`
- Password: `admin123`

> Ganti email dan password setelah login pertama kali.

---

## Build & Deployment

### Frontend (produksi)

```bash
cd workshop/frontend
npm run build
```

Hasil build berada di folder `frontend/dist/`. Untuk pratinjau hasil build:

```bash
npm run preview
```

### Backend (produksi)

```bash
cd workshop/backend
npm install --production
npm start
```

Pastikan:
- Database MySQL sudah berjalan dan `schema.sql` sudah diimpor.
- File `.env` sudah diisi dengan nilai environment produksi.
- Web server (Nginx/Caddy/Apache) mem-proxy `/api` dan `/uploads` ke `http://localhost:4001`.
- Folder `backend/uploads/` memiliki izin tulis agar fitur upload berfungsi.

---

## Kustomisasi

### Mengganti Nama Toko

1. Ubah `DB_NAME` di `backend/.env` dengan nama database milikmu.
2. Jalankan `npm run db:setup` untuk membuat database baru.
3. Edit konten website melalui panel admin di `http://localhost:5174/admin/login`.

### Mengubah Port

Ubah variabel `PORT` di `backend/.env`. Untuk frontend, edit `vite.config.js`:

```js
server: {
  port: 5174,  // ubah sesuai kebutuhan
  proxy: {
    '/api': 'http://localhost:4001',
    '/uploads': 'http://localhost:4001'
  }
}
```

---

## Troubleshooting

**1. `Database connection failed`**
- Pastikan MySQL berjalan (`sudo systemctl status mysql`).
- Cek `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` di `backend/.env`.
- Jalankan `npm run db:setup` untuk import struktur tabel.

**2. Endpoint API mengembalikan 404 / tidak terhubung dari frontend**
- Pastikan backend berjalan di port `4001`.
- Saat development, proxy Vite menangani `/api`; pastikan `npm run dev` backend dan frontend keduanya aktif.

**3. `EADDRINUSE` (port sudah digunakan)**
- Ubah `PORT` di `backend/.env` atau tutup proses yang memakai port tersebut.

**4. Upload file gagal**
- Pastikan folder `backend/uploads/` ada dan dapat ditulis.

**5. Perubahan tidak terlihat saat development**
- Backend: `npm run dev` menggunakan nodemon (auto-reload).
- Frontend: Vite HMR otomatis me-reload perubahan.

---

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Backend | Node.js, Express, MySQL2 |
| Frontend | React 18, Vite, React Router |
| Auth | JWT (JSON Web Token) |
| Styling | styled-jsx |
| Upload | Multer |
| Database | MySQL 8.0+ / MariaDB 10.3+ |
