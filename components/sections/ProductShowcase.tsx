"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Star, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const sizes = [
  { label: "10g", price: 1500 },
  { label: "20g", price: 3000 },
  { label: "50g", price: 6000 },
];

const currencies = [
  { code: "PKR", label: "PKR ₨" },
  { code: "USD", label: "USD $" },
] as const;

const DEFAULT_USD_PKR_RATE = 300;

const products = [
  {
    id: 1,
    name: "Premium Shilajit Resin",
    description: "Pure, unprocessed resin sourced from high-altitude Himalayan mountains",
    rating: 4.9,
    reviews: 1247,
    image: "/api/placeholder/400/400",
    features: [
      "100% Pure Resin",
      "Lab Tested",
    ],
    badge: "Best Seller",
    type: "resin",
  },
  {
    id: 2,
    name: "Shilajit Capsules",
    description: "Convenient, standardized capsules for daily wellness support",
    image: "/api/placeholder/400/400",
    features: [
      "60 Capsules",
      "Easy to Take",
      "Standardized Extract",
    ],
    badge: "Coming Soon",
    comingSoon: true,
    type: "capsules",
  },
  {
    id: 3,
    name: "Shilajit Powder",
    description: "Fine powder form for maximum versatility and absorption",
    image: "/api/placeholder/400/400",
    features: [
      "100g Powder",
      "Versatile Use",
      "High Purity",
    ],
    badge: "Coming Soon",
    comingSoon: true,
    type: "powder",
  },
];

const productImageNames = [
  "product_1.jpg",
  "product_2.jpg",
  "product_3.jpg",
  "product_12.jpg",
  "product_13.jpg",
  "product_16.jpg",
];

const productImages = productImageNames.map(
  (name) => `/images/products/${encodeURIComponent(name)}`
);

export default function ProductShowcase() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [currency, setCurrency] = useState<(typeof currencies)[number]["code"]>(
    "PKR"
  );
  const [usdToPkrRate, setUsdToPkrRate] = useState(DEFAULT_USD_PKR_RATE);
  const [assignedImages, setAssignedImages] = useState(() =>
    products.map((product, index) => {
      return productImages[index % productImages.length] ?? product.image;
    })
  );

  useEffect(() => {
    const cachedRate = Number(localStorage.getItem("usdToPkrRate"));
    const cachedTimestamp = Number(localStorage.getItem("usdToPkrRateTimestamp"));
    const now = Date.now();
    const isFresh =
      Number.isFinite(cachedRate) &&
      cachedRate > 0 &&
      Number.isFinite(cachedTimestamp) &&
      now - cachedTimestamp < 24 * 60 * 60 * 1000;

    if (isFresh) {
      setUsdToPkrRate(cachedRate);
      return;
    }

    const loadRate = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) throw new Error("rate_fetch_failed");
        const data = await response.json();
        const rate = Number(data?.rates?.PKR);
        if (Number.isFinite(rate) && rate > 0) {
          setUsdToPkrRate(rate);
          localStorage.setItem("usdToPkrRate", String(rate));
          localStorage.setItem("usdToPkrRateTimestamp", String(Date.now()));
          return;
        }
        if (Number.isFinite(cachedRate) && cachedRate > 0) {
          setUsdToPkrRate(cachedRate);
        }
      } catch {
        if (Number.isFinite(cachedRate) && cachedRate > 0) {
          setUsdToPkrRate(cachedRate);
        }
      }
    };

    loadRate();
  }, []);

  useEffect(() => {
    const pool = [...productImages];
    const picks = products.map((product, index) => {
      const pick = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
      return pick ?? productImages[index % productImages.length] ?? product.image;
    });
    setAssignedImages(picks);
  }, []);

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-6 tracking-tight">
            Our Premium Collection
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Each product is carefully sourced, tested, and packaged to meet the highest
            international standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const isResin = product.type === "resin";
            const isComingSoon = Boolean(product.comingSoon);
            const priceInPkr = selectedSize.price;
            const priceLabel =
              currency === "PKR"
                ? `PKR ${priceInPkr.toLocaleString()}`
                : `$${(priceInPkr / usdToPkrRate).toFixed(2)}`;

            return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative rounded-2xl overflow-hidden border border-stone-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            >
              <div className="relative aspect-square bg-gradient-stone overflow-hidden">
                <Image
                  src={assignedImages[index]}
                  alt={product.name}
                  fill
                  className="object-cover lux-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {product.badge && (
                  <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-[#C6A052] via-[#D9B56A] to-[#B7893C] px-4 py-1.5 text-xs font-semibold text-white shadow-soft">
                    {product.badge}
                  </div>
                )}
                {isComingSoon && (
                  <div className="absolute top-4 left-4 rounded-full bg-[#C6A052] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_12px_30px_rgba(198,160,82,0.35)]">
                    Coming Soon
                  </div>
                )}
              </div>

              <div className={`relative p-7 ${isComingSoon ? "opacity-70" : ""}`}>
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-3 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-stone-600 mb-5 text-sm leading-relaxed font-light">
                  {product.description}
                </p>
                {isResin && (
                  <div className="absolute right-7 top-7">
                    <div className="relative">
                      <select
                        value={currency}
                        onChange={(event) =>
                          setCurrency(event.target.value as (typeof currencies)[number]["code"])
                        }
                        className="appearance-none rounded-full border border-stone-200 bg-white px-3 py-1.5 pr-7 text-xs font-semibold text-stone-600 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-[#C6A052]/60"
                      >
                        {currencies.map((option) => (
                          <option key={option.code} value={option.code}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-stone-500">
                        ▼
                      </span>
                    </div>
                  </div>
                )}

                <ul className="space-y-2.5 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-stone-700">
                      <Check className="w-4 h-4 text-[#C6A052] mr-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {!isComingSoon && (
                  <div className="flex items-center space-x-2 mb-5">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating ?? 0)
                              ? "text-[#C6A052] fill-[#C6A052]"
                              : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-stone-600">
                      {product.rating} ({product.reviews?.toLocaleString()} reviews)
                    </span>
                  </div>
                )}

                {isResin && (
                  <div className="rounded-2xl border border-stone-200/70 bg-stone-50/70 p-4 mb-6">
                    <div className="text-xs uppercase tracking-[0.28em] text-stone-500 font-semibold">
                      Select Size
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {sizes.map((size) => {
                        const active = size.label === selectedSize.label;
                        return (
                          <button
                            key={size.label}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={[
                              "rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300",
                              active
                                ? "border-[#C6A052] text-[#8C6C2B] shadow-[0_10px_24px_rgba(198,160,82,0.28)] bg-white"
                                : "border-stone-200 text-stone-600 hover:border-[#C6A052]/60 hover:text-[#8C6C2B] bg-white",
                            ].join(" ")}
                          >
                            {size.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isResin && (
                  <div className="flex items-center justify-between pt-5 border-t border-stone-200">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currency}-${selectedSize.label}-${priceLabel}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="text-2xl font-bold text-charcoal-900"
                      >
                        {priceLabel}
                      </motion.div>
                    </AnimatePresence>
                    <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-white lux-gold-button shadow-[0_15px_35px_rgba(198,160,82,0.35)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                )}

                {isComingSoon && (
                  <div className="flex items-center justify-between pt-5 border-t border-stone-200">
                    <span className="text-sm font-semibold text-stone-500">
                      Launching Soon
                    </span>
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-stone-100 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-stone-400"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
              {isComingSoon && (
                <div className="pointer-events-none absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
              )}
            </motion.div>
          );
        })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors duration-300"
          >
            View All Products
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
