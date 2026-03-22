import type { Metadata } from "next";
import EnvironmentalRespectClient from "./EnvironmentalRespectClient";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "ماحولیاتی احترام | ایورسٹ آرگینک سلاجیت"
    : "Environmental Respect | Everest Organic Shilajit";
  const description = isUrdu
    ? "اخلاقی حصول، پائیدار کٹائی، ماحول دوست پیکجنگ اور گلگت بلتستان میں کمیونٹی کی معاونت۔"
    : "Ethical sourcing, sustainable harvesting, eco-friendly packaging, and community support in Gilgit-Baltistan.";
  const basePath = "/environmental-respect";
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
          url: "/images/banners/extraction-mountains.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ہمالیائی ماحول کا احترام"
            : "Respecting Himalayan ecosystems",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/extraction-mountains.jpg"],
    },
    keywords: [
      "Everest Organic Shilajit",
      "Himalayan Shilajit",
      "Organic Wellness",
      "Gilgit Baltistan",
      "Natural wellness supplement",
    ],
  };
}

export default function EnvironmentalRespectPage() {
  return <EnvironmentalRespectClient />;
}
