import ProductShowcase from "@/components/sections/ProductShowcase";
import TrustBadges from "@/components/sections/TrustBadges";
import CTA from "@/components/sections/CTA";

export default function ProductsPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              Products
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              Explore our premium Shilajet collection crafted for purity, potency, and
              daily wellness.
            </p>
          </div>
        </div>
      </section>
      <TrustBadges />
      <ProductShowcase />
      <CTA />
    </>
  );
}
