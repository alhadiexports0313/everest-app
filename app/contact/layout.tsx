import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "رابطہ کریں | ایورسٹ آرگینک سلاجیت"
    : "Contact Everest Organic Shilajit | Support & Orders";
  const description = isUrdu
    ? "ایورسٹ آرگینک سلاجیت سے رابطہ کریں — آرڈرز، سپورٹ، اور ہمالیائی سلاجیت کے سوالات کے لیے۔"
    : "Contact Everest Organic Shilajit for orders, support, and questions about Himalayan Shilajit and organic wellness.";
  const basePath = "/contact";
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
          url: "/images/banners/mountains-peak.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ایورسٹ آرگینک سلاجیت رابطہ"
            : "Contact Everest Organic Shilajit",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/mountains-peak.jpg"],
    },
    keywords: [
      "Everest Organic Shilajit",
      "Himalayan Shilajit",
      "Shilajet",
      "Organic Wellness",
      "Gilgit Baltistan",
    ],
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
