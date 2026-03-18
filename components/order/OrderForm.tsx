import type { RefObject } from "react";
import { ChevronDown } from "lucide-react";
import type { CartItem } from "@/types";

type CountryOption = {
  code: string;
  label: string;
  flag: string;
  placeholder?: string;
};

type OrderFormProps = {
  variant: "products" | "featured";
  isUrdu: boolean;
  checkoutAttempted: boolean;
  nameMissing: boolean;
  countryMissing: boolean;
  phoneMissing: boolean;
  phoneInvalid: boolean;
  emailMissing: boolean;
  emailInvalid: boolean;
  cityMissing: boolean;
  customerName: string;
  setCustomerName: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  customerEmail: string;
  setCustomerEmail: (value: string) => void;
  customerCity: string;
  setCustomerCity: (value: string) => void;
  customerNote: string;
  setCustomerNote: (value: string) => void;
  selectedCountry: CountryOption | null;
  setCountrySearch: (value: string) => void;
  setCountryDropdownOpen: (value: boolean) => void;
  phoneExample: string;
  selectedNotes: string[];
  noteSuggestions: string[];
  noteDropdownOpen: boolean;
  setNoteDropdownOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  toggleNote: (note: string) => void;
  syncSelectedNotes: (value: string) => void;
  selectedSize: { label: string };
  quantity: number;
  handleAddToCart: () => void;
  effectiveCartItems: CartItem[];
  removeFromCart: (sizeLabel: string) => void;
  cartTotalPkr: number;
  cartTotalUsd: string | null;
  formatPkr: (value: number) => string;
  nameInputRef: RefObject<HTMLInputElement>;
  phoneInputRef: RefObject<HTMLInputElement>;
  emailInputRef: RefObject<HTMLInputElement>;
  cityInputRef: RefObject<HTMLInputElement>;
  countryButtonRef: RefObject<HTMLButtonElement>;
  noteDropdownRef: RefObject<HTMLDivElement>;
};

export const OrderForm = ({
  variant,
  isUrdu,
  checkoutAttempted,
  nameMissing,
  countryMissing,
  phoneMissing,
  phoneInvalid,
  emailMissing,
  emailInvalid,
  cityMissing,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  customerCity,
  setCustomerCity,
  customerNote,
  setCustomerNote,
  selectedCountry,
  setCountrySearch,
  setCountryDropdownOpen,
  phoneExample,
  selectedNotes,
  noteSuggestions,
  noteDropdownOpen,
  setNoteDropdownOpen,
  toggleNote,
  syncSelectedNotes,
  selectedSize,
  quantity,
  handleAddToCart,
  effectiveCartItems,
  removeFromCart,
  cartTotalPkr,
  cartTotalUsd,
  formatPkr,
  nameInputRef,
  phoneInputRef,
  emailInputRef,
  cityInputRef,
  countryButtonRef,
  noteDropdownRef,
}: OrderFormProps) => (
  <div
    className={`mt-7 rounded-2xl border border-stone-200/60 bg-white p-5 shadow-soft ${
      isUrdu && variant === "featured" ? "text-right font-urdu" : isUrdu ? "text-right" : "text-left"
    }`}
  >
    <div className="text-sm font-semibold text-charcoal-900">
      {isUrdu ? "چیک آؤٹ تفصیلات" : "Checkout Details"}
    </div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="space-y-1">
        <input
          ref={nameInputRef}
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
      <div className="space-y-1 sm:col-span-2">
        <div className={`flex flex-wrap items-center gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}>
          <button
            ref={countryButtonRef}
            type="button"
            onClick={() => {
              setCountrySearch("");
              setCountryDropdownOpen(true);
            }}
            className={`min-w-[190px] rounded-2xl border border-stone-200/80 bg-white/80 px-4 py-2.5 shadow-soft backdrop-blur transition-all duration-200 hover:border-primary-300 focus:border-primary-300 focus:outline-none ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            <span className={`flex items-center justify-between gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}>
              <span className={`flex items-center gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}>
                <span className="text-lg">{selectedCountry?.flag ?? "🌍"}</span>
                <span className={`flex flex-col ${isUrdu ? "items-end" : "items-start"}`}>
                  <span className="text-sm font-semibold text-charcoal-900">
                    {selectedCountry
                      ? selectedCountry.label
                      : isUrdu
                      ? "ملک منتخب کریں"
                      : "Select a country"}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {selectedCountry ? selectedCountry.code : isUrdu ? "کوڈ" : "Code"}
                  </span>
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-stone-400" />
            </span>
          </button>
          <input
            ref={phoneInputRef}
            type="tel"
            inputMode="numeric"
            required
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            placeholder={selectedCountry?.placeholder || (isUrdu ? "فون نمبر" : "Phone number")}
            className="min-w-[220px] flex-1 rounded-2xl border border-stone-200/80 bg-white/80 px-4 py-2.5 text-sm text-charcoal-900 shadow-soft backdrop-blur transition-all duration-200 hover:border-primary-300 focus:border-primary-300 focus:outline-none"
          />
        </div>
        {checkoutAttempted && countryMissing ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? "براہ کرم ملک کوڈ منتخب کریں" : "Please select a country code"}
          </div>
        ) : null}
        {checkoutAttempted && phoneMissing ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? "براہ کرم فون نمبر درج کریں" : "Please enter your phone number"}
          </div>
        ) : null}
        {checkoutAttempted && phoneInvalid ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? `درست فارمیٹ استعمال کریں، مثال: ${phoneExample}` : `Use a valid format, e.g., ${phoneExample}`}
          </div>
        ) : null}
      </div>
      <div className="space-y-1">
        <input
          ref={emailInputRef}
          type="email"
          required
          value={customerEmail}
          onChange={(event) => setCustomerEmail(event.target.value)}
          placeholder={isUrdu ? "اپنا ای میل ایڈریس درج کریں" : "Enter your email address"}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
        />
        {checkoutAttempted && emailMissing ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? "براہ کرم اپنا ای میل درج کریں" : "Please enter your email address"}
          </div>
        ) : null}
        {checkoutAttempted && emailInvalid ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? "براہ کرم درست ای میل درج کریں" : "Please enter a valid email"}
          </div>
        ) : null}
      </div>
      <div className="space-y-1">
        <input
          ref={cityInputRef}
          type="text"
          required
          value={customerCity}
          onChange={(event) => setCustomerCity(event.target.value)}
          placeholder={isUrdu ? "شہر / پتہ" : "City / Address"}
          className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
        />
        {checkoutAttempted && cityMissing ? (
          <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
            {isUrdu ? "براہ کرم اپنا پتہ درج کریں" : "Please enter your address"}
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
          <span>{isUrdu ? "فوری نوٹس منتخب کریں" : "Select quick notes"}</span>
          <span className="text-xs text-stone-400">{selectedNotes.length}</span>
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
                      isSelected ? "border-primary-700 bg-primary-700" : "border-stone-300 bg-white"
                    }`}
                  />
                  <span className={isSelected ? "text-primary-700" : "text-stone-700"}>{note}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
      <span>{isUrdu ? `${selectedSize.label} جار × ${quantity}` : `${selectedSize.label} jar × ${quantity}`}</span>
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
              {isUrdu ? `پریمیم ریزن جار — ${item.sizeLabel}` : `Premium Resin Jar — ${item.sizeLabel}`}
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
    <div
      className={`mt-4 flex items-center justify-between text-sm font-semibold text-charcoal-900 ${
        isUrdu ? "flex-row-reverse" : ""
      }`}
    >
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
);
