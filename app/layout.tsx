import type { Metadata } from "next";
import Script from "next/script";
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
  const baseUrl = new URL("https://everestorganicshilajet.com");
  const titleTemplate =
    locale === "ur"
      ? "%s | ایورسٹ آرگینک سلاجیت"
      : "%s | Everest Organic Shilajit";
  return {
    metadataBase: baseUrl,
    title: {
      default: t("meta.title"),
      template: titleTemplate,
    },
    description: t("meta.description"),
    keywords: [
      "Shilajet",
      "Himalayan Shilajit",
      "Everest Organic Shilajit",
      "Organic Wellness",
      "Organic Shilajit Pakistan",
      "Organic Shilajet",
      "Gilgit-Baltistan",
      "Wellness Supplement",
      "Natural wellness supplement",
      "Natural Health",
      "Premium Shilajet",
    ],
    authors: [{ name: "Fazal", url: "https://everestorganicshilajet.com" }],
    openGraph: {
      title: t("meta.title"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: ogLocale,
      url: baseUrl,
      siteName: "Everest Organic Shilajit",
      images: [
        {
          url: "/images/banners/mountains-peak.jpg",
          width: 1200,
          height: 630,
          alt:
            locale === "ur"
              ? "ایورسٹ آرگینک سلاجیت — ہمالیائی شیلجیت"
              : "Everest Organic Shilajit — Himalayan Shilajit",
        },
      ],
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        ur: "/?lang=ur",
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.twitterTitle"),
      description: t("meta.twitterDescription"),
      images: ["/images/banners/mountains-peak.jpg"],
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        ) : null}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
