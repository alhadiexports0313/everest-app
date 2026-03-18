import type { CartItem } from "@/types";

export const getEffectiveCartItems = (
  items: CartItem[],
  fallback: CartItem
) => (items.length > 0 ? items : [fallback]);

export const getCartTotalPkr = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.unitPricePkr * item.quantity, 0);

export const getCartTotalUsd = (
  cartTotalPkr: number,
  formatUsd: ((value: number) => string) | null
) => (formatUsd ? formatUsd(cartTotalPkr) : null);
