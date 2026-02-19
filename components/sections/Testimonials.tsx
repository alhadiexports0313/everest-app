"use client";

import { motion } from "framer-motion";
import TestimonialsCarousel from "@/components/ui/TestimonialsCarousel";
import type { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
    text: "I've tried several Shilajet brands, but Everest Organic is by far the purest and most effective. My energy levels have improved significantly, and I feel more balanced overall.",
    image: "SJ",
  },
  {
    name: "Ahmed Hassan",
    location: "Pakistan",
    rating: 5,
    text: "As someone from the region, I can attest to the authenticity of this product. The quality is exceptional, and it's clear that Fazal and his team care deeply about purity and tradition.",
    image: "AH",
  },
  {
    name: "Dr. Emma Chen",
    location: "Singapore",
    rating: 5,
    text: "I recommend Everest Organic Shilajet to my patients. The lab reports show exceptional purity, and the results speak for themselves. This is export-quality product.",
    image: "EC",
  },
  {
    name: "Michael Thompson",
    location: "United Kingdom",
    rating: 5,
    text: "After three months of use, I've noticed improved focus and better recovery from workouts. The packaging is premium, and the product itself is clearly high quality.",
    image: "MT",
  },
  {
    name: "Priya Sharma",
    location: "India",
    rating: 5,
    text: "This reminds me of the authentic Shilajet my grandmother used to get from the mountains. Pure, potent, and exactly what I was looking for. Highly recommended!",
    image: "PS",
  },
  {
    name: "James Wilson",
    location: "Australia",
    rating: 5,
    text: "The customer service is excellent, and the product arrived quickly despite international shipping. The quality is outstanding - you can tell it's the real deal.",
    image: "JW",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-stone-50">
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
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Join thousands of satisfied customers who have experienced the benefits of
            authentic Himalayan Shilajet.
          </p>
        </motion.div>

        <TestimonialsCarousel items={testimonials} />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              10,000+
            </div>
            <div className="text-sm text-stone-600 font-light">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              4.9/5
            </div>
            <div className="text-sm text-stone-600 font-light">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              50+
            </div>
            <div className="text-sm text-stone-600 font-light">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2 tracking-tight">
              99.9%
            </div>
            <div className="text-sm text-stone-600 font-light">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
