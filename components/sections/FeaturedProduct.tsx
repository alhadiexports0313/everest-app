"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

type CartItem = {
  sizeLabel: string;
  quantity: number;
  unitPricePkr: number;
};

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
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [noteDropdownOpen, setNoteDropdownOpen] = useState(false);
  const noteDropdownRef = useRef<HTMLDivElement | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{
    sizeLabel: string;
    quantity: number;
  } | null>(null);
  const [orderMeta, setOrderMeta] = useState<{
    id: string;
    createdAt: number;
  } | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const cachedRate = typeof window !== "undefined" ? localStorage.getItem("pkrUsdRate") : null;
    const cachedDate = typeof window !== "undefined" ? localStorage.getItem("pkrUsdRateDate") : null;
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
        const response = await fetch(
          "https://open.er-api.com/v6/latest/PKR",
          { signal: controller.signal }
        );
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

  useEffect(() => {
    setOrderMeta({
      id: `EOS-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem("everestCartItems");
    if (!stored) {
      setCartItems([]);
      window.sessionStorage.setItem("everestCartOrders", "0");
      window.dispatchEvent(
        new CustomEvent("everest-cart-updated", { detail: { count: 0 } })
      );
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setCartItems(parsed);
        const storedOrderCount = window.sessionStorage.getItem("everestCartOrders");
        const parsedOrderCount = storedOrderCount
          ? Number(storedOrderCount)
          : Number.NaN;
        const nextOrderCount = Number.isNaN(parsedOrderCount)
          ? parsed.length
          : parsedOrderCount;
        window.sessionStorage.setItem(
          "everestCartOrders",
          String(Math.max(0, nextOrderCount))
        );
        window.dispatchEvent(
          new CustomEvent("everest-cart-updated", {
            detail: { count: Math.max(0, nextOrderCount) },
          })
        );
      }
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    if (!noteDropdownOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!noteDropdownRef.current) return;
      if (!noteDropdownRef.current.contains(event.target as Node)) {
        setNoteDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [noteDropdownOpen]);

  const priceLocale = isUrdu ? "ur-PK" : "en-PK";
  const formatPkr = useMemo(
    () =>
      (value: number) =>
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
  const pkrFormatted = formatPkr(totalPricePkr);
  const usdFormatted = formatUsd ? formatUsd(totalPricePkr) : null;
  const unitPriceUsd = formatUsd ? formatUsd(unitPricePkr) : null;
  const unitPricePkrFormatted = formatPkr(unitPricePkr);
  const totalPriceUsd = formatUsd ? formatUsd(totalPricePkr) : null;
  const primaryPrice =
    currency === "USD" && canShowUsd ? usdFormatted : pkrFormatted;
  const secondaryPrice = currency === "USD" ? pkrFormatted : usdFormatted;

  const persistCart = (items: CartItem[]) => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem("everestCartItems", JSON.stringify(items));
  };
  const getStoredOrderCount = () => {
    if (typeof window === "undefined") return 0;
    const storedCount = window.sessionStorage.getItem("everestCartOrders");
    if (!storedCount) return 0;
    const parsedCount = Number(storedCount);
    return Number.isNaN(parsedCount) ? 0 : parsedCount;
  };
  const setStoredOrderCount = (nextCount: number) => {
    if (typeof window === "undefined") return;
    const safeCount = Math.max(0, nextCount);
    window.sessionStorage.setItem("everestCartOrders", String(safeCount));
    window.dispatchEvent(
      new CustomEvent("everest-cart-updated", { detail: { count: safeCount } })
    );
  };
  useEffect(() => {
    persistCart(cartItems);
  }, [cartItems]);
  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.sizeLabel === selectedSize.label);
      return existing
        ? prev.map((item) =>
            item.sizeLabel === selectedSize.label
              ? {
                  ...item,
                  quantity: Math.min(500, item.quantity + quantity),
                  unitPricePkr,
                }
              : item
          )
        : [...prev, { sizeLabel: selectedSize.label, quantity, unitPricePkr }];
    });
  };
  const removeFromCart = (sizeLabel: string) => {
    setCartItems((prev) => prev.filter((item) => item.sizeLabel !== sizeLabel));
    setStoredOrderCount(getStoredOrderCount() - 1);
  };
  const handleAddToCart = () => {
    addToCart();
    setStoredOrderCount(getStoredOrderCount() + 1);
    setLastAdded({ sizeLabel: selectedSize.label, quantity });
    setAddModalOpen(true);
  };
  const effectiveCartItems =
    cartItems.length > 0
      ? cartItems
      : [{ sizeLabel: selectedSize.label, quantity, unitPricePkr }];
  const cartTotalPkr = effectiveCartItems.reduce(
    (sum, item) => sum + item.unitPricePkr * item.quantity,
    0
  );
  const cartTotalUsd = formatUsd ? formatUsd(cartTotalPkr) : null;
  const nameMissing = customerName.trim().length === 0;
  const phoneMissing = customerPhone.trim().length === 0;
  const cityMissing = customerCity.trim().length === 0;
  const isCheckoutValid = !nameMissing && !phoneMissing && !cityMissing;
  const noteLines = (value: string) =>
    value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  const noteSuggestions = isUrdu
    ? [
        "براہ کرم پروڈکٹ کی دستیابی کی تصدیق کریں۔",
        "مہربانی کر کے ادائیگی کے طریقہ کار کی تفصیل شیئر کریں۔",
        "براہ کرم ڈیلیوری وقت بتائیں۔",
        "اگر ممکن ہو تو جلد ڈیلیوری فراہم کریں۔",
        "براہ کرم اصل پروڈکٹ کی تصدیق کریں۔",
        "مہربانی کر کے شپنگ چارجز بتائیں۔",
        "براہ کرم اسٹاک دستیابی کی تصدیق کریں۔",
        "میں محفوظ پیکجنگ چاہتا ہوں۔",
        "براہ کرم بھیجنے سے پہلے رابطہ کریں۔",
        "مناسب سائز کے بارے میں رہنمائی کریں۔",
      ]
    : [
        "Please confirm product availability.",
        "Kindly share payment method details.",
        "Please provide delivery time estimate.",
        "I prefer fast delivery if possible.",
        "Please confirm original product authenticity.",
        "Kindly share shipping charges.",
        "Please confirm stock availability.",
        "I would like secure packaging.",
        "Please contact me before dispatch.",
        "Kindly guide me about best size option.",
      ];
  const syncSelectedNotes = (value: string) => {
    const lines = noteLines(value);
    const nextSelected = noteSuggestions.filter((note) => lines.includes(note));
    setSelectedNotes(nextSelected);
  };
  const toggleNote = (note: string) => {
    const lines = noteLines(customerNote);
    if (lines.includes(note)) {
      const nextLines = lines.filter((line) => line !== note);
      const nextValue = nextLines.join("\n");
      setCustomerNote(nextValue);
      setSelectedNotes((prev) => prev.filter((item) => item !== note));
      return;
    }
    const nextLines = [...lines, note];
    const nextValue = nextLines.join("\n");
    setCustomerNote(nextValue);
    setSelectedNotes((prev) => [...prev, note]);
  };

  const emailLink = useMemo(() => {
    if (!orderMeta) return "";
    const now = new Date(orderMeta.createdAt);
    const dateLocale = isUrdu ? "ur-PK" : "en-GB";
    const orderDate = now.toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const orderTime = now.toLocaleTimeString(dateLocale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const nameValue =
      customerName.trim() || (isUrdu ? "نام درج نہیں" : "Not provided");
    const phoneValue =
      customerPhone.trim() || (isUrdu ? "فون درج نہیں" : "Not provided");
    const cityValue =
      customerCity.trim() || (isUrdu ? "شہر درج نہیں" : "Not provided");
    const noteValue = customerNote.trim();
    const productName = isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar";
    const productLines = effectiveCartItems.flatMap((item, index) => {
      const subtotal = formatPkr(item.unitPricePkr * item.quantity);
      const unitPrice = formatPkr(item.unitPricePkr);
      return [
        `${index + 1}️⃣ ${productName} — ${item.sizeLabel}`,
        isUrdu ? `مقدار: ${item.quantity}` : `Quantity: ${item.quantity}`,
        isUrdu ? `فی یونٹ قیمت: ${unitPrice}` : `Price Per Unit: ${unitPrice}`,
        isUrdu ? `سب ٹوٹل: ${subtotal}` : `Subtotal: ${subtotal}`,
        "",
      ];
    });
    const usdValue = cartTotalUsd || (isUrdu ? "دستیاب نہیں" : "Not available");
    const lines = isUrdu
      ? [
          "ایورسٹ آرگینک سلاجیت",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          `آرڈر آئی ڈی: ${orderMeta.id}`,
          `تاریخ: ${orderDate}`,
          `وقت: ${orderTime}`,
          `کسٹمر: ${nameValue}`,
          `فون نمبر: ${phoneValue}`,
          `شہر: ${cityValue}`,
          noteValue ? "آرڈر نوٹ:" : null,
          noteValue || null,
          "",
          "━━━━━━━━━━━━━━━━━━━━",
          "پروڈکٹ تفصیلات",
          "",
          ...productLines,
          "━━━━━━━━━━━━━━━━━━━━",
          "کل آرڈر",
          `کل قیمت: ${formatPkr(cartTotalPkr)}`,
          `USD مساوی: ${usdValue}`,
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "ویب سائٹ",
          "everestorganicshilajit.com",
          "",
          "شکریہ۔ میں یہ آرڈر دینا چاہتا/چاہتی ہوں۔",
        ]
      : [
          "EVEREST ORGANIC SHILAJIT",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          `Order ID: ${orderMeta.id}`,
          `Date: ${orderDate}`,
          `Time: ${orderTime}`,
          `Customer: ${nameValue}`,
          `Phone: ${phoneValue}`,
          `City: ${cityValue}`,
          noteValue ? "Order Note:" : null,
          noteValue || null,
          "",
          "━━━━━━━━━━━━━━━━━━━━",
          "PRODUCT DETAILS",
          "",
          ...productLines,
          "━━━━━━━━━━━━━━━━━━━━",
          "TOTAL ORDER",
          `Total Price: ${formatPkr(cartTotalPkr)}`,
          `USD Equivalent: ${usdValue}`,
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "Website",
          "everestorganicshilajit.com",
          "",
          "Thank you. I would like to place this order.",
        ];
    const subject = "New Order - Everest Organic Shilajit";
    const body = lines.filter(Boolean).join("\n");
    return `mailto:everestorganicshilajet@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [
    isUrdu,
    orderMeta,
    customerName,
    customerPhone,
    customerCity,
    customerNote,
    effectiveCartItems,
    formatPkr,
    cartTotalPkr,
    cartTotalUsd,
  ]);

  const whatsappLink = useMemo(() => {
    if (!isCheckoutValid || !orderMeta) return "";
    const now = new Date(orderMeta.createdAt);
    const dateLocale = isUrdu ? "ur-PK" : "en-GB";
    const orderDate = now.toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const orderTime = now.toLocaleTimeString(dateLocale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const nameValue =
      customerName.trim() || (isUrdu ? "نام درج نہیں" : "Not provided");
    const phoneValue =
      customerPhone.trim() || (isUrdu ? "فون درج نہیں" : "Not provided");
    const cityValue =
      customerCity.trim() || (isUrdu ? "شہر درج نہیں" : "Not provided");
    const noteValue = customerNote.trim();
    const productName = isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar";
    const productLines = effectiveCartItems.flatMap((item, index) => {
      const subtotal = formatPkr(item.unitPricePkr * item.quantity);
      const unitPrice = formatPkr(item.unitPricePkr);
      return [
        `${index + 1}️⃣ ${productName} — ${item.sizeLabel}`,
        isUrdu ? `مقدار: ${item.quantity}` : `Qty: ${item.quantity}`,
        isUrdu ? `فی یونٹ قیمت: ${unitPrice}` : `Unit Price: ${unitPrice}`,
        isUrdu ? `سب ٹوٹل: ${subtotal}` : `Subtotal: ${subtotal}`,
        "",
      ];
    });
    const lines = isUrdu
      ? [
          "EVEREST ORGANIC SHILAJIT",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          `آرڈر آئی ڈی: ${orderMeta.id}`,
          `تاریخ: ${orderDate}`,
          `وقت: ${orderTime}`,
          `کسٹمر: ${nameValue}`,
          `فون: ${phoneValue}`,
          `شہر: ${cityValue}`,
          noteValue ? "آرڈر نوٹ:" : null,
          noteValue || null,
          "",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "پروڈکٹس",
          ...productLines,
          "━━━━━━━━━━━━━━━━━━━━",
          "کل رقم",
          `${formatPkr(cartTotalPkr)}`,
          cartTotalUsd ? `USD: ${cartTotalUsd}` : null,
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "ویب سائٹ",
          "everestorganicshilajit.com",
          "",
          "السلام علیکم، میں یہ آرڈر دینا چاہتا/چاہتی ہوں۔",
        ]
      : [
          "EVEREST ORGANIC SHILAJIT",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          `Order ID: ${orderMeta.id}`,
          `Date: ${orderDate}`,
          `Time: ${orderTime}`,
          `Customer: ${nameValue}`,
          `Phone: ${phoneValue}`,
          `City: ${cityValue}`,
          noteValue ? "Order Note:" : null,
          noteValue || null,
          "",
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "Products",
          ...productLines,
          "━━━━━━━━━━━━━━━━━━━━",
          "TOTAL",
          `${formatPkr(cartTotalPkr)}`,
          cartTotalUsd ? `USD ${cartTotalUsd}` : null,
          "━━━━━━━━━━━━━━━━━━━━",
          "",
          "Website",
          "everestorganicshilajit.com",
          "",
          "Hello, I would like to place this order.",
        ];
    const message = lines.filter(Boolean).join("\n");
    return `https://wa.me/923454490326?text=${encodeURIComponent(message)}`;
  }, [
    isUrdu,
    orderMeta,
    customerName,
    customerPhone,
    customerCity,
    customerNote,
    effectiveCartItems,
    formatPkr,
    cartTotalPkr,
    cartTotalUsd,
    isCheckoutValid,
  ]);

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
                <div
                  className={`inline-flex items-center rounded-full border border-stone-200 bg-white/80 p-1 text-[11px] font-semibold text-stone-500 ${
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
                <div className="text-3xl font-bold text-charcoal-900 mt-2">
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
                  {isUrdu ? "فی جار" : "Per jar"}{" "}
                  {currency === "USD" && unitPriceUsd
                    ? unitPriceUsd
                    : formatPkr(unitPricePkr)}
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
              <div
                className={`text-sm font-semibold text-charcoal-900 mb-3 ${
                  isUrdu ? "font-urdu" : ""
                }`}
              >
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

            <div
              className={`mt-7 rounded-2xl border border-stone-200/60 bg-white p-5 shadow-soft ${
                isUrdu ? "text-right font-urdu" : "text-left"
              }`}
            >
              <div className="text-sm font-semibold text-charcoal-900">
                {isUrdu ? "چیک آؤٹ تفصیلات" : "Checkout Details"}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder={isUrdu ? "اپنا نام درج کریں" : "Enter your name"}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
                  />
                  {checkoutAttempted && nameMissing ? (
                    <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu ? "براہ کرم اپنا نام درج کریں" : "Please enter your name"}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(event) => setCustomerPhone(event.target.value)}
                    placeholder={isUrdu ? "فون نمبر" : "Phone number"}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
                  />
                  {checkoutAttempted && phoneMissing ? (
                    <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu ? "براہ کرم فون نمبر درج کریں" : "Please enter your phone number"}
                    </div>
                  ) : null}
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(event) => setCustomerCity(event.target.value)}
                    placeholder={isUrdu ? "شہر" : "City"}
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
                  />
                  {checkoutAttempted && cityMissing ? (
                    <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu ? "براہ کرم اپنا شہر درج کریں" : "Please enter your city"}
                    </div>
                  ) : null}
                </div>
                <textarea
                  rows={2}
                  value={customerNote}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setCustomerNote(nextValue);
                    syncSelectedNotes(nextValue);
                  }}
                  placeholder={isUrdu ? "آرڈر نوٹ" : "Order note (optional)"}
                  className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none sm:col-span-2"
                />
                <div ref={noteDropdownRef} className="relative sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => setNoteDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-600 shadow-soft focus:border-primary-300 focus:outline-none"
                  >
                    <span>
                      {isUrdu ? "فوری نوٹس منتخب کریں" : "Select quick notes"}
                    </span>
                    <span className="text-xs text-stone-400">
                      {selectedNotes.length}
                    </span>
                  </button>
                  {noteDropdownOpen ? (
                    <div className="absolute z-20 mt-2 w-full rounded-2xl border border-stone-200 bg-white p-2 shadow-soft">
                      {noteSuggestions.map((note) => {
                        const isSelected = selectedNotes.includes(note);
                        return (
                          <button
                            key={note}
                            type="button"
                            onClick={() => {
                              toggleNote(note);
                              setNoteDropdownOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                          >
                            <span
                              className={`h-3.5 w-3.5 rounded border ${
                                isSelected
                                  ? "border-primary-700 bg-primary-700"
                                  : "border-stone-300 bg-white"
                              }`}
                            />
                            <span
                              className={
                                isSelected ? "text-primary-700" : "text-stone-700"
                              }
                            >
                              {note}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <span>
                  {isUrdu
                    ? `${selectedSize.label} جار × ${quantity}`
                    : `${selectedSize.label} jar × ${quantity}`}
                </span>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-soft transition-colors hover:border-primary-300"
                >
                  {isUrdu ? "آرڈر میں شامل کریں" : "Add to Order"}
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-stone-700">
                {effectiveCartItems.map((item) => (
                  <div
                    key={item.sizeLabel}
                    className="rounded-2xl border border-stone-200/70 bg-stone-50 px-4 py-3"
                  >
                    <div className={`flex items-center justify-between ${isUrdu ? "flex-row-reverse" : ""}`}>
                      <div className="font-semibold text-charcoal-900">
                        {isUrdu
                          ? `پریمیم ریزن جار — ${item.sizeLabel}`
                          : `Premium Resin Jar — ${item.sizeLabel}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.sizeLabel)}
                        className="text-xs font-semibold text-stone-500 hover:text-stone-700"
                      >
                        {isUrdu ? "ہٹائیں" : "Remove"}
                      </button>
                    </div>
                    <div className={`mt-2 flex flex-wrap gap-3 text-xs text-stone-600 ${isUrdu ? "flex-row-reverse" : ""}`}>
                      <span>{isUrdu ? `مقدار: ${item.quantity}` : `Qty: ${item.quantity}`}</span>
                      <span>
                        {isUrdu ? "فی یونٹ: " : "Unit: "}
                        {formatPkr(item.unitPricePkr)}
                      </span>
                      <span>
                        {isUrdu ? "سب ٹوٹل: " : "Subtotal: "}
                        {formatPkr(item.unitPricePkr * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-4 flex items-center justify-between text-sm font-semibold text-charcoal-900 ${isUrdu ? "flex-row-reverse" : ""}`}>
                <span>{isUrdu ? "کل رقم" : "Total"}</span>
                <span>{formatPkr(cartTotalPkr)}</span>
              </div>
              {cartTotalUsd ? (
                <div className={`mt-1 flex items-center justify-between text-xs text-stone-500 ${isUrdu ? "flex-row-reverse" : ""}`}>
                  <span>{isUrdu ? "USD" : "USD"}</span>
                  <span>{cartTotalUsd}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-8 grid gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (!isCheckoutValid) {
                    event.preventDefault();
                    setCheckoutAttempted(true);
                    return;
                  }
                  event.preventDefault();
                  setWhatsappModalOpen(true);
                  window.setTimeout(() => {
                    window.open(whatsappLink, "_blank", "noopener,noreferrer");
                    setWhatsappModalOpen(false);
                  }, 700);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-premium lux-button"
              >
                <MessageCircle className="w-4 h-4" />
                {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
              </a>
              <a
                href={emailLink}
                onClick={(event) => {
                  if (!emailLink) {
                    event.preventDefault();
                    return;
                  }
                  event.preventDefault();
                  setEmailModalOpen(true);
                  window.setTimeout(() => {
                    window.location.href = emailLink;
                    setEmailModalOpen(false);
                  }, 700);
                }}
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
            onClick={(event) => {
              if (!isCheckoutValid) {
                event.preventDefault();
                setCheckoutAttempted(true);
                return;
              }
              event.preventDefault();
              setWhatsappModalOpen(true);
              window.setTimeout(() => {
                window.open(whatsappLink, "_blank", "noopener,noreferrer");
                setWhatsappModalOpen(false);
              }, 700);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium lux-button"
          >
            <MessageCircle className="w-4 h-4" />
            {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
          </a>
          <a
            href={emailLink}
            onClick={(event) => {
              if (!emailLink) {
                event.preventDefault();
                return;
              }
              event.preventDefault();
              setEmailModalOpen(true);
              window.setTimeout(() => {
                window.location.href = emailLink;
                setEmailModalOpen(false);
              }, 700);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button"
          >
            <Mail className="w-4 h-4" />
            {isUrdu ? "ای میل کے ذریعے آرڈر کریں" : "Order via Email"}
          </a>
        </div>
      </div>
      <AnimatePresence>
        {addModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl ${
                isUrdu ? "font-urdu" : ""
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-6 w-6" />
              </div>
              <div className="mt-4 text-lg font-semibold text-charcoal-900">
                {isUrdu ? "آرڈر کامیابی سے شامل کر دیا گیا" : "Order Added Successfully"}
              </div>
              <div className="mt-2 text-sm text-stone-600">
                {isUrdu
                  ? "آپ کی پروڈکٹ کارٹ میں شامل ہو گئی ہے۔"
                  : "Your product has been added to the cart."}
              </div>
              <div className="mt-4 rounded-2xl border border-stone-200/70 bg-white/70 px-4 py-3 text-sm text-stone-700">
                <div className="font-semibold text-charcoal-900">
                  {isUrdu ? "پروڈکٹ" : "Product"}:{" "}
                  {isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar"}
                </div>
                <div className="mt-1">
                  {isUrdu ? "سائز" : "Size"}: {lastAdded?.sizeLabel ?? selectedSize.label}
                </div>
                <div className="mt-1">
                  {isUrdu ? "مقدار" : "Quantity"}: {lastAdded?.quantity ?? quantity}
                </div>
              </div>
              <div className="mt-4 text-xs text-stone-500">
                {isUrdu
                  ? "آپ مزید خریداری جاری رکھ سکتے ہیں یا آرڈر مکمل کر سکتے ہیں۔"
                  : "You can continue shopping or proceed to order."}
              </div>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-primary-700 px-5 py-2 text-xs font-semibold text-white shadow-premium"
              >
                {isUrdu ? "ٹھیک ہے" : "Got it"}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {whatsappModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl ${
                isUrdu ? "font-urdu" : ""
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-6 w-6" />
              </div>
              <div className="mt-4 text-lg font-semibold text-charcoal-900">
                {isUrdu ? "آرڈر کی درخواست بھیج دی گئی" : "Order Request Sent"}
              </div>
              <div className="mt-2 text-sm text-stone-600">
                {isUrdu
                  ? "آپ کی آرڈر کی درخواست واٹس ایپ کے لیے تیار ہے۔"
                  : "Your order request has been prepared for WhatsApp."}
              </div>
              <div className="mt-2 text-xs text-stone-500">
                {isUrdu
                  ? "آپ کو آرڈر کی تصدیق کے لیے واٹس ایپ پر ری ڈائریکٹ کیا جائے گا۔"
                  : "You will be redirected to WhatsApp to confirm your order."}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {emailModalOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-6 text-center shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl ${
                isUrdu ? "font-urdu" : ""
              }`}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                <Check className="h-6 w-6" />
              </div>
              <div className="mt-4 text-lg font-semibold text-charcoal-900">
                {isUrdu ? "ای میل آرڈر تیار ہے" : "Email Order Prepared"}
              </div>
              <div className="mt-2 text-sm text-stone-600">
                {isUrdu
                  ? "آپ کی آرڈر تفصیلات ای میل کے لیے تیار ہیں۔"
                  : "Your order details are ready to send via email."}
              </div>
              <div className="mt-2 text-xs text-stone-500">
                {isUrdu
                  ? "آپ کا میل کلائنٹ آرڈر مکمل کرنے کے لیے کھل جائے گا۔"
                  : "Your mail client will open to complete the order."}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
