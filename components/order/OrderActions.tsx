import { Mail, MessageCircle } from "lucide-react";

export const OrderActions = ({
  isUrdu,
  whatsappLink,
  onWhatsAppClick,
  onEmailClick,
  emailSubmitting,
  emailError,
  wrapperClassName,
  whatsappClassName,
  emailClassName,
  errorClassName,
}: {
  isUrdu: boolean;
  whatsappLink: string;
  onWhatsAppClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onEmailClick: () => void;
  emailSubmitting: boolean;
  emailError: string | null;
  wrapperClassName: string;
  whatsappClassName: string;
  emailClassName: string;
  errorClassName: string;
}) => (
  <>
    <div className={wrapperClassName}>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onWhatsAppClick}
        className={whatsappClassName}
      >
        <MessageCircle className="w-4 h-4" />
        {isUrdu ? "واٹس ایپ پر آرڈر کریں" : "Order on WhatsApp"}
      </a>
      <button
        type="button"
        onClick={onEmailClick}
        disabled={emailSubmitting}
        aria-busy={emailSubmitting}
        className={emailClassName}
      >
        <Mail className="w-4 h-4" />
        {emailSubmitting
          ? isUrdu
            ? "ای میل بھیجا جا رہا ہے"
            : "Sending email"
          : isUrdu
          ? "ای میل کے ذریعے آرڈر کریں"
          : "Order via Email"}
      </button>
    </div>
    {emailError ? <div className={errorClassName}>{emailError}</div> : null}
  </>
);
