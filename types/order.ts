import type { CartItem } from "./cart";
import type { Customer } from "./customer";

export type OrderChannel = "whatsapp" | "email";

export type OrderPopupItem = {
  product: string;
  size: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
};

export type OrderPopupData = {
  channel: OrderChannel;
  whatsappUrl?: string;
  orderId: string;
  orderDate: string;
  orderTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerCity: string;
  note: string;
  items: OrderPopupItem[];
  totalPkr: string;
  totalUsd: string;
  copyText: string;
};

export type OrderRequestPayload = {
  locale: "en" | "ur";
  orderId: string;
  createdAt: number;
  customer: Customer;
  note?: string;
  items: CartItem[];
  totals: {
    pkr: number;
    usd?: string | null;
  };
};
