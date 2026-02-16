"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
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
    <section className="section-padding bg-white">
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
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Join thousands of satisfied customers who have experienced the benefits of
            authentic Himalayan Shilajet.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-xl p-6 hover:shadow-premium transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-200" />
              
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-accent-500 fill-accent-500"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-neutral-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2">
              10,000+
            </div>
            <div className="text-sm text-neutral-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2">
              4.9/5
            </div>
            <div className="text-sm text-neutral-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2">
              50+
            </div>
            <div className="text-sm text-neutral-600">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-primary-700 mb-2">
              99.9%
            </div>
            <div className="text-sm text-neutral-600">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
