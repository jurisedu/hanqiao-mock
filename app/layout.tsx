import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const noto = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-noto", display: "swap", preload: false });
const serif = Noto_Serif_SC({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: "山海同文 SHANHAI TONGWEN · AI 中文学习平台 · 演示环境", template: "%s · 山海同文 SHANHAI TONGWEN · 演示环境" },
  description: "Preview environment of the teacher-led, AI-assisted Chinese learning platform. Sample data only. GACEE × Juris&Edu AI Technology.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" className={`${manrope.variable} ${noto.variable} ${serif.variable}`}>
      <body><LangProvider><ToastProvider>{children}</ToastProvider></LangProvider></body>
    </html>
  );
}
