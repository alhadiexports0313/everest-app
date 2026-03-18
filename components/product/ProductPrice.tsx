import type { Dispatch, SetStateAction } from "react";

type ProductPriceBaseProps = {
  isUrdu: boolean;
  currency: "PKR" | "USD";
  setCurrency: Dispatch<SetStateAction<"PKR" | "USD">>;
  canShowUsd: boolean;
  primaryPrice: string | null;
  secondaryPrice: string | null;
  selectedSizeLabel: string;
  quantity: number;
  unitPriceUsd: string | null;
  unitPricePkr: number;
  formatPkr: (value: number) => string;
};

type ProductsPriceProps = ProductPriceBaseProps & {
  variant: "products";
};

type FeaturedPriceProps = ProductPriceBaseProps & {
  variant: "featured";
};

export const ProductPrice = (props: ProductsPriceProps | FeaturedPriceProps) => {
  const renderPriceToggle = (className: string) => (
    <div
      className={`inline-flex items-center rounded-full border border-stone-200 bg-white/80 p-1 text-[11px] font-semibold text-stone-500 ${className} ${
        props.isUrdu ? "flex-row-reverse" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => props.setCurrency("PKR")}
        aria-pressed={props.currency === "PKR"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          props.currency === "PKR" ? "bg-stone-900 text-white" : "text-stone-500"
        }`}
      >
        PKR
      </button>
      <button
        type="button"
        onClick={() => props.canShowUsd && props.setCurrency("USD")}
        aria-pressed={props.currency === "USD"}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          props.currency === "USD"
            ? "bg-stone-900 text-white"
            : props.canShowUsd
            ? "text-stone-500"
            : "text-stone-300"
        }`}
      >
        USD
      </button>
    </div>
  );

  if (props.variant === "products") {
    return (
      <div className="mt-5">
        <div className="text-sm text-stone-500">{props.isUrdu ? "قیمت" : "Price"}</div>
        {renderPriceToggle("mt-3")}
        <div className="text-3xl font-display font-bold text-charcoal-900">
          {props.primaryPrice}
        </div>
        {props.secondaryPrice ? (
          <div className="text-xs text-stone-500 mt-1">{props.secondaryPrice}</div>
        ) : null}
        <div className="text-xs text-stone-500 mt-1">
          {props.isUrdu
            ? `${props.selectedSizeLabel} جار × ${props.quantity}`
            : `${props.selectedSizeLabel} jar × ${props.quantity}`}
        </div>
        <div className="text-xs text-stone-500 mt-1">
          {props.isUrdu ? "فی جار" : "Per jar"}{" "}
          {props.currency === "USD" && props.unitPriceUsd
            ? props.unitPriceUsd
            : props.formatPkr(props.unitPricePkr)}
        </div>
      </div>
    );
  }

  return (
    <div className={props.isUrdu ? "text-left font-urdu" : "text-right"}>
      {renderPriceToggle("")}
      <div className="text-3xl font-bold text-charcoal-900 mt-2">
        {props.primaryPrice}
      </div>
      {props.secondaryPrice ? (
        <div className="text-xs text-stone-500 mt-1">{props.secondaryPrice}</div>
      ) : null}
      <div className="text-xs text-stone-500 mt-1">
        {props.isUrdu
          ? `${props.selectedSizeLabel} جار × ${props.quantity}`
          : `${props.selectedSizeLabel} jar × ${props.quantity}`}
      </div>
      <div className="text-xs text-stone-500 mt-1">
        {props.isUrdu ? "فی جار" : "Per jar"}{" "}
        {props.currency === "USD" && props.unitPriceUsd
          ? props.unitPriceUsd
          : props.formatPkr(props.unitPricePkr)}
      </div>
    </div>
  );
};
