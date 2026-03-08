"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useLanguage } from "@/components/i18n/LanguageProvider";

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
  {
    text: "Verified Himalayan origin from Gilgit-Baltistan",
    urdu: "گلگت بلتستان سے تصدیق شدہ ہمالیائی ماخذ",
  },
  {
    text: "Lab-tested purity and heavy metal screening",
    urdu: "لیب ٹیسٹڈ خلوص اور ہیوی میٹل اسکریننگ",
  },
  {
    text: "Fulvic & trace minerals preserved in resin form",
    urdu: "رال کی صورت میں فولویِک اور ٹریس منرلز محفوظ",
  },
  {
    text: "No additives, fillers, or synthetic processing",
    urdu: "کوئی ایڈیٹیوز، فلرز یا مصنوعی پراسیسنگ نہیں",
  },
];

const deliveryPoints = [
  {
    text: "Carefully sealed in airtight, eco-friendly packaging",
    urdu: "محفوظ ائیر ٹائٹ اور ماحول دوست پیکجنگ میں بند",
  },
  {
    text: "Shipped within 24–48 hours after confirmation",
    urdu: "تصدیق کے بعد 24 تا 48 گھنٹوں میں ترسیل",
  },
  {
    text: "Trackable delivery nationwide and worldwide",
    urdu: "پاکستان بھر اور دنیا بھر میں قابلِ ٹریک ترسیل",
  },
  {
    text: "Support via WhatsApp for order updates",
    urdu: "آرڈر اپڈیٹس کے لیے واٹس ایپ سپورٹ",
  },
];

const futureProducts = [
  {
    title: "Shilajet Capsules",
    description: "A convenient daily routine format with measured potency.",
    urduTitle: "سلاجیت کیپسول",
    urduDescription: "ماپے ہوئے اثر کے ساتھ روزمرہ کے لیے آسان انتخاب۔",
  },
  {
    title: "Shilajet Powder",
    description: "Versatile powder for custom blends and wellness rituals.",
    urduTitle: "سلاجیت پاؤڈر",
    urduDescription: "کسٹم بلینڈز اور ویلنَس معمولات کے لیے موزوں پاؤڈر۔",
  },
  {
    title: "Herbal Infusions",
    description: "Curated Himalayan blends crafted for future launches.",
    urduTitle: "ہربل انفیوژنز",
    urduDescription: "منتخب ہمالیائی بلینڈز جو آئندہ لانچ کے لیے تیار ہیں۔",
  },
];

