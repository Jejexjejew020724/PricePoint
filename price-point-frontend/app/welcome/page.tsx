"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Package, Zap } from "lucide-react";

// --- INTERFACE ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] relative overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FFC400]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#DD2C00]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-md rounded-3xl mt-6 shadow-sm border border-gray-100 relative z-10">
        <div className="flex items-center gap-3">
          <Image
            src="/price.svg"
            alt="PricePoint Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-black text-2xl tracking-tighter uppercase italic">
            Price<span className="text-[#FF9100]">Point</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm font-black text-gray-500 hover:text-[#FF9100] transition-colors flex items-center"
          >
            LOGIN
          </Link>
          <Link
            href="/login"
            className="text-sm font-black text-[#DD2C00] px-5 py-2 rounded-full border-2 border-[#DD2C00] hover:bg-[#DD2C00] hover:text-white transition-all"
          >
            REGISTER
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center flex flex-col items-center relative z-10">
        <div className="w-40 h-40 relative mb-12 animate-floating drop-shadow-2xl">
          <Image
            src="/price.svg"
            alt="Floating Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-xs font-black text-[#FF9100] uppercase tracking-[0.3em] mb-4 bg-[#FF9100]/10 px-4 py-1.5 rounded-full inline-block">
          Smart Pricing for Modern Businesses
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-[#202124] tracking-tighter leading-[0.9] max-w-5xl mb-8 uppercase italic">
          Master Your Pricing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC400] to-[#DD2C00]">
            Like a Pro
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mb-12 leading-relaxed font-medium">
          Ubah kompleksitas akuntansi biaya menjadi simulasi harga yang instan
          dan akurat. Gunakan rumus Inverse Margin untuk memastikan profit murni
          bisnismu membara layaknya api.
        </p>

        {/* --- TOMBOL INI SUDAH DIARAHKAN KE "/" (SIMULATOR) --- */}
        <Link
          href="/"
          className="bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00] text-white px-12 py-6 rounded-[2rem] text-xl md:text-2xl font-black flex items-center gap-4 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 active:scale-95 transition-all group"
        >
          START SIMULATION{" "}
          <ArrowRight
            size={28}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </main>

      {/* FEATURES SECTION */}
      <section className="bg-white py-24 px-6 border-t border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={Zap}
            title="Instant Calculation"
            desc="Real-time simulasi harga retail saat kamu mengubah HPP atau OPEX tanpa perlu me-refresh halaman."
          />
          <FeatureCard
            icon={Target}
            title="Inverse Margin"
            desc="Formula presisi untuk memastikan target profit murni yang kamu inginkan dari harga jual akhir."
          />
          <FeatureCard
            icon={Package}
            title="Cloud Archive"
            desc="Simpan riwayat hasil simulasimu dengan aman di MongoDB Atlas Cloud. Bebas akses kapan saja."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-white text-center text-gray-300 text-[10px] font-black uppercase tracking-[0.2em] relative z-10 border-t border-gray-50">
        Jeremia Paduli &copy; {new Date().getFullYear()} UNSRAT Informatika
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon: Icon, title, desc }: FeatureCardProps) => (
  <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow text-center flex flex-col items-center group">
    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-[#FF9100] mb-8 border border-gray-100 group-hover:bg-[#FF9100] group-hover:text-white transition-colors duration-500">
      <Icon size={36} />
    </div>
    <h4 className="text-xl md:text-2xl font-black text-[#202124] mb-4 uppercase tracking-tight">
      {title}
    </h4>
    <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);
