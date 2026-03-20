"use client";

import React from "react";
import Link from "next/link";
import {
  Scale,
  BookOpen,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] pb-20">
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-[#1A237E] to-[#121858] pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest mb-8 transition-all"
          >
            <ArrowLeft size={16} /> Kembali ke Simulator
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic flex items-center gap-4">
            <Scale className="text-[#FFC400]" size={40} /> Legal & Business{" "}
            <span className="text-[#FFC400]">Guide</span>
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-2xl leading-relaxed font-medium">
            Panduan kepatuhan hukum dan standar akuntansi untuk penentuan harga
            retail yang transparan dan sesuai regulasi Indonesia tahun 2026.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 gap-8">
          {/* SECTION 1: PPN 12% */}
          <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 opacity-5 text-gray-400">
              <FileText size={120} />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Regulasi Pajak (PPN 12%)
              </h2>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="font-bold text-gray-700">
                Dasar Hukum: UU No. 7 Tahun 2021 tentang Harmonisasi Peraturan
                Perpajakan (UU HPP).
              </p>
              <p>
                Sesuai dengan amanat <strong>Pasal 7 ayat (1) huruf b</strong>,
                tarif Pajak Pertambahan Nilai (PPN) resmi disesuaikan menjadi{" "}
                <strong>12%</strong> yang berlaku mulai 1 Januari 2025.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={18} className="text-amber-600" />
                  <span className="font-black text-xs uppercase text-amber-800">
                    Catatan Penting
                  </span>
                </div>
                <p className="text-sm text-amber-900 leading-relaxed m-0">
                  PPN adalah pajak konsumsi yang dibebankan kepada pembeli
                  akhir. Pengusaha Kena Pajak (PKP) wajib memungut, menyetor,
                  dan melaporkan pajak ini kepada negara.{" "}
                  <strong>PricePoint</strong> membantu Anda menghitung besaran
                  pajak tersebut agar tidak memotong margin laba bersih Anda.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: PERLINDUNGAN KONSUMEN */}
          <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <BookOpen size={28} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Transparansi Harga
              </h2>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="font-bold text-gray-700">
                Dasar Hukum: UU No. 8 Tahun 1999 tentang Perlindungan Konsumen.
              </p>
              <p>
                Pelaku usaha wajib memberikan informasi yang benar, jelas, dan
                jujur mengenai kondisi dan jaminan barang dan/atau jasa. Dalam
                konteks harga:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Harga yang dicantumkan harus mencakup seluruh komponen biaya
                  (informasi harga bersih).
                </li>
                <li>
                  Jika harga belum termasuk PPN, pelaku usaha wajib memberikan
                  informasi tersebut secara jelas kepada konsumen sebelum
                  transaksi.
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 3: STANDAR AKUNTANSI */}
          <section className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <Scale size={28} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Standar Akuntansi Biaya
              </h2>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="font-bold text-gray-700">
                Rujukan: Pernyataan Standar Akuntansi Keuangan (PSAK).
              </p>
              <p>
                Untuk menghasilkan simulasi yang akurat di{" "}
                <strong>PricePoint</strong>, klasifikasi biaya harus tepat:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-black text-sm uppercase mb-2 text-indigo-600">
                    HPP (COGS)
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Biaya langsung yang timbul untuk memproduksi barang (Bahan
                    baku, tenaga kerja langsung, kemasan).
                  </p>
                </div>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <h4 className="font-black text-sm uppercase mb-2 text-indigo-600">
                    OPEX
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-500">
                    Biaya operasional tidak langsung (Listrik, sewa tempat,
                    pemasaran, biaya admin, penyusutan alat).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER LINK */}
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm font-medium mb-4">
              Ingin mempelajari lebih lanjut?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://pajak.go.id"
                target="_blank"
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A237E] hover:underline"
              >
                Situs Resmi DJP <ExternalLink size={14} />
              </a>
              <span className="text-gray-200">|</span>
              <a
                href="https://www.ojk.go.id"
                target="_blank"
                className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#1A237E] hover:underline"
              >
                Portal Edukasi OJK <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
