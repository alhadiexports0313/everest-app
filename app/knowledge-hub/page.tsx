const posts = [
  {
    title: "What Is Shilajet? Origins, Composition, and Benefits",
    category: "Basics",
    readTime: "6 min read",
    excerpt:
      "A clear overview of how Shilajet forms, what it contains, and why it is prized for wellness.",
  },
  {
    title: "How to Choose Authentic Shilajet",
    category: "Quality",
    readTime: "5 min read",
    excerpt:
      "Learn how lab testing, sourcing transparency, and purity standards help identify real Shilajet.",
  },
  {
    title: "Daily Use Guide: Timing, Dosage, and Safety",
    category: "Wellness",
    readTime: "7 min read",
    excerpt:
      "Practical recommendations for building a consistent routine and getting the most from your supplement.",
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
            Research-backed insights, product education, and wellness guidance from the
            Himalayas.
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
              <p className="text-stone-700 leading-relaxed font-light mb-6">
                {post.excerpt}
              </p>
              <div className="text-sm text-stone-500">{post.readTime}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
