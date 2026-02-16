"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-padding bg-gradient-premium text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </div>

          <h2 className="font-display text-display-2 sm:text-display-1 font-bold mb-6">
            Experience the Power of Pure Himalayan Shilajet
          </h2>

          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join thousands who have discovered the authentic benefits of premium Shilajet.
            Start your wellness journey today with our lab-tested, export-quality products.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#products"
              className="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:scale-105"
            >
              <span>Shop Now</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Free Shipping Worldwide</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Lab Tested & Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
