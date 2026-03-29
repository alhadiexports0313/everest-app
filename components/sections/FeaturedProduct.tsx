"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Check, Star } from "lucide-react";
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
  { label: "10g", price: 1500, originalPrice: 2000 },
  { label: "20g", price: 3000, originalPrice: 4000 },
  { label: "50g", price: 6000, originalPrice: 8000 },
] as const;

const resinImages = [
  "/images/products/product_21.jpg",
  "/images/products/product_22.jpg",
  "/images/products/product_25.jpg",
  "/images/banners/resin-texture-macro-1.jpg",
];

const PRODUCT_SHORT_DESC =
  "Lab-tested Himalayan resin from Gilgit-Baltistan—pure fulvic-rich Shilajit in airtight jars, trusted for potency and authenticity.";


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
  const createOrderMeta = () => ({
    id: `EOS-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: Date.now(),
  });
  const [selectedSize, setSelectedSize] = useState<{
    label: string;
    price: number;
    originalPrice: number;
  }>({ ...sizes[1] });
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
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
  const pkrFormatted = formatPkr(totalPricePkr);
  const usdFormatted = formatUsd ? formatUsd(totalPricePkr) : null;
  const unitPriceUsd = formatUsd ? formatUsd(unitPricePkr) : null;
  const primaryPrice =
    currency === "USD" && canShowUsd ? usdFormatted : pkrFormatted;
  const secondaryPrice = currency === "USD" ? pkrFormatted : usdFormatted;

  const {
    cartItems,
    addModalOpen,
    setAddModalOpen,
    lastAdded,
    setLastAdded,
    removeFromCart,
    handleAddToCart,
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
    setSelectedSize({ ...sizes[1] });
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
          <div
            className={`mt-5 flex flex-wrap items-center justify-center gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}
          >
            <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 py-1.5 rounded-full text-sm font-bold shadow-md border border-amber-300/50">
              25% OFF
            </div>
            <div className="flex items-center gap-1 text-amber-500" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-semibold text-charcoal-900">5.0</span>
          </div>
          <p className={`text-sm text-stone-600 leading-relaxed font-light mt-4 max-w-2xl mx-auto ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "گلگت بلتستان سے لیب ٹیسٹڈ ہمالیائی رال — ائیر ٹائٹ جار میں خالص، فولوک سے بھرپور سلاجیت۔"
              : PRODUCT_SHORT_DESC}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <ProductGallery
              variant="featured"
              images={resinImages}
              zoomLabel="Texture Zoom"
              primaryAlt="Everest Organic Shilajit resin"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-7 shadow-soft"
          >
            <div className={`flex items-start justify-between gap-4 ${isUrdu ? "flex-row-reverse" : ""}`}>
              <div className={isUrdu ? "text-right" : "text-left"}>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm border border-amber-300/50">
                    25% OFF
                  </div>
                </div>
                <div
                  className={`text-xs text-stone-400 mt-3 ${
                    isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.3em]"
                  }`}
                >
                  {isUrdu ? "رال" : "Resin"}
                </div>
                <div className={`font-display text-2xl font-bold text-charcoal-900 mt-2 ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? "ایورسٹ آرگینک سلاجیت" : "Everest Organic Shilajit"}
                </div>
                <div
                  className={`mt-3 flex items-center gap-2 ${isUrdu ? "flex-row-reverse justify-end" : ""}`}
                >
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-charcoal-900">5.0</span>
                </div>
                <p className={`text-sm text-stone-600 leading-relaxed font-light mt-3 ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu
                    ? "گلگت بلتستان سے لیب ٹیسٹڈ ہمالیائی رال — ائیر ٹائٹ جار میں خالص، فولوک سے بھرپور سلاجیت۔"
                    : PRODUCT_SHORT_DESC}
                </p>
              </div>
              <div className={`shrink-0 ${isUrdu ? "text-left" : "text-right"}`}>
                {/* <div className="text-[11px] font-semibold uppercase tracking-wide text-amber-500"> */}
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[11px] px-6 py-1.5 rounded-full text-sm font-bold uppercase shadow-md border border-amber-300/50">
                  {isUrdu ? "خصوصی قیمت" : "Sale price"}
                </div>
                <div className="text-sm text-red-500 line-through">
                  {formatPkr(selectedSize.originalPrice * quantity)}
                </div>
                <ProductPrice
                  variant="featured"
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
              </div>
            </div>

            <ProductSizeSelector
              variant="featured"
              isUrdu={isUrdu}
              sizes={[...sizes]}
              selectedSizeLabel={selectedSize.label}
              onSelect={(size) => {
                const next = sizes.find((s) => s.label === size.label);
                if (next) setSelectedSize({ ...next });
              }}
              formatPkr={formatPkr}
              formatUsd={formatUsd}
              currency={currency}
              canShowUsd={canShowUsd}
            />

            <ProductQuantitySelector
              variant="featured"
              isUrdu={isUrdu}
              quantity={quantity}
              setQuantity={setQuantity}
              quantityInputRef={quantityInputRef}
              checkoutAttempted={checkoutAttempted}
              quantityInvalid={validation.quantityInvalid}
            />

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

            <OrderForm
              variant="featured"
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
          </motion.div>
        </div>
      </div>
      <div className="lg:hidden fixed bottom-5 left-4 right-4 z-40">
        <div className="mx-auto flex max-w-[520px] flex-col gap-2 rounded-2xl border border-stone-200/60 bg-white/95 p-3 shadow-premium backdrop-blur">
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
    </section>
  );
}
