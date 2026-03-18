export const OrderSummary = ({
  isUrdu,
  totalPkr,
  totalUsd,
  note,
  copyText,
}: {
  isUrdu: boolean;
  totalPkr: string;
  totalUsd: string;
  note: string;
  copyText: string;
}) => (
  <>
    <div
      className={`mt-4 flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-100/80 px-4 py-2.5 text-sm font-semibold text-charcoal-900 ${
        isUrdu ? "flex-row-reverse" : ""
      }`}
    >
      <span>{isUrdu ? "کل رقم (PKR)" : "Total (PKR)"}</span>
      <span>{totalPkr}</span>
    </div>
    <div
      className={`mt-2 flex items-center justify-between rounded-2xl border border-stone-200/70 bg-stone-100/80 px-4 py-2.5 text-xs text-stone-600 ${
        isUrdu ? "flex-row-reverse" : ""
      }`}
    >
      <span>{isUrdu ? "کل رقم (USD)" : "Total (USD)"}</span>
      <span>{totalUsd}</span>
    </div>
    {note ? (
      <div className="mt-3 rounded-2xl border border-stone-200/70 bg-white/80 px-4 py-3 text-xs text-stone-600 sm:text-sm">
        <span className="font-semibold text-charcoal-900">
          {isUrdu ? "نوٹ: " : "Note: "}
        </span>
        {note}
      </div>
    ) : null}
    <div className="mt-4 rounded-2xl border border-stone-200 bg-white/90 p-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
        {isUrdu ? "کاپی ایبل تفصیل" : "Copyable Details"}
      </div>
      <textarea
        readOnly
        value={copyText}
        className="mt-2 h-32 w-full resize-none rounded-2xl border border-stone-200 bg-white px-3 py-2.5 font-mono text-[11px] leading-5 text-stone-700 focus:outline-none sm:h-36 sm:text-xs"
      />
    </div>
  </>
);
