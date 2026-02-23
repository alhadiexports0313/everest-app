"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  Brain,
  Flame,
  HeartPulse,
  Moon,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { VerticalTicker } from "@/components/ui/TickerStrip";
import Image from "next/image";
import { useRef } from "react";

const benefits = [
  { label: "Reduces Stress & Anxiety", urdu: "تناؤ اور بے چینی میں کمی", icon: Moon },
  { label: "Enhanced Energy Levels", urdu: "توانائی میں اضافہ", icon: Zap },
  {
    label: "Improved Stamina & Athletic Performance",
    urdu: "اسٹیمنا اور کھیلوں کی کارکردگی میں بہتری",
    icon: Activity,
  },
  {
    label: "Mental Clarity & Cognitive Support",
    urdu: "ذہنی وضاحت اور دماغی کارکردگی میں اضافہ",
    icon: Brain,
  },
  { label: "Clear Skin & Stronger Hair", urdu: "صاف جلد اور مضبوط بال", icon: Sparkles },
  { label: "Anti-Aging Support", urdu: "بڑھتی عمر کے اثرات میں کمی", icon: Sparkles },
  {
    label: "Supports Healthy Testosterone Levels",
    urdu: "صحت مند ٹیسٹوسٹیرون کی سطح میں معاون",
    icon: Flame,
  },
  { label: "Peak Physical Performance", urdu: "بہترین جسمانی کارکردگی", icon: Target },
  { label: "Strengthens Immune System", urdu: "مدافعتی نظام کو مضبوط بناتا ہے", icon: ShieldCheck },
  { label: "Boosts Vitality & Endurance", urdu: "طاقت اور برداشت میں اضافہ", icon: HeartPulse },
];

export default function BenefitsGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-[#0b0f0d] text-white"
    >
      <div className="absolute inset-0 lux-dark-animated bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(45,69,56,0.5),transparent_55%),radial-gradient(circle_at_60%_80%,rgba(15,24,19,0.8),transparent_60%),linear-gradient(135deg,rgba(12,14,12,0.9),rgba(17,23,19,0.95),rgba(10,12,11,0.9))] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] xl:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.55)]"
          >
            <motion.div
              style={{ y: imageY }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0"
            >
              <Image
                src="/images/products/product_27.jpg"
                alt="Himalayan landscape"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/75" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-500/10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-10 sm:px-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-200/10 via-transparent to-transparent" />
              <div className="relative">
                <div className="text-center space-y-3">
                  <div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      Power of Nature – Proven Benefits
                    </h2>
                    <div className="mt-2 font-urdu text-xl sm:text-2xl text-amber-100/90">
                      قدرت کی طاقت – ثابت شدہ فوائد
                    </div>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-light">
                      Science-backed. Mountain-sourced. Performance-driven.
                    </p>
                    <p className="font-urdu text-sm sm:text-base text-stone-300 mt-2">
                      سائنس سے ثابت شدہ، پہاڑوں سے حاصل شدہ، کارکردگی پر مبنی۔
                    </p>
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 rounded-full bg-amber-200/10 blur-3xl" />
                  <div
                    className="relative font-sans"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                      maskImage:
                        "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                    }}
                  >
                    <VerticalTicker
                      items={benefits.map((benefit) => {
                        const Icon = benefit.icon;
                        return (
                          <span key={benefit.label} className="flex items-center gap-4">
                            <Icon className="h-4 w-4 text-amber-300/90" />
                            <span className="text-center">
                              <span className="block text-base sm:text-lg text-white">
                                {benefit.label}
                              </span>
                              <span className="block font-urdu text-sm sm:text-base text-amber-100/80">
                                {benefit.urdu}
                              </span>
                            </span>
                          </span>
                        );
                      })}
                      speed={36}
                      className="h-[340px] sm:h-[420px] lg:h-[460px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
