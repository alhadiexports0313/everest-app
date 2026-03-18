import type { OrderPopupItem } from "@/types";

export const OrderTable = ({
  items,
  isUrdu,
}: {
  items: OrderPopupItem[];
  isUrdu: boolean;
}) => (
  <div className="hidden sm:block">
    <div className="grid grid-cols-5 gap-2 border-b border-stone-200/70 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-500">
      <span>{isUrdu ? "پروڈکٹ" : "Product"}</span>
      <span>{isUrdu ? "سائز" : "Size"}</span>
      <span className="text-center">{isUrdu ? "مقدار" : "Qty"}</span>
      <span className="text-right">{isUrdu ? "یونٹ قیمت" : "Unit"}</span>
      <span className="text-right">{isUrdu ? "سب ٹوٹل" : "Subtotal"}</span>
    </div>
    <div className="divide-y divide-stone-200/60 text-sm text-stone-700">
      {items.map((item, index) => (
        <div key={`${item.product}-${item.size}-${index}`} className="grid grid-cols-5 gap-2 px-4 py-3">
          <span className="font-semibold text-charcoal-900">{item.product}</span>
          <span>{item.size}</span>
          <span className="text-center">{item.quantity}</span>
          <span className="text-right">{item.unitPrice}</span>
          <span className="text-right font-semibold text-charcoal-900">{item.subtotal}</span>
        </div>
      ))}
    </div>
  </div>
);
