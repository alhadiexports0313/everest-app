import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "ایورسٹ آرگینک سلاجیت کے بارے میں | ہمالیائی ورثہ"
    : "About Everest Organic Shilajit | Himalayan Heritage";
  const description = isUrdu
    ? "گلگت بلتستان سے مستند ہمالیائی سلاجیت، اخلاقی حصول اور آرگینک ویلنَس کے عزم کے ساتھ۔"
    : "Discover Everest Organic Shilajit, rooted in Gilgit-Baltistan heritage, ethical sourcing, and premium organic wellness.";
  const basePath = "/about";
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
          url: "/images/banners/mountain-energy.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ایورسٹ آرگینک سلاجیت — ہمالیائی ورثہ"
            : "Everest Organic Shilajit heritage story",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/mountain-energy.jpg"],
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
