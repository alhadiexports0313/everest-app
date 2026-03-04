"use client";

import { Mail, MessageCircle, Instagram, Facebook, Music } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function ContactPage() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
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
          <form
            className={`p-8 rounded-2xl glass-card border border-stone-200/50 shadow-soft space-y-5 ${
              isUrdu ? "text-right" : "text-left"
            }`}
          >
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                {isUrdu ? "پورا نام" : "Full Name"}
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={isUrdu ? "اپنا نام لکھیں" : "Your name"}
                dir={isUrdu ? "rtl" : "ltr"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                {isUrdu ? "ای میل" : "Email"}
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-900 mb-2">
                {isUrdu ? "پیغام" : "Message"}
              </label>
              <textarea
                rows={5}
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder={isUrdu ? "ہم کس طرح مدد کر سکتے ہیں؟" : "How can we help?"}
                dir={isUrdu ? "rtl" : "ltr"}
              />
            </div>
            <button className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-700 to-primary-800 text-white font-semibold rounded-lg shadow-premium hover:shadow-premium-lg transition-all">
              {isUrdu ? "پیغام بھیجیں" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
