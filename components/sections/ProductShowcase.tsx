"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Star, Check } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Premium Shilajet Resin",
    description: "Pure, unprocessed resin sourced from high-altitude Himalayan mountains",
    price: "$89",
    originalPrice: "$119",
    rating: 4.9,
    reviews: 1247,
    image: "/api/placeholder/400/400",
    features: [
      "100% Pure Resin",
      "Lab Tested",
      "30g Jar",
      "3-Month Supply",
    ],
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Shilajet Capsules",
    description: "Convenient, standardized capsules for daily wellness support",
    price: "$69",
    originalPrice: "$89",
    rating: 4.8,
    reviews: 892,
    image: "/api/placeholder/400/400",
    features: [
      "60 Capsules",
      "Easy to Take",
      "Standardized Extract",
      "2-Month Supply",
    ],
    badge: "Popular",
  },
  {
    id: 3,
    name: "Shilajet Powder",
    description: "Fine powder form for maximum versatility and absorption",
    price: "$79",
    originalPrice: "$99",
    rating: 4.7,
    reviews: 634,
    image: "/api/placeholder/400/400",
    features: [
      "100g Powder",
      "Versatile Use",
      "High Purity",
      "3-Month Supply",
    ],
    badge: "New",
  },
];

export default function ProductShowcase() {
  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="font-display text-display-3 font-bold text-charcoal-900 mb-6 tracking-tight">
            Our Premium Collection
          </h2>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Each product is carefully sourced, tested, and packaged to meet the highest
            international standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group matte-card rounded-2xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 border border-stone-200/50"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-stone overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-stone-200/50">
                    <span className="text-4xl">🏔️</span>
                  </div>
                </div>
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-gold text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-soft">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-7">
                <h3 className="font-display text-2xl font-bold text-charcoal-900 mb-3 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-stone-600 mb-5 text-sm leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-stone-700">
                      <Check className="w-4 h-4 text-primary-700 mr-2.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-accent-500 fill-accent-500"
                            : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-600">
                    {product.rating} ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-stone-200">
                  <div>
                    <span className="text-2xl font-bold text-charcoal-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-sm text-stone-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary-700 to-primary-800 text-white rounded-lg hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link
            href="/products"
            className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-colors duration-300"
          >
            View All Products
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
