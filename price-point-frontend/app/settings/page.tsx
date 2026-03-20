"use client";

import React, { useState } from "react";
import { User, Lock, Percent, Save, Target } from "lucide-react";

const mockUser = {
  name: "Jeremia Paduli",
  nim: "220211060001",
  email: "jeremiapaduli@student.unsrat.ac.id",
  avatarUrl: "https://api.dicebear.com/8.x/avataaars/svg?seed=Jeremia",
};

interface SaveButtonProps {
  label: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [defaultMargin, setDefaultMargin] = useState(0.25);

  const tabs = [
    { id: "profile", label: "Profil Akun", icon: User },
    { id: "business", label: "Preferensi Bisnis", icon: Target },
    { id: "security", label: "Keamanan", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 text-[#202124]">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00] pt-12 pb-32 px-6 shadow-lg relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-[#FFF8E1] p-2 flex-shrink-0">
            {/* Menggunakan tag img biasa untuk menghindari error Next.js Image Config */}
            <img
              src={mockUser.avatarUrl}
              alt="Avatar Developer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-md">
              {mockUser.name}
            </h1>
            <p className="text-white/90 font-bold text-sm uppercase tracking-[0.2em] mt-2 bg-black/10 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
              NIM: {mockUser.nim}
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 -mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        {/* SIDEBAR TABS */}
        <aside className="lg:col-span-4 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black transition-all shadow-sm ${
                activeTab === tab.id
                  ? "bg-white text-[#DD2C00] border-l-4 border-l-[#DD2C00] shadow-md scale-[1.02]"
                  : "bg-gray-50 text-gray-400 hover:text-[#FF9100] hover:bg-white border border-transparent"
              }`}
            >
              <div
                className={`p-2 rounded-xl ${activeTab === tab.id ? "bg-[#DD2C00]/10" : "bg-gray-200/50"}`}
              >
                <tab.icon size={20} />
              </div>
              <span className="uppercase tracking-widest text-xs">
                {tab.label}
              </span>
            </button>
          ))}
        </aside>

        {/* CONTENT AREA */}
        <section className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 min-h-[400px]">
          {activeTab === "profile" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <User className="text-[#FF9100]" size={28} />
                <h3 className="text-2xl font-black text-[#202124] uppercase tracking-tighter">
                  Informasi Dasar
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-[#FF9100] transition-colors group">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    defaultValue={mockUser.name}
                    className="w-full text-lg font-bold outline-none bg-transparent text-[#202124]"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 opacity-70 cursor-not-allowed">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Email Kampus (Read-Only)
                  </label>
                  <p className="text-lg font-bold text-[#202124] truncate">
                    {mockUser.email}
                  </p>
                </div>
              </div>
              <SaveButton label="Update Profil" />
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-8">
                <Target className="text-[#FF9100]" size={28} />
                <h3 className="text-2xl font-black text-[#202124] uppercase tracking-tighter">
                  Konfigurasi Default
                </h3>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">
                Atur persentase margin yang paling sering kamu gunakan. Angka
                ini akan langsung terisi setiap kali kamu membuka kalkulator
                PricePoint.
              </p>
              <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl max-w-sm border-2 border-dashed border-gray-200 focus-within:border-[#FF9100] focus-within:bg-[#FFF8E1]/30 transition-all">
                <div className="p-3 bg-white rounded-xl text-[#FF9100] shadow-sm">
                  <Percent size={28} />
                </div>
                <div className="w-full">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Target Margin
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-transparent text-4xl font-black outline-none text-[#202124]"
                    value={defaultMargin}
                    onChange={(e) => setDefaultMargin(Number(e.target.value))}
                  />
                </div>
              </div>
              <SaveButton label="Simpan Preferensi" />
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-10">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Lock size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#202124] uppercase tracking-tighter">
                Ganti Kata Sandi
              </h3>
              <p className="text-gray-400 text-sm">
                Fitur keamanan sedang dalam pengembangan. Stay tuned!
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const SaveButton = ({ label }: SaveButtonProps) => (
  <button className="flex items-center gap-3 bg-gradient-to-r from-[#FFC400] to-[#DD2C00] text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-orange-200 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-[0.2em] mt-10">
    <Save size={18} /> {label}
  </button>
);
