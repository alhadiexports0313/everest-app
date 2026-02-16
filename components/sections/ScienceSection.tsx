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
    <section id="science" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-display-3 font-bold text-neutral-900 mb-4">
            Backed by Science
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Our commitment to quality is grounded in scientific research and traditional
            wisdom, ensuring you receive the most potent and pure Shilajet available.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-gradient-himalayan rounded-xl"
            >
              <div className="text-4xl font-display font-bold text-primary-700 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
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
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-neutral-50 rounded-2xl hover:shadow-premium transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
                      {point.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">{point.description}</p>
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Read Research Papers
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
