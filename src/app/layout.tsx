import type { Metadata } from "next";
import { Noto_Sans_JP, Kaisei_HarunoUmi } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme-context";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

const kaiseiHarunoUmi = Kaisei_HarunoUmi({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-kaisei-harunoumi",
});

export const metadata: Metadata = {
  title: "SOLAIZ - 石垣島の宿泊施設",
  description: "石垣島の美しい自然に囲まれたモダンな宿泊施設SOLAIZ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} ${kaiseiHarunoUmi.variable} font-sans`} style={{ fontFeatureSettings: '"palt" 1' }}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
