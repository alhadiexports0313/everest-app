"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, Mail, MessageCircle, ZoomIn } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const sizes = [
  { label: "10g", price: 1500 },
  { label: "20g", price: 3000 },
  { label: "50g", price: 6000 },
];

const resinImages = [
  "/images/products/product_1.jpg",
  "/images/products/product_3.jpg",
];



const highlights = [
  {
    text: "Authenticity Promise: 100% Himalayan Resin",
    urdu: "اصلیت کی ضمانت: 100% ہمالیائی رال",
  },
  {
    text: "Lab Tested Purity",
    urdu: "لیب ٹیسٹڈ خلوص",
  },
  {
    text: "Rich in Fulvic & Trace Minerals",
    urdu: "فولویِک اور ٹریس منرلز سے بھرپور",
  },
  {
    text: "Eco-Friendly Packaging",
    urdu: "ماحول دوست پیکجنگ",
  },
];

export default function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";

  const whatsappLink = useMemo(() => {
    const message = isUrdu
      ? `آرڈر کی درخواست: ایورسٹ آرگینک سلاجیت (${selectedSize.label})`
      : `Order request: Everest Organic Shilajit (${selectedSize.label})`;
    return `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
  }, [isUrdu, selectedSize.label]);

  const emailLink = useMemo(() => {
    const subject = isUrdu
      ? `آرڈر: ایورسٹ آرگینک سلاجیت (${selectedSize.label})`
      : `Order: Everest Organic Shilajit (${selectedSize.label})`;
    return `mailto:info@everestorganicshilajet.com?subject=${encodeURIComponent(
      subject
    )}`;
  }, [isUrdu, selectedSize.label]);

  return (
    <section id="featured" className="section-padding bg-stone-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-stone-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold text-stone-500 ${
              isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.3em]"
            }`}
          >
            {isUrdu ? "پرچم بردار" : "Flagship"}
          </div>
          <h2 className={`font-display text-display-3 font-bold text-charcoal-900 mt-5 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "ایورسٹ آرگینک سلاجیت" : "Everest Organic Shilajit"}
          </h2>
          <p className={`text-lg text-stone-700 leading-relaxed font-light mt-4 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "گلگت بلتستان سے حاصل کردہ پریمیم رال، خلوص اور اثر کے لیے تیار کی گئی۔"
              : "Premium resin sourced from Gilgit-Baltistan, crafted for purity and potency."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft"
          >
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
              <Image
                src={resinImages[0]}
                alt="Everest Organic Shilajit resin"
                fill
                className="object-cover lux-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <div className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-soft">
                <ZoomIn className="h-3.5 w-3.5 text-stone-500" />
                Texture Zoom
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {resinImages.map((image) => (
                <div
                  key={image}
                  className="relative aspect-video overflow-hidden rounded-xl border border-stone-200/60 bg-stone-100"
                >
                  <Image src={image} alt="Shilajet resin texture" fill className="object-cover lux-image" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-7 shadow-soft sticky top-24 lg:static"
          >
            <div className={`flex items-center justify-between ${isUrdu ? "flex-row-reverse" : ""}`}>
              <div className={isUrdu ? "text-right" : "text-left"}>
                <div
                  className={`text-xs text-stone-400 ${
                    isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.3em]"
                  }`}
                >
                  {isUrdu ? "رال" : "Resin"}
                </div>
                <div className={`font-display text-2xl font-bold text-charcoal-900 mt-2 ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? "ایورسٹ آرگینک سلاجیت" : "Everest Organic Shilajit"}
                </div>
              </div>
              <div className={isUrdu ? "text-left font-urdu" : "text-right"}>
                <div className="text-xs text-stone-500">PKR</div>
                <div className="text-3xl font-bold text-charcoal-900">
                  {selectedSize.price.toLocaleString("en-PK")}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  {isUrdu ? `${selectedSize.label} جار` : `${selectedSize.label} jar`}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className={`text-sm font-semibold text-charcoal-900 mb-3 ${isUrdu ? "font-urdu" : ""}`}>
                {isUrdu ? "سائز منتخب کریں" : "Select Size"}
              </div>
              <div className="flex flex-wrap gap-3">
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

            <div className={`mt-6 space-y-3 ${isUrdu ? "text-right font-urdu" : "text-left"}`}>
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className={`flex items-center text-sm text-stone-700 ${
                    isUrdu ? "flex-row-reverse gap-2" : ""
                  }`}
                >
                  <Check className={`w-4 h-4 text-primary-700 ${isUrdu ? "" : "mr-2.5"}`} />
                  {isUrdu ? item.urdu : item.text}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-premium lux-button"
              >
                <MessageCircle className="w-4 h-4" />
                {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
              </a>
              <a
                href={emailLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button hover:border-primary-300"
              >
                <Mail className="w-4 h-4" />
                {isUrdu ? "ای میل کے ذریعے آرڈر کریں" : "Order via Email"}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-5 left-4 right-4 z-40">
        <div className="mx-auto flex max-w-[520px] flex-col gap-2 rounded-2xl border border-stone-200/60 bg-white/95 p-3 shadow-premium backdrop-blur">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium lux-button"
          >
            <MessageCircle className="w-4 h-4" />
            {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
          </a>
          <a
            href={emailLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button"
          >
            <Mail className="w-4 h-4" />
            {isUrdu ? "ای میل کے ذریعے آرڈر کریں" : "Order via Email"}
          </a>
        </div>
      </div>
    </section>
  );
}
