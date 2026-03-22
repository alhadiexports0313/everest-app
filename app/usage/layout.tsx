import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "سلاجیت استعمال | مقدار اور روزانہ معمول"
    : "How to Use Shilajit | Dosage & Daily Routine";
  const description = isUrdu
    ? "ہمالیائی سلاجیت کے درست استعمال، مقدار اور محفوظ روزانہ معمول کے لیے مکمل رہنمائی۔"
    : "Learn how to use Himalayan Shilajit safely with dosage, timing, and daily routine guidance.";
  const basePath = "/usage";
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
          url: "/images/products/product_9.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "سلاجیت استعمال رہنمائی"
            : "Shilajit usage guide",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/products/product_9.jpg"],
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

export default function UsageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
