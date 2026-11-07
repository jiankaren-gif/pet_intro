import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Parallax from "@/components/Parallax";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "毛孩出遊趣｜寵物雨衣・牽繩・防曬配件",
  description: "晴天雨天都適用的寵物出遊裝備：防水雨衣、減震牽繩與防曬配件。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden bg-gradient-to-br from-sky-200 via-pink-100 to-amber-100 text-slate-800">
        {/* 背景光暈：固定在視窗上，以不同速度往上飄，透過玻璃卡片看得到流動感 */}
        <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
          <Parallax speed={-0.1} className="absolute -left-32 -top-32">
            <div className="h-96 w-96 rounded-full bg-sky-400/40 blur-3xl" />
          </Parallax>
          <Parallax speed={-0.2} className="absolute -right-24 top-1/3">
            <div className="h-96 w-96 rounded-full bg-pink-400/30 blur-3xl" />
          </Parallax>
          <Parallax speed={-0.3} className="absolute left-1/3 top-[70%]">
            <div className="h-80 w-80 rounded-full bg-amber-300/40 blur-3xl" />
          </Parallax>
          <Parallax speed={-0.4} className="absolute -left-16 top-[120%]">
            <div className="h-96 w-96 rounded-full bg-violet-400/30 blur-3xl" />
          </Parallax>
          <Parallax speed={-0.55} className="absolute right-1/4 top-[160%]">
            <div className="h-80 w-80 rounded-full bg-sky-300/40 blur-3xl" />
          </Parallax>
        </div>

        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
