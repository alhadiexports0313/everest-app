type ContactFieldOption = {
  value: string;
  label: string;
};

type ContactFieldValues = {
  fullName: string;
  email: string;
  subject: string;
  phone: string;
  orderId: string;
};

type ContactFieldErrors = {
  fullName?: string;
  email?: string;
  subject?: string;
};

type ContactFieldsProps = {
  isUrdu: boolean;
  values: ContactFieldValues;
  errors: ContactFieldErrors;
  onChange: (field: keyof ContactFieldValues, value: string) => void;
  subjectOptions: ContactFieldOption[];
};

export const ContactFields = ({
  isUrdu,
  values,
  errors,
  onChange,
  subjectOptions,
}: ContactFieldsProps) => (
  <>
    <div>
      <label className="block text-sm font-medium text-charcoal-900 mb-2">
        {isUrdu ? "پورا نام" : "Full Name"}
      </label>
      <input
        type="text"
        required
        value={values.fullName}
        onChange={(event) => onChange("fullName", event.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
        placeholder={isUrdu ? "اپنا نام لکھیں" : "Enter your full name"}
        dir={isUrdu ? "rtl" : "ltr"}
      />
      {errors.fullName ? (
        <div className="mt-2 text-xs text-rose-500">{errors.fullName}</div>
      ) : null}
    </div>
    <div>
      <label className="block text-sm font-medium text-charcoal-900 mb-2">
        {isUrdu ? "ای میل" : "Email"}
      </label>
      <input
        type="email"
        required
        value={values.email}
        onChange={(event) => onChange("email", event.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
        placeholder="you@example.com"
        dir="ltr"
      />
      {errors.email ? (
        <div className="mt-2 text-xs text-rose-500">{errors.email}</div>
      ) : null}
    </div>
    <div>
      <label className="block text-sm font-medium text-charcoal-900 mb-2">
        {isUrdu ? "موضوع" : "Subject"}
      </label>
      <select
        required
        value={values.subject}
        onChange={(event) => onChange("subject", event.target.value)}
        className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
      >
        <option value="">
          {isUrdu ? "موضوع منتخب کریں" : "Select a subject"}
        </option>
        {subjectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors.subject ? (
        <div className="mt-2 text-xs text-rose-500">{errors.subject}</div>
      ) : null}
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-charcoal-900 mb-2">
          {isUrdu ? "فون نمبر (اختیاری)" : "Phone Number (Optional)"}
        </label>
        <input
          type="tel"
          value={values.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder={isUrdu ? "+92 300 1234567" : "+1 555 123 4567"}
          dir="ltr"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-charcoal-900 mb-2">
          {isUrdu ? "آرڈر آئی ڈی (اختیاری)" : "Order ID (Optional)"}
        </label>
        <input
          type="text"
          value={values.orderId}
          onChange={(event) => onChange("orderId", event.target.value)}
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-charcoal-900 shadow-soft focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-300"
          placeholder={isUrdu ? "مثال: EOS-123456" : "e.g., EOS-123456"}
          dir="ltr"
        />
      </div>
    </div>
  </>
);
