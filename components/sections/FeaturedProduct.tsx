"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Copy, Mail, MessageCircle, X, ZoomIn } from "lucide-react";
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

const phoneCountries = [
  { code: "+1", label: "USA / Canada", flag: "🇺🇸", placeholder: "202 555 0147", pattern: /^\d{10}$/ },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧", placeholder: "7400 123456", pattern: /^7\d{9}$/ },
  { code: "+353", label: "Ireland", flag: "🇮🇪", placeholder: "85 123 4567", pattern: /^\d{9}$/ },
  { code: "+33", label: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78", pattern: /^\d{9}$/ },
  { code: "+49", label: "Germany", flag: "🇩🇪", placeholder: "151 23456789", pattern: /^\d{10,11}$/ },
  { code: "+39", label: "Italy", flag: "🇮🇹", placeholder: "312 345 6789", pattern: /^\d{9,10}$/ },
  { code: "+34", label: "Spain", flag: "🇪🇸", placeholder: "612 34 56 78", pattern: /^\d{9}$/ },
  { code: "+31", label: "Netherlands", flag: "🇳🇱", placeholder: "6 12345678", pattern: /^\d{9}$/ },
  { code: "+32", label: "Belgium", flag: "🇧🇪", placeholder: "470 12 34 56", pattern: /^\d{9}$/ },
  { code: "+41", label: "Switzerland", flag: "🇨🇭", placeholder: "79 123 45 67", pattern: /^\d{9}$/ },
  { code: "+43", label: "Austria", flag: "🇦🇹", placeholder: "660 1234567", pattern: /^\d{10,11}$/ },
  { code: "+46", label: "Sweden", flag: "🇸🇪", placeholder: "70 123 45 67", pattern: /^\d{9}$/ },
  { code: "+47", label: "Norway", flag: "🇳🇴", placeholder: "412 34 567", pattern: /^\d{8}$/ },
  { code: "+45", label: "Denmark", flag: "🇩🇰", placeholder: "20 12 34 56", pattern: /^\d{8}$/ },
  { code: "+358", label: "Finland", flag: "🇫🇮", placeholder: "40 123 4567", pattern: /^\d{9,10}$/ },
  { code: "+351", label: "Portugal", flag: "🇵🇹", placeholder: "912 345 678", pattern: /^\d{9}$/ },
  { code: "+30", label: "Greece", flag: "🇬🇷", placeholder: "691 234 5678", pattern: /^\d{10}$/ },
  { code: "+48", label: "Poland", flag: "🇵🇱", placeholder: "512 345 678", pattern: /^\d{9}$/ },
  { code: "+420", label: "Czechia", flag: "🇨🇿", placeholder: "601 234 567", pattern: /^\d{9}$/ },
  { code: "+36", label: "Hungary", flag: "🇭🇺", placeholder: "20 123 4567", pattern: /^\d{9}$/ },
  { code: "+40", label: "Romania", flag: "🇷🇴", placeholder: "712 345 678", pattern: /^\d{9}$/ },
  { code: "+380", label: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567", pattern: /^\d{9}$/ },
  { code: "+7", label: "Russia", flag: "🇷🇺", placeholder: "912 345 67 89", pattern: /^\d{10}$/ },
  { code: "+90", label: "Turkey", flag: "🇹🇷", placeholder: "501 234 56 78", pattern: /^\d{10}$/ },
  { code: "+20", label: "Egypt", flag: "🇪🇬", placeholder: "100 123 4567", pattern: /^\d{10}$/ },
  { code: "+27", label: "South Africa", flag: "🇿🇦", placeholder: "71 234 5678", pattern: /^\d{9}$/ },
  { code: "+212", label: "Morocco", flag: "🇲🇦", placeholder: "612 345 678", pattern: /^\d{9}$/ },
  { code: "+234", label: "Nigeria", flag: "🇳🇬", placeholder: "801 234 5678", pattern: /^\d{10}$/ },
  { code: "+233", label: "Ghana", flag: "🇬🇭", placeholder: "24 123 4567", pattern: /^\d{9}$/ },
  { code: "+254", label: "Kenya", flag: "🇰🇪", placeholder: "712 345678", pattern: /^\d{9}$/ },
  { code: "+255", label: "Tanzania", flag: "🇹🇿", placeholder: "712 345 678", pattern: /^\d{9}$/ },
  { code: "+251", label: "Ethiopia", flag: "🇪🇹", placeholder: "91 234 5678", pattern: /^\d{9}$/ },
  { code: "+971", label: "United Arab Emirates", flag: "🇦🇪", placeholder: "50 123 4567", pattern: /^5\d{8}$/ },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦", placeholder: "50 123 4567", pattern: /^5\d{8}$/ },
  { code: "+974", label: "Qatar", flag: "🇶🇦", placeholder: "3312 3456", pattern: /^\d{8}$/ },
  { code: "+965", label: "Kuwait", flag: "🇰🇼", placeholder: "5001 2345", pattern: /^\d{8}$/ },
  { code: "+973", label: "Bahrain", flag: "🇧🇭", placeholder: "3600 1234", pattern: /^\d{8}$/ },
  { code: "+968", label: "Oman", flag: "🇴🇲", placeholder: "9212 3456", pattern: /^\d{8}$/ },
  { code: "+962", label: "Jordan", flag: "🇯🇴", placeholder: "79 123 4567", pattern: /^\d{9}$/ },
  { code: "+961", label: "Lebanon", flag: "🇱🇧", placeholder: "71 123 456", pattern: /^\d{8}$/ },
  { code: "+972", label: "Israel", flag: "🇮🇱", placeholder: "50 123 4567", pattern: /^\d{9}$/ },
  { code: "+964", label: "Iraq", flag: "🇮🇶", placeholder: "790 123 4567", pattern: /^\d{10}$/ },
  { code: "+98", label: "Iran", flag: "🇮🇷", placeholder: "912 345 6789", pattern: /^\d{10}$/ },
  { code: "+92", label: "Pakistan", flag: "🇵🇰", placeholder: "300 1234567", pattern: /^3\d{9}$/ },
  { code: "+91", label: "India", flag: "🇮🇳", placeholder: "98765 43210", pattern: /^\d{10}$/ },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩", placeholder: "1712 345678", pattern: /^\d{10}$/ },
  { code: "+94", label: "Sri Lanka", flag: "🇱🇰", placeholder: "71 234 5678", pattern: /^\d{9}$/ },
  { code: "+977", label: "Nepal", flag: "🇳🇵", placeholder: "981 234 5678", pattern: /^\d{10}$/ },
  { code: "+93", label: "Afghanistan", flag: "🇦🇫", placeholder: "701 234 567", pattern: /^\d{9}$/ },
  { code: "+86", label: "China", flag: "🇨🇳", placeholder: "131 2345 6789", pattern: /^\d{11}$/ },
  { code: "+81", label: "Japan", flag: "🇯🇵", placeholder: "90 1234 5678", pattern: /^\d{10}$/ },
  { code: "+82", label: "South Korea", flag: "🇰🇷", placeholder: "10 1234 5678", pattern: /^\d{9,10}$/ },
  { code: "+886", label: "Taiwan", flag: "🇹🇼", placeholder: "912 345 678", pattern: /^\d{9}$/ },
  { code: "+852", label: "Hong Kong", flag: "🇭🇰", placeholder: "5123 4567", pattern: /^\d{8}$/ },
  { code: "+853", label: "Macau", flag: "🇲🇴", placeholder: "6612 3456", pattern: /^\d{8}$/ },
  { code: "+65", label: "Singapore", flag: "🇸🇬", placeholder: "8123 4567", pattern: /^\d{8}$/ },
  { code: "+60", label: "Malaysia", flag: "🇲🇾", placeholder: "12 345 6789", pattern: /^\d{9,10}$/ },
  { code: "+66", label: "Thailand", flag: "🇹🇭", placeholder: "81 234 5678", pattern: /^\d{9}$/ },
  { code: "+84", label: "Vietnam", flag: "🇻🇳", placeholder: "912 345 678", pattern: /^\d{9,10}$/ },
  { code: "+62", label: "Indonesia", flag: "🇮🇩", placeholder: "812 3456 7890", pattern: /^\d{9,11}$/ },
  { code: "+63", label: "Philippines", flag: "🇵🇭", placeholder: "917 123 4567", pattern: /^\d{10}$/ },
  { code: "+61", label: "Australia", flag: "🇦🇺", placeholder: "412 345 678", pattern: /^\d{9}$/ },
  { code: "+64", label: "New Zealand", flag: "🇳🇿", placeholder: "21 123 4567", pattern: /^\d{9}$/ },
  { code: "+55", label: "Brazil", flag: "🇧🇷", placeholder: "11 91234 5678", pattern: /^\d{10,11}$/ },
  { code: "+54", label: "Argentina", flag: "🇦🇷", placeholder: "11 1234 5678", pattern: /^\d{10,11}$/ },
  { code: "+52", label: "Mexico", flag: "🇲🇽", placeholder: "55 1234 5678", pattern: /^\d{10}$/ },
  { code: "+57", label: "Colombia", flag: "🇨🇴", placeholder: "301 234 5678", pattern: /^\d{10}$/ },
  { code: "+56", label: "Chile", flag: "🇨🇱", placeholder: "9 1234 5678", pattern: /^\d{9}$/ },
  { code: "+51", label: "Peru", flag: "🇵🇪", placeholder: "912 345 678", pattern: /^\d{9}$/ },
  { code: "+58", label: "Venezuela", flag: "🇻🇪", placeholder: "412 123 4567", pattern: /^\d{10}$/ },
];

type CartItem = {
  sizeLabel: string;
  quantity: number;
  unitPricePkr: number;
};

type OrderPopupData = {
  channel: "whatsapp" | "email";
  whatsappUrl?: string;
  orderId: string;
  orderDate: string;
  orderTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCity: string;
  note: string;
  items: {
    product: string;
    size: string;
    quantity: number;
    unitPrice: string;
    subtotal: string;
  }[];
  totalPkr: string;
  totalUsd: string;
  copyText: string;
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
  const createOrderMeta = () => ({
    id: `EOS-${Math.floor(100000 + Math.random() * 900000)}`,
    createdAt: Date.now(),
  });
  const [selectedSize, setSelectedSize] = useState(sizes[1]);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [noteDropdownOpen, setNoteDropdownOpen] = useState(false);
  const noteDropdownRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const countryButtonRef = useRef<HTMLButtonElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const quantityInputRef = useRef<HTMLInputElement | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const [orderPopupData, setOrderPopupData] = useState<OrderPopupData | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
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
    setOrderMeta(createOrderMeta());
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
  const normalizedPhone = customerPhone.replace(/\D/g, "");
  const selectedCountry = phoneCountries.find(
    (country) => country.code === countryCode
  );
  const phoneMissing = normalizedPhone.length === 0;
  const countryMissing = countryCode.length === 0;
  const phoneInvalid =
    !countryMissing &&
    !phoneMissing &&
    (!selectedCountry || !selectedCountry.pattern.test(normalizedPhone));
  const phoneExample = selectedCountry
    ? `${selectedCountry.code} ${selectedCountry.placeholder}`
    : "+92 300 1234567";
  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return phoneCountries;
    return phoneCountries.filter((country) =>
      `${country.label} ${country.code}`.toLowerCase().includes(query)
    );
  }, [countrySearch]);
  const cityMissing = customerCity.trim().length === 0;
  const emailMissing = customerEmail.trim().length === 0;
  const emailInvalid =
    !emailMissing && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim());
  const quantityInvalid =
    Number.isNaN(quantity) || quantity < 1 || quantity > 500;
  const formatLocalPhone = (code: string, digits: string) => {
    if (code === "+92" && digits.length >= 10) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }
    if ((code === "+971" || code === "+966") && digits.length >= 9) {
      return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    }
    if (code === "+44" && digits.length >= 10) {
      return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }
    if (code === "+1" && digits.length >= 10) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }
    return digits;
  };
  const formattedPhone =
    countryMissing || phoneMissing
      ? ""
      : `${countryCode} ${formatLocalPhone(countryCode, normalizedPhone)}`;
  const isCheckoutValid =
    !nameMissing &&
    !phoneMissing &&
    !countryMissing &&
    !phoneInvalid &&
    !cityMissing &&
    !emailMissing &&
    !emailInvalid &&
    !quantityInvalid;
  const scrollToField = (element: HTMLElement | null) => {
    if (!element) return;
    if ("focus" in element) {
      (element as HTMLElement).focus({ preventScroll: true });
    }
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const focusFirstInvalidField = () => {
    if (nameMissing) {
      scrollToField(nameInputRef.current);
      return;
    }
    if (countryMissing) {
      scrollToField(countryButtonRef.current);
      return;
    }
    if (phoneMissing || phoneInvalid) {
      scrollToField(phoneInputRef.current);
      return;
    }
    if (cityMissing) {
      scrollToField(cityInputRef.current);
      return;
    }
    if (emailMissing || emailInvalid) {
      scrollToField(emailInputRef.current);
      return;
    }
    if (quantityInvalid) {
      scrollToField(quantityInputRef.current);
    }
  };
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
    setCartItems([]);
    setCheckoutAttempted(false);
    setEmailError(null);
    setLastAdded(null);
    setStoredOrderCount(0);
    setOrderMeta(createOrderMeta());
  };

  const buildOrderPopupData = (
    channel: "whatsapp" | "email",
    whatsappUrl?: string
  ): OrderPopupData | null => {
    if (!orderMeta) return null;
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
    const customerNameValue =
      customerName.trim() || (isUrdu ? "نام درج نہیں" : "Not provided");
    const customerPhoneValue =
      formattedPhone || (isUrdu ? "فون درج نہیں" : "Not provided");
    const customerEmailValue =
      customerEmail.trim() || (isUrdu ? "ای میل درج نہیں" : "Not provided");
    const customerCityValue =
      customerCity.trim() || (isUrdu ? "پتہ درج نہیں" : "Not provided");
    const noteValue = customerNote.trim();
    const productLabel = isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar";
    const items = effectiveCartItems.map((item) => ({
      product: productLabel,
      size: item.sizeLabel,
      quantity: item.quantity,
      unitPrice: formatPkr(item.unitPricePkr),
      subtotal: formatPkr(item.unitPricePkr * item.quantity),
    }));
    const totalPkr = formatPkr(cartTotalPkr);
    const totalUsd = cartTotalUsd || "N/A";
    const divider = "━━━━━━━━━━━━━━━━━━━━";
    const copyLines = isUrdu
      ? [
          "✓ آرڈر کامیابی سے تیار ہو گیا",
          divider,
          `چینل: ${channel === "whatsapp" ? "واٹس ایپ" : "ای میل"}`,
          `آرڈر آئی ڈی: ${orderMeta.id}`,
          `تاریخ: ${orderDate}`,
          `وقت: ${orderTime}`,
          divider,
          "کسٹمر معلومات",
          `نام: ${customerNameValue}`,
          `فون: ${customerPhoneValue}`,
          `ای میل: ${customerEmailValue}`,
          `شہر: ${customerCityValue}`,
          divider,
          "پروڈکٹس",
          ...items.flatMap((item) => [
            `${item.product} — ${item.size}`,
            `مقدار: ${item.quantity}`,
            `فی یونٹ: ${item.unitPrice}`,
            `سب ٹوٹل: ${item.subtotal}`,
            "",
          ]),
          divider,
          `کل PKR: ${totalPkr}`,
          `کل USD: ${totalUsd}`,
          noteValue ? divider : null,
          noteValue ? `نوٹ: ${noteValue}` : null,
        ]
      : [
          "✓ Order prepared successfully",
          divider,
          `Channel: ${channel === "whatsapp" ? "WhatsApp" : "Email"}`,
          `Order ID: ${orderMeta.id}`,
          `Date: ${orderDate}`,
          `Time: ${orderTime}`,
          divider,
          "Customer Information",
          `Name: ${customerNameValue}`,
          `Phone: ${customerPhoneValue}`,
          `Email: ${customerEmailValue}`,
          `City: ${customerCityValue}`,
          divider,
          "Products",
          ...items.flatMap((item) => [
            `${item.product} — ${item.size}`,
            `Qty: ${item.quantity}`,
            `Unit: ${item.unitPrice}`,
            `Subtotal: ${item.subtotal}`,
            "",
          ]),
          divider,
          `Total PKR: ${totalPkr}`,
          `Total USD: ${totalUsd}`,
          noteValue ? divider : null,
          noteValue ? `Note: ${noteValue}` : null,
        ];
    return {
      channel,
      whatsappUrl,
      orderId: orderMeta.id,
      orderDate,
      orderTime,
      customerName: customerNameValue,
      customerPhone: customerPhoneValue,
      customerEmail: customerEmailValue,
      customerCity: customerCityValue,
      note: noteValue,
      items,
      totalPkr,
      totalUsd,
      copyText: copyLines.filter(Boolean).join("\n"),
    };
  };

  const closeOrderPopup = () => {
    setOrderPopupOpen(false);
    setOrderPopupData(null);
    setCopySuccess(false);
  };

  const triggerOrderPopup = (
    channel: "whatsapp" | "email",
    whatsappUrl?: string
  ) => {
    const nextPopupData = buildOrderPopupData(channel, whatsappUrl);
    if (!nextPopupData) return;
    setOrderPopupData(nextPopupData);
    setCopySuccess(false);
    setOrderPopupOpen(true);
    resetOrderStateAfterPopup();
  };

  const handleCopyOrderDetails = async () => {
    if (!orderPopupData || typeof window === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(orderPopupData.copyText);
      setCopySuccess(true);
      window.setTimeout(() => {
        setCopySuccess(false);
      }, 1800);
    } catch {
      return;
    }
  };

  const handleEmailOrder = async () => {
    if (!isCheckoutValid) {
      setCheckoutAttempted(true);
      focusFirstInvalidField();
      return;
    }
    if (!orderMeta) return;
    setEmailSubmitting(true);
    setEmailError(null);
    const payload = {
      locale: isUrdu ? "ur" : "en",
      orderId: orderMeta.id,
      createdAt: orderMeta.createdAt,
      customer: {
        name: customerName.trim(),
        phone: formattedPhone,
        email: customerEmail.trim(),
        city: customerCity.trim(),
      },
      note: customerNote.trim(),
      items: effectiveCartItems,
      totals: {
        pkr: cartTotalPkr,
        usd: cartTotalUsd,
      },
    };
    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to send email");
      }
      triggerOrderPopup("email");
    } catch {
      setEmailError(
        isUrdu
          ? "ای میل بھیجنے میں مسئلہ آیا۔ براہ کرم دوبارہ کوشش کریں۔"
          : "We could not send the email. Please try again."
      );
    } finally {
      setEmailSubmitting(false);
    }
  };

  const whatsappLink = useMemo(() => {
    if (!isCheckoutValid || !orderMeta) return "";
    const now = new Date(orderMeta.createdAt);
    const dateLocale = isUrdu ? "ur-PK" : "en-GB";
    const divider = "━━━━━━━━━━━━━━━━━━━━";
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
      formattedPhone || (isUrdu ? "فون درج نہیں" : "Not provided");
    const emailValue =
      customerEmail.trim() || (isUrdu ? "ای میل درج نہیں" : "Not provided");
    const cityValue =
      customerCity.trim() || (isUrdu ? "پتہ درج نہیں" : "Not provided");
    const noteValue = customerNote.trim();
    const productName = isUrdu ? "پریمیم ریزن جار" : "Premium Resin Jar";
    const productLines = effectiveCartItems.flatMap((item) => {
      const subtotal = formatPkr(item.unitPricePkr * item.quantity);
      const unitPrice = formatPkr(item.unitPricePkr);
      return [
        `📦 ${productName} — ${item.sizeLabel}`,
        isUrdu ? `مقدار: ${item.quantity}` : `Qty: ${item.quantity}`,
        isUrdu ? `فی یونٹ قیمت: ${unitPrice}` : `Unit Price: ${unitPrice}`,
        isUrdu ? `سب ٹوٹل: ${subtotal}` : `Subtotal: ${subtotal}`,
        "",
      ];
    });
    const lines = isUrdu
      ? [
          "🟫 ایورسٹ آرگینک سلاجیت",
          "قدرتی ہمالیائی طاقت",
          "",
          divider,
          "📦 آرڈر تفصیلات",
          "",
          `آرڈر آئی ڈی: ${orderMeta.id}`,
          `تاریخ: ${orderDate}`,
          `وقت: ${orderTime}`,
          "",
          divider,
          "👤 کسٹمر معلومات",
          "",
          `نام: ${nameValue}`,
          `فون: ${phoneValue}`,
          `ای میل: ${emailValue}`,
          `شہر: ${cityValue}`,
          noteValue ? "" : null,
          noteValue ? divider : null,
          noteValue ? "📝 آرڈر نوٹ" : null,
          noteValue ? "" : null,
          noteValue || null,
          "",
          divider,
          "🛒 پروڈکٹس",
          "",
          ...productLines,
          divider,
          "💰 کل آرڈر",
          "",
          `PKR: ${formatPkr(cartTotalPkr)}`,
          cartTotalUsd ? `USD: ${cartTotalUsd}` : "USD: N/A",
          "",
          divider,
          "🌐 ویب سائٹ",
          "",
          "everestorganicshilajit.com",
          "",
          "السلام علیکم،",
          "میں یہ آرڈر دینا چاہتا/چاہتی ہوں۔",
        ]
      : [
          "🟫 EVEREST ORGANIC SHILAJIT",
          "Premium Himalayan Wellness",
          "",
          divider,
          "📦 ORDER DETAILS",
          "",
          `Order ID: ${orderMeta.id}`,
          `Date: ${orderDate}`,
          `Time: ${orderTime}`,
          "",
          divider,
          "👤 CUSTOMER INFORMATION",
          "",
          `Name: ${nameValue}`,
          `Phone: ${phoneValue}`,
          `Email: ${emailValue}`,
          `City: ${cityValue}`,
          noteValue ? "" : null,
          noteValue ? divider : null,
          noteValue ? "📝 ORDER NOTE" : null,
          noteValue ? "" : null,
          noteValue || null,
          "",
          divider,
          "🛒 PRODUCTS",
          "",
          ...productLines,
          divider,
          "💰 ORDER TOTAL",
          "",
          `PKR: ${formatPkr(cartTotalPkr)}`,
          cartTotalUsd ? `USD: ${cartTotalUsd}` : "USD: N/A",
          "",
          divider,
          "🌐 WEBSITE",
          "",
          "everestorganicshilajit.com",
          "",
          "Hello,",
          "I would like to place this order.",
        ];
    const message = lines.filter(Boolean).join("\n");
    return `https://wa.me/923454490326?text=${encodeURIComponent(message)}`;
  }, [
    isUrdu,
    orderMeta,
    customerName,
    customerPhone,
    customerEmail,
    countryCode,
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
            className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-6 shadow-soft lg:sticky top-[100px] self-start"
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
                  className="relative aspect-[5/4] min-h-[84px] sm:min-h-[92px] overflow-hidden rounded-2xl border border-stone-200/60 bg-stone-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300/70 hover:shadow-soft"
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
            className="rounded-3xl border border-stone-200/60 bg-white/80 backdrop-blur-sm p-7 shadow-soft"
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
                  ref={quantityInputRef}
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
              {checkoutAttempted && quantityInvalid ? (
                <div className={`mt-2 text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                  {isUrdu ? "براہ کرم درست مقدار منتخب کریں" : "Please enter a valid quantity"}
                </div>
              ) : null}
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
                          <span className="text-lg">
                            {selectedCountry?.flag ?? "🌍"}
                          </span>
                          <span className={`flex flex-col ${isUrdu ? "items-end" : "items-start"}`}>
                            <span className="text-sm font-semibold text-charcoal-900">
                              {selectedCountry
                                ? selectedCountry.label
                                : isUrdu
                                  ? "ملک منتخب کریں"
                                  : "Select a country"}
                            </span>
                            <span className="text-[11px] text-stone-500">
                              {selectedCountry
                                ? selectedCountry.code
                                : isUrdu
                                  ? "کوڈ"
                                  : "Code"}
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
                      placeholder={
                        selectedCountry?.placeholder ||
                        (isUrdu ? "فون نمبر" : "Phone number")
                      }
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
                      {isUrdu
                        ? `درست فارمیٹ استعمال کریں، مثال: ${phoneExample}`
                        : `Use a valid format, e.g., ${phoneExample}`}
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
                    placeholder={
                      isUrdu ? "اپنا ای میل ایڈریس درج کریں" : "Enter your email address"
                    }
                    className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none"
                  />
                  {checkoutAttempted && emailMissing ? (
                    <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu
                        ? "براہ کرم اپنا ای میل درج کریں"
                        : "Please enter your email address"}
                    </div>
                  ) : null}
                  {checkoutAttempted && emailInvalid ? (
                    <div className={`text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu
                        ? "براہ کرم درست ای میل درج کریں"
                        : "Please enter a valid email"}
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
                    focusFirstInvalidField();
                    return;
                  }
                  event.preventDefault();
                  triggerOrderPopup("whatsapp", whatsappLink);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-premium lux-button"
              >
                <MessageCircle className="w-4 h-4" />
                {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
              </a>
              <button
                type="button"
                onClick={handleEmailOrder}
                disabled={emailSubmitting}
                aria-busy={emailSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button hover:border-primary-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Mail className="w-4 h-4" />
                {emailSubmitting
                  ? isUrdu
                    ? "ای میل بھیجا جا رہا ہے"
                    : "Sending email"
                  : isUrdu
                  ? "ای میل کے ذریعے آرڈر کریں"
                  : "Order via Email"}
              </button>
            </div>
            {emailError ? (
              <div className={`mt-3 text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                {emailError}
              </div>
            ) : null}
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
                focusFirstInvalidField();
                return;
              }
              event.preventDefault();
              triggerOrderPopup("whatsapp", whatsappLink);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium lux-button"
          >
            <MessageCircle className="w-4 h-4" />
            {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
          </a>
          <button
            type="button"
            onClick={handleEmailOrder}
            disabled={emailSubmitting}
            aria-busy={emailSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft lux-button disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Mail className="w-4 h-4" />
            {emailSubmitting
              ? isUrdu
                ? "ای میل بھیجا جا رہا ہے"
                : "Sending email"
              : isUrdu
              ? "ای میل کے ذریعے آرڈر کریں"
              : "Order via Email"}
          </button>
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
      <AnimatePresence>
        {orderPopupOpen && orderPopupData ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          >
            <button
              type="button"
              onClick={closeOrderPopup}
              className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border border-amber-100/70 bg-gradient-to-b from-white via-stone-50 to-white p-4 shadow-xl sm:p-6 flex flex-col ${
                isUrdu ? "font-urdu text-right" : "text-left"
              }`}
              dir={isUrdu ? "rtl" : "ltr"}
            >
              <button
                type="button"
                onClick={closeOrderPopup}
                className={`absolute top-4 rounded-full border border-stone-200 bg-white/95 p-2 text-stone-500 transition-colors hover:text-stone-800 ${
                  isUrdu ? "left-4" : "right-4"
                }`}
                aria-label={isUrdu ? "بند کریں" : "Close"}
              >
                <X className="h-4 w-4" />
              </button>
              <div className={`flex items-start gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}>
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="h-5 w-5" />
                </div>
                <div className="pr-10">
                  <div className="text-lg font-semibold text-charcoal-900 sm:text-xl">
                    {isUrdu ? "آرڈر کامیابی سے تیار ہو گیا" : "Order Prepared Successfully"}
                  </div>
                  <div className="mt-1 text-sm text-stone-600">
                    {orderPopupData.channel === "whatsapp"
                      ? isUrdu
                        ? "واٹس ایپ آرڈر کی تفصیل تیار ہے۔ براہ کرم نیچے سے کاپی یا اوپن کریں۔"
                        : "Your WhatsApp order details are ready. Copy or open WhatsApp below."
                      : isUrdu
                      ? "ای میل آرڈر کامیابی سے بھیج دیا گیا ہے۔ تفصیل آپ کے ریکارڈ کے لیے موجود ہے۔"
                      : "Your email order has been sent successfully. Details are available for your records."}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3 rounded-2xl border border-stone-200/80 bg-white/90 p-4 text-xs text-stone-700 sm:grid-cols-2 sm:text-sm">
                  <div>
                    <span className="font-semibold text-charcoal-900">{isUrdu ? "آرڈر آئی ڈی: " : "Order ID: "}</span>
                    {orderPopupData.orderId}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal-900">{isUrdu ? "چینل: " : "Channel: "}</span>
                    {orderPopupData.channel === "whatsapp"
                      ? isUrdu
                        ? "واٹس ایپ"
                        : "WhatsApp"
                      : isUrdu
                      ? "ای میل"
                      : "Email"}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal-900">{isUrdu ? "تاریخ: " : "Date: "}</span>
                    {orderPopupData.orderDate}
                  </div>
                  <div>
                    <span className="font-semibold text-charcoal-900">{isUrdu ? "وقت: " : "Time: "}</span>
                    {orderPopupData.orderTime}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-stone-200/70 bg-white/80">
                  <div className="hidden sm:block">
                    <div className="grid grid-cols-5 gap-2 border-b border-stone-200/70 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
                      <span>{isUrdu ? "پروڈکٹ" : "Product"}</span>
                      <span>{isUrdu ? "سائز" : "Size"}</span>
                      <span className="text-center">{isUrdu ? "مقدار" : "Qty"}</span>
                      <span className="text-right">{isUrdu ? "یونٹ قیمت" : "Unit"}</span>
                      <span className="text-right">{isUrdu ? "سب ٹوٹل" : "Subtotal"}</span>
                    </div>
                    <div className="divide-y divide-stone-200/60 text-sm text-stone-700">
                      {orderPopupData.items.map((item, index) => (
                        <div key={`${item.product}-${item.size}-${index}`} className="grid grid-cols-5 gap-2 px-4 py-3">
                          <span className="font-semibold text-charcoal-900">{item.product}</span>
                          <span>{item.size}</span>
                          <span className="text-center">{item.quantity}</span>
                          <span className="text-right">{item.unitPrice}</span>
                          <span className="text-right font-semibold text-charcoal-900">{item.subtotal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 p-3 sm:hidden">
                    {orderPopupData.items.map((item, index) => (
                      <div key={`${item.product}-${item.size}-${index}`} className="rounded-xl border border-stone-200/70 bg-stone-50/90 p-3 text-sm text-stone-700">
                        <div className="font-semibold text-charcoal-900">{item.product}</div>
                        <div className="mt-1 text-xs text-stone-600">
                          {isUrdu ? `سائز: ${item.size}` : `Size: ${item.size}`}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-stone-600">
                          <span>{isUrdu ? `مقدار: ${item.quantity}` : `Qty: ${item.quantity}`}</span>
                          <span>{isUrdu ? `یونٹ: ${item.unitPrice}` : `Unit: ${item.unitPrice}`}</span>
                          <span>{isUrdu ? `سب ٹوٹل: ${item.subtotal}` : `Subtotal: ${item.subtotal}`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`mt-4 flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-100/80 px-4 py-2.5 text-sm font-semibold text-charcoal-900 ${isUrdu ? "flex-row-reverse" : ""}`}>
                  <span>{isUrdu ? "کل رقم (PKR)" : "Total (PKR)"}</span>
                  <span>{orderPopupData.totalPkr}</span>
                </div>
                <div className={`mt-2 flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-100/80 px-4 py-2.5 text-xs text-stone-600 ${isUrdu ? "flex-row-reverse" : ""}`}>
                  <span>{isUrdu ? "کل رقم (USD)" : "Total (USD)"}</span>
                  <span>{orderPopupData.totalUsd}</span>
                </div>
                {orderPopupData.note ? (
                  <div className="mt-3 rounded-2xl border border-stone-200/70 bg-white/80 px-4 py-3 text-xs text-stone-600 sm:text-sm">
                    <span className="font-semibold text-charcoal-900">
                      {isUrdu ? "نوٹ: " : "Note: "}
                    </span>
                    {orderPopupData.note}
                  </div>
                ) : null}
                <div className="mt-4 rounded-2xl border border-stone-200 bg-white/90 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    {isUrdu ? "کاپی ایبل تفصیل" : "Copyable Details"}
                  </div>
                  <textarea
                    readOnly
                    value={orderPopupData.copyText}
                    className="mt-2 h-32 w-full resize-none rounded-2xl border border-stone-200 bg-white px-3 py-2.5 font-mono text-[11px] leading-5 text-stone-700 focus:outline-none sm:h-36 sm:text-xs"
                  />
                </div>
              </div>
              <div className={`mt-4 flex flex-wrap items-center gap-2 ${isUrdu ? "justify-end" : "justify-start"}`}>
                <button
                  type="button"
                  onClick={handleCopyOrderDetails}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-soft transition-colors hover:border-primary-300"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copySuccess
                    ? isUrdu
                      ? "کاپی ہو گیا"
                      : "Copied"
                    : isUrdu
                    ? "تفصیل کاپی کریں"
                    : "Copy Details"}
                </button>
                {orderPopupData.channel === "whatsapp" && orderPopupData.whatsappUrl ? (
                  <a
                    href={orderPopupData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-premium"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    {isUrdu ? "واٹس ایپ اوپن کریں" : "Open WhatsApp"}
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={closeOrderPopup}
                  className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-soft"
                >
                  {isUrdu ? "بند کریں" : "Close"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
