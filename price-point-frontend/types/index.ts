// types/index.ts

/**
 * Interface untuk data yang dikirim ke Backend saat melakukan simulasi.
 */
export interface SimulationInput {
  product_name?: string; // Opsional saat kalkulasi, wajib saat simpan
  hpp: number; // Harga Pokok Penjualan (Modal Bahan)
  opex: number; // Operational Expenditure (Listrik, Sewa, dll)
  margin: number; // Target keuntungan (Contoh: 0.2 untuk 20%)
  include_tax: boolean; // Apakah menghitung PPN 12%
}

/**
 * Interface untuk hasil perhitungan yang diterima dari API Golang.
 */
export interface SimulationResult {
  total_cost: number; // HPP + OPEX
  price_before_tax: number; // Harga jual sebelum kena pajak
  tax_amount: number; // Nilai PPN (12% dari price_before_tax)
  final_price: number; // Harga jual akhir (Nett)
}

/**
 * Interface untuk data yang ditarik dari MongoDB Atlas (Halaman History).
 * Menggabungkan input asal dan hasil akhirnya.
 */
export interface SimulationHistory extends SimulationInput {
  id: string; // ID Unik dari MongoDB (_id)
  product_name: string; // Nama produk yang disimpan
  final_price: number; // Harga akhir yang sudah tersimpan
  created_at: string; // Timestamp penyimpanan (ISO String)
}

/**
 * Interface untuk respon setelah Login berhasil.
 */
export interface AuthResponse {
  token: string; // JWT Token untuk Authorization Header
  message: string; // Pesan sukses/gagal dari server
}

/**
 * Interface untuk profil user (mahasiswa).
 */
export interface User {
  id: string; // ID User
  email: string; // Email UNSRAT
  name?: string; // Nama (Opsional)
}

/**
 * Interface standar untuk pembungkus Response API (Best Practice).
 */
export interface ApiResponse<T> {
  status: string; // "success" atau "error"
  message: string;
  data: T; // Data generic (bisa Result, History[], dll)
}