export default function ProductsPage() {
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const cachedRate =
      typeof window !== "undefined" ? localStorage.getItem("pkrUsdRate") : null;
    const cachedDate =
      typeof window !== "undefined"
        ? localStorage.getItem("pkrUsdRateDate")
        : null;
    if (cachedRate && cachedDate === today) {
      const parsedRate = Number(cachedRate);
      if (!Number.isNaN(parsedRate)) {
        setUsdRate(parsedRate);
        return;
      }
    }

    let isActive = true;
    const controller = new AbortController();

    const loadRate = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/PKR", {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        const rate = data?.rates?.USD;
        if (isActive && typeof rate === "number") {
          setUsdRate(rate);
          localStorage.setItem("pkrUsdRate", String(rate));
          localStorage.setItem("pkrUsdRateDate", today);
        }
      } catch {
        if (!isActive) return;
      }
    };

    loadRate();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const whatsappLink = useMemo(() => {
    const message = isUrdu
      ? `آرڈر کی درخواست: ایورسٹ آرگینک سلاجیت (${selectedSize.label})`
      : `Order request: Everest Organic Shilajit (${selectedSize.label})`;
    return `https://wa.me/923454490326?text=${encodeURIComponent(message)}`;
  }, [isUrdu, selectedSize.label]);

  const emailLink = useMemo(() => {
    const subject = isUrdu
      ? `آرڈر: ایورسٹ آرگینک سلاجیت (${selectedSize.label})`
      : `Order: Everest Organic Shilajit (${selectedSize.label})`;
    return `mailto:everestorganicshilajet@gmail.com?subject=${encodeURIComponent(subject)}`;
  }, [isUrdu, selectedSize.label]);

  const priceLocale = isUrdu ? "ur-PK" : "en-PK";
  const formatPkr = useMemo(
    () => (value: number) =>
      new Intl.NumberFormat(priceLocale, {
        style: "currency",
        currency: "PKR",
        maximumFractionDigits: 0,
      }).format(value),
    [priceLocale]
  );
  const formatUsd = useMemo(() => {
    if (!usdRate) return null;
    return (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value * usdRate);
  }, [usdRate]);
  const canShowUsd = Boolean(formatUsd);
  const unitPricePkr = selectedSize.price;
  const totalPricePkr = unitPricePkr * quantity;
  const unitPriceUsd = formatUsd ? formatUsd(unitPricePkr) : null;
  const totalPriceUsd = formatUsd ? formatUsd(totalPricePkr) : null;
  const primaryPrice =
    currency === "USD" && totalPriceUsd ? totalPriceUsd : formatPkr(totalPricePkr);
  const secondaryPrice =
    currency === "USD" ? formatPkr(totalPricePkr) : totalPriceUsd;

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              {isUrdu ? "مصنوعات" : "Products"}
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              {isUrdu
                ? "ایورسٹ آرگینک سلاجیت کی پریمیم کہانی، جدید ویلنَس کے لیے تیار کردہ۔"
                : "Premium storytelling of Everest Organic Shilajit, crafted for modern wellness."}
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
                  {isUrdu ? "ایورسٹ آرگینک سلاجیت" : "Everest Organic Shilajit"}
                </div>
                <h2 className="font-display text-display-3 font-bold text-charcoal-900 mt-5 tracking-tight">
                  {isUrdu
                    ? "ہمالیہ میں تیار، روزمرہ کے معمول کے لیے نکھاری گئی"
                    : "Crafted in the Himalayas, refined for daily ritual"}
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed font-light mt-4">
                  {isUrdu
                    ? "بلند ہمالیائی چٹانی ساختوں سے حاصل اور خالص کیا گیا، ہر جار پریمیم ویلنَس کا معیار فراہم کرتا ہے۔"
                    : "Harvested from high-altitude Himalayan rock formations and refined to preserve potency, every jar delivers a premium wellness experience."}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-[2.1fr_1fr] gap-6">
                <div className="rounded-3xl overflow-hidden bg-white shadow-premium border border-stone-200/70">
                  <div className="relative aspect-square">
                    <Image
                      src={activeImage}
                      alt="Everest Organic Shilajit resin texture"
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
                <div
                  className={`rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-4 ${
                      isUrdu ? "flex-row-reverse justify-end" : ""
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-primary-700" />
                    <h3 className="font-display text-lg font-semibold text-charcoal-900">
                      {isUrdu ? "اصلیت کے پیمانے" : "Authenticity Points"}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {authenticityPoints.map((point) => (
                      <li
                        key={point.text}
                        className={`flex items-start gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}
                      >
                        <Check className="w-4 h-4 text-primary-700 mt-0.5" />
                        {isUrdu ? point.urdu : point.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-4 ${
                      isUrdu ? "flex-row-reverse justify-end" : ""
                    }`}
                  >
                    <Truck className="w-5 h-5 text-primary-700" />
                    <h3 className="font-display text-lg font-semibold text-charcoal-900">
                      {isUrdu ? "ترسیل کی معلومات" : "Delivery Info"}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-stone-700">
                    {deliveryPoints.map((point) => (
                      <li
                        key={point.text}
                        className={`flex items-start gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}
                      >
                        <Check className="w-4 h-4 text-primary-700 mt-0.5" />
                        {isUrdu ? point.urdu : point.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 space-y-6">
              <div
                className={`rounded-3xl border border-stone-200/60 bg-white p-7 shadow-premium ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-sm text-primary-700 font-semibold ${
                    isUrdu ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {isUrdu ? "پریمیم رال جار" : "Premium Resin Jar"}
                </div>
                <div className="mt-5">
                  <div className="text-sm text-stone-500">{isUrdu ? "قیمت" : "Price"}</div>
                  <div
                    className={`inline-flex items-center rounded-full border border-stone-200 bg-white/80 p-1 text-[11px] font-semibold text-stone-500 mt-3 ${
                      isUrdu ? "flex-row-reverse" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setCurrency("PKR")}
                      aria-pressed={currency === "PKR"}
                      className={`px-2.5 py-1 rounded-full transition-colors ${
                        currency === "PKR"
                          ? "bg-stone-900 text-white"
                          : "text-stone-500"
                      }`}
                    >
                      PKR
                    </button>
                    <button
                      type="button"
                      onClick={() => canShowUsd && setCurrency("USD")}
                      aria-pressed={currency === "USD"}
                      className={`px-2.5 py-1 rounded-full transition-colors ${
                        currency === "USD"
                          ? "bg-stone-900 text-white"
                          : canShowUsd
                          ? "text-stone-500"
                          : "text-stone-300"
                      }`}
                    >
                      USD
                    </button>
                  </div>
                  <div className="text-3xl font-display font-bold text-charcoal-900">
                    {primaryPrice}
                  </div>
                  {secondaryPrice ? (
                    <div className="text-xs text-stone-500 mt-1">
                      {secondaryPrice}
                    </div>
                  ) : null}
                  <div className="text-xs text-stone-500 mt-1">
                    {isUrdu
                      ? `${selectedSize.label} جار × ${quantity}`
                      : `${selectedSize.label} jar × ${quantity}`}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {isUrdu
                      ? "فی جار"
                      : "Per jar"}{" "}
                    {currency === "USD" && unitPriceUsd ? unitPriceUsd : formatPkr(unitPricePkr)}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-charcoal-900 mb-3">
                    {isUrdu ? "سائز کا انتخاب" : "Size Selection"}
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
                        <span className="block">{size.label}</span>
                        <span
                          className={`block text-[11px] ${
                            selectedSize.label === size.label
                              ? "text-white/85"
                              : "text-stone-500"
                          }`}
                        >
                          {currency === "USD" && canShowUsd && formatUsd
                            ? formatUsd(size.price)
                            : formatPkr(size.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold text-charcoal-900 mb-3">
                    {isUrdu ? "مقدار" : "Quantity"}
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full border border-stone-200 bg-white px-2 py-1 shadow-soft ${
                      isUrdu ? "flex-row-reverse" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                      }
                      className="h-9 w-9 rounded-full text-stone-600 transition-colors hover:bg-stone-100"
                      aria-label={isUrdu ? "مقدار کم کریں" : "Decrease quantity"}
                    >
                      −
                    </button>
                    <input
                        type="number"
                        min={1}
                        max={500}
                        step={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={quantity}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          if (nextValue === "") {
                            setQuantity(1);
                            return;
                          }
                          const parsed = Number(nextValue);
                          if (Number.isNaN(parsed)) return;
                          const clamped = Math.min(500, Math.max(1, parsed));
                          setQuantity(clamped);
                        }}
                      // type="number"
                      // min={1}
                      // step={1}
                      // inputMode="numeric"
                      // pattern="[0-9]*"
                      // value={quantity}
                      // onChange={(event) => {
                      //   const nextValue = event.target.value;
                      //   if (nextValue === "501") {
                      //     setQuantity(1);
                      //     return;
                      //   }
                      //   const parsed = Number(nextValue);
                      //   if (Number.isNaN(parsed)) return;
                      //   setQuantity(parsed < 1 ? 1 : parsed);
                      // }}
                      className="min-w-[64px] bg-transparent text-center text-base font-semibold text-charcoal-900 focus:outline-none"
                      aria-label={isUrdu ? "مقدار درج کریں" : "Enter quantity"}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => (prev < 500 ? prev + 1 : prev))
                      }
                      className="h-9 w-9 rounded-full text-stone-600 transition-colors hover:bg-stone-100"
                      aria-label={isUrdu ? "مقدار بڑھائیں" : "Increase quantity"}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-stone-700">
                  <div
                    className={`flex items-center gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}
                  >
                    <TestTube className="w-4 h-4 text-primary-700" />
                    {isUrdu ? "لیب ٹیسٹ شدہ خلوص اور حفاظت" : "Lab-tested purity & safety"}
                  </div>
                  <div
                    className={`flex items-center gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}
                  >
                    <Leaf className="w-4 h-4 text-primary-700" />
                    {isUrdu
                      ? "ماحول دوست ائیر ٹائٹ پیکجنگ"
                      : "Eco-friendly airtight packaging"}
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
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-4">
                {isUrdu ? "آئندہ مصنوعات کی جھلک" : "Future Products Teaser"}
              </h3>
              <p className="text-stone-700 leading-relaxed font-light">
                {isUrdu
                  ? "پرچم بردار رال کے ساتھ ہم آہنگ پریمیم لائن اَپ تیار کیا جا رہا ہے۔"
                  : "A premium lineup is in development to complement the flagship resin."}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {futureProducts.map((product) => (
                <div
                  key={product.title}
                  className={`rounded-2xl border border-stone-200/60 bg-white p-6 shadow-soft ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`text-xs text-primary-700 font-semibold ${
                      isUrdu ? "tracking-normal" : "uppercase tracking-[0.24em]"
                    }`}
                  >
                    {isUrdu ? "جلد آرہا ہے" : "Coming Soon"}
                  </div>
                  <h4 className="font-display text-xl font-bold text-charcoal-900 mt-4">
                    {isUrdu ? product.urduTitle : product.title}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed mt-3">
                    {isUrdu ? product.urduDescription : product.description}
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
            <span>{isUrdu ? `${selectedSize.label} جار` : `${selectedSize.label} Jar`}</span>
            <span className="font-semibold text-charcoal-900">
              {primaryPrice}
            </span>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium"
          >
            <MessageCircle className="w-4 h-4" />
            {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
          </a>
          <a
            href={emailLink}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft"
          >
            <Mail className="w-4 h-4" />
            {isUrdu ? "ای میل کے ذریعے آرڈر کریں" : "Order via Email"}
          </a>
        </div>
      </div>
      <CTA />
    </>
  );
}
