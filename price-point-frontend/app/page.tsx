"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import { SimulationResult } from "@/types";
import {
  Save,
  Percent,
  AlertTriangle,
  TrendingDown,
  Layers,
  Package,
  Copy,
  Check,
  Coffee,
  Activity,
  ShieldCheck,
  Zap,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CountUp from "react-countup";
import toast, { Toaster } from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
} from "recharts"; // --- FITUR VISUAL ---

export default function HomePage() {
  const { isAuthenticated, isInitialized } = useAuth();
  const [inputs, setInputs] = useState({
    hpp: 0,
    opex: 0,
    margin: 20,
    include_tax: true,
    product_name: "",
  });

  const [discount, setDiscount] = useState(0);
  const [targetUnits, setTargetUnits] = useState(1);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const prevPriceRef = useRef(0);

  // --- THEME LOGIC ---
  const isCoffeeItem = inputs.product_name.toLowerCase().includes("kopi");
  const themeGradient = isCoffeeItem
    ? "bg-gradient-to-r from-[#D2B48C] via-[#A67B5B] to-[#6F4E37]"
    : "bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00]";
  const themeText = isCoffeeItem ? "text-[#6F4E37]" : "text-[#FF9100]";
  const themeBorder = isCoffeeItem ? "border-[#A67B5B]" : "border-[#FF9100]";
  const themeAccent = isCoffeeItem ? "accent-[#6F4E37]" : "accent-[#DD2C00]";

  // --- LOGIKA DATA CHART (BREAKDOWN) ---
  const getChartData = () => {
    if (!result) return [];
    const profit = Number(result.price_before_tax) - Number(result.total_cost);
    const tax = inputs.include_tax ? Number(result.final_price) * 0.12 : 0;

    return [
      { name: "Modal (HPP)", value: Number(inputs.hpp), color: "#94a3b8" },
      { name: "Operasional", value: Number(inputs.opex), color: "#64748b" },
      { name: "Pajak (PPN)", value: tax, color: "#cbd5e1" },
      {
        name: "Profit Murni",
        value: profit > 0 ? profit : 0,
        color: isCoffeeItem ? "#6F4E37" : "#FF9100",
      },
    ];
  };

  // --- LOGIKA SMART INSIGHT ---
  const getSmartInsight = () => {
    if (!result || inputs.hpp === 0)
      return "Masukkan angka untuk memulai analisis bisnis...";
    const profit = Number(result.price_before_tax) - Number(result.total_cost);

    if (profit <= 0)
      return "⚠️ Bahaya Jere! Kamu jual rugi atau balik modal saja. Naikkan margin!";
    if (inputs.margin > 50)
      return "🔥 Margin sangat tinggi! Pastikan kualitas barang sebanding dengan harganya.";
    if (isCoffeeItem)
      return "☕ Aroma margin kopi ini kuat, Jere! Cocok untuk strategi 'Upselling'.";
    return "✅ Struktur harga sudah ideal. Siap untuk dipasarkan!";
  };

  const getProfitStatus = () => {
    const margin = inputs.margin;
    if (margin >= 30)
      return {
        label: "High Profit",
        color: "text-green-600",
        bg: "bg-green-500",
      };
    if (margin >= 15)
      return {
        label: "Healthy Margin",
        color: "text-blue-600",
        bg: "bg-blue-500",
      };
    return { label: "Thin Margin", color: "text-red-600", bg: "bg-red-500" };
  };
  const status = getProfitStatus();

  const handleNumericChange = (field: string, value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    let numValue = cleanValue === "" ? 0 : Number(cleanValue);
    if (field === "margin" && numValue >= 100) numValue = 99;
    setInputs({ ...inputs, [field]: numValue });
  };

  const calculatePrice = async () => {
    try {
      const res = await api.post("/calculate", {
        hpp: Number(inputs.hpp),
        opex: Number(inputs.opex),
        margin: Number(inputs.margin) / 100,
        include_tax: inputs.include_tax,
      });
      if (result) prevPriceRef.current = Number(result.final_price);
      setResult(res.data.data);
    } catch (err) {
      toast.error("Gagal terhubung ke Backend Go!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputs.hpp > 0 || inputs.opex > 0) calculatePrice();
    }, 500);
    return () => clearTimeout(timer);
  }, [inputs]);

  const handleCopy = () => {
    if (!result) return;
    const text = `PricePoint Report 🚀\nProduk: ${inputs.product_name || "Tanpa Nama"}\nHarga: Rp ${Number(result.final_price).toLocaleString("id-ID")}\nSimulasi by Jeremia Paduli`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Teks disalin!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = async () => {
    if (!isAuthenticated) return toast.error("Login dulu ya, Jere!");
    if (!inputs.product_name) return toast.error("Isi nama produk dulu!");
    setIsSaving(true);
    try {
      await api.post("/simulations/save", {
        ...inputs,
        product_name: inputs.product_name,
        final_price: Number(result?.final_price),
      });
      toast.success("Tersimpan di MongoDB!");
    } catch (err) {
      toast.error("Gagal simpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isInitialized)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F6F7]">
        <Zap className="animate-bounce text-[#FF9100]" size={48} />
      </div>
    );

  return (
    <div className="bg-[#F5F6F7] text-[#202124] min-h-screen pb-32 transition-colors duration-500">
      <Toaster position="top-center" />

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* LEFT: INPUT */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden transition-all duration-500">
            <div
              className={`absolute top-0 left-0 w-full h-2 ${themeGradient}`}
            ></div>
            <h2 className="text-xl font-black mb-8 uppercase tracking-tighter flex items-center gap-2">
              {isCoffeeItem ? (
                <Coffee size={20} className={themeText} />
              ) : (
                <Package size={20} className={themeText} />
              )}
              Parameter Bisnis
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Nama Produk
                </label>
                <input
                  type="text"
                  placeholder="Misal: Kopi Susu Aren"
                  className="w-full p-2 text-xl font-black border-b-2 border-gray-100 focus:border-[#FF9100] outline-none"
                  value={inputs.product_name}
                  onChange={(e) =>
                    setInputs({ ...inputs, product_name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    HPP Modal
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 text-2xl font-black border-b-2 border-gray-100 outline-none"
                    value={Math.round(inputs.hpp).toLocaleString("id-ID")}
                    onChange={(e) => handleNumericChange("hpp", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Operasional
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 text-2xl font-black border-b-2 border-gray-100 outline-none"
                    value={Math.round(inputs.opex).toLocaleString("id-ID")}
                    onChange={(e) =>
                      handleNumericChange("opex", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Margin (%)
                </label>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl mt-1">
                  <Percent size={24} className={themeText} />
                  <input
                    type="text"
                    className="w-full bg-transparent text-2xl font-black outline-none"
                    value={inputs.margin}
                    onChange={(e) =>
                      handleNumericChange("margin", e.target.value)
                    }
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                    <span className={status.color}>{status.label}</span>
                    <span>{inputs.margin}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${status.bg}`}
                      style={{ width: `${inputs.margin}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: DISPLAY & VISUALS */}
        <section className="lg:col-span-8 space-y-8">
          {/* MAIN PRICE CARD */}
          <div
            className={`bg-white rounded-[3.5rem] shadow-2xl border-4 ${themeBorder} p-10 relative overflow-hidden text-center transition-all duration-500`}
          >
            {isCoffeeItem && (
              <Coffee
                size={120}
                className="absolute top-10 left-10 text-[#6F4E37] opacity-10 animate-pulse"
              />
            )}
            <div className="absolute top-6 right-10 flex gap-2">
              <button
                onClick={handleCopy}
                className="p-3 bg-gray-50 text-gray-400 hover:text-[#FF9100] rounded-2xl transition-all shadow-sm"
              >
                <Copy size={20} />
              </button>
            </div>
            <p
              className={`${themeText} font-black tracking-widest text-xs mb-4 uppercase italic`}
            >
              Recommended Retail Price
            </p>
            <div className="flex items-baseline justify-center gap-6 mb-12">
              <span className="text-4xl font-black text-gray-200">RP</span>
              <h1
                className={`text-8xl md:text-[9.5rem] font-black ${isCoffeeItem ? "text-[#6F4E37]" : "text-[#FF9100]"} tracking-tighter leading-none`}
              >
                <CountUp
                  start={prevPriceRef.current}
                  end={result ? Number(result.final_price) : 0}
                  separator="."
                  duration={1.5}
                />
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving || !result}
              className={`w-full ${themeGradient} text-white py-6 rounded-3xl text-2xl font-black shadow-xl hover:scale-[1.01] transition-all active:scale-95 disabled:grayscale uppercase italic`}
            >
              <Save size={32} className="inline mr-2" />{" "}
              {isSaving ? "MENYIMPAN..." : "SIMPAN KE ATLAS"}
            </button>
          </div>

          {/* VISUAL BREAKDOWN & INSIGHT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CHART CARD */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getChartData()}
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {getChartData().map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-2">
                <h4 className="font-black uppercase text-[10px] tracking-widest text-gray-400 mb-4">
                  Cost Breakdown
                </h4>
                {getChartData().map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-50 pb-1"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-[10px] font-bold uppercase text-gray-500">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs font-black">
                      Rp {Math.round(item.value).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SMART INSIGHT CARD */}
            <div
              className={`${isCoffeeItem ? "bg-[#6F4E37]" : "bg-[#202124]"} rounded-[2.5rem] p-8 shadow-xl text-white flex flex-col justify-between relative overflow-hidden transition-colors`}
            >
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 opacity-10" />
              <h4 className="font-black uppercase text-[10px] tracking-[0.2em] opacity-50">
                Smart Insight
              </h4>
              <p className="text-base font-bold leading-tight italic mt-4 text-white/90">
                &quot;{getSmartInsight()}&quot;
              </p>
              <div className="mt-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap size={14} className="text-[#FFC400]" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest">
                  PricePoint AI Engine
                </span>
              </div>
            </div>
          </div>

          {/* SECONDARY TOOLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h3 className="font-black uppercase tracking-tight flex items-center gap-2 mb-6 text-red-600">
                <TrendingDown size={20} /> Anti-Rugi
              </h3>
              <input
                type="range"
                className={`w-full ${themeAccent} mb-6`}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
              <div className="flex justify-between items-center">
                <p className="text-3xl font-black text-red-600">{discount}%</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Potongan Diskon
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h3 className="font-black uppercase tracking-tight flex items-center gap-2 mb-6 text-blue-600">
                <Layers size={20} /> Skala Produksi
              </h3>
              <input
                type="number"
                className="w-full p-3 bg-gray-50 rounded-xl font-black text-2xl outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                value={targetUnits}
                onChange={(e) => setTargetUnits(Number(e.target.value))}
              />
              <p className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest text-right">
                Proyeksi Omset: Rp{" "}
                {(result
                  ? Number(result.final_price) * targetUnits
                  : 0
                ).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
