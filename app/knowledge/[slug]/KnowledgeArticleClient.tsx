"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Section = {
  title: string;
  body?: string;
  urdu?: string;
  bullets?: { label: string; text: string }[];
  list?: string[];
  table?: { label: string; value: string }[];
};

type Article = {
  title: string;
  urduTitle: string;
  readTime: string;
  description: string;
  sections: Section[];
};

export default function KnowledgeArticleClient({ article }: { article: Article }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const next = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setProgress(next);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = useMemo(() => article.sections ?? [], [article.sections]);

  return (
    <div className="min-h-screen bg-white text-charcoal-900">
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-stone-100">
        <div
          className="h-full bg-[#C6A052] transition-[width] duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="section-padding"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-[0.28em]">
              <Link href="/" className="hover:text-[#C6A052] transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/knowledge-hub"
                className="hover:text-[#C6A052] transition-colors"
              >
                Knowledge Hub
              </Link>
              <span>/</span>
              <span className="text-stone-400">{article.readTime}</span>
            </nav>

            <div className="mt-6 rounded-3xl border border-stone-200/70 bg-white p-8 sm:p-10 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
              <div className="inline-flex items-center rounded-full border border-[#C6A052]/30 bg-[#C6A052]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8C6C2B]">
                {article.readTime}
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold mt-6 leading-tight">
                {article.title}
              </h1>
              <p className="font-urdu text-lg sm:text-2xl text-stone-600 mt-3">
                {article.urduTitle}
              </p>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed mt-6">
                {article.description}
              </p>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#C6A052]/60 to-transparent" />
            </div>

            <div className="mt-12 space-y-12">
              {sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                  className="rounded-3xl border border-stone-200/70 bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                      {section.title}
                    </h2>
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#C6A052]/70 to-transparent" />
                  </div>
                  {section.body && (
                    <p className="mt-5 text-stone-700 leading-relaxed">{section.body}</p>
                  )}

                  {section.table && (
                    <div className="mt-6 grid gap-3">
                      {section.table.map((row) => (
                        <div
                          key={row.label}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/70 bg-stone-50 px-5 py-4 text-sm"
                        >
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-500 font-semibold">
                            {row.label}
                          </span>
                          <span className="text-stone-700 font-semibold">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className="mt-6 space-y-3 text-stone-700">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet.label}
                          className="rounded-2xl border border-stone-200/70 bg-stone-50 px-5 py-4 text-sm leading-relaxed"
                        >
                          <span className="font-semibold text-[#C6A052]">
                            {bullet.label}
                          </span>{" "}
                          {bullet.text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.list && (
                    <ul className="mt-6 grid gap-3 text-stone-700">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-stone-200/70 bg-stone-50 px-5 py-4 text-sm"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.urdu && (
                    <p className="mt-6 font-urdu text-base text-stone-600 leading-relaxed">
                      {section.urdu}
                    </p>
                  )}
                </motion.section>
              ))}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/knowledge-hub"
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-stone-700 shadow-soft transition-all duration-500 hover:border-[#C6A052]/60 hover:text-[#8C6C2B]"
              >
                Back to Knowledge Hub
              </Link>
              <AnimatePresence mode="wait">
                <motion.div
                  key={article.readTime}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-xs uppercase tracking-[0.28em] text-stone-500"
                >
                  {article.readTime}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
