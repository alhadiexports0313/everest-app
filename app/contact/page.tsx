"use client";

import { Mail, MessageCircle, Instagram, Facebook, Music, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";

export default function ContactPage() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (!successOpen) return;
    const timeout = window.setTimeout(() => {
      setSuccessOpen(false);
    }, 3500);
    return () => window.clearTimeout(timeout);
  }, [successOpen]);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <ContactHeader isUrdu={isUrdu} />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <p className="text-stone-700 leading-relaxed font-light">
                {isUrdu
                  ? "ہر آرڈر اخلاقی حصول، مقامی روزگار اور ہمالیہ میں کمیونٹی کی بھلائی کی حمایت کرتا ہے۔"
                  : "Every order supports ethical harvesting, local livelihoods, and community well-being in the Himalayas."}
              </p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div
                className={`flex items-start ${isUrdu ? "flex-row-reverse space-x-reverse space-x-4" : "space-x-4"}`}
              >
                <Mail className="w-6 h-6 text-primary-700 mt-1" />
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                    {isUrdu ? "ای میل" : "Email"}
                  </h3>
                  <a
                    href="mailto:everestorganicshilajet@gmail.com"
                    className="text-stone-700 hover:text-primary-700 transition-colors"
                  >
                    everestorganicshilajet@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div
                className={`flex items-start ${isUrdu ? "flex-row-reverse space-x-reverse space-x-4" : "space-x-4"}`}
              >
                <MessageCircle className="w-6 h-6 text-primary-700 mt-1" />
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h3 className="font-display text-lg font-bold text-charcoal-900 mb-1">
                    {isUrdu ? "واٹس ایپ" : "WhatsApp"}
                  </h3>
                  <a
                    href="https://wa.me/923454490326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 hover:text-primary-700 transition-colors"
                  >
                    0345 449 0326
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft">
              <div className={`text-sm font-semibold text-charcoal-900 mb-4 ${isUrdu ? "text-right" : "text-left"}`}>
                {isUrdu ? "کمیونٹی سے جُڑیں" : "Follow the community"}
              </div>
              <div className={`flex flex-wrap gap-3 ${isUrdu ? "justify-end" : ""}`}>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:border-primary-300 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-primary-700" />
                  Instagram
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:border-primary-300 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 text-primary-700" />
                  Facebook
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 hover:border-primary-300 transition-colors"
                  aria-label="TikTok"
                >
                  <Music className="w-4 h-4 text-primary-700" />
                  TikTok
                </a>
              </div>
            </div>
          </div>
          <ContactForm isUrdu={isUrdu} onSuccess={() => setSuccessOpen(true)} />
        </div>
      </div>
      <AnimatePresence>
        {successOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              aria-label="Close success modal"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className={`relative w-full max-w-md max-h-[80vh] rounded-2xl bg-white p-6 shadow-xl ${
                isUrdu ? "text-right" : "text-left"
              }`}
            >
              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                className="absolute right-4 top-4 rounded-full border border-stone-200/70 bg-white/90 p-2 text-stone-500 transition-colors hover:text-stone-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="text-lg font-semibold text-charcoal-900">
                {isUrdu ? "پیغام کامیابی سے بھیج دیا گیا" : "Message Sent Successfully"}
              </div>
              <div className="mt-2 text-sm text-stone-600">
                {isUrdu
                  ? "ایورسٹ آرگینک سلاجیت سے رابطہ کرنے کا شکریہ"
                  : "Thank you for contacting Everest Organic Shilajet"}
              </div>
              <div className="mt-3 text-sm text-stone-600">
                {isUrdu ? "ہماری ٹیم جلد ہی آپ سے رابطہ کرے گی۔" : "Our team will get back to you shortly."}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
