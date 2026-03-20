"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Code2,
  Coffee,
  Rocket,
  Target,
  Globe,
  Sparkles,
  Linkedin,
  Github,
  Instagram,
  Youtube,
} from "lucide-react";

// --- SUB-COMPONENTS ---
const InfoBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center gap-4 bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 w-full hover:bg-white hover:shadow-md transition-all group">
    <Icon
      className="text-[#FF9100] group-hover:scale-110 transition-transform"
      size={18}
    />
    <span className="text-sm font-black text-gray-600 uppercase tracking-tight">
      {text}
    </span>
  </div>
);

// TechCard diperbarui untuk menangani invert warna logo Vercel
const TechCard = ({
  logoUrl,
  title,
  desc,
  color,
  isVercel,
}: {
  logoUrl: string;
  title: string;
  desc: string;
  color: string;
  isVercel?: boolean;
}) => (
  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:scale-[1.02] transition-transform group">
    <div
      className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center p-3 mb-6 shadow-lg group-hover:rotate-6 transition-transform`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={`${title} Logo`}
        // --- JERE: INI KUNCI PERBAIKANNYA ---
        // Jika isVercel true, kita tambahkan class 'invert' (jadi putih) secara default,
        // dan matikan invert saat hover (kembali hitam).
        className={`w-full h-full object-contain ${isVercel ? "invert group-hover:invert-0" : ""} transition-all duration-300`}
      />
    </div>
    <h4 className="text-xl font-black uppercase tracking-tighter mb-2">
      {title}
    </h4>
    <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const SocialIcon = ({
  icon: Icon,
  label,
  href,
  activeColor,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  activeColor: string;
}) => (
  <li className="relative group">
    {/* Tooltip */}
    <div
      className={`absolute -top-12 left-1/2 -translate-x-1/2 ${activeColor} text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:-top-14 transition-all duration-300 shadow-xl z-30 uppercase tracking-widest`}
    >
      {label}
      <div
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${activeColor} rotate-45`}
      ></div>
    </div>

    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative overflow-hidden flex items-center justify-center w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className={`absolute bottom-0 left-0 w-full h-0 ${activeColor} transition-all duration-300 group-hover:h-full z-0`}
      ></div>
      <Icon size={22} className="relative z-10" />
    </a>
  </li>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] pb-32">
      {/* HERO SECTION */}
      <div className="bg-[#1A237E] relative overflow-hidden pt-28 pb-52 px-6">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none text-white">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#039BE5] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] bg-[#FFC400] rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-xs uppercase tracking-[0.2em] bg-white/10 px-6 py-3 rounded-full border border-white/20 active:scale-95 transition-all mb-12 backdrop-blur-md"
          >
            <ArrowLeft size={16} /> Kembali ke Simulator
          </Link>
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9] mb-8">
              The Mission <br />
              <span className="text-[#FFC400]">Of PricePoint</span>
            </h1>
            <p className="text-white/80 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl">
              Membantu UMKM dan Mahasiswa membedah struktur harga dengan presisi
              matematika, bukan sekadar tebakan.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 -mt-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: PROFILE CARD */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 sticky top-10 flex flex-col items-center">
              <div className="w-48 h-48 rounded-[2.5rem] rotate-3 hover:rotate-0 transition-all duration-500 border-8 border-gray-50 shadow-2xl overflow-hidden bg-gradient-to-br from-[#FFC400] to-[#FF9100] p-1 mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.dicebear.com/8.x/avataaars/svg?seed=Jeremia"
                  alt="Jeremia Paduli"
                  className="w-full h-full object-cover rounded-[2rem] bg-white"
                />
              </div>

              <h3 className="text-3xl font-black uppercase tracking-tighter text-[#202124] text-center">
                Jeremia Paduli
              </h3>
              <p className="text-[#FF9100] font-black text-xs uppercase tracking-[0.2em] mt-2 mb-8">
                Full-Stack Developer
              </p>

              <div className="w-full space-y-3 mb-10">
                <InfoBadge icon={Code2} text="Informatics Engineering" />
                <InfoBadge icon={Target} text="Sam Ratulangi University" />
                <InfoBadge icon={Globe} text="Manado, Indonesia" />
              </div>

              {/* SOCIAL TOOLTIP LIST */}
              <div className="w-full pt-8 border-t border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-6">
                  Connect With Me
                </p>
                <ul className="flex justify-center gap-6">
                  <SocialIcon
                    icon={Linkedin}
                    label="LinkedIn"
                    href="https://www.linkedin.com/in/jeremia-david-anthony-paduli-523608383"
                    activeColor="bg-[#0274b3]"
                  />
                  <SocialIcon
                    icon={Github}
                    label="GitHub"
                    href="https://github.com/Jejexjejew020724"
                    activeColor="bg-[#24262a]"
                  />
                  <SocialIcon
                    icon={Instagram}
                    label="Instagram"
                    href="https://www.instagram.com/jepaduli_"
                    activeColor="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]"
                  />
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT: STORY & TECH */}
          <div className="lg:col-span-8 space-y-10">
            {/* Story Card */}
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 md:p-16">
              <h2 className="text-4xl font-black text-[#202124] uppercase tracking-tighter mb-10 flex items-center gap-5">
                <div className="w-14 h-14 bg-[#FFC400]/10 text-[#FF9100] rounded-2xl flex items-center justify-center">
                  <Sparkles size={32} />
                </div>
                The &quot;Gabut&quot; Story
              </h2>
              <div className="prose prose-xl prose-gray leading-relaxed max-w-none text-gray-600">
                <p>
                  Sebagai mahasiswa Teknik Informatika semester 6 di UNSRAT,
                  hari-hari saya biasanya dipenuhi dengan praktikum basis data
                  dan riset teknologi. Namun, <strong>PricePoint</strong> lahir
                  dari momen unik: kebosanan yang produktif.
                </p>
                <p>
                  Saya menyadari banyak rekan mahasiswa dan pemilik UMKM sering
                  bingung menentukan harga jual. Mereka seringkali hanya
                  menambah sedikit dari harga beli, tanpa menyadari biaya
                  operasional dan pajak bisa membakar keuntungan mereka.
                </p>
                <blockquote className="border-l-8 border-[#FF9100] bg-[#FFF8E1] p-10 rounded-r-[2rem] my-12 italic font-bold text-[#202124] text-2xl tracking-tight">
                  &quot;Kenapa tidak membuat kalkulator yang &apos;pintar&apos;
                  sekalian? Yang menggunakan logika akuntansi asli tapi punya
                  tampilan seperti dashboard modern.&quot;
                </blockquote>
                <p>
                  Dengan semangat itu, saya meracik formula{" "}
                  <strong>Inverse Margin</strong> ke dalam kode. Tujuannya satu:
                  memastikan setiap produk yang dijual memberikan profit murni
                  yang diinginkan pemiliknya secara instan dan akurat.
                </p>
              </div>
            </div>

            {/* Tech Grid - MENGGUNAKAN LOGO ASLI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TechCard
                logoUrl="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                title="Next.js 14"
                desc="Framework React untuk performa rendering super cepat dan SEO friendly."
                color="bg-white border border-gray-100"
              />
              <TechCard
                logoUrl="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg"
                title="MongoDB Atlas"
                desc="Cloud database NoSQL untuk menyimpan ribuan simulasi dengan aman dan skalabel."
                color="bg-[#F8F9FA]"
              />
              <TechCard
                logoUrl="https://cdn.worldvectorlogo.com/logos/golang-1.svg"
                title="Golang Engine"
                desc="Backend bahasa Go yang menangani kalkulasi matematis dengan presisi tinggi."
                color="bg-[#F8F9FA]"
              />
              <TechCard
                logoUrl="https://cdn.worldvectorlogo.com/logos/vercel.svg"
                title="Vercel Edge"
                desc="Deployment global di jaringan Edge untuk akses aplikasi tanpa lag dari mana saja."
                color="bg-black"
                isVercel // --- JERE: TAMBAHKAN FLAG INI ---
              />
            </div>

            {/* Branding Quote */}
            <div className="bg-gradient-to-r from-[#1A237E] to-[#039BE5] rounded-[3rem] p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Coffee size={120} className="text-white" />
              </div>
              <h4 className="text-white text-3xl md:text-4xl font-black uppercase italic tracking-tighter relative z-10 leading-tight">
                &quot;Kegabutan yang diarahkan dengan benar <br /> akan
                menghasilkan sesuatu yang{" "}
                <span className="text-[#FFC400]">Ganteng Maksimal</span>.&quot;
              </h4>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
