# Gym Class Booking System

Platform booking kelas gym terintegrasi yang memungkinkan Member untuk mendaftar kelas, melacak keanggotaan, dan memantau kehadiran, serta memberikan alat manajemen bagi Trainer untuk mengelola jadwal dan absensi.

## 👥 Tim Pengembang
| Nama | NIM | Pembagian Tugas |
| :--- | :--- | :--- |
| [Stevanus Cahya Anggara] | [123140038] | Team Leader |
| [Muhammad Gymnastiar Syahputra] | [123140135] | Frontend Developer |
| [Jordy Anugrah Akbar] | [123140141] | Frontend Developer |
| [Diwan Ramadhani Dwi Putra] | [123140116] | Frontend Developer |
| [Annisa Al-Qoriah] | [123140030] | Backend Developer |
| [Bening Apni Prameswari] | [123140089] | Backend Developer |

---

## 🚀 Fitur Utama

### 🔐 User Authentication
* Sistem login dan registrasi dengan role-based access control (**Member** dan **Trainer**).

### 🏋️ Class Management
* **Trainer:** Membuat, membaca, memperbarui, dan menghapus (CRUD) jadwal kelas (nama, deskripsi, waktu, kapasitas).
* **Member:** Menjelajahi daftar kelas yang tersedia secara real-time.

### 📅 Booking System
* **Member:** Melakukan booking kelas dan melihat daftar kelas yang akan diikuti.
* **Trainer:** Melihat daftar peserta (attendance list) untuk setiap sesi.

### 💳 Membership Management
* **Admin/Sistem:** Manajemen paket keanggotaan.
* **Member:** Memantau status keanggotaan dan tanggal kadaluwarsa (expiry date).

### 📝 Attendance Tracking
* **Trainer:** Melakukan absensi kehadiran peserta kelas.
* **Member:** Melihat riwayat kehadiran kelas yang telah selesai.

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
| :--- | :--- |
| **Frontend** | ReactJS (Vite), React Router, Axios |
| **Styling** | Pure CSS & [Tailwind/Bootstrap] |
| **Backend** | Python 3.x, Pyramid Framework |
| **Database** | PostgreSQL |
| **ORM & Migrations** | SQLAlchemy & Alembic |

---

## ⚙️ Instalasi (Local Development)

### Backend
1. Clone repositori ini.
2. Masuk ke direktori backend: `cd backend`.
3. Buat virtual environment: `python -m venv venv`.
4. Aktivasi venv: 
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`.
6. Konfigurasi database di `development.ini`.
7. Jalankan migrasi: `alembic upgrade head`.
8. Jalankan server: `pserve development.ini`.

### Frontend
1. Masuk ke direktori frontend: `cd frontend`.
2. Install package: `npm install`.
3. Jalankan aplikasi: `npm run dev`.

---

## 🌐 Deployment
* **Frontend:** [Link Vercel ]
* **Backend:** [Link Domain *.web.id ]

---

## 📄 API Documentation
### Auth Endpoints
* `POST /auth/register` - Pendaftaran user baru.
* `POST /auth/login` - Mendapatkan token akses.

### Class & Booking Endpoints
* `GET /classes` - List semua kelas.
* `POST /bookings` - Melakukan booking kelas (Member).
* `PATCH /attendance/{id}` - Update status kehadiran (Trainer).



---

## 📸 Screenshots
![Dashboard Member](link_gambar_dashboard)
![Manajemen Kelas](link_gambar_kelas)

---

## 🎥 Video Presentasi
Link Youtube : [Link Video YouTube/Drive]
