"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  TestTube,
  Leaf,
  Truck,
  Sparkles,
} from "lucide-react";
import CTA from "@/components/sections/CTA";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductSizeSelector } from "@/components/product/ProductSizeSelector";
import { ProductQuantitySelector } from "@/components/product/ProductQuantitySelector";
import { OrderForm } from "@/components/order/OrderForm";
import { OrderActions } from "@/components/order/OrderActions";
import { OrderPopup } from "@/components/order/OrderPopup";
import { useCartStorage } from "@/hooks/useCartStorage";
import { useOrderCheckout } from "@/hooks/useOrderCheckout";
import { useOrderFormState } from "@/hooks/useOrderFormState";
import { useOrderPopup } from "@/hooks/useOrderPopup";
import { useUsdRate } from "@/hooks/useUsdRate";
import { getCartTotalPkr, getCartTotalUsd, getEffectiveCartItems } from "@/lib/order/orderCalculations";
import { buildWhatsAppLink } from "@/lib/order/formatOrderMessage";
import { getCheckoutValidation } from "@/lib/order/orderValidation";
import { createPkrFormatter, createUsdFormatter } from "@/lib/utils/currencyFormat";
import { formatFullPhone } from "@/lib/utils/phoneFormat";

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
  const createOrderMeta = () => ({
    id: `EOS-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: Date.now(),
  });
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const usdRate = useUsdRate();
  const [quantity, setQuantity] = useState(1);
  const noteDropdownRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const countryButtonRef = useRef<HTMLButtonElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const quantityInputRef = useRef<HTMLInputElement | null>(null);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [orderMeta, setOrderMeta] = useState<{
    id: string;
    createdAt: number;
  } | null>(() => createOrderMeta());
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  const {
    customerName,
    setCustomerName,
    countryCode,
    setCountryCode,
    customerPhone,
    setCustomerPhone,
    countryDropdownOpen,
    setCountryDropdownOpen,
    countrySearch,
    setCountrySearch,
    customerCity,
    setCustomerCity,
    customerEmail,
    setCustomerEmail,
    customerNote,
    setCustomerNote,
    selectedNotes,
    setSelectedNotes,
    noteDropdownOpen,
    setNoteDropdownOpen,
    noteSuggestions,
    syncSelectedNotes,
    toggleNote,
  } = useOrderFormState({ isUrdu, noteDropdownRef });

  const priceLocale = isUrdu ? "ur-PK" : "en-PK";
  const formatPkr = useMemo(() => createPkrFormatter(priceLocale), [priceLocale]);
  const formatUsd = useMemo(() => createUsdFormatter(usdRate), [usdRate]);
  const canShowUsd = Boolean(formatUsd);
  const unitPricePkr = selectedSize.price;
  const totalPricePkr = unitPricePkr * quantity;
  const unitPriceUsd = formatUsd ? formatUsd(unitPricePkr) : null;
  const totalPriceUsd = formatUsd ? formatUsd(totalPricePkr) : null;
  const primaryPrice =
    currency === "USD" && totalPriceUsd ? totalPriceUsd : formatPkr(totalPricePkr);
  const secondaryPrice =
    currency === "USD" ? formatPkr(totalPricePkr) : totalPriceUsd;
  const {
    cartItems,
    addModalOpen,
    setAddModalOpen,
    lastAdded,
    setLastAdded,
    handleAddToCart,
    removeFromCart,
    resetCartStorage,
  } = useCartStorage({
    selectedSizeLabel: selectedSize.label,
    quantity,
    unitPricePkr,
  });
  const effectiveCartItems = useMemo(
    () =>
      getEffectiveCartItems(cartItems, {
        sizeLabel: selectedSize.label,
        quantity,
        unitPricePkr,
      }),
    [cartItems, quantity, selectedSize.label, unitPricePkr]
  );
  const cartTotalPkr = useMemo(
    () => getCartTotalPkr(effectiveCartItems),
    [effectiveCartItems]
  );
  const cartTotalUsd = useMemo(
    () => getCartTotalUsd(cartTotalPkr, formatUsd),
    [cartTotalPkr, formatUsd]
  );
  const validation = useMemo(
    () =>
      getCheckoutValidation({
        customerName,
        countryCode,
        customerPhone,
        customerCity,
        customerEmail,
        quantity,
      }),
    [
      customerName,
      countryCode,
      customerPhone,
      customerCity,
      customerEmail,
      quantity,
    ]
  );
  const formattedPhone =
    validation.countryMissing || validation.phoneMissing
      ? ""
      : formatFullPhone(countryCode, validation.normalizedPhone);
  const selectedCountry = validation.selectedCountry;
  const isCheckoutValid = validation.isCheckoutValid;
  const scrollToField = (element: HTMLElement | null) => {
    if (!element) return;
    if ("focus" in element) {
      (element as HTMLElement).focus({ preventScroll: true });
    }
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const focusFirstInvalidField = () => {
    if (validation.nameMissing) {
      scrollToField(nameInputRef.current);
      return;
    }
    if (validation.countryMissing) {
      scrollToField(countryButtonRef.current);
      return;
    }
    if (validation.phoneMissing || validation.phoneInvalid) {
      scrollToField(phoneInputRef.current);
      return;
    }
    if (validation.cityMissing) {
      scrollToField(cityInputRef.current);
      return;
    }
    if (validation.emailMissing || validation.emailInvalid) {
      scrollToField(emailInputRef.current);
      return;
    }
    if (validation.quantityInvalid) {
      scrollToField(quantityInputRef.current);
    }
  };

  const resetOrderStateAfterPopup = () => {
    setCustomerName("");
    setCountryCode("");
    setCustomerPhone("");
    setCountryDropdownOpen(false);
    setCountrySearch("");
    setCustomerCity("");
    setCustomerEmail("");
    setCustomerNote("");
    setSelectedNotes([]);
    setNoteDropdownOpen(false);
    setQuantity(1);
    setSelectedSize(sizes[1]);
    setCheckoutAttempted(false);
    setLastAdded(null);
    resetCartStorage();
    setOrderMeta(createOrderMeta());
  };
  const {
    orderPopupOpen,
    orderPopupData,
    copySuccess,
    closeOrderPopup,
    triggerOrderPopup,
    handleCopyOrderDetails,
  } = useOrderPopup({
    orderMeta,
    isUrdu,
    customerName,
    formattedPhone,
    customerEmail,
    customerCity,
    customerNote,
    effectiveCartItems,
    formatPkr,
    cartTotalPkr,
    cartTotalUsd,
    resetOrderStateAfterPopup,
  });

  const {
    phoneExample,
    filteredCountries,
    emailSubmitting,
    emailError,
    handleEmailOrder,
  } = useOrderCheckout({
    isUrdu,
    orderMeta,
    customerName,
    countryCode,
    customerPhone,
    customerCity,
    customerEmail,
    customerNote,
    quantity,
    countrySearch,
    formattedPhone,
    effectiveCartItems,
    cartTotalPkr,
    cartTotalUsd,
    triggerOrderPopup,
    focusFirstInvalidField,
    setCheckoutAttempted,
  });

  const whatsappLink = useMemo(() => {
    if (!isCheckoutValid) return "";
    return buildWhatsAppLink({
      isUrdu,
      orderMeta,
      customerName,
      formattedPhone,
      customerEmail,
      customerCity,
      customerNote,
      effectiveCartItems,
      formatPkr,
      cartTotalPkr,
      cartTotalUsd,
    });
  }, [
    isUrdu,
    orderMeta,
    customerName,
    formattedPhone,
    customerEmail,
    customerCity,
    customerNote,
    effectiveCartItems,
    formatPkr,
    cartTotalPkr,
    cartTotalUsd,
    isCheckoutValid,
  ]);

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
            <div className="space-y-8 lg:sticky top-[100px] self-start">
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

              <ProductGallery
                variant="products"
                images={galleryImages}
                activeImage={activeImage}
                onSelect={setActiveImage}
              />

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
                <ProductPrice
                  variant="products"
                  isUrdu={isUrdu}
                  currency={currency}
                  setCurrency={setCurrency}
                  canShowUsd={canShowUsd}
                  primaryPrice={primaryPrice}
                  secondaryPrice={secondaryPrice}
                  selectedSizeLabel={selectedSize.label}
                  quantity={quantity}
                  unitPriceUsd={unitPriceUsd}
                  unitPricePkr={unitPricePkr}
                  formatPkr={formatPkr}
                />

                <ProductSizeSelector
                  variant="products"
                  isUrdu={isUrdu}
                  sizes={sizes}
                  selectedSizeLabel={selectedSize.label}
                  onSelect={setSelectedSize}
                  formatPkr={formatPkr}
                  formatUsd={formatUsd}
                  currency={currency}
                  canShowUsd={canShowUsd}
                />

                <ProductQuantitySelector
                  variant="products"
                  isUrdu={isUrdu}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  quantityInputRef={quantityInputRef}
                  checkoutAttempted={checkoutAttempted}
                  quantityInvalid={validation.quantityInvalid}
                />

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

                <OrderForm
                  variant="products"
                  isUrdu={isUrdu}
                  checkoutAttempted={checkoutAttempted}
                  nameMissing={validation.nameMissing}
                  countryMissing={validation.countryMissing}
                  phoneMissing={validation.phoneMissing}
                  phoneInvalid={validation.phoneInvalid}
                  emailMissing={validation.emailMissing}
                  emailInvalid={validation.emailInvalid}
                  cityMissing={validation.cityMissing}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  customerPhone={customerPhone}
                  setCustomerPhone={setCustomerPhone}
                  customerEmail={customerEmail}
                  setCustomerEmail={setCustomerEmail}
                  customerCity={customerCity}
                  setCustomerCity={setCustomerCity}
                  customerNote={customerNote}
                  setCustomerNote={setCustomerNote}
                  selectedCountry={selectedCountry}
                  setCountrySearch={setCountrySearch}
                  setCountryDropdownOpen={setCountryDropdownOpen}
                  phoneExample={phoneExample}
                  selectedNotes={selectedNotes}
                  noteSuggestions={noteSuggestions}
                  noteDropdownOpen={noteDropdownOpen}
                  setNoteDropdownOpen={setNoteDropdownOpen}
                  toggleNote={toggleNote}
                  syncSelectedNotes={syncSelectedNotes}
                  selectedSize={selectedSize}
                  quantity={quantity}
                  handleAddToCart={handleAddToCart}
                  effectiveCartItems={effectiveCartItems}
                  removeFromCart={removeFromCart}
                  cartTotalPkr={cartTotalPkr}
                  cartTotalUsd={cartTotalUsd}
                  formatPkr={formatPkr}
                  nameInputRef={nameInputRef}
                  phoneInputRef={phoneInputRef}
                  emailInputRef={emailInputRef}
                  cityInputRef={cityInputRef}
                  countryButtonRef={countryButtonRef}
                  noteDropdownRef={noteDropdownRef}
                />

                <OrderActions
                  isUrdu={isUrdu}
                  whatsappLink={whatsappLink}
                  onWhatsAppClick={(event) => {
                    if (!isCheckoutValid) {
                      event.preventDefault();
                      setCheckoutAttempted(true);
                      focusFirstInvalidField();
                      return;
                    }
                    event.preventDefault();
                    triggerOrderPopup("whatsapp", whatsappLink);
                  }}
                  onEmailClick={handleEmailOrder}
                  emailSubmitting={emailSubmitting}
                  emailError={emailError}
                  wrapperClassName="mt-8 grid gap-3"
                  whatsappClassName="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-premium lux-button"
                  emailClassName="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button hover:border-primary-300 disabled:cursor-not-allowed disabled:opacity-60"
                  errorClassName={`mt-3 text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}
                />
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
          <OrderActions
            isUrdu={isUrdu}
            whatsappLink={whatsappLink}
            onWhatsAppClick={(event) => {
              if (!isCheckoutValid) {
                event.preventDefault();
                setCheckoutAttempted(true);
                focusFirstInvalidField();
                return;
              }
              event.preventDefault();
              triggerOrderPopup("whatsapp", whatsappLink);
            }}
            onEmailClick={handleEmailOrder}
            emailSubmitting={emailSubmitting}
            emailError={emailError}
            wrapperClassName="grid gap-2"
            whatsappClassName="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium"
            emailClassName="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
            errorClassName={`px-2 text-[11px] text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}
          />
        </div>
      </div>
      <AnimatePresence>
        {countryDropdownOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <button
              type="button"
              onClick={() => setCountryDropdownOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-lg rounded-3xl border border-white/40 bg-white/95 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl ${
                isUrdu ? "font-urdu text-right" : "text-left"
              }`}
            >
              <div className={`flex items-center justify-between ${isUrdu ? "flex-row-reverse" : ""}`}>
                <div className="text-sm font-semibold text-charcoal-900">
                  {isUrdu ? "ملک منتخب کریں" : "Select a country"}
                </div>
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(false)}
                  className="rounded-full border border-stone-200/70 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-stone-500 transition-colors hover:text-stone-700"
                >
                  {isUrdu ? "بند کریں" : "Close"}
                </button>
              </div>
              <input
                type="text"
                value={countrySearch}
                onChange={(event) => setCountrySearch(event.target.value)}
                placeholder={isUrdu ? "تلاش کریں..." : "Search..."}
                className="mt-4 w-full rounded-2xl border border-stone-200/70 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
              />
              <div className="mt-4 max-h-[360px] overflow-y-auto rounded-2xl border border-stone-200/70 bg-white/90 shadow-inner">
                {filteredCountries.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-stone-500">
                    {isUrdu ? "کوئی نتیجہ نہیں" : "No results found"}
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={`${country.code}-${country.label}`}
                      type="button"
                      onClick={() => {
                        setCountryCode(country.code);
                        setCountryDropdownOpen(false);
                        setCountrySearch("");
                      }}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-sm text-stone-700 transition-colors hover:bg-stone-50 ${
                        isUrdu ? "flex-row-reverse text-right" : "text-left"
                      }`}
                    >
                      <span className={`flex items-center gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}>
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm font-semibold text-charcoal-900">
                          {country.label}
                        </span>
                      </span>
                      <span className="text-sm font-semibold text-stone-500">
                        {country.code}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
      <OrderPopup
        isUrdu={isUrdu}
        orderPopupOpen={orderPopupOpen}
        orderPopupData={orderPopupData}
        copySuccess={copySuccess}
        onClose={closeOrderPopup}
        onCopy={handleCopyOrderDetails}
      />
      <CTA />
    </>
  );
}
