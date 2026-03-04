import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import LanguageProvider from "@/components/i18n/LanguageProvider";
import { getLocale, tServer } from "@/lib/i18n-server";

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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await tServer(locale);
  const ogLocale = locale === "ur" ? "ur_PK" : "en_US";
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "Shilajet",
      "Everest Organic Shilajit",
      "Organic Shilajet",
      "Gilgit-Baltistan",
      "Wellness Supplement",
      "Natural Health",
      "Premium Shilajet",
    ],
    authors: [{ name: "Fazal", url: "https://everestorganicshilajet.com" }],
    openGraph: {
      title: t("meta.title"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: ogLocale,
    },
    alternates: {
      languages: {
        en: "/",
        ur: "/?lang=ur",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dir = locale === "ur" ? "rtl" : "ltr";
  const fontClass = locale === "ur" ? "font-urdu" : "font-sans";
  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${fontClass} antialiased bg-stone-50 text-charcoal-900`}
      >
        <LanguageProvider initialLocale={locale}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <WhatsAppFloat phoneNumber="923454490326" />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
