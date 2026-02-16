import TrustBadges from "@/components/sections/TrustBadges";
import ScienceSection from "@/components/sections/ScienceSection";

export default function AuthenticityQualityPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              Authenticity & Quality
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              Our authenticity promise is built on transparent sourcing, rigorous testing,
              and premium-grade standards from harvest to packaging.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Verified Origin",
                description:
                  "Every batch is traced back to high-altitude Himalayan sources for provenance.",
              },
              {
                title: "Lab Certified",
                description:
                  "Third-party testing verifies purity, potency, and heavy-metal safety.",
              },
              {
                title: "Export-Grade",
                description:
                  "Premium packaging and storage preserve bioactive compounds and freshness.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft text-left"
              >
                <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-stone-700 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TrustBadges />
      <ScienceSection />
    </>
  );
}
