const posts = [
  {
    title: "Understanding Shilajet: Origins, Formation, and Active Minerals",
    category: "Understanding Shilajet",
    readTime: "7 min read",
    excerpt:
      "Explore how Himalayan Shilajet forms, why its mineral profile matters, and how authenticity is verified.",
    urdu: "شلجت کو سمجھیں",
    excerptUrdu:
      "جانیں شلجت کیسے بنتی ہے، اس کے معدنی اجزاء کیوں اہم ہیں، اور خالص شلجت کی پہچان کیسے ہوتی ہے۔",
  },
  {
    title: "Usage Guide: Timing, Dosage, and Safe Daily Routine",
    category: "Usage",
    readTime: "6 min read",
    excerpt:
      "A clear, practical routine for daily use, including timing, dosage, and safety considerations.",
    urdu: "استعمال",
    excerptUrdu:
      "روزانہ استعمال کے لیے درست مقدار، وقت اور محفوظ طریقہ کار کی رہنمائی۔",
  },
  {
    title: "Wellness Lifestyle: Energy, Recovery, and Daily Rituals",
    category: "Wellness Lifestyle",
    readTime: "5 min read",
    excerpt:
      "How Shilajet fits into a balanced wellness lifestyle with mindful habits and recovery.",
    urdu: "ویلفئیر لائف اسٹائل",
    excerptUrdu:
      "شلجت کو صحت مند عادات اور بحالی کے ساتھ متوازن لائف اسٹائل میں شامل کریں۔",
  },
  {
    title: "Respecting Nature: Ethical Harvesting and Mountain Conservation",
    category: "Nature Respect",
    readTime: "5 min read",
    excerpt:
      "The importance of ethical harvesting, community support, and protecting fragile Himalayan ecosystems.",
    urdu: "فطرت کا احترام",
    excerptUrdu:
      "ذمہ دار طریقے سے حاصل کرنا، مقامی کمیونٹی کی مدد اور ہمالیائی ماحول کی حفاظت کی اہمیت۔",
  },
];

export default function KnowledgeHubPage() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-display-2 font-bold text-charcoal-900 mb-6 tracking-tight">
            Knowledge Hub
          </h1>
          <p className="text-lg text-stone-700 leading-relaxed font-light">
            Authority-driven education about Shilajet, wellness habits, and Himalayan
            stewardship — crafted for clarity and trust.
          </p>
          <p className="font-urdu text-base text-stone-600 mt-3">
            شلجت، صحت مند طرزِ زندگی، اور ہمالیائی قدرتی ورثے سے متعلق مستند معلومات
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.title}
              className="p-6 rounded-2xl glass-card border border-stone-200/50 shadow-soft"
            >
              <div className="text-xs uppercase tracking-wide text-primary-700 font-semibold mb-3">
                {post.category}
              </div>
              <h3 className="font-display text-xl font-bold text-charcoal-900 mb-3">
                {post.title}
              </h3>
              {post.urdu && (
                <p className="font-urdu text-base text-stone-600 mb-3">{post.urdu}</p>
              )}
              <p className="text-stone-700 leading-relaxed font-light mb-6">
                {post.excerpt}
              </p>
              {post.excerptUrdu && (
                <p className="font-urdu text-sm text-stone-600 leading-relaxed mb-6">
                  {post.excerptUrdu}
                </p>
              )}
              <div className="text-sm text-stone-500">{post.readTime}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
