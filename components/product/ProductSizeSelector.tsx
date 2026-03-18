type SizeOption = { label: string; price: number };

type SizeSelectorProps = {
  variant: "products" | "featured";
  isUrdu: boolean;
  sizes: SizeOption[];
  selectedSizeLabel: string;
  onSelect: (size: SizeOption) => void;
  formatPkr: (value: number) => string;
  formatUsd: ((value: number) => string) | null;
  currency: "PKR" | "USD";
  canShowUsd: boolean;
};

export const ProductSizeSelector = ({
  variant,
  isUrdu,
  sizes,
  selectedSizeLabel,
  onSelect,
  formatPkr,
  formatUsd,
  currency,
  canShowUsd,
}: SizeSelectorProps) => {
  const title =
    variant === "products"
      ? isUrdu
        ? "سائز کا انتخاب"
        : "Size Selection"
      : isUrdu
      ? "سائز منتخب کریں"
      : "Select Size";

  return (
    <div className="mt-6">
      <div className={`text-sm font-semibold text-charcoal-900 mb-3 ${isUrdu ? "font-urdu" : ""}`}>
        {title}
      </div>
      <div className={`flex flex-wrap ${variant === "products" ? "gap-2" : "gap-3"}`}>
        {sizes.map((size) => (
          <button
            key={size.label}
            type="button"
            onClick={() => onSelect(size)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedSizeLabel === size.label
                ? "bg-primary-700 text-white shadow-premium"
                : "bg-white text-stone-700 border border-stone-200 hover:border-primary-300"
            }`}
          >
            <span className="block">{size.label}</span>
            <span
              className={`block text-[11px] ${
                selectedSizeLabel === size.label ? "text-white/85" : "text-stone-500"
              }`}
            >
              {currency === "USD" && canShowUsd && formatUsd
                ? formatUsd(size.price)
                : formatPkr(size.price)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
