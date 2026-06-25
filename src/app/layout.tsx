import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/common/Toaster";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PremiumCrafts - Premium Furniture & Home Décor",
  description: "Discover handcrafted furniture and home décor that transforms your living spaces into sanctuaries of comfort and style.",
  openGraph: {
    title: "PremiumCrafts - Premium Furniture & Home Décor",
    description: "Discover handcrafted furniture and home décor that transforms your living spaces into sanctuaries of comfort and style.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${dmSerif.variable}`}>
      <body className="bg-brand-bg text-brand-text antialiased font-[family-name:var(--font-inter)]">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
