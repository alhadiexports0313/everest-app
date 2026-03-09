"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
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
  const [customerName, setCustomerName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [noteDropdownOpen, setNoteDropdownOpen] = useState(false);
  const noteDropdownRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const countryButtonRef = useRef<HTMLButtonElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);
  const quantityInputRef = useRef<HTMLInputElement | null>(null);
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
  const unitPricePkrFormatted = formatPkr(unitPricePkr);
  const primaryPrice =
    currency === "USD" && totalPriceUsd ? totalPriceUsd : formatPkr(totalPricePkr);
  const secondaryPrice =
    currency === "USD" ? formatPkr(totalPricePkr) : totalPriceUsd;

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
      formattedPhone || (isUrdu ? "فون درج نہیں" : "Not provided");
    const cityValue =
      customerCity.trim() || (isUrdu ? "پتہ درج نہیں" : "Not provided");
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
          `پتہ: ${cityValue}`,
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
          `Address: ${cityValue}`,
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
    countryCode,
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
      formattedPhone || (isUrdu ? "فون درج نہیں" : "Not provided");
    const cityValue =
      customerCity.trim() || (isUrdu ? "پتہ درج نہیں" : "Not provided");
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
          `پتہ: ${cityValue}`,
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
          `Address: ${cityValue}`,
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
                  {checkoutAttempted && quantityInvalid ? (
                    <div className={`mt-2 text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
                      {isUrdu ? "براہ کرم درست مقدار منتخب کریں" : "Please enter a valid quantity"}
                    </div>
                  ) : null}
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
                                    isSelected
                                      ? "text-primary-700"
                                      : "text-stone-700"
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
                      if (!isCheckoutValid) {
                        event.preventDefault();
                        setCheckoutAttempted(true);
                        focusFirstInvalidField();
                        return;
                      }
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
            onClick={(event) => {
              if (!isCheckoutValid) {
                event.preventDefault();
                setCheckoutAttempted(true);
                focusFirstInvalidField();
                return;
              }
              event.preventDefault();
              setWhatsappModalOpen(true);
              window.setTimeout(() => {
                window.open(whatsappLink, "_blank", "noopener,noreferrer");
                setWhatsappModalOpen(false);
              }, 700);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-premium"
          >
            <MessageCircle className="w-4 h-4" />
            {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
          </a>
          <a
            href={emailLink}
            onClick={(event) => {
              if (!isCheckoutValid) {
                event.preventDefault();
                setCheckoutAttempted(true);
                focusFirstInvalidField();
                return;
              }
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-stone-700 shadow-soft"
          >
            <Mail className="w-4 h-4" />
            {isUrdu ? "ای میل کے ذریعے آرڈر کریں" : "Order via Email"}
          </a>
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
      <CTA />
    </>
  );
}
