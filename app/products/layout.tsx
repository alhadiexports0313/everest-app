import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? "مصنوعات | ایورسٹ آرگینک سلاجیت"
    : "Buy Everest Organic Shilajit | Shilajet Pakistan";
  const description = isUrdu
    ? "ایورسٹ آرگینک سلاجیت کی مستند مصنوعات — خالص ہمالیائی سلاجیت، لیب ٹیسٹڈ اور گلگت بلتستان سے۔"
    : "Shop Everest Organic Shilajit in Pakistan. Pure Himalayan Shilajet, lab-tested, and sourced from Gilgit-Baltistan.";
  const basePath = "/products";
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
          url: "/images/products/product_3.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ایورسٹ آرگینک سلاجیت مصنوعات"
            : "Everest Organic Shilajit products",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/products/product_3.jpg"],
    },
    keywords: [
      "Shilajet",
      "Himalayan Shilajit",
      "Everest Organic Shilajit",
      "Organic Shilajit Pakistan",
      "Gilgit Baltistan",
    ],
  };
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
