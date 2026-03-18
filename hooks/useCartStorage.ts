import { useEffect, useState } from "react";
import type { CartItem } from "@/types";

export type LastAddedItem = {
  sizeLabel: string;
  quantity: number;
};

export const useCartStorage = ({
  selectedSizeLabel,
  quantity,
  unitPricePkr,
}: {
  selectedSizeLabel: string;
  quantity: number;
  unitPricePkr: number;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<LastAddedItem | null>(null);

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
        const storedOrderCount =
          window.sessionStorage.getItem("everestCartOrders");
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
    persistCart(cartItems);
  }, [cartItems]);

  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.sizeLabel === selectedSizeLabel);
      return existing
        ? prev.map((item) =>
            item.sizeLabel === selectedSizeLabel
              ? {
                  ...item,
                  quantity: Math.min(500, item.quantity + quantity),
                  unitPricePkr,
                }
              : item
          )
        : [
            ...prev,
            { sizeLabel: selectedSizeLabel, quantity, unitPricePkr },
          ];
    });
  };

  const removeFromCart = (sizeLabel: string) => {
    setCartItems((prev) => prev.filter((item) => item.sizeLabel !== sizeLabel));
    setStoredOrderCount(getStoredOrderCount() - 1);
  };

  const handleAddToCart = () => {
    addToCart();
    setStoredOrderCount(getStoredOrderCount() + 1);
    setLastAdded({ sizeLabel: selectedSizeLabel, quantity });
    setAddModalOpen(true);
  };

  const resetCartStorage = () => {
    setCartItems([]);
    setLastAdded(null);
    setStoredOrderCount(0);
  };

  return {
    cartItems,
    setCartItems,
    addModalOpen,
    setAddModalOpen,
    lastAdded,
    setLastAdded,
    addToCart,
    removeFromCart,
    handleAddToCart,
    getStoredOrderCount,
    setStoredOrderCount,
    resetCartStorage,
  };
};
