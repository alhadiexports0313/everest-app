"use client";

import { motion } from "framer-motion";
import { Trophy, Shield, Star } from "lucide-react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const tickerItems = [
  {
    icon: Trophy,
    text: "🏆 Exclusive Offer — Save Up to 25%",
    highlight: "25%"
  },
  {
    icon: Shield,
    text: "💯 30-Day Satisfaction Guarantee",
    highlight: "30-Day"
  },
//   {
//     icon: Star,
//     text: "✨ Premium Quality — Lab Tested & Certified",
//     highlight: "Lab Tested"
//   },
  {
    icon: Star,
    text: "🚚 Fast Shipping Across Pakistan",
    highlight: "Fast Shipping"
  },
//   {
//     icon: Trophy,
//     text: "🏆 Direct from Gilgit-Baltistan Mountains",
//     highlight: "Direct"
//   }
];

export default function HeaderTopTicker() {
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";

  const urduItems = [
    {
      icon: Trophy,
      text: "🏆 خصوصی آفر — 25% تک بچت",
      highlight: "25%"
    },
    {
      icon: Shield,
      text: "💯 30 دن کی اطمینان کی ضمانت",
      highlight: "30 دن"
    },
    // {
    //   icon: Star,
    //   text: "✨ اعلیٰ معیار — لیب ٹیسٹڈ اور مصدقہ",
    //   highlight: "لیب ٹیسٹڈ"
    // },
    {
      icon: Star,
      text: "🚚 پاکستان بھر میں تیز ترسیل",
      highlight: "تیز ترسیل"
    },
    // {
    //   icon: Trophy,
    //   text: "🏆 گلگت بلتستان کے پہاڑوں سے براہ راست",
    //   highlight: "براہ راست"
    // }
  ];

  const items = isUrdu ? urduItems : tickerItems;

  return (
    <div className="bg-gradient-to-r from-stone-50 to-stone-100 border-b border-stone-200/80 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex"
          animate={{
            x: ["-100%", "0%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear"
            }
          }}
        >
          <div className="flex whitespace-nowrap py-2.5 px-4">
            {[...items, ...items].map((item, index) => (
              <div
                key={index}
                className={`flex items-center mx-8 text-sm font-semibold text-stone-700 ${
                  isUrdu ? "font-urdu" : ""
                }`}
              >
                {/* <span className="text-stone-900 mr-3">{item.text}</span> */}
                <span className="text-yellow-600 mr-3">{item.text}</span>
                <span className="text-primary-600 font-bold bg-primary-50/60 px-2 py-0.5 rounded-md border border-primary-200/60 shadow-sm">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}