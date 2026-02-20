"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, Gem, Mountain } from "lucide-react";

const benefits = [
  {
    title: "Energy & Stamina",
    urdu: "توانائی اور استقامت",
    icon: Sparkles,
  },
  {
    title: "Strength Support",
    urdu: "قوت میں مدد",
    icon: Shield,
  },
  {
    title: "Mineral Rich",
    urdu: "معدنیات سے بھرپور",
    icon: Gem,
  },
  {
    title: "Traditional Heritage",
    urdu: "روایتی ورثہ",
    icon: Mountain,
  },
];

export default function BenefitsGrid() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#0b0f0d] text-white">
      <div className="absolute inset-0 lux-dark-animated bg-[radial-gradient(circle_at_20%_20%,rgba(212,165,116,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(45,69,56,0.5),transparent_55%),radial-gradient(circle_at_60%_80%,rgba(15,24,19,0.8),transparent_60%),linear-gradient(135deg,rgba(12,14,12,0.9),rgba(17,23,19,0.95),rgba(10,12,11,0.9))] opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <h2 className="font-display text-display-3 font-bold text-white mb-4 tracking-tight">
            Wellness Benefits
          </h2>
          <p className="text-lg text-stone-200 leading-relaxed font-light">
            Highlighting the core wellness advantages of authentic Himalayan
            Shilajit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-amber-200/40 hover:shadow-[0_14px_36px_rgba(212,165,116,0.2)]"
              >
                <div className="p-7">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 shadow-soft transition-transform duration-700 group-hover:scale-[1.02]">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="font-urdu text-base text-stone-200">{benefit.urdu}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-stone-300">
            Consult a professional before use.
          </p>
          <p className="font-urdu text-sm text-stone-300 mt-2">
            استعمال سے پہلے ماہر سے مشورہ کریں۔
          </p>
        </div>
      </div>
    </section>
  );
}
