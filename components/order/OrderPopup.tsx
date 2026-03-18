import { Copy, MessageCircle, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { OrderPopupData } from "@/types";
import { OrderCart } from "@/components/order/OrderCart";
import { OrderSummary } from "@/components/order/OrderSummary";
import { OrderTable } from "@/components/order/OrderTable";

export const OrderPopup = ({
  isUrdu,
  orderPopupOpen,
  orderPopupData,
  copySuccess,
  onClose,
  onCopy,
}: {
  isUrdu: boolean;
  orderPopupOpen: boolean;
  orderPopupData: OrderPopupData | null;
  copySuccess: boolean;
  onClose: () => void;
  onCopy: () => void;
}) => (
  <AnimatePresence>
    {orderPopupOpen && orderPopupData ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={`relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl border border-amber-100/70 bg-gradient-to-b from-white via-stone-50 to-white p-4 shadow-xl sm:p-6 flex flex-col ${
            isUrdu ? "font-urdu text-right" : "text-left"
          }`}
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 rounded-full border border-stone-200 bg-white/95 p-2 text-stone-500 transition-colors hover:text-stone-800 ${
              isUrdu ? "left-4" : "right-4"
            }`}
            aria-label={isUrdu ? "بند کریں" : "Close"}
          >
            <X className="h-4 w-4" />
          </button>
          <div className={`flex items-start gap-3 ${isUrdu ? "flex-row-reverse" : ""}`}>
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <Check className="h-5 w-5" />
            </div>
            <div className="pr-10">
              <div className="text-lg font-semibold text-charcoal-900 sm:text-xl">
                {isUrdu ? "آرڈر کامیابی سے تیار ہو گیا" : "Order Prepared Successfully"}
              </div>
              <div className="mt-1 text-sm text-stone-600">
                {orderPopupData.channel === "whatsapp"
                  ? isUrdu
                    ? "واٹس ایپ آرڈر کی تفصیل تیار ہے۔ براہ کرم نیچے سے کاپی یا اوپن کریں۔"
                    : "Your WhatsApp order details are ready. Copy or open WhatsApp below."
                  : isUrdu
                  ? "ای میل آرڈر کامیابی سے بھیج دیا گیا ہے۔ تفصیل آپ کے ریکارڈ کے لیے موجود ہے۔"
                  : "Your email order has been sent successfully. Details are available for your records."}
              </div>
            </div>
          </div>
          <div className="mt-4 flex-1 overflow-y-auto pr-1">
            <div className="grid gap-3 rounded-2xl border border-stone-200/80 bg-white/90 p-4 text-xs text-stone-700 sm:grid-cols-2 sm:text-sm">
              <div>
                <span className="font-semibold text-charcoal-900">
                  {isUrdu ? "آرڈر آئی ڈی: " : "Order ID: "}
                </span>
                {orderPopupData.orderId}
              </div>
              <div>
                <span className="font-semibold text-charcoal-900">
                  {isUrdu ? "چینل: " : "Channel: "}
                </span>
                {orderPopupData.channel === "whatsapp"
                  ? isUrdu
                    ? "واٹس ایپ"
                    : "WhatsApp"
                  : isUrdu
                  ? "ای میل"
                  : "Email"}
              </div>
              <div>
                <span className="font-semibold text-charcoal-900">
                  {isUrdu ? "تاریخ: " : "Date: "}
                </span>
                {orderPopupData.orderDate}
              </div>
              <div>
                <span className="font-semibold text-charcoal-900">
                  {isUrdu ? "وقت: " : "Time: "}
                </span>
                {orderPopupData.orderTime}
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-stone-200/70 bg-white/80">
              <OrderTable items={orderPopupData.items} isUrdu={isUrdu} />
              <OrderCart items={orderPopupData.items} isUrdu={isUrdu} />
            </div>
            <OrderSummary
              isUrdu={isUrdu}
              totalPkr={orderPopupData.totalPkr}
              totalUsd={orderPopupData.totalUsd}
              note={orderPopupData.note}
              copyText={orderPopupData.copyText}
            />
          </div>
          <div
            className={`mt-4 flex flex-wrap items-center gap-2 ${
              isUrdu ? "justify-end" : "justify-start"
            }`}
          >
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-soft transition-colors hover:border-primary-300"
            >
              <Copy className="h-3.5 w-3.5" />
              {copySuccess
                ? isUrdu
                  ? "کاپی ہو گیا"
                  : "Copied"
                : isUrdu
                ? "تفصیل کاپی کریں"
                : "Copy Details"}
            </button>
            {orderPopupData.channel === "whatsapp" && orderPopupData.whatsappUrl ? (
              <a
                href={orderPopupData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-premium"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {isUrdu ? "واٹس ایپ اوپن کریں" : "Open WhatsApp"}
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-soft"
            >
              {isUrdu ? "بند کریں" : "Close"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
