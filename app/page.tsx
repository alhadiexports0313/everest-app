import Hero from "@/components/sections/Hero";
import TickerStrip from "@/components/ui/TickerStrip";
import TrustBadges from "@/components/sections/TrustBadges";
import BenefitsGrid from "@/components/sections/BenefitsGrid";
import MountainToBottleJourney from "@/components/sections/MountainToBottleJourney";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ScienceSection from "@/components/sections/ScienceSection";
import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

const tickerItems = [
  { text: "Lab Tested & Verified for Ultimate Purity" },
  { text: "Directly from Gilgit-Baltistan Mountains" },
  { text: "مستند گلگت بلتستان سے حاصل شدہ", lang: "ur" },
  { text: "صحت مند اور خالص جڑی بوٹی", lang: "ur" },
  { text: "Rich in Fulvic & Trace Minerals" },
  { text: "Sustainably & Ethically Sourced" },
  { text: "صل ہمالیائی شلجت", lang: "ur" },
  { text: "خالصتاً قدرتی اور نامیاتی", lang: "ur" },
  { text: "Eco-Friendly Packaging for Conscious Living" },
  { text: "Trusted Quality, Nature’s Best" },
  { text: "ماحولیاتی لحاظ سے محفوظ پیکنگ", lang: "ur" },
  { text: "اخلاقی طور پر حاصل شدہ معیار", lang: "ur" },
  { text: "100% Pure Himalayan Shilajit" },
  { text: "Lab Tested for Authenticity" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <TickerStrip
        items={tickerItems.map((item) => (
          <span
            key={item.text}
            className={item.lang === "ur" ? "font-urdu text-[12px]" : undefined}
          >
            {item.text}
          </span>
        ))}
        speed={36}
      />
      <TrustBadges />
      <BenefitsGrid />
      <MountainToBottleJourney />
      <ProductShowcase />
      <ScienceSection />
      <OriginStory />
      <Testimonials />
      <CTA />
    </>
  );
}
