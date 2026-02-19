import { Beaker, ShieldCheck, Filter, Leaf, Droplets, Microscope, Package } from "lucide-react";
import TrustBadges from "@/components/sections/TrustBadges";
import ScienceSection from "@/components/sections/ScienceSection";

const confidencePoints = [
  {
    title: "Testing",
    description: "Independent lab reports validate purity and safety.",
    icon: Beaker,
  },
  {
    title: "Mineral Richness",
    description: "Fulvic compounds and trace minerals preserved naturally.",
    icon: Droplets,
  },
  {
    title: "Purification",
    description: "Careful filtering removes impurities without harsh chemicals.",
    icon: Filter,
  },
  {
    title: "Ethical Harvesting",
    description: "Respectful sourcing that protects mountain communities.",
    icon: Leaf,
  },
];

const transparencySteps = [
  {
    title: "Lab Style Verification",
    description: "Batch-level testing for heavy metals, potency, and microbial safety.",
    icon: Microscope,
  },
  {
    title: "Purity Assurance",
    description: "No additives, fillers, or synthetic processing at any stage.",
    icon: ShieldCheck,
  },
  {
    title: "Careful Filtering",
    description: "Multi-stage filtration preserves bioactive integrity.",
    icon: Filter,
  },
  {
    title: "Safe Processing",
    description: "Gentle heating protects fulvic acids and mineral profile.",
    icon: Beaker,
  },
  {
    title: "Eco Packing",
    description: "Airtight, eco-conscious packaging safeguards freshness.",
    icon: Package,
  },
  {
    title: "Mineral Validation",
    description: "Consistency checks confirm mineral richness across every batch.",
    icon: Droplets,
  },
];

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
              Scientific confidence starts with transparency. We verify every batch,
              protect mineral richness, and document each step from mountain sourcing to
              final packaging.
            </p>
          </div>
          <div className="mt-10 text-center text-sm uppercase tracking-[0.35em] text-primary-700 font-semibold">
            Transparency = Trust
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {confidencePoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-light">{item.description}</p>
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
              Lab-Style Transparency
            </h2>
            <p className="text-lg text-stone-700 leading-relaxed font-light">
              Clear standards, documented processing, and measurable results at every
              stage of purification.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft text-left"
                >
                  <div className="flex items-center gap-3 mb-4 text-primary-700">
                    <Icon className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold">
                      Verified
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-charcoal-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed font-light">{step.description}</p>
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
