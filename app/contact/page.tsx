"use client";

import { Mail, MessageCircle, Instagram, Facebook, Music } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeader } from "@/components/contact/ContactHeader";

export default function ContactPage() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
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
          <ContactForm isUrdu={isUrdu} />
        </div>
      </div>
    </section>
  );
}
