import OriginStory from "@/components/sections/OriginStory";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export default function AboutPage() {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
              About Everest Organic
            </h1>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              We are a premium Himalayan wellness brand dedicated to delivering authentic,
              lab-tested Shilajet from the mountains of Gilgit-Baltistan.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Authentic Source",
                description:
                  "Sourced directly from high-altitude Himalayan regions, ensuring purity and provenance.",
              },
              {
                title: "Scientific Rigor",
                description:
                  "Every batch is third-party tested for heavy metals, purity, and potency.",
              },
              {
                title: "Premium Craft",
                description:
                  "Carefully harvested, refined, and packaged to meet export-quality standards.",
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
      <OriginStory />
      <Testimonials />
      <CTA />
    </>
  );
}
