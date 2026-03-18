import type { OrderPopupItem } from "@/types";

export const OrderCart = ({
  items,
  isUrdu,
}: {
  items: OrderPopupItem[];
  isUrdu: boolean;
}) => (
  <div className="space-y-2 p-3 sm:hidden">
    {items.map((item, index) => (
      <div
        key={`${item.product}-${item.size}-${index}`}
        className="rounded-xl border border-stone-200/70 bg-stone-50/90 p-3 text-sm text-stone-700"
      >
        <div className="font-semibold text-charcoal-900">{item.product}</div>
        <div className="mt-1 text-xs text-stone-600">
          {isUrdu ? `سائز: ${item.size}` : `Size: ${item.size}`}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-stone-600">
          <span>{isUrdu ? `مقدار: ${item.quantity}` : `Qty: ${item.quantity}`}</span>
          <span>{isUrdu ? `یونٹ: ${item.unitPrice}` : `Unit: ${item.unitPrice}`}</span>
          <span>{isUrdu ? `سب ٹوٹل: ${item.subtotal}` : `Subtotal: ${item.subtotal}`}</span>
        </div>
      </div>
    ))}
  </div>
);
