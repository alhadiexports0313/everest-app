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
              Fazal founded Everest Organic to honor Himalayan heritage while empowering
              the people who live closest to the mountains. His vision is to bring
              authentic, lab-tested Shilajet to the world without losing the soul of its
              origin.
            </p>
          </div>
          <div className="mt-10 max-w-4xl mx-auto text-center">
            <p className="text-base text-stone-600 leading-relaxed font-light">
              Every harvest is a point of pride — guided by mountain sourcing traditions,
              respect for the environment, and a belief that wellness should uplift local
              communities. We safeguard the landscape, honor the hands that gather each
              batch, and share the Himalayan story with care.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Heritage First",
                description:
                  "Rooted in Himalayan traditions that value purity, patience, and respect.",
              },
              {
                title: "Empowerment",
                description:
                  "Supporting local communities with fair partnerships and shared growth.",
              },
              {
                title: "Sustainability",
                description:
                  "Responsible harvesting that protects fragile mountain ecosystems.",
              },
              {
                title: "Mountain Pride",
                description:
                  "Celebrating the source with transparent, traceable Himalayan sourcing.",
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
