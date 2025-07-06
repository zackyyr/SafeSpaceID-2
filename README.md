# 🛡️ SafeSpaceID – Kelompok 2 Digital Business

**Digital Shelter for Online Survivors**  
SafeSpaceID adalah platform digital yang dirancang untuk memberdayakan perempuan dan kelompok rentan dalam menghadapi Kekerasan Gender Berbasis Online (KGBO). Platform ini menyediakan ruang aman untuk belajar, melapor secara anonim, dan mendapatkan dukungan profesional.

---

## 🚀 Tentang Proyek

SafeSpaceID dikembangkan dalam program **WINIT: Young Entrepreneur x Programmer**, yang mempertemukan pengusaha non-teknis dengan programmer untuk menciptakan solusi digital berbasis kolaborasi. Fokus utama SafeSpaceID adalah menciptakan ekosistem online yang aman dan inklusif melalui:

- 🧠 Edukasi digital tentang KGBO  
- 🫂 Komunitas anonim untuk berbagi cerita  
- 📣 Fitur pelaporan aman yang terhubung dengan lembaga mitra  
- 🤝 Akses ke layanan psikologis dan bantuan hukum (fitur lanjutan)  

---

## ✨ Live Demo

🚧 _Coming soon..._

---

## 🧰 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) – React Framework (App Router & Static Export)
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS Framework
- [NextAuth.js](https://next-auth.js.org/) – Sistem login berbasis kredensial (support anonim)
- [Framer Motion](https://www.framer.com/motion/) – Animasi UI

### Backend (Planned)
- [Express.js](https://expressjs.com/) – Backend ringan
- [PostgreSQL](https://www.postgresql.org/) – Database relasional
- [Cloudinary](https://cloudinary.com/) / [Firebase Storage](https://firebase.google.com/products/storage) – Penyimpanan bukti visual

---

## 🗂️ Struktur Folder (Frontend)

```
safespaceid-client/
├── app/
│   ├── page.tsx                # Halaman Beranda
│   ├── komunitas/              # Halaman Komunitas Anonim
│   │   └── page.tsx
│   ├── edukasi/                # Halaman Artikel
│   │   ├── page.tsx            # Daftar Artikel
│   │   └── [slug]/page.tsx     # Detail Artikel
│   ├── lapor/                  # Form Pelaporan
│   ├── tentang/                # Halaman Tentang
│   └── auth/                   # Halaman Autentikasi
│       └── signin.tsx
├── components/                 # Komponen UI Reusable
│   ├── common/                 # Komponen Umum
│   ├── layout/                 # Layout dan navigasi
│   └── komunitas/              # Komponen Komunitas
├── data/                       # Data dummy (e.g., Articles.json)
├── public/                     # Gambar, logo, ikon
├── styles/                     # Tailwind & Global CSS
├── .env.local                  # Variabel Lingkungan (jika pakai Auth/Storage)
└── README.md                   # Dokumentasi proyek
```

---

## 🔧 Cara Menjalankan Project (Development)

1. **Clone Repository**
   ```bash
   git clone https://github.com/username/safespaceid.git
   cd safespaceid
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

   ➕ Jalankan dengan [Turbopack](https://turbo.build/pack) (default pada Next.js 15+)

4. **Akses di Browser**
   ```
   http://localhost:3000
   ```

---

## ⚙️ Dependencies

```json
"dependencies": {
  "@tailwindcss/postcss": "^4.1.10",
  "clsx": "^2.1.1",
  "framer-motion": "^12.19.1",
  "lucide-react": "^0.522.0",
  "next": "15.3.4",
  "next-auth": "^4.24.11",
  "next-cloudinary": "^6.16.0",
  "postcss": "^8.5.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "tailwindcss": "^4.1.10"
},
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "eslint": "^9",
  "eslint-config-next": "15.3.4"
}
```

---

## 🤝 Kontributor

### Entrepreneur Team
- **Nyoman Widia Purnama Sari** – Team Leader  
- **Baiq Hizanatul Ummah**

### Developer Team
- **Muhamad Raeachan Ulwan Zacky (F1D02310015)** – Front End Engineer  
- **Muhammad Kholilulloh** – Back End Engineer

---

## 📄 Lisensi
Proyek ini dibuat untuk tujuan edukatif dan sosial. Distribusi ulang hanya diperbolehkan atas izin pembuat.