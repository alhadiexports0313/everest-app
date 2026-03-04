"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function CTA() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <section className="section-padding bg-gradient-forest text-white relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <div
            className={`inline-flex items-center bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 mb-8 shadow-soft ${
              isUrdu ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
            }`}
          >
            <Sparkles className="w-4 h-4 text-accent-400" />
            <span className={`text-sm font-medium ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "محدود مدت کی پیشکش" : "Limited Time Offer"}
            </span>
          </div>

          <h2 className={`font-display text-display-2 sm:text-display-1 font-bold mb-8 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "ایورسٹ آرگینک سلاجیت کی طاقت کا تجربہ کریں" : "Experience the Power of Everest Organic Shilajit"}
          </h2>

          <p className={`text-xl text-stone-200 mb-10 leading-relaxed max-w-2xl mx-auto font-light ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "ہزاروں افراد کے ساتھ شامل ہوں جنہوں نے پریمیم سلاجیت کے مستند فوائد دریافت کیے ہیں۔ لیب ٹیسٹڈ اور ایکسپورٹ معیار کی مصنوعات کے ساتھ آج ہی اپنے ویلنَس سفر کا آغاز کریں۔"
              : "Join thousands who have discovered the authentic benefits of premium Shilajet. Start your wellness journey today with our lab-tested, export-quality products."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#products"
              className="group inline-flex items-center justify-center px-10 py-4.5 bg-white text-primary-700 font-semibold rounded-lg shadow-premium lux-button"
            >
              <span className={isUrdu ? "font-urdu" : ""}>{isUrdu ? "ابھی خریدیں" : "Shop Now"}</span>
              <ArrowRight
                className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ${
                  isUrdu ? "mr-2 rotate-180" : "ml-2"
                }`}
              />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-4.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/15 shadow-soft lux-button"
            >
              <span className={isUrdu ? "font-urdu" : ""}>{isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className={`flex flex-wrap items-center justify-center gap-8 mt-12 text-sm text-stone-300 font-light ${isUrdu ? "font-urdu" : ""}`}>
            <div className={`flex items-center ${isUrdu ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"}`}>
              <span className="text-accent-400">✓</span>
              <span>{isUrdu ? "عالمی سطح پر مفت ترسیل" : "Free Shipping Worldwide"}</span>
            </div>
            <div className={`flex items-center ${isUrdu ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"}`}>
              <span className="text-accent-400">✓</span>
              <span>{isUrdu ? "30 دن میں رقم واپسی کی ضمانت" : "30-Day Money-Back Guarantee"}</span>
            </div>
            <div className={`flex items-center ${isUrdu ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"}`}>
              <span className="text-accent-400">✓</span>
              <span>{isUrdu ? "لیب ٹیسٹڈ اور مصدقہ" : "Lab Tested & Certified"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
