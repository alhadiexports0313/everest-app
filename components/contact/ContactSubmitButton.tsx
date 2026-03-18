type ContactSubmitButtonProps = {
  isUrdu: boolean;
};

export const ContactSubmitButton = ({ isUrdu }: ContactSubmitButtonProps) => (
  <button
    type="submit"
    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-3 text-white font-semibold shadow-premium transition-all hover:shadow-premium-lg"
  >
    {isUrdu ? "پیغام بھیجیں" : "Send Message"}
  </button>
);
