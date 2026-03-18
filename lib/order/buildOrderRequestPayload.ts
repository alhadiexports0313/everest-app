import type { CartItem, OrderRequestPayload } from "@/types";

export const buildOrderRequestPayload = ({
  isUrdu,
  orderMeta,
  customerName,
  formattedPhone,
  customerEmail,
  customerCity,
  customerNote,
  effectiveCartItems,
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
  cartTotalPkr: number;
  cartTotalUsd: string | null;
}): OrderRequestPayload | null => {
  if (!orderMeta) return null;
  return {
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
};
