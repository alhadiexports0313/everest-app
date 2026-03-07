"use client";

import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";

const ITEM_WIDTH = 210;
const ITEM_HEIGHT = 290;
const ITEM_GAP = 28;
const BASE_SPEED_PX = 42;

const imageNames = [
  "product_1.jpg",
  "product_2.jpg",
  "product_3.jpg",
  "product_4.jpg",
  "product_5.jpg",
  "product_6.jpg",
  "product_7.jpg",
  "product_9.jpg",
  "product_10.jpg",
  "product_11.jpg",
  "product_12.jpg",
  "product_13.jpg",
  "product_14.jpg",
  "product_15.jpg",
  "product_16.jpg",
];

const productImages = imageNames.map((name) => `/images/products/${name}`);

type CarouselItemProps = {
  src: string;
  index: number;
  x: ReturnType<typeof useMotionValue>;
  containerWidth: number;
};

function CarouselItem({ src, index, x, containerWidth }: CarouselItemProps) {
  const focus = useTransform(x, (latest) => {
    const center = containerWidth / 2 || 1;
    const position = index * (ITEM_WIDTH + ITEM_GAP) + latest + ITEM_WIDTH / 2;
    const distance = Math.abs(center - position);
    return Math.max(0, 1 - distance / center);
  });

  const scale = useTransform(focus, (v) => 0.86 + v * 0.3);
  const opacity = useTransform(focus, (v) => 0.45 + v * 0.55);
  const blur = useTransform(focus, (v) => `blur(${(1 - v) * 3.5}px)`);
  const translateY = useTransform(x, (latest) => {
    const center = containerWidth / 2 || 1;
    const position = index * (ITEM_WIDTH + ITEM_GAP) + latest + ITEM_WIDTH / 2;
    const offset = (position - center) / center;
    return Math.sin(offset * Math.PI) * 18;
  });
  const rotateY = useTransform(x, (latest) => {
    const center = containerWidth / 2 || 1;
    const position = index * (ITEM_WIDTH + ITEM_GAP) + latest + ITEM_WIDTH / 2;
    const offset = (position - center) / center;
    return `${offset * 10}deg`;
  });
  const rotateZ = useTransform(x, (latest) => {
    const center = containerWidth / 2 || 1;
    const position = index * (ITEM_WIDTH + ITEM_GAP) + latest + ITEM_WIDTH / 2;
    const offset = (position - center) / center;
    return `${offset * 2}deg`;
  });
  const zIndex = useTransform(focus, (v) => Math.round(v * 20));
  const boxShadow = useTransform(
    focus,
    (v) =>
      `0 22px ${26 + v * 30}px rgba(0,0,0,${0.28 + v * 0.25}), 0 0 ${14 + v * 26}px rgba(212,165,116,${0.2 + v * 0.4})`
  );
  const glow = useTransform(focus, (v) => v);

  return (
    <motion.div
      style={{
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        scale,
        opacity,
        filter: blur,
        translateY,
        rotateY,
        rotateZ,
        zIndex,
        boxShadow,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.12, y: -10, rotateY: "0deg" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 overflow-hidden rounded-[26px] border border-white/10 bg-white/10 will-change-transform"
    >
      <Image src={src} alt="Shilajet product" fill className="object-cover" sizes="210px" priority={index < 3} />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-amber-200/20" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-70" />
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 rounded-[26px] border border-amber-200/40 shadow-[0_0_48px_rgba(212,165,116,0.45)]"
      />
    </motion.div>
  );
}

export default function LuxuryImageCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const { locale } = useLanguage();
  const isUrdu = locale === "ur";
  const pauseUntilRef = useRef(0);
  const burstUntilRef = useRef(0);
  const lastPausedIndexRef = useRef<number | null>(null);

  const step = ITEM_WIDTH + ITEM_GAP;
  const loopWidth = useMemo(() => productImages.length * step, []);
  const items = useMemo(() => [...productImages, ...productImages], []);

  useEffect(() => {
    x.set(0);
  }, [isUrdu, x]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time, delta) => {
    if (!containerWidth) return;
    if (time < pauseUntilRef.current) return;

    const offsetBase = (isUrdu ? x.get() : -x.get());
    const offset = ((offsetBase % loopWidth) + loopWidth) % loopWidth;
    const center = containerWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < productImages.length; i += 1) {
      const position = i * step - offset + ITEM_WIDTH / 2;
      const distance = Math.abs(center - position);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    if (closestDistance < 16 && lastPausedIndexRef.current !== closestIndex) {
      const pauseDuration = 2000 + Math.random() * 2000;
      pauseUntilRef.current = time + pauseDuration;
      burstUntilRef.current = pauseUntilRef.current + 650;
      lastPausedIndexRef.current = closestIndex;
      return;
    }

    const speed = time < burstUntilRef.current ? BASE_SPEED_PX * 2.25 : BASE_SPEED_PX;
    const move = (speed * delta) / 1000;
    const direction = isUrdu ? 1 : -1;
    let next = x.get() + direction * move;
    if (direction === -1 && next <= -loopWidth) next += loopWidth;
    if (direction === 1 && next >= 0) next -= loopWidth;
    x.set(next);
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0b0b0c] via-[#121217] to-[#0b0b0c] py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.18),transparent_62%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-amber-200/10 via-transparent to-transparent" />
          <div className="relative">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className={`font-display text-3xl sm:text-4xl font-semibold text-white ${isUrdu ? "font-urdu" : ""}`}>
                {isUrdu ? "پریمیم فلو گیلری" : "Premium Flow Gallery"}
              </h2>
              <p className={`mt-3 text-sm sm:text-base text-white/70 ${isUrdu ? "font-urdu" : ""}`}>
                {isUrdu
                  ? "جدید، کم سے کم اور سنیماٹک موشن کے ساتھ پریمیم جھلک۔"
                  : "Modern, minimal, cinematic motion with luxury depth."}
              </p>
            </div>

            <div
              ref={containerRef}
              className="relative overflow-hidden"
              style={{ perspective: 1200 }}
              dir={isUrdu ? "ltr" : "ltr"}
            >
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[320px] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent blur-2xl" />
              <motion.div style={{ x, width: loopWidth * 2 }} className="flex items-center gap-7">
                {items.map((src, index) => (
                  <CarouselItem
                    key={`${src}-${index}`}
                    src={src}
                    index={index}
                    x={x}
                    containerWidth={containerWidth}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
