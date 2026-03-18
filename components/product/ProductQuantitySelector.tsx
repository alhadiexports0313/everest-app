import type { RefObject } from "react";

type QuantitySelectorProps = {
  variant: "products" | "featured";
  isUrdu: boolean;
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  quantityInputRef: RefObject<HTMLInputElement>;
  checkoutAttempted: boolean;
  quantityInvalid: boolean;
};

export const ProductQuantitySelector = ({
  variant,
  isUrdu,
  quantity,
  setQuantity,
  quantityInputRef,
  checkoutAttempted,
  quantityInvalid,
}: QuantitySelectorProps) => (
  <div className="mt-6">
    <div
      className={`text-sm font-semibold text-charcoal-900 mb-3 ${
        isUrdu && variant === "featured" ? "font-urdu" : ""
      }`}
    >
      {isUrdu ? "مقدار" : "Quantity"}
    </div>
    <div
      className={`inline-flex items-center rounded-full border border-stone-200 bg-white px-2 py-1 shadow-soft ${
        isUrdu ? "flex-row-reverse" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
        className="h-9 w-9 rounded-full text-stone-600 transition-colors hover:bg-stone-100"
        aria-label={isUrdu ? "مقدار کم کریں" : "Decrease quantity"}
      >
        −
      </button>
      <input
        ref={quantityInputRef}
        type="number"
        min={1}
        max={500}
        step={1}
        inputMode="numeric"
        pattern="[0-9]*"
        value={quantity}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (nextValue === "") {
            setQuantity(1);
            return;
          }
          const parsed = Number(nextValue);
          if (Number.isNaN(parsed)) return;
          const clamped = Math.min(500, Math.max(1, parsed));
          setQuantity(clamped);
        }}
        className="min-w-[64px] bg-transparent text-center text-base font-semibold text-charcoal-900 focus:outline-none"
        aria-label={isUrdu ? "مقدار درج کریں" : "Enter quantity"}
      />
      <button
        type="button"
        onClick={() => setQuantity((prev) => (prev < 500 ? prev + 1 : prev))}
        className="h-9 w-9 rounded-full text-stone-600 transition-colors hover:bg-stone-100"
        aria-label={isUrdu ? "مقدار بڑھائیں" : "Increase quantity"}
      >
        +
      </button>
    </div>
    {checkoutAttempted && quantityInvalid ? (
      <div className={`mt-2 text-xs text-rose-500 ${isUrdu ? "text-right" : "text-left"}`}>
        {isUrdu ? "براہ کرم درست مقدار منتخب کریں" : "Please enter a valid quantity"}
      </div>
    ) : null}
  </div>
);
