"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Sparkles, Mountain } from "lucide-react";
import Link from "next/link";

const images = [
  "/images/banners/extraction-mountains.jpg",
  "/images/banners/herbal-Ingredients-flat-lay.jpg",
  "/images/banners/mountain-energy.jpg",
  "/images/banners/mountains-peak.jpg",
  "/images/banners/purification.jpg",
  "/images/banners/resin-texture-macro-1.jpg",
  "/images/banners/resin-texture-macro-2.jpg",
];

const AUTO_DELAY = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Parallax Logic with Spring
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });
  const bgY = useTransform(smoothScrollY, [0, 1000], ["0%", "25%"]);
  const contentY = useTransform(smoothScrollY, [0, 1000], ["0%", "-15%"]);
  const contentOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  // Autoplay slides
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, AUTO_DELAY);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      {/* Background Layer with Ken Burns & Parallax */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            style={{ y: bgY }}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{
              duration: 6,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="absolute inset-0 h-[120%] w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[index]})`,
            }}
          />
        </AnimatePresence>

        {/* Cinematic Overlays (Reduced opacity for clearer image) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.95]" />
      </div>

      {/* Main Content Layer */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center justify-center px-6"
      >
        <div className="flex max-w-5xl flex-col items-center text-center text-white">
          
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 backdrop-blur-md"
          >
            <Mountain className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-100/80">
              Authentic Himalayan Origin
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          //   className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
          // >
          className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
>
            Pure Himalayan
            <br />
            <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Shilajit
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl"
          >
            Sourced from the heart of Gilgit-Baltistan. 
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center gap-6 sm:flex-row"
          >
            <Link
              href="#shop"
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-amber-500 px-10 py-4 font-bold text-black transition-transform hover:scale-105 active:scale-95"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="#learn"
              className="rounded-full border border-white/20 bg-white/5 px-10 py-4 font-medium backdrop-blur-lg transition-colors hover:bg-white/10"
            >
              Our Process
            </Link>
          </motion.div>

          {/* Trust Matrix */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            {["100% Organic", "Lab Certified", "Export Grade"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/50">
                <Sparkles className="h-3 w-3 text-amber-500/50" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
}
