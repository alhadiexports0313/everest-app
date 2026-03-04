"use client";

import { motion } from "framer-motion";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import type { Testimonial } from "@/types";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    urduName: "سارہ جانسن",
    location: "United States",
    urduLocation: "امریکہ",
    rating: 5,
    text: "I've tried several Shilajet brands, but Everest Organic is by far the purest and most effective. My energy levels have improved significantly, and I feel more balanced overall.",
    urduText:
      "میں نے کئی سلاجیت برانڈز آزمائے، مگر ایورسٹ آرگینک سب سے خالص اور مؤثر ثابت ہوا۔ توانائی میں واضح بہتری آئی اور مجموعی توازن بہتر ہوا۔",
    image: "SJ",
  },
  {
    name: "Ahmed Hassan",
    urduName: "احمد حسن",
    location: "Pakistan",
    urduLocation: "پاکستان",
    rating: 5,
    text: "As someone from the region, I can attest to the authenticity of this product. The quality is exceptional, and it's clear that Fazal and his team care deeply about purity and tradition.",
    urduText:
      "اس خطے سے تعلق رکھنے کے ناتے میں اس کی اصلیت کی گواہی دے سکتا ہوں۔ معیار غیر معمولی ہے اور واضح ہے کہ فضل اور ان کی ٹیم خلوص و روایت کو سنجیدگی سے نبھاتی ہے۔",
    image: "AH",
  },
  {
    name: "Dr. Emma Chen",
    urduName: "ڈاکٹر ایما چن",
    location: "Singapore",
    urduLocation: "سنگاپور",
    rating: 5,
    text: "I recommend Everest Organic Shilajit to my patients. The lab reports show exceptional purity, and the results speak for themselves. This is export-quality product.",
    urduText:
      "میں اپنے مریضوں کو ایورسٹ آرگینک سلاجیت کی سفارش کرتی ہوں۔ لیب رپورٹس غیر معمولی خلوص دکھاتی ہیں اور نتائج خود بولتے ہیں۔ یہ برآمدی معیار کی پروڈکٹ ہے۔",
    image: "EC",
  },
  {
    name: "Michael Thompson",
    urduName: "مائیکل تھامسن",
    location: "United Kingdom",
    urduLocation: "برطانیہ",
    rating: 5,
    text: "After three months of use, I've noticed improved focus and better recovery from workouts. The packaging is premium, and the product itself is clearly high quality.",
    urduText:
      "تین ماہ کے استعمال کے بعد توجہ میں بہتری اور ورزش کے بعد بہتر ریکوری واضح محسوس ہوئی۔ پیکیجنگ پریمیم ہے اور پروڈکٹ کا معیار نمایاں طور پر اعلیٰ ہے۔",
    image: "MT",
  },
  {
    name: "Priya Sharma",
    urduName: "پریا شرما",
    location: "India",
    urduLocation: "بھارت",
    rating: 5,
    text: "This reminds me of the authentic Shilajet my grandmother used to get from the mountains. Pure, potent, and exactly what I was looking for. Highly recommended!",
    urduText:
      "یہ مجھے اپنی نانی کے زمانے کی اصل سلاجیت کی یاد دلاتا ہے۔ خالص، طاقتور اور بالکل وہی جس کی تلاش تھی۔ بھرپور سفارش!",
    image: "PS",
  },
  {
    name: "James Wilson",
    urduName: "جیمز ولسن",
    location: "Australia",
    urduLocation: "آسٹریلیا",
    rating: 5,
    text: "The customer service is excellent, and the product arrived quickly despite international shipping. The quality is outstanding - you can tell it's the real deal.",
    urduText:
      "کسٹمر سروس شاندار ہے اور بین الاقوامی ترسیل کے باوجود پروڈکٹ تیزی سے پہنچی۔ معیار بے مثال ہے، واضح طور پر یہ اصل ہے۔",
    image: "JW",
  },
];

export default function Testimonials() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <section className="section-padding bg-stone-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`max-w-3xl mx-auto mb-20 ${isUrdu ? "text-right" : "text-center"}`}
        >
          <h2 className={`font-display text-display-3 font-bold text-charcoal-900 mb-6 tracking-tight ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "دنیا بھر میں ہزاروں افراد کا اعتماد" : "Trusted by Thousands Worldwide"}
          </h2>
          <p className={`text-lg text-stone-700 leading-relaxed font-light ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu
              ? "ہزاروں مطمئن صارفین میں شامل ہوں جنہوں نے ایورسٹ آرگینک سلاجیت کے فوائد محسوس کیے ہیں۔"
              : "Join thousands of satisfied customers who have experienced the benefits of Everest Organic Shilajit."}
          </p>
        </motion.div>

        <TestimonialsCarousel items={testimonials} isUrdu={isUrdu} />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 ${isUrdu ? "font-urdu text-center md:text-right" : "text-center"}`}
        >
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              10,000+
            </div>
            <div className="text-sm text-stone-600 font-light">
              {isUrdu ? "خوش صارفین" : "Happy Customers"}
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              4.9/5
            </div>
            <div className="text-sm text-stone-600 font-light">
              {isUrdu ? "اوسط ریٹنگ" : "Average Rating"}
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              50+
            </div>
            <div className="text-sm text-stone-600 font-light">
              {isUrdu ? "خدمت کیے گئے ممالک" : "Countries Served"}
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              99.9%
            </div>
            <div className="text-sm text-stone-600 font-light">
              {isUrdu ? "اطمینان کی شرح" : "Satisfaction Rate"}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
