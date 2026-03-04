"use client";

import { Beaker, ShieldCheck, Filter, Leaf, Droplets, Microscope, Package } from "lucide-react";
import TrustBadges from "@/components/sections/TrustBadges";
import ScienceSection from "@/components/sections/ScienceSection";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const confidencePoints = [
  {
    title: "Testing",
    description: "Independent lab reports validate purity and safety.",
    urduTitle: "لیب ٹیسٹنگ",
    urduDescription: "غیر جانبدار لیب رپورٹس خلوص اور حفاظت کی تصدیق کرتی ہیں۔",
    icon: Beaker,
  },
  {
    title: "Mineral Richness",
    description: "Fulvic compounds and trace minerals preserved naturally.",
    urduTitle: "معدنی بھرپوریت",
    urduDescription: "فولویِک مرکبات اور ٹریس منرلز قدرتی طور پر محفوظ رہتے ہیں۔",
    icon: Droplets,
  },
  {
    title: "Purification",
    description: "Careful filtering removes impurities without harsh chemicals.",
    urduTitle: "تصفیہ کاری",
    urduDescription: "نرم فلٹریشن کے ذریعے بغیر سخت کیمیکلز کے آلودگیاں دور کی جاتی ہیں۔",
    icon: Filter,
  },
  {
    title: "Ethical Harvesting",
    description: "Respectful sourcing that protects mountain communities.",
    urduTitle: "اخلاقی حصول",
    urduDescription: "ایسا حصول جو پہاڑی کمیونٹیز کو تحفظ اور وقار دیتا ہے۔",
    icon: Leaf,
  },
];

const transparencySteps = [
  {
    title: "Lab Style Verification",
    description: "Batch-level testing for heavy metals, potency, and microbial safety.",
    urduTitle: "لیب طرز تصدیق",
    urduDescription: "ہیوی میٹل، افادیت اور مائیکروب سیفٹی کے لیے بیچ لیول ٹیسٹنگ۔",
    icon: Microscope,
  },
  {
    title: "Purity Assurance",
    description: "No additives, fillers, or synthetic processing at any stage.",
    urduTitle: "خلوص کی ضمانت",
    urduDescription: "کسی بھی مرحلے میں ایڈیٹیوز، فلرز یا مصنوعی پراسیسنگ نہیں۔",
    icon: ShieldCheck,
  },
  {
    title: "Careful Filtering",
    description: "Multi-stage filtration preserves bioactive integrity.",
    urduTitle: "باریک فلٹریشن",
    urduDescription: "کئی مراحل کی فلٹریشن بایوایکٹو سالمیت کو محفوظ رکھتی ہے۔",
    icon: Filter,
  },
  {
    title: "Safe Processing",
    description: "Gentle heating protects fulvic acids and mineral profile.",
    urduTitle: "محفوظ پراسیسنگ",
    urduDescription: "نرم حرارت فولویِک ایسڈز اور معدنی پروفائل کو محفوظ رکھتی ہے۔",
    icon: Beaker,
  },
  {
    title: "Eco Packing",
    description: "Airtight, eco-conscious packaging safeguards freshness.",
    urduTitle: "ماحول دوست پیکجنگ",
    urduDescription: "ائیر ٹائٹ اور ماحول دوست پیکجنگ تازگی کو برقرار رکھتی ہے۔",
    icon: Package,
  },
  {
    title: "Mineral Validation",
    description: "Consistency checks confirm mineral richness across every batch.",
    urduTitle: "معدنی توثیق",
    urduDescription: "ہر بیچ میں معدنی بھرپوریت کی یکسانیت کی تصدیق کی جاتی ہے۔",
    icon: Droplets,
  },
];

export default function AuthenticityQualityPage() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              {isUrdu ? "اصلیت اور معیار" : "Authenticity & Quality"}
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              {isUrdu
                ? "سائنسی اعتماد کی بنیاد شفافیت ہے۔ ہم ہر بیچ کی تصدیق کرتے ہیں، معدنی بھرپوریت محفوظ رکھتے ہیں، اور پہاڑی حصول سے پیکجنگ تک ہر مرحلہ دستاویزی بناتے ہیں۔"
                : "Scientific confidence starts with transparency. We verify every batch, protect mineral richness, and document each step from mountain sourcing to final packaging."}
            </p>
          </div>
          <div
            className={`mt-10 text-center text-sm text-primary-700 font-semibold ${
              isUrdu ? "tracking-normal" : "uppercase tracking-[0.35em]"
            }`}
          >
            {isUrdu ? "شفافیت ہی اعتماد ہے" : "Transparency = Trust"}
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {confidencePoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mt-4 mb-2">
                    {isUrdu ? item.urduTitle : item.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-light">
                    {isUrdu ? item.urduDescription : item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-6 tracking-tight">
              {isUrdu ? "لیب معیار کی شفافیت" : "Lab-Style Transparency"}
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              {isUrdu
                ? "واضح معیارات، دستاویزی پراسیسنگ، اور تصفیہ کے ہر مرحلے پر قابلِ پیمائش نتائج۔"
                : "Clear standards, documented processing, and measurable results at every stage of purification."}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-3 mb-4 text-primary-700 ${
                      isUrdu ? "flex-row-reverse justify-end" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span
                      className={`text-xs font-semibold ${
                        isUrdu ? "tracking-normal" : "uppercase tracking-[0.25em]"
                      }`}
                    >
                      {isUrdu ? "تصدیق شدہ" : "Verified"}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2">
                    {isUrdu ? step.urduTitle : step.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-light">
                    {isUrdu ? step.urduDescription : step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <TrustBadges />
      <ScienceSection />
    </>
  );
}
