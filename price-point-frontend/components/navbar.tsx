"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  History,
  LayoutDashboard,
  Settings,
  ArrowLeft,
  Percent,
  Coffee,
  BookOpen, // Icon untuk Panduan Hukum
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);

  // Trik agar sinkronisasi state client-side aman
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    router.back();
  };

  // Navbar tidak muncul di halaman Login atau Welcome awal
  if (pathname === "/login" || pathname === "/welcome") {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00] p-5 shadow-xl flex justify-between items-center relative z-50">
      <div className="flex items-center gap-4">
        {/* --- TOMBOL KEMBALI --- */}
        {pathname !== "/" && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20 active:scale-95 transition-all group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali
          </button>
        )}

        {/* --- LOGO PRICEPOINT --- */}
        <div className="bg-white p-1 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden w-12 h-12 relative border border-white">
          <Image
            src="/price.svg"
            alt="PricePoint Logo"
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="flex flex-col">
          {/* LOGO KE WELCOME JIKA BELUM LOGIN, KE SIMULATOR JIKA SUDAH */}
          <Link
            href={isAuthenticated ? "/" : "/welcome"}
            className="font-black text-2xl tracking-tighter text-white uppercase italic leading-none hover:opacity-80 transition-opacity"
          >
            Price<span className="text-white/80">Point</span>
          </Link>
          <span className="text-[10px] font-bold text-white/70 tracking-[0.2em] font-black uppercase">
            ANALYTICS CLOUD
          </span>
        </div>
      </div>

      {/* --- MENU NAVIGASI KANAN --- */}
      <div className="flex gap-6 items-center">
        {!isMounted ? (
          <div className="w-24 h-10"></div>
        ) : (
          <div className="flex items-center gap-6">
            {/* PANDUAN HUKUM (Bisa diakses Publik & Member) */}
            <Link
              href="/guide"
              className={`flex flex-col items-center group ${pathname === "/guide" ? "text-white" : "text-white/60 hover:text-white"}`}
              title="Panduan Hukum"
            >
              <BookOpen
                size={22}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span
                className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/guide" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
              >
                PANDUAN
              </span>
            </Link>

            {/* SIMULATOR (Halaman Utama) */}
            <Link
              href="/"
              className={`flex flex-col items-center group ${pathname === "/" ? "text-white" : "text-white/60 hover:text-white"}`}
              title="Simulator"
            >
              <Percent
                size={22}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span
                className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
              >
                SIMULATOR
              </span>
            </Link>

            {/* MENU KHUSUS JIKA SUDAH LOGIN */}
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className={`flex flex-col items-center group ${pathname === "/dashboard" ? "text-white" : "text-white/60 hover:text-white"}`}
                  title="Dashboard"
                >
                  <LayoutDashboard
                    size={22}
                    className="group-hover:-translate-y-1 transition-transform"
                  />
                  <span
                    className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/dashboard" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    DASHBOARD
                  </span>
                </Link>

                <Link
                  href="/history"
                  className={`flex flex-col items-center group ${pathname === "/history" ? "text-white" : "text-white/60 hover:text-white"}`}
                  title="Riwayat"
                >
                  <History
                    size={22}
                    className="group-hover:-translate-y-1 transition-transform"
                  />
                  <span
                    className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/history" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    RIWAYAT
                  </span>
                </Link>

                <Link
                  href="/settings"
                  className={`flex flex-col items-center group ${pathname === "/settings" ? "text-white" : "text-white/60 hover:text-white"}`}
                  title="Pengaturan"
                >
                  <Settings
                    size={22}
                    className="group-hover:-translate-y-1 transition-transform"
                  />
                  <span
                    className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/settings" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    PROFIL
                  </span>
                </Link>
              </>
            )}

            {/* TENTANG DEVELOPER (Publik) */}
            <Link
              href="/about"
              className={`flex flex-col items-center group ${pathname === "/about" ? "text-white" : "text-white/60 hover:text-white"}`}
              title="Tentang"
            >
              <Coffee
                size={22}
                className="group-hover:-translate-y-1 transition-transform"
              />
              <span
                className={`text-[8px] font-black tracking-widest mt-1 ${pathname === "/about" ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
              >
                TENTANG
              </span>
            </Link>

            <div className="w-px h-8 bg-white/20 mx-2"></div>

            {/* TOMBOL LOGIN / LOGOUT */}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-black/10 hover:bg-black/30 text-white px-5 py-2 rounded-full font-black text-xs transition-all border border-white/20 active:scale-95"
              >
                LOGOUT
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-white text-[#DD2C00] font-black px-8 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors uppercase text-sm tracking-widest"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
