"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { SimulationHistory } from "@/types";
import {
  TrendingUp,
  Trash2,
  Calendar,
  Package,
  ArrowLeft,
  Search,
  Filter,
  Download,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
  const { isInitialized, isAuthenticated } = useAuth();
  const [history, setHistory] = useState<SimulationHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/simulations/history");
      setHistory(res.data.data || []);
    } catch (err) {
      console.error("Gagal ambil history", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      fetchHistory();
    }
  }, [isInitialized, isAuthenticated]);

  const deleteItem = async (id: string) => {
    if (!confirm("Hapus simulasi ini dari Atlas?")) return;
    try {
      await api.delete(`/simulations/${id}`);
      setHistory(history.filter((item) => item.id !== id));
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  const filteredHistory = history.filter((item) =>
    item.product_name.toLowerCase().includes(search.toLowerCase()),
  );

  // Statistik Sederhana untuk Efek "Wow"
  const totalValuation = history.reduce(
    (acc, curr) => acc + curr.final_price,
    0,
  );
  const avgMargin =
    history.length > 0
      ? (history.reduce((acc, curr) => acc + curr.margin, 0) / history.length) *
        100
      : 0;

  if (!isInitialized || loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-fire-orange border-solid"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* HEADER GRADASI API */}
      <header className="bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00] pt-10 pb-24 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white mb-2 transition-all"
            >
              <ArrowLeft size={18} /> Back to Simulator
            </Link>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              Simulation <span className="text-white/70">Archive</span>
            </h1>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-6 py-2 rounded-full border border-white/30 font-bold flex items-center gap-2 transition-all">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-16">
        {/* STATS CARDS (EFEK WOW) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-white flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-[#FFC400]/10 rounded-2xl flex items-center justify-center text-[#FFC400]">
              <Package size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Total Simpan
              </p>
              <h3 className="text-2xl font-black text-[#202124]">
                {history.length} Produk
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-white flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-[#FF9100]/10 rounded-2xl flex items-center justify-center text-[#FF9100]">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Valuasi Total
              </p>
              <h3 className="text-2xl font-black text-[#202124]">
                Rp {totalValuation.toLocaleString("id-ID")}
              </h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-white flex items-center gap-5 transition-transform hover:scale-[1.02]">
            <div className="w-14 h-14 bg-[#DD2C00]/10 rounded-2xl flex items-center justify-center text-[#DD2C00]">
              <BarChart3 size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Rata-rata Margin
              </p>
              <h3 className="text-2xl font-black text-[#202124]">
                {avgMargin.toFixed(1)}%
              </h3>
            </div>
          </div>
        </div>

        {/* TABEL KOMPLEKS */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          {/* Table Toolbar */}
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 justify-between bg-white">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari nama produk..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF9100]/20 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#FF9100] transition-colors border border-transparent hover:border-[#FF9100]/20">
                <Filter size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Produk & Tanggal
                  </th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Struktur Biaya
                  </th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Margin
                  </th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Harga Jual Final
                  </th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-[#FFF8E1]/30 transition-all"
                  >
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-black text-[#202124] text-lg group-hover:text-[#FF9100] transition-colors tracking-tight">
                          {item.product_name}
                        </span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                          <Calendar size={12} />
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" },
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500">
                            HPP: Rp{item.hpp.toLocaleString()}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500">
                            OPEX: Rp{item.opex.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 font-black text-sm border border-green-100">
                        {item.margin * 100}%
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <span className="text-2xl font-black text-[#DD2C00] tracking-tighter">
                        Rp{item.final_price.toLocaleString("id-ID")}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                          <Search size={40} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                          Tidak ada simulasi ditemukan
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50/30 border-t border-gray-50 text-center">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
              PricePoint Storage Engine Powered by MongoDB Atlas
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
