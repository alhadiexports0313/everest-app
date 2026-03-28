import type { CartItem } from "@/types";

export const buildWhatsAppLink = ({
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
}: {
  isUrdu: boolean;
  orderMeta: { id: string; createdAt: number } | null;
  customerName: string;
  formattedPhone: string;
  customerEmail: string;
  customerCity: string;
  customerNote: string;
  effectiveCartItems: CartItem[];
  formatPkr: (value: number) => string;
  cartTotalPkr: number;
  cartTotalUsd: string | null;
}) => {
  if (!orderMeta) return "";
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
  return `https://wa.me/923255203088?text=${encodeURIComponent(message)}`;
};
