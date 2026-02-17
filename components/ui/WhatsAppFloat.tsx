"use client";

import Link from "next/link";
import Image from "next/image";

interface WhatsAppFloatProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export default function WhatsAppFloat({
  phoneNumber,
  message,
  className,
}: WhatsAppFloatProps) {
  const encodedMessage = message ? encodeURIComponent(message) : undefined;
  const href = encodedMessage
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-24 right-4 z-40 inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-[#25D366] shadow-premium hover:shadow-premium-lg active:scale-95 transition-all ${className || ""}`}
    >
      <Image
        src="/whatsapp.svg"
        alt="WhatsApp"
        width={32}
        height={32}
        priority
      />
    </Link>
  );
}
