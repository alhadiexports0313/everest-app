type ContactTextareaProps = {
  isUrdu: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export const ContactTextarea = ({
  isUrdu,
  value,
  error,
  onChange,
}: ContactTextareaProps) => (
  <div>
    <label className="block text-sm font-medium text-charcoal-900 mb-2">
      {isUrdu ? "پیغام" : "Message"}
    </label>
    <textarea
      rows={5}
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
      placeholder={isUrdu ? "ہم کس طرح مدد کر سکتے ہیں؟" : "How can we help?"}
      dir={isUrdu ? "rtl" : "ltr"}
    />
    {error ? <div className="mt-2 text-xs text-rose-500">{error}</div> : null}
  </div>
);
