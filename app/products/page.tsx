"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  TestTube,
  Leaf,
  Truck,
  MessageCircle,
  Mail,
  Sparkles,
} from "lucide-react";
import CTA from "@/components/sections/CTA";

const sizes = [
  { label: "10g", price: 1500 },
  { label: "20g", price: 3000 },
  { label: "50g", price: 6000 },
];

const galleryImages = [
  "/images/banners/resin-texture-macro-1.jpg",
  "/images/products/product_3.jpg",
];

const authenticityPoints = [
  "Verified Himalayan origin from Gilgit-Baltistan",
  "Lab-tested purity and heavy metal screening",
  "Fulvic & trace minerals preserved in resin form",
  "No additives, fillers, or synthetic processing",
];

const deliveryPoints = [
  "Carefully sealed in airtight, eco-friendly packaging",
  "Shipped within 24–48 hours after confirmation",
  "Trackable delivery nationwide and worldwide",
  "Support via WhatsApp for order updates",
];

const futureProducts = [
  {
    title: "Shilajet Capsules",
    description: "A convenient daily routine format with measured potency.",
  },
  {
    title: "Shilajet Powder",
    description: "Versatile powder for custom blends and wellness rituals.",
  },
  {
    title: "Herbal Infusions",
    description: "Curated Himalayan blends crafted for future launches.",
  },
];

export default function ProductsPage() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  const whatsappLink = useMemo(() => {
    const message = `Order request: Pure Himalayan Shilajet (${selectedSize.label})`;
    return `https://wa.me/923454490326?text=${encodeURIComponent(message)}`;
  }, [selectedSize.label]);

  const emailLink = useMemo(() => {
    const subject = `Order: Pure Himalayan Shilajet (${selectedSize.label})`;
    return `mailto:everestorganicshilajet@gmail.com?subject=${encodeURIComponent(subject)}`;
  }, [selectedSize.label]);

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              Products
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              Premium storytelling of pure Himalayan Shilajet, crafted for modern wellness.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                  Pure Himalayan Shilajet
                </div>
                <h2 className="font-display text-display-3 font-bold text-charcoal-900 mt-5 tracking-tight">
                  Crafted in the Himalayas, refined for daily ritual
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed font-light mt-4">
                  Harvested from high-altitude Himalayan rock formations and refined to
                  preserve potency, every jar delivers a premium wellness experience.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-[2.1fr_1fr] gap-6">
                <div className="rounded-3xl overflow-hidden bg-white shadow-premium border border-stone-200/70">
                  <div className="relative aspect-square">
                    <Image
                      src={activeImage}
                      alt="Pure Himalayan Shilajet resin texture"
                      fill
                      className="object-cover lux-image"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {galleryImages.map((image) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border transition-all ${
                        activeImage === image
                          ? "border-primary-600 shadow-premium"
                          : "border-stone-200/70 hover:border-primary-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt="Shilajet resin close-up"
                        fill
                      className="object-cover lux-image"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-primary-700" />
                    <h3 className="font-display text-lg font-semibold text-charcoal-900">
                      Authenticity Points
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {authenticityPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-700 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <Truck className="w-5 h-5 text-primary-700" />
                    <h3 className="font-display text-lg font-semibold text-charcoal-900">
                      Delivery Info
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {deliveryPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-700 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-3xl border border-stone-200/60 bg-white p-7 shadow-premium">
                <div className="flex items-center gap-2 text-sm text-primary-700 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Premium Resin Jar
                </div>
                <div className="mt-5">
                  <div className="text-sm text-stone-500">Price</div>
                  <div className="text-3xl font-display font-bold text-charcoal-900">
                    PKR {selectedSize.price.toLocaleString()}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-charcoal-900 mb-3">
                    Size Selection
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedSize.label === size.label
                            ? "bg-primary-700 text-white shadow-premium"
                            : "bg-white text-stone-700 border border-stone-200 hover:border-primary-300"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-stone-700">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-4 h-4 text-primary-700" />
                    Lab-tested purity & safety
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary-700" />
                    Eco-friendly airtight packaging
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-premium lux-button"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order on WhatsApp
                  </a>
                  <a
                    href={emailLink}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button hover:border-primary-300"
                  >
                    <Mail className="w-4 h-4" />
                    Order via Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                Future Products Teaser
              </h3>
              <p className="text-stone-700 leading-relaxed font-light">
                A premium lineup is in development to complement the flagship resin.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {futureProducts.map((product) => (
                <div
                  key={product.title}
                  className="rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft"
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-primary-700 font-semibold">
                    Coming Soon
                  </div>
                  <h4 className="font-display text-xl font-bold text-charcoal-900 mt-4">
                    {product.title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mt-3">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="lg:hidden fixed bottom-5 left-4 right-4 z-40">
        <div className="mx-auto flex max-w-[520px] flex-col gap-2 rounded-2xl border border-stone-200/60 bg-white/95 p-3 shadow-premium backdrop-blur">
          <div className="flex items-center justify-between px-2 text-sm text-stone-600">
            <span>{selectedSize.label} Jar</span>
            <span className="font-semibold text-charcoal-900">
              PKR {selectedSize.price.toLocaleString()}
            </span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium"
          >
            <MessageCircle className="w-4 h-4" />
            Order on WhatsApp
          </a>
          <a
            href={emailLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft"
          >
            <Mail className="w-4 h-4" />
            Order via Email
          </a>
        </div>
      </div>
      <CTA />
    </>
  );
}
