import { useState } from "react";
import type { CartItem, OrderChannel, OrderPopupData } from "@/types";
import { buildOrderPopupData } from "@/lib/order/buildOrderPopupData";

export const useOrderPopup = ({
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
  resetOrderStateAfterPopup,
}: {
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
  resetOrderStateAfterPopup: () => void;
}) => {
  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const [orderPopupData, setOrderPopupData] = useState<OrderPopupData | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const closeOrderPopup = () => {
    setOrderPopupOpen(false);
    setOrderPopupData(null);
    setCopySuccess(false);
  };

  const triggerOrderPopup = (channel: OrderChannel, whatsappUrl?: string) => {
    const nextPopupData = buildOrderPopupData({
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
    });
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

  return {
    orderPopupOpen,
    orderPopupData,
    copySuccess,
    closeOrderPopup,
    triggerOrderPopup,
    handleCopyOrderDetails,
  };
};
