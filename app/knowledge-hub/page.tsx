import Link from "next/link";
import { getLocale } from "@/lib/i18n-server";

const posts = [
  {
    title: "Understanding Shilajet: Origins, Formation, and Active Minerals",
    category: "Understanding Shilajet",
    readTime: "7 min read",
    readTimeUrdu: "7 منٹ مطالعہ",
    slug: "understanding-shilajet",
    excerpt:
      "Explore how Everest Organic Shilajit forms, why its mineral profile matters, and how authenticity is verified.",
    urdu: "سلاجیت کو سمجھیں",
    categoryUrdu: "سلاجیت کی تفہیم",
    excerptUrdu:
      "جانیں سلاجیت کیسے بنتی ہے، اس کے معدنی اجزاء کیوں اہم ہیں، اور خالص سلاجیت کی پہچان کیسے ہوتی ہے۔",
    ctaUrdu: "مضمون پڑھیں",
  },
  {
    title: "Usage Guide: Timing, Dosage, and Safe Daily Routine",
    category: "Usage",
    readTime: "6 min read",
    readTimeUrdu: "6 منٹ مطالعہ",
    slug: "usage-guide",
    excerpt:
      "A clear, practical routine for daily use, including timing, dosage, and safety considerations.",
    urdu: "استعمال",
    categoryUrdu: "استعمال",
    excerptUrdu:
      "روزانہ استعمال کے لیے درست مقدار، وقت اور محفوظ طریقہ کار کی رہنمائی۔",
    ctaUrdu: "مکمل رہنمائی",
  },
  {
    title: "Wellness Lifestyle: Energy, Recovery, and Daily Rituals",
    category: "Wellness Lifestyle",
    readTime: "5 min read",
    readTimeUrdu: "5 منٹ مطالعہ",
    slug: "wellness-lifestyle",
    excerpt:
      "How Shilajet fits into a balanced wellness lifestyle with mindful habits and recovery.",
    urdu: "فلاحی طرزِ زندگی",
    categoryUrdu: "فلاحی طرزِ زندگی",
    excerptUrdu:
      "سلاجیت کو صحت مند عادات اور بحالی کے ساتھ متوازن طرزِ زندگی میں شامل کریں۔",
    ctaUrdu: "ملاحظہ کریں",
  },
  {
    title: "Respecting Nature: Ethical Harvesting and Mountain Conservation",
    category: "Nature Respect",
    readTime: "5 min read",
    readTimeUrdu: "5 منٹ مطالعہ",
    slug: "nature-respect",
    excerpt:
      "The importance of ethical harvesting, community support, and protecting fragile Himalayan ecosystems.",
    urdu: "فطرت کا احترام",
    categoryUrdu: "فطرت کا احترام",
    excerptUrdu:
      "ذمہ دار حصول، مقامی کمیونٹی کی معاونت اور ہمالیائی ماحول کے تحفظ کی اہمیت۔",
    ctaUrdu: "مزید جانیں",
  },
];

export default async function KnowledgeHubPage() {
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
            {isUrdu ? "علمی مرکز" : "Knowledge Hub"}
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            {isUrdu
              ? "سلاجیت، صحت مند عادات اور ہمالیائی ورثے سے متعلق مستند رہنمائی۔"
              : "Authority-driven education about Shilajet, wellness habits, and Himalayan stewardship — crafted for clarity and trust."}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={`/knowledge/${post.slug}`}
              className={`group p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-premium hover:border-amber-200/60 ${
                isUrdu ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`text-xs text-primary-700 font-semibold mb-3 ${
                  isUrdu ? "tracking-normal" : "uppercase tracking-wide"
                }`}
              >
                {isUrdu ? post.categoryUrdu : post.category}
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                {isUrdu ? post.urdu : post.title}
              </h3>
              <p className="text-stone-700 leading-relaxed font-light mb-6">
                {isUrdu ? post.excerptUrdu : post.excerpt}
              </p>
              <div
                className={`flex items-center justify-between gap-4 ${
                  isUrdu ? "flex-row-reverse" : ""
                }`}
              >
                <div className="text-sm text-stone-500">
                  {isUrdu ? post.readTimeUrdu : post.readTime}
                </div>
                <div
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-white lux-gold-button shadow-soft transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 ${
                    isUrdu ? "tracking-normal" : "uppercase tracking-[0.25em]"
                  }`}
                >
                  {isUrdu ? post.ctaUrdu : "Read Article"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
