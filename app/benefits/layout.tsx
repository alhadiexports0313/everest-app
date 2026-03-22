import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "سلاجیت فوائد | آرگینک ویلنَس سپورٹ"
    : "Shilajit Benefits | Organic Wellness & Energy Support";
  const description = isUrdu
    ? "ہمالیائی سلاجیت کے فوائد جانیں: توانائی، ریکوری، اور قدرتی ویلنَس سپورٹ کے لیے مستند رہنمائی۔"
    : "Explore Himalayan Shilajit benefits for energy, recovery, and natural wellness support from Gilgit-Baltistan.";
  const basePath = "/benefits";
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
          url: "/images/products/product_13.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ہمالیائی سلاجیت فوائد"
            : "Himalayan Shilajit benefits",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/products/product_13.jpg"],
    },
    keywords: [
      "Shilajet",
      "Himalayan Shilajit",
      "Organic Wellness",
      "Natural wellness supplement",
      "Gilgit Baltistan",
    ],
  };
}

export default function BenefitsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
