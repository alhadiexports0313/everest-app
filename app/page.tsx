import Hero from "@/components/sections/Hero";
import TrustBadges from "@/components/sections/TrustBadges";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ScienceSection from "@/components/sections/ScienceSection";
import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <ProductShowcase />
      <ScienceSection />
      <OriginStory />
      <Testimonials />
      <CTA />
    </>
  );
}
