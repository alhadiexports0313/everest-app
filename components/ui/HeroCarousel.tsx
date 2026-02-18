"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroSlide {
  id: string;
  label: string;
  image: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export default function HeroCarousel({
  slides,
  autoPlayInterval = 8000,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    if (!slides.length) return;
    const total = slides.length;
    const wrapped = ((next % total) + total) % total;
    setIndex(wrapped);
  };

  const handleNext = () => {
    setDirection(1);
    goTo(index + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    goTo(index - 1);
  };

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setDirection(1);
      goTo(index + 1);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [index, autoPlayInterval, slides.length]);

  const current = slides[index];

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-black text-white">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="relative h-full w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.18 }}
              transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.label}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </motion.div>

            <div className="relative z-10 flex h-full items-center">
              <div className="container-custom section-padding">
                <div className="max-w-4xl">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-emerald-200 backdrop-blur"
                  >
                    <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {current.label}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                    className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance"
                  >
                    Pure Himalayan Wellness, Delivered to You
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="mt-5 max-w-2xl text-base sm:text-lg text-white/80"
                  >
                    Shilajet resin sourced from the high peaks of Gilgit-Baltistan,
                    refined with care, and lab tested for purity and potency.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                  >
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-3 text-sm font-semibold text-white shadow-premium hover:shadow-premium-lg hover:scale-[1.02] transition-all"
                    >
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href="/authenticity-quality"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-emerald-100"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5">
                      <span className="text-emerald-400">✔</span>
                      <span>Lab Tested</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5">
                      <span className="text-emerald-400">✔</span>
                      <span>100% Natural</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-1.5">
                      <span className="text-emerald-400">✔</span>
                      <span>Direct from Gilgit-Baltistan</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
