"use client";

import { motion } from "framer-motion";
import { Mountain, MapPin, Users, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const originImages = [
  "14. Himalayan Sunrise with Jar.jpg",
  "1. Himalayan Landscape with Shilajit Jar.jpg",
  "12. Product in Luxury Packaging Setting.jpg",
  "3. Premium Product Close-Up.jpg",
  "7. Minimalist Product on Stone.jpg",
];

const originImagePaths = originImages.map(
  (name) => `/images/products/${encodeURIComponent(name)}`
);

export default function OriginStory() {
  const [originImage, setOriginImage] = useState(originImagePaths[0]);

  useEffect(() => {
    const pick = originImagePaths[Math.floor(Math.random() * originImagePaths.length)];
    setOriginImage(pick);
  }, []);

  return (
    <section id="origin" className="section-padding earth-gradient relative overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 glass-card px-5 py-2.5 rounded-full border border-stone-200/50 mb-8 shadow-soft">
              <MapPin className="w-4 h-4 text-primary-700" />
              <span className="text-sm font-medium text-primary-800">
                Gilgit-Baltistan, Pakistan
              </span>
            </div>

            <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-8 tracking-tight">
              From the Heart of the Himalayas
            </h2>

            <div className="space-y-6 text-stone-700 leading-relaxed">
              <p className="text-lg font-light">
                Founded by Fazal, Everest Organic Shilajet represents a deep connection
                to the pristine mountains of Gilgit-Baltistan, where Shilajet has been
                harvested for centuries.
              </p>

              <p className="font-light">
                Our journey begins at altitudes above 3,000 meters, where the purest
                Shilajet naturally exudes from Himalayan rock faces. We work directly
                with local harvesters who have inherited this ancient knowledge,
                ensuring ethical sourcing and fair trade practices.
              </p>

              <p className="font-light">
                Every batch is carefully collected, tested, and processed to preserve its
                natural potency and bioactive compounds. We're committed to bringing
                you the most authentic, premium-quality Shilajet while supporting the
                communities that make it possible.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">Mountain Sourced</h4>
                  <p className="text-sm text-stone-600 font-light">
                    Directly from high-altitude Himalayan sources
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">Ethical Trade</h4>
                  <p className="text-sm text-stone-600 font-light">
                    Supporting local communities and fair practices
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-soft">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-charcoal-900 mb-1.5">Pure & Natural</h4>
                  <p className="text-sm text-stone-600 font-light">
                    No additives, fillers, or processing chemicals
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-forest shadow-premium-lg border border-primary-800/20">
              <Image
                src={originImage}
                alt="Gilgit-Baltistan origin product imagery"
                fill
                className="object-cover lux-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
                <div className="text-white text-2xl font-display font-bold mb-1 tracking-tight">
                  Gilgit-Baltistan
                </div>
                <div className="text-stone-200 text-sm font-light">
                  The Source of Authentic Shilajet
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
