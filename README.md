# PricePoint: Pricing Intelligence Engine

PricePoint adalah platform analitik keuangan yang dirancang untuk membantu pelaku usaha mikro dan mahasiswa bisnis dalam menentukan struktur harga jual yang optimal. Aplikasi ini menggunakan logika Inverse Margin untuk memastikan akurasi profitabilitas dengan mempertimbangkan variabel biaya operasional dan regulasi perpajakan secara real-time.

## Technology Stack

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Golang](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat-square&logo=go&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)

## Informasi Proyek

| Kategori | Keterangan |
| :--- | :--- |
| Pengembang | Jeremia David Anthony Paduli |
| Status | Minimum Viable Product (MVP) |
| Lisensi | MIT License |
| Arsitektur | Monorepo (Next.js + Golang) |

## Fitur Utama

Aplikasi ini dilengkapi dengan modul kalkulasi tingkat tinggi untuk mendukung pengambilan keputusan bisnis:

1. **Inverse Margin Logic**: Kalkulasi harga jual berdasarkan target margin bersih setelah pajak.
2. **Visual Cost Breakdown**: Representasi grafis alokasi biaya, pajak, dan profit bersih menggunakan Recharts.
3. **Anti-Loss Simulation**: Simulasi dampak diskon terhadap margin murni untuk mencegah kerugian finansial.
4. **Scale Projection**: Proyeksi total omset dan profit berdasarkan target kuantitas unit penjualan.
5. **Tax Integration**: Penyesuaian otomatis terhadap regulasi PPN 12 persen secara sistematis.

## Konfigurasi Sistem

### Pengembangan Backend
Direktori `price-point-backend` menangani seluruh logika kalkulasi matematis. Pastikan file lingkungan (.env) telah dikonfigurasi dengan MongoDB URI yang valid sebelum menjalankan perintah `go run main.go`.

### Pengembangan Frontend
Direktori `price-point-frontend` menggunakan framework Next.js. Jalankan `npm install` diikuti dengan `npm run dev` untuk memulai antarmuka pengguna pada lingkungan lokal.

## Hak Cipta

Seluruh kode dalam repositori ini dilindungi di bawah Lisensi MIT. Hak cipta sepenuhnya milik Jeremia David Anthony Paduli sebagai pengembang utama.
