"use client";

import { motion } from "framer-motion";
import { Mountain, MapPin, Users, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const originImages = [
  "product_9.jpg",
  "product_10.jpg",
  "product_11.jpg",
  "product_13.jpg",
  "product_23.jpg",
];

const originImagePaths = originImages.map(
  (name) => `/images/products/${encodeURIComponent(name)}`
);

export default function OriginStory() {
  const [originImage, setOriginImage] = useState(originImagePaths[0]);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";

  useEffect(() => {
    const pick = originImagePaths[Math.floor(Math.random() * originImagePaths.length)];
    setOriginImage(pick);
  }, []);

  return (
    <section id="origin" className="section-padding earth-gradient relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div
              className={`inline-flex items-center glass-card px-5 py-2.5 rounded-full border border-stone-200/50 mb-8 shadow-soft ${
                isUrdu ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
              }`}
            >
              <MapPin className="w-4 h-4 text-primary-700" />
              <span className={`text-sm font-medium text-primary-800 ${isUrdu ? "font-urdu" : ""}`}>
                {isUrdu ? "گلگت بلتستان، پاکستان" : "Gilgit-Baltistan, Pakistan"}
              </span>
            </div>

            <h2 className={`font-display text-display-3 font-bold text-charcoal-900 mb-8 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "ہمالیہ کے دل سے" : "From the Heart of the Himalayas"}
            </h2>

            <div className={`space-y-6 text-stone-700 leading-relaxed ${isUrdu ? "font-urdu text-right" : ""}`}>
              <p className="text-lg font-light">
                {isUrdu
                  ? "فضل کی جانب سے قائم کردہ ایورسٹ آرگینک سلاجیت، گلگت بلتستان کے پاکیزہ پہاڑوں سے گہرا تعلق رکھتی ہے جہاں صدیوں سے سلاجیت حاصل کی جاتی رہی ہے۔"
                  : "Founded by Fazal, Everest Organic Shilajit represents a deep connection to the pristine mountains of Gilgit-Baltistan, where Shilajet has been harvested for centuries."}
              </p>

              <p className="font-light">
                {isUrdu
                  ? "ہمارا سفر تین ہزار میٹر سے بلند مقامات سے شروع ہوتا ہے، جہاں خالص ترین سلاجیت قدرتی طور پر چٹانوں سے نمودار ہوتی ہے۔ ہم مقامی حصول کنندگان کے ساتھ براہِ راست کام کرتے ہیں تاکہ اخلاقی حصول اور منصفانہ تجارت یقینی رہے۔"
                  : "Our journey begins at altitudes above 3,000 meters, where the purest Shilajet naturally exudes from Himalayan rock faces. We work directly with local harvesters who have inherited this ancient knowledge, ensuring ethical sourcing and fair trade practices."}
              </p>

              <p className="font-light">
                {isUrdu
                  ? "ہر بیچ کو احتیاط سے جمع، جانچا اور پروسیس کیا جاتا ہے تاکہ قدرتی طاقت اور بایوایکٹو اجزاء محفوظ رہیں۔ ہم خالص ترین پریمیم سلاجیت فراہم کرتے ہوئے اُن کمیونٹیز کی بھی معاونت کرتے ہیں جو اسے ممکن بناتی ہیں۔"
                  : "Every batch is carefully collected, tested, and processed to preserve its natural potency and bioactive compounds. We're committed to bringing you the most authentic, premium-quality Shilajet while supporting the communities that make it possible."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-10">
              <div
                className={`flex items-start ${
                  isUrdu ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">
                    {isUrdu ? "پہاڑی ماخذ" : "Mountain Sourced"}
                  </h4>
                  <p className="text-sm text-stone-600 font-light">
                    {isUrdu
                      ? "بلند ہمالیائی ماخذ سے براہِ راست"
                      : "Directly from high-altitude Himalayan sources"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start ${
                  isUrdu ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">
                    {isUrdu ? "اخلاقی تجارت" : "Ethical Trade"}
                  </h4>
                  <p className="text-sm text-stone-600 font-light">
                    {isUrdu
                      ? "مقامی کمیونٹیز کی حمایت اور منصفانہ طریقۂ کار"
                      : "Supporting local communities and fair practices"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start ${
                  isUrdu ? "flex-row-reverse space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">
                    {isUrdu ? "خالص اور قدرتی" : "Pure & Natural"}
                  </h4>
                  <p className="text-sm text-stone-600 font-light">
                    {isUrdu
                      ? "کوئی ایڈیٹیوز، فلرز یا پروسیسنگ کیمیکلز نہیں"
                      : "No additives, fillers, or processing chemicals"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-forest shadow-premium-lg border border-primary-800/20">
              <Image
                src={originImage}
                alt="Gilgit-Baltistan origin product imagery"
                fill
                className="object-cover lux-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
                <div
                  className={`text-white text-2xl font-display font-bold mb-1 tracking-tight ${
                    isUrdu ? "font-urdu" : ""
                  }`}
                >
                  {isUrdu ? "گلگت بلتستان" : "Gilgit-Baltistan"}
                </div>
                <div className={`text-stone-200 text-sm font-light ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? "مستند سلاجیت کا اصل ماخذ" : "The Source of Authentic Shilajet"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
