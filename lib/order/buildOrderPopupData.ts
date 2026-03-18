import type { CartItem, OrderChannel, OrderPopupData } from "@/types";
import { formatOrderDateTime } from "@/lib/utils/dateFormat";

export const buildOrderPopupData = ({
  channel,
  whatsappUrl,
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
}: {
  channel: OrderChannel;
  whatsappUrl?: string;
  orderMeta: { id: string; createdAt: number } | null;
  isUrdu: boolean;
  customerName: string;
  formattedPhone: string;
  customerEmail: string;
  customerCity: string;
  customerNote: string;
  effectiveCartItems: CartItem[];
  formatPkr: (value: number) => string;
  cartTotalPkr: number;
  cartTotalUsd: string | null;
}): OrderPopupData | null => {
  if (!orderMeta) return null;
  const { orderDate, orderTime } = formatOrderDateTime(orderMeta.createdAt, isUrdu);
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
