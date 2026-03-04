import Hero from "@/components/sections/Hero";
import TickerStrip from "@/components/ui/TickerStrip";
import TrustBadges from "@/components/sections/TrustBadges";
import BenefitsGrid from "@/components/sections/BenefitsGrid";
import MountainToBottleJourney from "@/components/sections/MountainToBottleJourney";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import CertificationBlock from "@/components/sections/CertificationBlock";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ScienceSection from "@/components/sections/ScienceSection";
import KnowledgePreview from "@/components/sections/KnowledgePreview";
import LuxuryImageCarousel from "@/components/sections/LuxuryImageCarousel";
import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getLocale, getServerMessage } from "@/lib/i18n-server";

const iconClassName = "h-6 w-6 text-amber-300 animate-shimmer";

const BeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3h6M10 3v4l-4.5 7.5A3 3 0 008.1 19.5h7.8a3 3 0 002.6-4.5L14 7V3" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 12h7" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75l2.25 2.25L15 9.75" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3l7.5 3v6c0 5.25-3.75 9.75-7.5 10.5C8.25 21.75 4.5 17.25 4.5 12V6L12 3z" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 11.25c0 6.75-7.5 9.75-7.5 9.75s-7.5-3-7.5-9.75a7.5 7.5 0 1115 0z" />
  </svg>
);

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 16.5c4.5-4.5 10.5-6 12-6-1.5 1.5-3 7.5-7.5 10.5A6 6 0 016 16.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6c-1.5 1.5-3 4.5-3 7.5" />
  </svg>
);

const ArrowPathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12a7.5 7.5 0 01-13.5 4.773M4.5 12a7.5 7.5 0 0113.5-4.773" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 7.5v4.5H15M4.5 16.5v-4.5H9" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6l1.313 3.096L13.5 9.75l-3.187 1.654L9 15l-1.313-3.596L4.5 9.75l3.187-.654L9 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 6.75L15 9l2.25.75L15 10.5l-.75 2.25L13.5 10.5l-2.25-.75L13.5 9l.75-2.25z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={iconClassName}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.75.75 0 011.04 0l2.2 2.25 3.12.453a.75.75 0 01.416 1.279l-2.255 2.195.53 3.116a.75.75 0 01-1.088.791L12 12.347l-2.781 1.476a.75.75 0 01-1.088-.79l.53-3.117L6.406 7.481a.75.75 0 01.416-1.28l3.12-.453 2.2-2.25z" />
  </svg>
);

const iconMapping: Record<string, () => JSX.Element> = {
  shield: ShieldCheckIcon,
  map: MapPinIcon,
  leaf: LeafIcon,
  sparkle: SparklesIcon,
  recycle: ArrowPathIcon,
  star: StarIcon,
  beaker: BeakerIcon,
};

export default async function Home() {
  const locale = await getLocale();
  const tickerItems =
    (await getServerMessage<{ text: string; icon: string }[]>(
      "home.ticker.items",
      locale
    )) ?? [];
  return (
    <>
      <Hero />
      <TickerStrip
        items={tickerItems.map((item) => {
          const Icon = iconMapping[item.icon] ?? BeakerIcon;
          const isUrdu = locale === "ur";
          return (
            <span
              key={item.text}
              dir={isUrdu ? "rtl" : "ltr"}
              className={
                isUrdu
                  ? "font-urdu text-[14px] inline-flex items-center gap-2 flex-row-reverse"
                  : "inline-flex items-center gap-2"
              }
            >
              <Icon />
              {item.text}
            </span>
          );
        })}
        speed={36}
      />
      <TrustBadges />
      <BenefitsGrid />
      <MountainToBottleJourney />
      <FeaturedProduct />
      <CertificationBlock />
      <ProductShowcase />
      <ScienceSection />
      <KnowledgePreview />
      <LuxuryImageCarousel />
      <OriginStory />
      <Testimonials />
      <CTA />
    </>
  );
}
