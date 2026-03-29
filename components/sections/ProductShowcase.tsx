"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

interface Product {
  id: string;
  image: string;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  originalPrice: number;
  discountedPrice: number;
  size: string;
  sizeUrdu: string;
  href: string;
}

const products: Product[] = [
  {
    id: "1",
    image: "/images/products/product_21.jpg",
    title: "Premium Himalayan Shilajit",
    titleUrdu: "پریمیم ہمالیائی سلاجیت",
    description: "Pure, lab-tested Shilajit from Gilgit-Baltistan mountains. Rich in fulvic acid and minerals.",
    descriptionUrdu: "گلگت بلتستان کے پہاڑوں سے خالص، لیب ٹیسٹڈ سلاجیت۔ فولوک ایسڈ اور منرلز سے بھرپور۔",
    originalPrice: 2000,
    discountedPrice: 1500,
    size: "10g",
    sizeUrdu: "١٠ گرام",
    href: "/products/premium-himalayan-shilajit-10g"
    // href: "/products/premium-himalayan-shilajit-10g"
  },
  {
    id: "2",
    image: "/images/products/product_22.jpg",
    title: "Authentic Mountain Shilajit",
    titleUrdu: "مستند پہاڑی سلاجیت",
    description: "Premium grade Shilajit directly sourced from high-altitude Himalayan ranges.",
    descriptionUrdu: "اعلیٰ معیار کی سلاجیت براہِ راست ہمالیائی بلندیوں سے حاصل شدہ۔",
    originalPrice: 4000,
    discountedPrice: 3000,
    size: "20g",
    sizeUrdu: "٢٠ گرام",
    href: "/products/authentic-mountain-shilajit-20g"
  },
  {
    id: "3",
    image: "/images/products/product_25.jpg",
    title: "Export Quality Shilajit",
    titleUrdu: "ایکسپورٹ کوالٹی سلاجیت",
    description: "Lab-certified, export-grade Shilajit with maximum potency and purity.",
    descriptionUrdu: "لیب سرٹیفائیڈ، ایکسپورٹ گریڈ سلاجیت زیادہ سے زیادہ قوت اور خلوص کے ساتھ۔",
    originalPrice: 8000,
    discountedPrice: 6000,
    size: "50g",
    sizeUrdu: "٥٠ گرام",
    href: "/products/export-quality-shilajit-50g"
  }
];

export default function ProductShowcase() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const handleProductClick = (href: string) => {
    window.location.href = href;
  };

  const handleAddToCart = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    window.location.href = href;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-stone-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className={`font-display text-display-3 font-bold text-charcoal-900 mb-6 ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu ? "ہمارے بہترین مصنوعات" : "Our Premium Products"}
          </h2>
          <p className={`text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed ${isUrdu ? "font-urdu" : ""}`}>
            {isUrdu 
              ? "صاف ستھری، لیب ٹیسٹڈ سلاجیت جو آپ کی فلاح و بہبود میں مدد دیتی ہے۔ ہر بیچ اصلیت اور قوت کی ضمانت یافتہ ہے۔"
              : "Discover our pure, lab-tested Shilajit that supports your wellness journey. Each batch is guaranteed for authenticity and potency."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product.href)}
            >
              <div className="bg-white rounded-2xl shadow-soft border border-stone-200/50 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-premium hover:border-stone-300">
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 py-1.5 rounded-full text-sm font-bold shadow-md border border-amber-300/50">
                    25% OFF
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={isUrdu ? product.titleUrdu : product.title}
                    fill
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                      hoveredProduct === product.id ? 'scale-110' : ''
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <AnimatePresence>
                    {hoveredProduct === product.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center"
                      >
                        <motion.button
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          onClick={(e) => handleAddToCart(e, product.href)}
                          className="bg-white text-primary-800 px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-stone-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          {isUrdu ? "کارٹ میں شامل کریں" : "Add to Cart"}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-display text-xl font-bold text-charcoal-900 ${isUrdu ? "font-urdu" : ""}`}>
                      {isUrdu ? product.titleUrdu : product.title}
                    </h3>
                    <span className={`text-sm font-medium text-stone-500 ${isUrdu ? "font-urdu" : ""}`}>
                      {isUrdu ? product.sizeUrdu : product.size}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-stone-500 font-medium">(4.9)</span>
                  </div>

                  {/* Description */}
                  <p className={`text-stone-600 mb-6 leading-relaxed ${isUrdu ? "font-urdu text-right" : ""}`}>
                    {isUrdu ? product.descriptionUrdu : product.description}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-primary-800">
                        PKR {product.discountedPrice.toLocaleString()}
                      </span>
                       <span className="text-lg text-red-600 line-through"> {/* text-stone-400 */}
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-800 to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {isUrdu ? "تمام مصنوعات دیکھیں" : "View All Products"}
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}