"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const steps = [
  {
    title: "Extraction",
    urdu: "استخراج",
    image: "/images/journey/extraction.jpg",
    altEn:
      "Pure Shilajit resin carefully harvested from pristine Himalayan rocks in Gilgit-Baltistan.",
    altUr:
      "گلگت بلتستان کے بلند و بالا پہاڑوں سے خالص سلاجیت رال احتیاط سے حاصل کی جاتی ہے۔",
    descriptionEn:
      "Pure Shilajit resin carefully harvested from pristine Himalayan rocks in Gilgit-Baltistan, preserving nature’s authenticity and mountain potency.",
    descriptionUr:
      "گلگت بلتستان کی بلند پہاڑی چٹانوں سے خالص سلاجیت رال احتیاط سے حاصل کی جاتی ہے تاکہ قدرتی خلوص اور پہاڑی طاقت محفوظ رہے۔",
  },
  {
    title: "Initial Cleaning",
    urdu: "ابتدائی صفائی",
    image: "/images/journey/initial-cleaning.jpg",
    altEn:
      "Raw Shilajit being dissolved and filtered using purified water in a controlled environment.",
    altUr:
      "کچی سلاجیت صاف پانی میں حل کر کے فلٹر کی جا رہی ہے۔",
    descriptionEn:
      "Raw Shilajit is carefully dissolved and filtered using purified water to remove natural impurities while preserving its bioactive compounds.",
    descriptionUr:
      "کچی سلاجیت صاف شدہ پانی میں حل کر کے فلٹر کی جاتی ہے تاکہ قدرتی آلودگیاں دور ہوں اور حیاتیاتی اجزاء محفوظ رہیں۔",
  },
  {
    title: "Purification",
    urdu: "تطہیر",
    image: "/images/journey/purification.jpg",
    altEn:
      "Gentle heating and scientific purification process of Shilajit in a modern lab.",
    altUr:
      "جدید لیبارٹری میں سلاجیت کی تطہیر کا عمل۔",
    descriptionEn:
      "Through gentle heating and advanced quality testing, Shilajit is purified to ensure optimal mineral richness and safety standards.",
    descriptionUr:
      "ہلکی حرارت اور جدید لیب ٹیسٹنگ سے سلاجیت کو خالص کیا جاتا ہے تاکہ معدنی بھرپوریت اور محفوظ معیار برقرار رہے۔",
  },
  {
    title: "Concentration & Drying",
    urdu: "گاڑھا کرنا اور خشک کرنا",
    image: "/images/journey/concentration-drying.jpg",
    altEn:
      "Shilajit extract being concentrated and dried into smooth resin.",
    altUr:
      "سلاجیت کو گاڑھا اور خشک کر کے رال کی صورت دی جا رہی ہے۔",
    descriptionEn:
      "The purified extract is gently concentrated and dried to achieve a smooth, potent resin with maximum nutritional integrity.",
    descriptionUr:
      "خالص محلول کو احتیاط سے گاڑھا اور خشک کیا جاتا ہے تاکہ طاقتور اور غذائیت سے بھرپور رال حاصل ہو۔",
  },
  {
    title: "Packaging",
    urdu: "حتمی پیکجنگ",
    image: "/images/journey/packaging.jpg",
    altEn:
      "Everest Organic Shilajit sealed in eco-friendly airtight glass container.",
    altUr:
      "ایورسٹ آرگینک سلاجیت ائیر ٹائٹ ماحول دوست پیکجنگ میں محفوظ۔",
    descriptionEn:
      "Carefully sealed in eco-friendly airtight packaging to preserve freshness, potency, and purity — ready for your wellness journey.",
    descriptionUr:
      "ماحول دوست ائیر ٹائٹ پیکجنگ میں محفوظ کیا جاتا ہے تاکہ تازگی، طاقت اور خلوص برقرار رہے۔",
  },
];

export default function MountainToBottleJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.25", "end 0.9"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-gradient-to-b from-white to-stone-50"
    >
      <div className="container mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-28">
          <h2 className={`text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "پہاڑ سے جار تک کا سفر" : "MOUNTAIN → BOTTLE JOURNEY"}
          </h2>
          <p className={`mt-4 text-lg text-neutral-600 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "ہمالیائی ماخذ سے خالص ویلنَس تک" : "From Himalayan Origin to Pure Wellness"}
          </p>
        </div>

        {/* STEPS WRAPPER */}
        <div className="relative">

          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2 hidden lg:block" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-[#c6a75e] origin-top -translate-x-1/2 hidden lg:block"
          />

          <div className="space-y-32">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className="relative grid lg:grid-cols-2 gap-16 items-center"
                >
                  {/* Gold Dot */}
                  <div className="absolute left-1/2 top-10 -translate-x-1/2 h-4 w-4 rounded-full bg-[#c6a75e] shadow-lg hidden lg:block" />

                  {/* IMAGE */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={isLeft ? "lg:order-1" : "lg:order-2"}
                  >
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
                      <Image
                        src={step.image}
                        alt={isUrdu ? step.altUr : step.altEn}
                        fill
                        className="object-cover lux-image"
                      />
                    </div>
                  </motion.div>

                  {/* TEXT */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`${isLeft ? "lg:order-2" : "lg:order-1"} max-w-xl ${isUrdu ? "text-right" : "text-left"}`}
                  >
                    <h3 className={`text-2xl lg:text-3xl font-semibold text-neutral-900 ${isUrdu ? "font-urdu" : ""}`}>
                      {isUrdu ? step.urdu : step.title}
                    </h3>

                    <p className={`mt-6 text-neutral-700 leading-relaxed ${isUrdu ? "font-urdu" : ""}`}>
                      {isUrdu ? step.descriptionUr : step.descriptionEn}
                    </p>

                    {isUrdu ? (
                      <p className="mt-4 text-neutral-500 leading-relaxed text-left font-sans" dir="ltr">
                        {step.descriptionEn}
                      </p>
                    ) : (
                      <p className="mt-4 text-neutral-500 leading-relaxed font-urdu">
                        {step.descriptionUr}
                      </p>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="mt-32 text-center">
          <p className={`text-xl font-medium text-neutral-900 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "ہمالیہ کی چوٹیوں سے آپ کے روزمرہ ویلنَس معمول تک"
              : "From the Peaks of the Himalayas to Your Daily Wellness Ritual."}
          </p>
        </div>

      </div>
    </section>
  );
}
