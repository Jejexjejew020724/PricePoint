"use client";

import React from "react";
// Import useAuth dihapus karena kita belum menggunakannya secara langsung di sini
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  TrendingUp,
  DollarSign,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const mockStats = {
  totalSimulations: 48,
  totalValuation: 12550000,
  averageMargin: 24.5,
  mostExpensiveProduct: "Kopi Susu Gula Aren XL",
};

const mockChartData = [
  { name: "Jan", simulasi: 4 },
  { name: "Feb", simulasi: 8 },
  { name: "Mar", simulasi: 15 },
  { name: "Apr", simulasi: 21 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20 text-[#202124]">
      <header className="bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00] pt-10 pb-28 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
            Business <span className="text-white/70">Overview</span>
          </h1>
          <p className="text-white/80 mt-2 font-bold text-sm uppercase tracking-widest">
            PricePoint Analytics Cloud
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={Package}
            label="Total Simulasi"
            value={`${mockStats.totalSimulations} Produk`}
            color="#FFC400"
          />
          <StatCard
            icon={TrendingUp}
            label="Total Valuasi"
            value={`Rp ${mockStats.totalValuation.toLocaleString("id-ID")}`}
            color="#FF9100"
          />
          <StatCard
            icon={Target}
            label="Rata-rata Margin"
            value={`${mockStats.averageMargin}%`}
            color="#DD2C00"
          />
          <StatCard
            icon={DollarSign}
            label="Produk Termahal"
            value={mockStats.mostExpensiveProduct}
            color="#202124"
            isSmall
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight">
              Tren Aktivitas Simulasi
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#F0F0F0"
                    vertical={false}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "#FFF8E1" }} />
                  <Bar
                    dataKey="simulasi"
                    fill="#FF9100"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tight">
              Aksi Cepat
            </h3>
            <div className="space-y-4">
              <ActionButton
                href="/"
                label="Mulai Simulasi Baru"
                icon={Target}
                color="#FF9100"
              />
              <ActionButton
                href="/history"
                label="Lihat Riwayat"
                icon={Package}
                color="#202124"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- INTERFACES UNTUK MENGHILANGKAN ERROR 'ANY' ---
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  isSmall?: boolean;
}

interface ActionButtonProps {
  href: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

// --- HELPER COMPONENTS ---
const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  isSmall,
}: StatCardProps) => (
  <div className="bg-white p-6 rounded-3xl shadow-xl border border-white flex items-center gap-5">
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
      style={{ backgroundColor: `${color}10`, color: color }}
    >
      <Icon size={28} strokeWidth={2.5} />
    </div>
    <div className="overflow-hidden">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
        {label}
      </p>
      <h3
        className={`font-black truncate ${isSmall ? "text-sm leading-tight mt-1" : "text-2xl"}`}
      >
        {value}
      </h3>
    </div>
  </div>
);

const ActionButton = ({
  href,
  label,
  icon: Icon,
  color,
}: ActionButtonProps) => (
  <Link
    href={href}
    className="group flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-100 transition-all"
  >
    <div className="flex items-center gap-4">
      <Icon style={{ color: color }} size={24} />
      <span className="font-bold text-lg">{label}</span>
    </div>
    <ArrowRight
      className="text-gray-300 group-hover:text-[#202124] group-hover:translate-x-1 transition-all"
      size={20}
    />
  </Link>
);
