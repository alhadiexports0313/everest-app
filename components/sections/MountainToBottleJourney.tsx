"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const steps = [
  {
    title: "Extraction",
    urdu: "استخراج",
    image: "/images/journey/extraction.jpg",
    altEn:
      "Pure Shilajit resin carefully harvested from pristine Himalayan rocks in Gilgit-Baltistan.",
    altUr:
      "گلگت بلتستان کے بلند و بالا پہاڑوں سے خالص شلاجیت رال احتیاط سے حاصل کی جاتی ہے۔",
    descriptionEn:
      "Pure Shilajit resin carefully harvested from pristine Himalayan rocks in Gilgit-Baltistan, preserving nature’s authenticity and mountain potency.",
    descriptionUr:
      "گلگت بلتستان کے بلند و بالا پہاڑوں سے خالص شلاجیت رال احتیاط سے حاصل کی جاتی ہے، قدرتی طاقت اور خالص پن کو محفوظ رکھتے ہوئے۔",
  },
  {
    title: "Initial Cleaning",
    urdu: "ابتدائی صفائی",
    image: "/images/journey/initial-cleaning.jpg",
    altEn:
      "Raw Shilajit being dissolved and filtered using purified water in a controlled environment.",
    altUr:
      "کچا شلاجیت صاف پانی میں حل کر کے فلٹر کیا جا رہا ہے۔",
    descriptionEn:
      "Raw Shilajit is carefully dissolved and filtered using purified water to remove natural impurities while preserving its bioactive compounds.",
    descriptionUr:
      "کچا شلاجیت صاف پانی میں حل کر کے فلٹر کیا جاتا ہے تاکہ قدرتی نجاستیں دور ہوں اور اس کی حیاتیاتی خصوصیات محفوظ رہیں۔",
  },
  {
    title: "Purification",
    urdu: "تطہیر",
    image: "/images/journey/purification.jpg",
    altEn:
      "Gentle heating and scientific purification process of Shilajit in a modern lab.",
    altUr:
      "جدید لیبارٹری میں شلاجیت کی تطہیر کا عمل۔",
    descriptionEn:
      "Through gentle heating and advanced quality testing, Shilajit is purified to ensure optimal mineral richness and safety standards.",
    descriptionUr:
      "ہلکی حرارت اور جدید لیبارٹری ٹیسٹنگ کے ذریعے شلاجیت کو خالص بنایا جاتا ہے تاکہ معدنیات کی بھرپور مقدار اور محفوظ معیار یقینی بنایا جا سکے۔",
  },
  {
    title: "Concentration & Drying",
    urdu: "گاڑھا کرنا اور خشک کرنا",
    image: "/images/journey/concentration-drying.jpg",
    altEn:
      "Shilajit extract being concentrated and dried into smooth resin.",
    altUr:
      "شلاجیت کو گاڑھا اور خشک کر کے رال کی شکل دی جا رہی ہے۔",
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
      "Everest Organic Shilajet sealed in eco-friendly airtight glass container.",
    altUr:
      "ایورسٹ آرگینک شلاجیت ایئر ٹائٹ ماحول دوست پیکجنگ میں محفوظ۔",
    descriptionEn:
      "Carefully sealed in eco-friendly airtight packaging to preserve freshness, potency, and purity — ready for your wellness journey.",
    descriptionUr:
      "ماحول دوست، ایئر ٹائٹ پیکجنگ میں محفوظ کیا جاتا ہے تاکہ تازگی، طاقت اور خالص پن برقرار رہے۔",
  },
];

export default function MountainToBottleJourney() {
  const sectionRef = useRef<HTMLElement | null>(null);

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
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            MOUNTAIN → BOTTLE JOURNEY
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            From Himalayan Origin to Pure Wellness
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
                        alt={step.altEn}
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
                    className={`${isLeft ? "lg:order-2" : "lg:order-1"} max-w-xl`}
                  >
                    <h3 className="text-2xl lg:text-3xl font-semibold text-neutral-900">
                      {step.title}{" "}
                      <span className="text-[#c6a75e]">
                        | {step.urdu}
                      </span>
                    </h3>

                    <p className="mt-6 text-neutral-700 leading-relaxed">
                      {step.descriptionEn}
                    </p>

                    <p className="mt-4 text-neutral-600 leading-relaxed font-urdu">
                      {step.descriptionUr}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FINAL MESSAGE */}
        <div className="mt-32 text-center">
          <p className="text-xl font-medium text-neutral-900">
            From the Peaks of the Himalayas to Your Daily Wellness Ritual.
          </p>
        </div>

      </div>
    </section>
  );
}
