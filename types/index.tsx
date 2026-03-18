export type CartItem = {
  sizeLabel: string;
  quantity: number;
  unitPricePkr: number;
};

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
