import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MessageCircle } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Everest Organic Shilajet | Premium Himalayan Wellness",
  description:
    "Authentic, pure Shilajet from the Himalayas of Gilgit-Baltistan. Premium wellness supplement backed by science. Export quality, lab-tested, and trusted worldwide.",
  keywords: [
    "Shilajet",
    "Himalayan Shilajet",
    "Organic Shilajet",
    "Gilgit-Baltistan",
    "Wellness Supplement",
    "Natural Health",
    "Premium Shilajet",
  ],
  authors: [{ name: "Fazal", url: "https://everestorganicshilajet.com" }],
  openGraph: {
    title: "Everest Organic Shilajet | Premium Himalayan Wellness",
    description:
      "Authentic, pure Shilajet from the Himalayas. Premium wellness supplement backed by science.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Everest Organic Shilajet",
    description: "Premium Himalayan Wellness Supplement",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-50 text-charcoal-900`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>

        {/* WhatsApp floating button */}
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-4 z-40 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-premium hover:shadow-premium-lg active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        <Footer />
      </body>
    </html>
  );
}
