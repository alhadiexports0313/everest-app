"use client";

import { motion } from "framer-motion";
import { Award, Shield, TestTube, Globe, Leaf, CheckCircle } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Export-grade standards",
  },
  {
    icon: Shield,
    title: "Authentic Source",
    description: "Direct from Himalayas",
  },
  {
    icon: TestTube,
    title: "Lab Tested",
    description: "Third-party verified",
  },
  {
    icon: Globe,
    title: "Global Shipping",
    description: "Worldwide delivery",
  },
  {
    icon: Leaf,
    title: "100% Organic",
    description: "No additives or fillers",
  },
  {
    icon: CheckCircle,
    title: "Scientifically Backed",
    description: "Research-supported benefits",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-stone-50 py-16 border-y border-stone-200/50">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="flex flex-col items-center text-center p-6 group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-700/10 to-primary-800/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 border border-stone-200/50">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-semibold text-sm text-charcoal-900 mb-1.5">
                  {badge.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
