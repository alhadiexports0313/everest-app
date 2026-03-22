import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "اصلیت اور معیار | ایورسٹ آرگینک سلاجیت"
    : "Authenticity & Quality | Everest Organic Shilajit";
  const description = isUrdu
    ? "لیب ٹیسٹڈ ہمالیائی سلاجیت، فولویِک ایسڈ، اور شفاف پروسیسنگ — گلگت بلتستان سے مستند معیار۔"
    : "Lab-tested Himalayan Shilajit with verified purity, fulvic richness, and transparent processing from Gilgit-Baltistan.";
  const basePath = "/authenticity-quality";
  return {
    title,
    description,
    alternates: {
      canonical: basePath,
      languages: {
        en: basePath,
        ur: `${basePath}?lang=ur`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: basePath,
      images: [
        {
          url: "/images/banners/purification.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "خالص ہمالیائی سلاجیت کی لیب تصدیق"
            : "Lab-tested Himalayan Shilajit purity",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/purification.jpg"],
    },
    keywords: [
      "Himalayan Shilajit",
      "Everest Organic Shilajit",
      "Shilajet",
      "Organic Wellness",
      "Gilgit Baltistan",
    ],
  };
}

export default function AuthenticityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
