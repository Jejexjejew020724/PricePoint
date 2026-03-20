import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
// 1. IMPORT NAVBAR BARU
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PricePoint - Inverse Margin Pricing",
  description: "Administrasi Niaga UNSRAT",
  // 2. TAMBAHKAN FAVICON (Ambil dari logo price.svg kamu)
  icons: {
    icon: "/favicon.ico", // Pastikan file ini ada di folder public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // TAMBAHKAN suppressHydrationWarning DI SINI
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* 3. PASANG NAVBAR DI SINI, DI ATAS {children} */}
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
