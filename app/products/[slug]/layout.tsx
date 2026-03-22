import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n-server";

const productMeta: Record<
  string,
  { title: string; description: string; image: string }
> = {
  "premium-shilajet-resin": {
    title: "Premium Shilajet Resin",
    description:
      "Pure Himalayan Shilajet resin from Gilgit-Baltistan with fulvic richness and lab-tested purity.",
    image: "/images/products/product_1.jpg",
  },
  "premium-shilajit-resin": {
    title: "Premium Shilajit Resin",
    description:
      "Pure Himalayan Shilajit resin from Gilgit-Baltistan with fulvic richness and lab-tested purity.",
    image: "/images/products/product_1.jpg",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const fallbackTitle = isUrdu
    ? "پریمیم سلاجیت ریزن"
    : "Premium Shilajet Resin";
  const fallbackDescription = isUrdu
    ? "گلگت بلتستان سے خالص ہمالیائی سلاجیت، لیب ٹیسٹڈ اور فلویِک ایسڈ سے بھرپور۔"
    : "Pure Himalayan Shilajet from Gilgit-Baltistan, lab-tested and rich in fulvic acid.";
  const product = productMeta[params.slug] ?? {
    title: fallbackTitle,
    description: fallbackDescription,
    image: "/images/products/product_1.jpg",
  };
  const title = isUrdu
    ? `${product.title} | ایورسٹ آرگینک سلاجیت`
    : `${product.title} | Everest Organic Shilajit`;
  const description = product.description;
  const basePath = `/products/${params.slug}`;
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
      type: "product",
      url: basePath,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ایورسٹ آرگینک سلاجیت ریزن"
            : "Everest Organic Shilajet resin",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
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

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
