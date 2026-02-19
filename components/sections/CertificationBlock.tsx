"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Droplets, CheckCircle2 } from "lucide-react";

const badges = [
  {
    title: "Lab Verification",
    description: "Third-party lab tested for purity and potency.",
    icon: BadgeCheck,
  },
  {
    title: "Heavy Metal Safety",
    description: "Screened for heavy metals and contaminants.",
    icon: ShieldCheck,
  },
  {
    title: "Fulvic Acid Presence",
    description: "Rich in bioactive fulvic acids and minerals.",
    icon: Droplets,
  },
  {
    title: "Authenticity Guarantee",
    description: "Verified Himalayan source with traceable batches.",
    icon: CheckCircle2,
  },
];

export default function CertificationBlock() {
  return (
    <section className="section-padding bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-stone-200">
            Certification
          </div>
          <h2 className="font-display text-display-3 font-bold mt-5 tracking-tight">
            Certified Purity & Trust
          </h2>
          <p className="text-lg text-stone-300 leading-relaxed font-light mt-4">
            Every batch is verified for purity, safety, and authentic Himalayan origin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#c6a75e] via-[#e3c98b] to-[#c6a75e] text-charcoal-900 shadow-[0_10px_24px_rgba(198,167,94,0.35)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold mt-5 tracking-tight">
                  {badge.title}
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mt-2">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
