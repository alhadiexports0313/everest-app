"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Check, Minus, Plus, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const productsBySlug = {
  "premium-shilajet-resin": {
    id: 1,
    name: "Premium Shilajet Resin",
    description:
      "Pure, unprocessed resin sourced from high-altitude Himalayan mountains. This premium Shilajet is carefully harvested and tested to ensure maximum purity and potency.",
    longDescription: `Our Premium Shilajet Resin is the most authentic form of Shilajet available. Sourced directly from the pristine mountains of Gilgit-Baltistan at altitudes above 3,000 meters, this resin contains the highest concentration of bioactive compounds.

Each batch undergoes rigorous third-party testing for purity, heavy metals, and potency. Our resin is 100% pure with no additives, fillers, or processing chemicals.

**Key Benefits:**
- Supports energy and vitality
- Promotes immune system health
- Contains 85+ trace minerals
- Rich in fulvic and humic acids
- Traditional Ayurvedic wellness support`,
    price: "$89",
    originalPrice: "$119",
    rating: 4.9,
    reviews: 1247,
    features: [
      "100% Pure Resin",
      "Lab Tested & Certified",
      "30g Premium Jar",
      "3-Month Supply",
      "No Additives or Fillers",
      "Third-Party Verified",
    ],
    badge: "Best Seller",
    inStock: true,
    sku: "EOS-RESIN-30G",
    benefits: [
      "Enhanced Energy & Vitality",
      "Immune System Support",
      "85+ Essential Minerals",
      "Cognitive Function Support",
      "Traditional Wellness",
    ],
    slug: "premium-shilajet-resin",
  },
};

const defaultProduct = productsBySlug["premium-shilajet-resin"];

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = productsBySlug[params.slug as keyof typeof productsBySlug] ?? defaultProduct;
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Everest Organic Shilajit",
    },
    image: "https://everestorganicshilajet.com/images/products/product_1.jpg",
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price.replace(/[^0-9.]/g, ""),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://everestorganicshilajet.com/products/${product.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="border-b border-neutral-100">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-himalayan overflow-hidden shadow-premium">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-8xl">🏔️</span>
                </div>
              </div>
            </div>
            {product.badge && (
              <div className="absolute top-4 right-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {product.badge}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-display text-4xl font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-accent-500 fill-accent-500"
                        : "text-neutral-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-neutral-600">
                {product.rating} ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-4xl font-bold text-neutral-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-500 line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-sm text-accent-600 font-semibold">Save 25%</span>
            </div>

            {product.inStock ? (
              <div className="flex items-center space-x-2 text-primary-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">In Stock - Ready to Ship</span>
              </div>
            ) : (
              <div className="text-neutral-500">Out of Stock</div>
            )}

            <div>
              <h2 className="font-semibold text-neutral-900 mb-3">What's Included:</h2>
              <ul className="space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center text-neutral-700">
                    <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-neutral-500">
              <Link
                href="/authenticity-quality"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Learn about authenticity & quality
              </Link>
              <span className="mx-2">•</span>
              <Link
                href="/knowledge-hub"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Explore the knowledge hub
              </Link>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-neutral-200 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-2 font-semibold text-neutral-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex gap-4 pt-4">
              <button className="flex-1 flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-premium lux-button">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="px-8 py-4 border-2 border-neutral-200 rounded-lg hover:border-primary-300 transition-colors">
                <Heart className="w-5 h-5 text-neutral-700" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
