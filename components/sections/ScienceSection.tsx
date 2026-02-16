"use client";

import { motion } from "framer-motion";
import { Microscope, BookOpen, TrendingUp, Award } from "lucide-react";

const sciencePoints = [
  {
    icon: Microscope,
    title: "Scientifically Studied",
    description:
      "Over 200+ peer-reviewed studies support the health benefits of Shilajet, including improved energy, immunity, and cognitive function.",
  },
  {
    icon: BookOpen,
    title: "Traditional Wisdom",
    description:
      "Used for over 3,000 years in Ayurvedic and traditional medicine systems across the Himalayas and Central Asia.",
  },
  {
    icon: TrendingUp,
    title: "Bioactive Compounds",
    description:
      "Rich in fulvic acid, humic acid, and over 85+ trace minerals essential for optimal health and wellness.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description:
      "Every batch undergoes rigorous third-party testing for purity, heavy metals, and potency to ensure premium quality.",
  },
];

const stats = [
  { value: "85+", label: "Trace Minerals" },
  { value: "200+", label: "Research Studies" },
  { value: "3000+", label: "Years of Use" },
  { value: "99.9%", label: "Purity Guaranteed" },
];

export default function ScienceSection() {
  return (
    <section id="science" className="section-padding bg-stone-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-6 tracking-tight">
            Backed by Science
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Our commitment to quality is grounded in scientific research and traditional
            wisdom, ensuring you receive the most potent and pure Shilajet available.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-7 matte-card rounded-xl border border-stone-200/50 shadow-soft"
            >
              <div className="text-4xl font-display font-bold text-primary-700 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-stone-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Science Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sciencePoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="p-8 glass-card rounded-2xl hover:shadow-premium transition-all duration-500 border border-stone-200/50"
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3 tracking-tight">
                      {point.title}
                    </h3>
                    <p className="text-stone-700 leading-relaxed font-light">{point.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <a
            href="#"
            className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors duration-300"
          >
            Read Research Papers
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
