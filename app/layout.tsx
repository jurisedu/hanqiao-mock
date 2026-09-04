import type { Metadata } from "next";
import { Manrope, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { LangProvider } from "@/lib/i18n";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" });
const noto = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-noto", display: "swap", preload: false });
const serif = Noto_Serif_SC({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  title: { default: "汉桥 HanQiao · GACEE 中文学习平台", template: "%s · 汉桥 HanQiao" },
  description: "Teacher-led, AI-assisted Chinese learning platform preview. GACEE × Juris&Edu AI Technology.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans" className={`${manrope.variable} ${noto.variable} ${serif.variable}`}>
      <body><LangProvider>{children}</LangProvider></body>
    </html>
  );
}
