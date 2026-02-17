"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsCarouselProps {
  items: Testimonial[];
}

export default function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = items[index] ?? items[0];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!current) return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xs uppercase tracking-wide text-primary-700 font-semibold">
          Testimonials
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="relative">
        <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-200/50" />
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-card rounded-2xl p-8 border border-stone-200/50 shadow-soft"
          >
            <div className="flex items-center space-x-1 mb-4">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-accent-500 fill-accent-500"
                />
              ))}
            </div>
            <p className="text-stone-700 mb-6 leading-relaxed">
              "{current.text}"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center text-white font-semibold text-sm shadow-soft">
                {current.image}
              </div>
              <div>
                <div className="font-semibold text-charcoal-900">
                  {current.name}
                </div>
                <div className="text-sm text-stone-600">
                  {current.location}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 text-center text-xs text-stone-500">
        {index + 1} / {items.length}
      </div>
    </div>
  );
}
