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
    <section className="bg-white py-12 border-y border-neutral-100">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-neutral-600">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
