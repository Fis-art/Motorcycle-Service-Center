# Megabuana Motor

Sistem informasi bengkel / workshop motor **Megabuana Motor** yang terdiri dari:

- **Backend** — REST API berbasis Node.js (Express) + MySQL
- **Frontend** — Aplikasi web React (Vite)

---

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Struktur Proyek](#struktur-proyek)
- [Setup Database (MySQL)](#setup-database-mysql)
- [Konfigurasi Environment (`.env`)](#konfigurasi-environment-env)
- [Menjalankan Backend](#menjalankan-backend)
- [Menjalankan Frontend](#menjalankan-frontend)
- [Akses Aplikasi](#akses-aplikasi)
- [Build & Deployment](#build--deployment)
- [Troubleshooting](#troubleshooting)

---

## Prasyarat

Pastikan perangkat sudah menginstal:

| Tool | Versi Minimum | Cek dengan |
|------|---------------|------------|
| Node.js | v18+ | `node -v` |
| npm | v9+ | `npm -v` |
| MySQL / MariaDB | MySQL 8.0+ / MariaDB 10.3+ | `mysql --version` |

> Frontend menggunakan Vite dan React 18, backend menggunakan Express dengan `mysql2`.

---

## Struktur Proyek

```
megabuana motor/
├── backend/                 # REST API (Node.js + Express + MySQL)
│   ├── config/database.js  # Koneksi pool MySQL
│   ├── controllers/        # Logika bisnis tiap endpoint
│   ├── database/
│   │   ├── schema.sql      # Struktur tabel
│   │   └── seeder.sql      # Data awal (opsional)
│   ├── middleware/         # Auth, upload, dll
│   ├── models/             # Akses data
│   ├── routes/             # Definisi rute API
│   ├── uploads/            # File hasil upload
│   ├── .env                # Konfigurasi environment
│   ├── app.js
│   └── server.js
└── frontend/               # Web app (React + Vite)
    ├── src/
    │   ├── config/api.js   # Instance axios (baseURL /api)
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

2. Masuk ke MySQL sebagai root.

   ```bash
   mysql -u root -p
   ```

3. Buat database dan impor struktur tabel.

   ```bash
   # Dari folder backend/
   mysql -u root -p < database/schema.sql
   ```

   Perintah di atas akan membuat database `megabuana_motor` (jika belum ada) beserta seluruh tabelnya.

4. (Opsional) Isi data awal / contoh.

   ```bash
   mysql -u root -p megabuana_motor < database/seeder.sql
   ```

> Jika menggunakan user/password MySQL selain `root`, sesuaikan pada langkah import dan pada file `.env` (lihat bagian berikut).

---

## Konfigurasi Environment (`.env`)

Backend membaca konfigurasi dari file `backend/.env`. File ini sudah ada sebagai contoh; sesuaikan nilainya dengan environment kamu.

`backend/.env`

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=megabuana_motor
DB_PORT=3306

# JWT (untuk autentikasi admin)
JWT_SECRET=megabuana_motor_jwt_secret_key_2024
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
| `DB_NAME` | Nama database (`megabuana_motor`) |
| `DB_PORT` | Port MySQL (default `3306`) |
| `JWT_SECRET` | Kunci rahasia untuk menandatangani token login |
| `JWT_EXPIRES_IN` | Masa berlaku token (mis. `7d`) |
| `PORT` | Port tempat backend dijalankan |

> **Penting:** Jangan commit file `.env` berisi secret ke repository publik. File `.env` sudah termasuk dalam `.gitignore` backend.

Frontend **tidak memerlukan** file `.env` karena `baseURL: '/api'` diarahkan ke backend melalui proxy Vite (`vite.config.js`). Saat production, pastikan web server mem-proxy `/api` dan `/uploads` ke backend pada port `4001`.

---

## Menjalankan Backend

Buka terminal di folder `backend`:

```bash
cd "megabuana motor/backend"

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
cd "megabuana motor/frontend"

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

---

## Build & Deployment

### Frontend (produksi)

```bash
cd "megabuana motor/frontend"
npm run build
```

Hasil build berada di folder `frontend/dist/`. Untuk pratinjau hasil build:

```bash
npm run preview
```

### Backend (produksi)

```bash
cd "megabuana motor/backend"
npm install --production
npm start
```

Pastikan:
- Database MySQL sudah berjalan dan `schema.sql` sudah diimpor.
- File `.env` sudah diisi dengan nilai environment produksi.
- Web server (Nginx/Caddy/Apache) mem-proxy `/api` dan `/uploads` ke `http://localhost:4001`.
- Folder `backend/uploads/` memiliki izin tulis agar fitur upload berfungsi.

---

## Troubleshooting

**1. `Database connection failed`**
- Pastikan MySQL berjalan (`sudo systemctl status mysql`).
- Cek `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` di `backend/.env`.
- Pastikan database `megabuana_motor` sudah dibuat (`schema.sql` sudah diimpor).

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

## Catatan Tambahan

- Backend menggunakan `bcryptjs` untuk hash password, `jsonwebtoken` untuk autentikasi, dan `multer` untuk upload file.
- Frontend menggunakan React Router untuk routing dan `styled-jsx` untuk styling.
- Seluruh koneksi database menggunakan connection pool (`mysql2/promise`).
