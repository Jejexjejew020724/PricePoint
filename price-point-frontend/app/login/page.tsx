"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { Mail, Lock, ArrowRight, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const endpoint = isRegister ? "/register" : "/login";

    try {
      const res = await api.post(endpoint, { email, password });

      if (isRegister) {
        setSuccess("Akun berhasil dibuat! Silakan login, Jere.");
        setIsRegister(false);
      } else {
        login(res.data.token);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      setError(
        axiosError.response?.data?.error ||
          "Terjadi kesalahan pada sistem Atlas.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6F7] relative overflow-hidden px-4">
      {/* BACKGROUND DECORATION */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FFC400] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#DD2C00] rounded-full blur-[120px] opacity-20"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-10 relative overflow-hidden">
          {/* HEADER STRIP GRADASI API */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00]"></div>

          <div className="text-center mb-8">
            {/* LOGO BARU PRICE.SVG */}
            <div className="inline-flex p-1 rounded-3xl bg-white mb-4 shadow-sm border border-gray-100 overflow-hidden">
              <Image
                src="/price.svg"
                alt="PricePoint Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl font-black tracking-tighter text-[#202124] uppercase">
              {isRegister ? (
                <>
                  Create <span className="text-[#DD2C00]">Account</span>
                </>
              ) : (
                <>
                  Welcome <span className="text-[#FF9100]">Back</span>
                </>
              )}
            </h1>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 px-4">
              PricePoint Analytics Cloud
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-xl text-xs font-black">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-xl text-xs font-black">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Kampus
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF9100] transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  placeholder="nim@student.unsrat.ac.id"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-[#FFC400] focus:bg-white transition-all font-bold text-[#202124]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF9100] transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none border-2 border-transparent focus:border-[#FFC400] focus:bg-white transition-all font-bold text-[#202124]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full ${isRegister ? "bg-[#DD2C00]" : "bg-gradient-to-r from-[#FFC400] via-[#FF9100] to-[#DD2C00]"} text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:grayscale hover:brightness-110`}
            >
              {isLoading ? (
                "PROCESSING..."
              ) : (
                <>
                  {isRegister ? "REGISTER NOW" : "SIGN IN"}{" "}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
                setSuccess("");
              }}
              className="text-[#202124] text-[10px] font-black hover:text-[#FF9100] transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
            >
              {isRegister ? (
                <>
                  <LogIn size={14} /> Already have an account? Login
                </>
              ) : (
                <>
                  <UserPlus size={14} /> Need an account? Register here
                </>
              )}
            </button>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/"
                className="text-gray-400 text-[10px] font-black hover:text-[#FF9100] transition-colors uppercase tracking-widest"
              >
                ← Kembali ke Simulator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
