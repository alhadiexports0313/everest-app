import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "@/lib/i18n-server";

const articles = {
  benefits: {
    title: "Benefits",
    urdu: "فوائد",
    description:
      "Evidence-led wellness insights covering energy, immunity, cognitive support, and mineral richness.",
  },
  usage: {
    title: "Usage",
    urdu: "استعمال",
    description:
      "Professional guidance for dosage, timing, and safe daily routines.",
  },
  "environmental-respect": {
    title: "Environmental Respect",
    urdu: "ماحولیاتی احترام",
    description:
      "Ethical sourcing, conservation standards, and community uplift in Gilgit-Baltistan.",
  },
} as const;

type ArticleKey = keyof typeof articles;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug as ArticleKey];
  if (!article) return {};
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const title = isUrdu
    ? `${article.urdu} | علمی مرکز`
    : `${article.title} | Knowledge Hub`;
  const description = article.description;
  const basePath = `/knowledge-hub/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: basePath,
      languages: {
        en: basePath,
        ur: `${basePath}?lang=ur`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: basePath,
      images: [
        {
          url: "/images/banners/mountains-peak.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "سلاجیت اور ویلنَس رہنمائی"
            : "Shilajet wellness guidance",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/banners/mountains-peak.jpg"],
    },
    keywords: [
      "Himalayan Shilajit",
      "Shilajet",
      "Organic Wellness",
      "Everest Organic Shilajit",
      "Gilgit Baltistan",
    ],
  };
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug as ArticleKey];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="relative container-custom section-padding page-fade-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
              Knowledge Hub
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-6">
              {article.title}
            </h1>
            <p className="font-urdu text-lg sm:text-xl text-amber-100/90 mt-3">
              {article.urdu}
            </p>
            <p className="mt-6 text-base sm:text-lg text-white/70">
              {article.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding space-y-12">
        <section className="page-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  Benefits
                </h2>
                <p className="font-urdu text-base sm:text-lg text-amber-100/80 mt-2">
                  فوائد
                </p>
              </div>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 space-y-5 text-white/75 leading-relaxed">
              <p>
                Shilajet supports <span className="text-amber-200">daily energy</span>, stamina,
                and mental clarity through its naturally occurring fulvic compounds.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Energy, stamina, and recovery support
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Immune resilience and oxidative balance
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Cognitive focus and mental clarity
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Fulvic acid + 85+ trace minerals
                </li>
              </ul>
              <p>
                The mineral spectrum works as a carrier, supporting nutrient absorption and
                long-term vitality with a balanced wellness approach.
              </p>
            </div>
          </div>
        </section>

        <section className="page-fade-up" style={{ animationDelay: "160ms" }}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  Usage
                </h2>
                <p className="font-urdu text-base sm:text-lg text-amber-100/80 mt-2">
                  استعمال
                </p>
              </div>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 space-y-5 text-white/75 leading-relaxed">
              <p>
                Start with a <span className="text-amber-200">pea-sized serving</span>, once or
                twice daily, and adjust based on personal response.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Best time: morning or early afternoon
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Mix with warm water or milk
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Maintain consistent daily timing
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Pause if pregnant or under medical care
                </li>
              </ul>
              <p>
                For medical conditions or medications, consult a healthcare professional
                before use to maintain a safe and structured routine.
              </p>
            </div>
          </div>
        </section>

        <section className="page-fade-up" style={{ animationDelay: "240ms" }}>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 backdrop-blur">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold">
                  Environmental Respect
                </h2>
                <p className="font-urdu text-base sm:text-lg text-amber-100/80 mt-2">
                  ماحولیاتی احترام
                </p>
              </div>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent" />
            </div>
            <div className="mt-6 space-y-5 text-white/75 leading-relaxed">
              <p>
                Harvesting is guided by <span className="text-amber-200">ethical sourcing</span>,
                ensuring the Himalayan landscape and local communities are protected.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Responsible Gilgit-Baltistan sourcing
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Sustainable harvesting cycles
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Eco-conscious premium packaging
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  Support for mountain communities
                </li>
              </ul>
              <p>
                Every batch is curated to minimize environmental impact while honoring
                the origin and people behind it.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
