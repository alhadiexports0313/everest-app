type ContactHeaderProps = {
  isUrdu: boolean;
};

export const ContactHeader = ({ isUrdu }: ContactHeaderProps) => (
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
      {isUrdu ? "رابطہ اور کمیونٹی" : "Contact & Community"}
    </h1>
    <p className="text-lg text-stone-700 leading-relaxed font-light">
      {isUrdu
        ? "ہم بروقت جواب دیتے ہیں اور مقامی کمیونٹیز و پہاڑی حفاظت میں سرمایہ واپس لگاتے ہیں۔"
        : "We respond quickly and reinvest in local communities and mountain stewardship."}
    </p>
  </div>
);
