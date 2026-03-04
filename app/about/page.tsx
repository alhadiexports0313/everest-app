"use client";

import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function AboutPage() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              {isUrdu ? "ایورسٹ آرگینک کے بارے میں" : "About Everest Organic"}
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              {isUrdu
                ? "فضل نے ایورسٹ آرگینک کی بنیاد ہمالیائی ورثے کے احترام اور پہاڑوں کے قریب رہنے والی کمیونٹیز کی توانائی بڑھانے کے لیے رکھی۔ ان کا وژن یہ ہے کہ مستند، لیب ٹیسٹ شدہ سلاجیت دنیا تک پہنچے، مگر اس کی اصل روح برقرار رہے۔"
                : "Fazal founded Everest Organic to honor Himalayan heritage while empowering the people who live closest to the mountains. His vision is to bring authentic, lab-tested Shilajet to the world without losing the soul of its origin."}
            </p>
          </div>
          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-base text-stone-600 leading-relaxed font-light">
              {isUrdu
                ? "ہر حاصل ایک اعزاز ہے — پہاڑی روایاتِ حصول، ماحول کے احترام اور اس یقین کے ساتھ کہ ویلنَس کو مقامی کمیونٹیز کے معیارِ زندگی کو بہتر بنانا چاہیے۔ ہم زمین کی حفاظت کرتے ہیں، ہر بیچ جمع کرنے والوں کی قدر کرتے ہیں، اور ہمالیائی کہانی کو وقار کے ساتھ پیش کرتے ہیں۔"
                : "Every harvest is a point of pride — guided by mountain sourcing traditions, respect for the environment, and a belief that wellness should uplift local communities. We safeguard the landscape, honor the hands that gather each batch, and share the Himalayan story with care."}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Heritage First",
                description:
                  "Rooted in Himalayan traditions that value purity, patience, and respect.",
                urduTitle: "ورثہ اولین",
                urduDescription:
                  "ہمالیائی روایات سے جڑے رہنا جو خلوص، صبر اور احترام کو اہمیت دیتی ہیں۔",
              },
              {
                title: "Empowerment",
                description:
                  "Supporting local communities with fair partnerships and shared growth.",
                urduTitle: "بااختیار بنانا",
                urduDescription:
                  "منصفانہ شراکت داری کے ذریعے مقامی کمیونٹیز کی معاونت اور مشترکہ ترقی۔",
              },
              {
                title: "Sustainability",
                description:
                  "Responsible harvesting that protects fragile mountain ecosystems.",
                urduTitle: "پائیداری",
                urduDescription:
                  "ذمہ دار حصول جو نازک پہاڑی ماحولیات کو محفوظ رکھتا ہے۔",
              },
              {
                title: "Mountain Pride",
                description:
                  "Celebrating the source with transparent, traceable Himalayan sourcing.",
                urduTitle: "پہاڑی وقار",
                urduDescription:
                  "شفاف اور قابلِ تصدیق ہمالیائی حصول کے ساتھ ماخذ کا احترام۔",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft ${
                  isUrdu ? "text-right" : "text-left"
                }`}
              >
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  {isUrdu ? item.urduTitle : item.title}
                </h3>
                <p className="text-stone-700 leading-relaxed font-light">
                  {isUrdu ? item.urduDescription : item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OriginStory />
      <Testimonials />
      <CTA />
    </>
  );
}
