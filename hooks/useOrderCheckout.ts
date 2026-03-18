import { useMemo, useState } from "react";
import type { CartItem } from "@/types";
import { buildOrderRequestPayload } from "@/lib/order/buildOrderRequestPayload";
import { getCheckoutValidation, getCountryList, getPhoneExample } from "@/lib/order/orderValidation";

export const useOrderCheckout = ({
  isUrdu,
  orderMeta,
  customerName,
  countryCode,
  customerPhone,
  customerCity,
  customerEmail,
  customerNote,
  quantity,
  countrySearch,
  formattedPhone,
  effectiveCartItems,
  cartTotalPkr,
  cartTotalUsd,
  triggerOrderPopup,
  focusFirstInvalidField,
  setCheckoutAttempted,
}: {
  isUrdu: boolean;
  orderMeta: { id: string; createdAt: number } | null;
  customerName: string;
  countryCode: string;
  customerPhone: string;
  customerCity: string;
  customerEmail: string;
  customerNote: string;
  quantity: number;
  countrySearch: string;
  formattedPhone: string;
  effectiveCartItems: CartItem[];
  cartTotalPkr: number;
  cartTotalUsd: string | null;
  triggerOrderPopup: (channel: "whatsapp" | "email", whatsappUrl?: string) => void;
  focusFirstInvalidField: () => void;
  setCheckoutAttempted: (value: boolean) => void;
}) => {
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validation = useMemo(
    () =>
      getCheckoutValidation({
        customerName,
        countryCode,
        customerPhone,
        customerCity,
        customerEmail,
        quantity,
      }),
    [
      customerName,
      countryCode,
      customerPhone,
      customerCity,
      customerEmail,
      quantity,
    ]
  );

  const phoneExample = useMemo(
    () => getPhoneExample(countryCode),
    [countryCode]
  );

  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();
    if (!query) return getCountryList();
    return getCountryList().filter((country) =>
      `${country.label} ${country.code}`.toLowerCase().includes(query)
    );
  }, [countrySearch]);

  const handleEmailOrder = async () => {
    if (!validation.isCheckoutValid) {
      setCheckoutAttempted(true);
      focusFirstInvalidField();
      return;
    }
    if (!orderMeta) return;
    setEmailSubmitting(true);
    setEmailError(null);
    const payload = buildOrderRequestPayload({
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
    });
    if (!payload) {
      setEmailSubmitting(false);
      return;
    }
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

  return {
    validation,
    phoneExample,
    filteredCountries,
    emailSubmitting,
    emailError,
    handleEmailOrder,
  };
};
