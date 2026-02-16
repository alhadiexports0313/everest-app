"use client";

import { motion } from "framer-motion";
import { Mountain, MapPin, Users, Heart } from "lucide-react";

export default function OriginStory() {
  return (
    <section id="origin" className="section-padding bg-gradient-himalayan relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-200 mb-6">
              <MapPin className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Gilgit-Baltistan, Pakistan
              </span>
            </div>

            <h2 className="font-display text-display-3 font-bold text-neutral-900 mb-6">
              From the Heart of the Himalayas
            </h2>

            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p className="text-lg">
                Founded by Fazal, Everest Organic Shilajet represents a deep connection
                to the pristine mountains of Gilgit-Baltistan, where Shilajet has been
                harvested for centuries.
              </p>

              <p>
                Our journey begins at altitudes above 3,000 meters, where the purest
                Shilajet naturally exudes from Himalayan rock faces. We work directly
                with local harvesters who have inherited this ancient knowledge,
                ensuring ethical sourcing and fair trade practices.
              </p>

              <p>
                Every batch is carefully collected, tested, and processed to preserve its
                natural potency and bioactive compounds. We're committed to bringing
                you the most authentic, premium-quality Shilajet while supporting the
                communities that make it possible.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Mountain Sourced</h4>
                  <p className="text-sm text-neutral-600">
                    Directly from high-altitude Himalayan sources
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Ethical Trade</h4>
                  <p className="text-sm text-neutral-600">
                    Supporting local communities and fair practices
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-1">Pure & Natural</h4>
                  <p className="text-sm text-neutral-600">
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
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 flex items-center justify-center shadow-premium-lg">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">🏔️</div>
                <div className="text-2xl font-display font-bold mb-2">
                  Gilgit-Baltistan
                </div>
                <div className="text-primary-200">
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
