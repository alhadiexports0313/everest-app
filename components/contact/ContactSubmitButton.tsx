type ContactSubmitButtonProps = {
  isUrdu: boolean;
  isSubmitting: boolean;
};

export const ContactSubmitButton = ({
  isUrdu,
  isSubmitting,
}: ContactSubmitButtonProps) => (
  <button
    type="submit"
    disabled={isSubmitting}
    aria-busy={isSubmitting}
    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-700 to-primary-800 px-6 py-3 text-white font-semibold shadow-premium transition-all hover:shadow-premium-lg disabled:cursor-not-allowed disabled:opacity-60"
  >
    {isSubmitting
      ? isUrdu
        ? "پیغام بھیجا جا رہا ہے"
        : "Sending..."
      : isUrdu
      ? "پیغام بھیجیں"
      : "Send Message"}
  </button>
);
