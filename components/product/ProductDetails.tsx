export const ProductDetails = ({
  isUrdu,
  label,
  title,
}: {
  isUrdu: boolean;
  label: string;
  title: string;
}) => (
  <div className={isUrdu ? "text-right" : "text-left"}>
    <div
      className={`text-xs text-stone-400 ${
        isUrdu ? "tracking-normal font-urdu" : "uppercase tracking-[0.3em]"
      }`}
    >
      {label}
    </div>
    <div
      className={`font-display text-2xl font-bold text-charcoal-900 mt-2 ${
        isUrdu ? "font-urdu" : ""
      }`}
    >
      {title}
    </div>
  </div>
);
