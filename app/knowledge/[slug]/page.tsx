import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KnowledgeArticleClient from "./KnowledgeArticleClient";
import { getLocale } from "@/lib/i18n-server";

const articles = {
  "understanding-shilajet": {
    title: "Understanding Shilajet: Origins, Formation, and Active Minerals",
    urduTitle: "سلاجیت کو سمجھیں: تشکیل، اصل اور فعال معدنیات",
    readTime: "7 min read",
    readTimeUrdu: "7 منٹ مطالعہ",
    description:
      "A clear, professional guide to how authentic Shilajet forms, why its mineral profile matters, and how purity is verified.",
    urduDescription:
      "مستند سلاجیت کی تشکیل، معدنیاتی اہمیت اور خلوص کی تصدیق پر ایک واضح اور پیشہ ورانہ رہنمائی۔",
    sections: [
      {
        title: "Natural Formation in the Himalayas & Karakoram",
        urduTitle: "ہمالیہ اور قراقرم میں قدرتی تشکیل",
        body:
          "Authentic Shilajet forms over centuries within high-altitude rock layers of the Himalayas and Karakoram. As alpine vegetation and microbial life decompose under pressure, temperature shifts, and geological stress, a dense mineral-rich resin develops and slowly seeps through rock crevices.",
        urdu:
          "اصل سلاجیت ہمالیہ اور قراقرم کی بلند پہاڑی چٹانوں میں صدیوں کے دوران بنتی ہے۔ جب پودے اور خرد حیاتیات دباؤ، درجہ حرارت کی تبدیلی اور ارضیاتی دباؤ کے تحت تحلیل ہوتے ہیں تو معدنیات سے بھرپور رال بن کر چٹانوں کی درزوں سے خارج ہوتی ہے۔",
      },
      {
        title: "Mineral Composition (85+ Trace Minerals)",
        urduTitle: "معدنی ترکیب (85+ ٹریس منرلز)",
        body:
          "Pure Shilajet carries a broad mineral spectrum that supports metabolic stability and cellular balance in a bioavailable, ionic form.",
        bullets: [
          {
            label: "85+ trace minerals",
            text: "Contribute to enzymatic activity and cellular function.",
          },
          {
            label: "Ionic bioavailable form",
            text: "Supports absorption and transport at the cellular level.",
          },
          {
            label: "Iron, Magnesium, Zinc, Selenium",
            text: "Key minerals associated with energy, immunity, and recovery.",
          },
          {
            label: "Balanced mineral profile",
            text: "Helps maintain consistent physiological resilience.",
          },
        ],
        urduBullets: [
          {
            label: "85+ ٹریس منرلز",
            text: "انزائمز کی سرگرمی اور خلیاتی عمل میں مدد دیتے ہیں۔",
          },
          {
            label: "آئنک قابلِ جذب شکل",
            text: "جذب اور خلیاتی ترسیل میں معاون ثابت ہوتی ہے۔",
          },
          {
            label: "آئرن، میگنیشیم، زنک، سیلینیم",
            text: "توانائی، قوتِ مدافعت اور بحالی سے متعلق اہم معدنیات۔",
          },
          {
            label: "متوازن معدنی پروفائل",
            text: "جسمانی توازن اور مسلسل کارکردگی کو برقرار رکھتا ہے۔",
          },
        ],
        urdu:
          "خالص سلاجیت میں 85 سے زائد معدنیات قدرتی اور قابلِ جذب آئنک شکل میں موجود ہوتے ہیں۔ آئرن، میگنیشیم، زنک اور سیلینیم جیسے اہم عناصر توانائی، قوتِ مدافعت اور بحالی میں معاون ہوتے ہیں اور جسمانی توازن کو بہتر بناتے ہیں۔",
      },
      {
        title: "Fulvic Acid Role (40–50%)",
        urduTitle: "فولویِک ایسڈ کا کردار (40–50%)",
        body:
          "High-quality Shilajet typically contains 40–50% fulvic acid. This bioactive compound supports mineral transport, improves mitochondrial efficiency, and provides antioxidant protection against oxidative stress in a controlled, evidence-based manner.",
        urdu:
          "اعلیٰ معیار کی سلاجیت میں عموماً 40–50 فیصد فولویِک ایسڈ موجود ہوتا ہے، جو معدنیات کو خلیات تک پہنچانے، مائٹوکانڈریا کی کارکردگی بہتر بنانے اور آکسیڈیٹو اسٹریس سے تحفظ دینے میں مدد دیتا ہے۔",
      },
      {
        title: "Authenticity Verification & Lab Testing",
        urduTitle: "اصالت کی تصدیق اور لیب ٹیسٹنگ",
        body:
          "Professional verification relies on lab testing for heavy metals, microbial safety, and mineral composition. ISO and GMP compliance indicate standardized processing, while transparent COA reporting confirms batch-level purity. Purified resin differs from raw material by removing contaminants while preserving active compounds.",
        urdu:
          "مستند سلاجیت کی تصدیق لیبارٹری ٹیسٹنگ کے ذریعے ہوتی ہے، جس میں بھاری دھاتوں، مائیکروبیل سیفٹی اور معدنیاتی مقدار کی جانچ شامل ہے۔ ISO اور GMP سرٹیفیکیشن معیاری پروسیسنگ کو ظاہر کرتے ہیں، جبکہ COA ہر بیچ کی خلوص کی تصدیق کرتا ہے۔ صاف شدہ رال میں آلودگیاں نکالی جاتی ہیں جبکہ فعال اجزاء محفوظ رہتے ہیں۔",
      },
    ],
  },
  "usage-guide": {
    title: "Usage Guide: Timing, Dosage, and Safe Daily Routine",
    urduTitle: "استعمال کی مکمل رہنمائی",
    readTime: "6 min read",
    readTimeUrdu: "6 منٹ مطالعہ",
    description:
      "A practical routine for dosage, timing, and safe daily use to maximize mineral absorption.",
    urduDescription:
      "مقدار، وقت اور محفوظ روزمرہ استعمال کے لیے عملی رہنمائی تاکہ معدنیات کا جذب بہتر ہو۔",
    sections: [
      {
        title: "Recommended Dosage (250mg–500mg)",
        urduTitle: "تجویز کردہ مقدار (250mg–500mg)",
        body:
          "Consistent, moderate use produces the most reliable results and supports long-term balance.",
        table: [
          { label: "Beginners", value: "250 mg (pea-sized)" },
          { label: "Regular users", value: "500 mg" },
          { label: "Frequency", value: "Once daily" },
        ],
        urduTable: [
          { label: "نئے صارفین", value: "250 mg (مٹر کے برابر)" },
          { label: "باقاعدہ صارفین", value: "500 mg" },
          { label: "فریکوئنسی", value: "روزانہ ایک بار" },
        ],
        urdu:
          "مسلسل اور مناسب مقدار میں استعمال بہترین نتائج دیتا ہے۔ نئے صارفین 250 ملی گرام سے آغاز کریں، جبکہ معمول کے صارفین 500 ملی گرام استعمال کریں۔",
      },
      {
        title: "Best Timing (Morning / Before Workout)",
        urduTitle: "بہترین وقت (صبح / ورزش سے پہلے)",
        body:
          "Timing affects absorption and energy response throughout the day.",
        list: [
          "Morning on an empty stomach for steady energy.",
          "Before workout for endurance support.",
          "Avoid late-night intake if you are sensitive to stimulation.",
        ],
        urduList: [
          "صبح خالی پیٹ تاکہ توانائی متوازن رہے۔",
          "ورزش سے پہلے برداشت میں مدد کے لیے۔",
          "اگر حساسیت ہو تو رات کے وقت استعمال سے گریز کریں۔",
        ],
        urdu:
          "بہترین نتائج کے لیے صبح خالی پیٹ استعمال کریں یا ورزش سے پہلے لیں۔ اگر حساسیت ہو تو رات کے وقت استعمال سے گریز کریں۔",
      },
      {
        title: "How to Consume (Warm Water Method)",
        urduTitle: "استعمال کا طریقہ (نیم گرم پانی)",
        body:
          "Preparation helps the resin dissolve fully and improves mineral uptake.",
        list: [
          "Dissolve in warm water.",
          "Can mix with milk if preferred.",
          "Stir completely before drinking.",
          "Avoid boiling water to protect active compounds.",
        ],
        urduList: [
          "نیم گرم پانی میں حل کریں۔",
          "ضرورت ہو تو دودھ کے ساتھ ملا سکتے ہیں۔",
          "مکمل حل ہونے کے بعد استعمال کریں۔",
          "ابلتا پانی استعمال نہ کریں تاکہ فعال اجزاء محفوظ رہیں۔",
        ],
        urdu:
          "سلاجیت کو نیم گرم پانی میں گھولیں، مکمل حل ہونے کے بعد استعمال کریں۔ دودھ کے ساتھ بھی استعمال کیا جا سکتا ہے، مگر اُبلتا پانی استعمال نہ کریں۔",
      },
      {
        title: "Safety Guidelines & Precautions",
        urduTitle: "حفاظتی ہدایات اور احتیاط",
        body:
          "Use Shilajet with a medical-professional approach for safe, consistent outcomes.",
        list: [
          "Not recommended for pregnant women.",
          "Consult a physician if you are on medication.",
          "Use lab-tested product only.",
          "Store properly in a cool, dry place.",
        ],
        urduList: [
          "حمل کے دوران استعمال نہ کریں۔",
          "ادویات کے ساتھ استعمال سے پہلے ڈاکٹر سے مشورہ کریں۔",
          "صرف لیب ٹیسٹ شدہ سلاجیت استعمال کریں۔",
          "ٹھنڈی اور خشک جگہ پر محفوظ رکھیں۔",
        ],
        urdu:
          "حمل کے دوران استعمال نہ کریں، ادویات کے ساتھ استعمال سے پہلے ڈاکٹر سے مشورہ کریں، صرف لیب ٹیسٹ شدہ سلاجیت استعمال کریں، اور اسے ٹھنڈی خشک جگہ پر محفوظ رکھیں۔",
      },
    ],
  },
  "wellness-lifestyle": {
    title: "Wellness Lifestyle: Energy, Recovery, and Daily Rituals",
    urduTitle: "صحت مند طرزِ زندگی اور سلاجیت",
    readTime: "5 min read",
    readTimeUrdu: "5 منٹ مطالعہ",
    description:
      "A holistic view of how Shilajet supports energy, recovery, and mindful routines without exaggerated claims.",
    urduDescription:
      "ایک جامع نظر کہ سلاجیت کس طرح توانائی، بحالی اور باقاعدہ عادات میں مدد دیتی ہے۔",
    sections: [
      {
        title: "Energy Optimization",
        urduTitle: "توانائی میں بہتری",
        body:
          "Shilajet supports steady energy by improving mineral availability and mitochondrial function, helping you feel balanced rather than overstimulated.",
        urdu:
          "سلاجیت معدنیات کی فراہمی اور مائٹوکانڈریا کے عمل کو بہتر بنا کر متوازن توانائی میں مدد دیتی ہے، بغیر حد سے زیادہ جوش پیدا کیے۔",
      },
      {
        title: "Recovery & Performance",
        urduTitle: "بحالی اور کارکردگی",
        body:
          "Minerals and fulvic compounds aid recovery by supporting hydration balance and cellular repair after training.",
        urdu:
          "معدنیات اور فولویِک اجزاء ورزش کے بعد جسمانی بحالی، ہائیڈریشن اور خلیاتی مرمت میں معاون ہوتے ہیں۔",
      },
      {
        title: "Morning Ritual Integration",
        urduTitle: "صبح کے معمول میں شمولیت",
        body:
          "Taking Shilajet with warm water in the morning can become a calming routine that encourages focus and consistency.",
        urdu:
          "صبح نیم گرم پانی کے ساتھ سلاجیت کا استعمال ایک پرسکون معمول بن سکتا ہے جو توجہ اور مستقل مزاجی کو بہتر کرتا ہے۔",
      },
      {
        title: "Nutrition Synergy",
        urduTitle: "غذائی ہم آہنگی",
        body:
          "A mineral-rich resin complements whole foods by filling subtle nutrient gaps without replacing a balanced diet.",
        urdu:
          "سلاجیت متوازن غذا کا متبادل نہیں بلکہ اس کے ساتھ مل کر غذائی اجزاء کی کمی کو پورا کرنے میں مدد دیتی ہے۔",
      },
      {
        title: "Sleep & Balance",
        urduTitle: "نیند اور توازن",
        body:
          "Daytime use paired with good sleep hygiene supports recovery cycles and maintains long-term vitality.",
        urdu:
          "دن کے وقت استعمال اور بہتر نیند کی عادات مل کر بحالی کے نظام کو مضبوط بناتی ہیں اور طویل مدتی توانائی میں مدد دیتی ہیں۔",
      },
    ],
  },
  "nature-respect": {
    title: "Respecting Nature: Ethical Harvesting and Mountain Conservation",
    urduTitle: "فطرت کا احترام اور ذمہ دارانہ حصول",
    readTime: "5 min read",
    readTimeUrdu: "5 منٹ مطالعہ",
    description:
      "Ethical sourcing, conservation, and community responsibility behind Everest Organic Shilajit.",
    urduDescription:
      "ایورسٹ آرگینک سلاجیت کے پیچھے اخلاقی حصول، تحفظ اور کمیونٹی کی ذمہ داری۔",
    sections: [
      {
        title: "Ethical Harvesting",
        urduTitle: "اخلاقی حصول",
        body:
          "Responsible collection follows traceable mountain belts and avoids disruptive extraction methods that damage rock layers.",
        urdu:
          "ذمہ دار طریقۂ حصول قابلِ تصدیق پہاڑی علاقوں سے کیا جاتا ہے اور ایسے طریقوں سے بچا جاتا ہے جو چٹانی تہوں کو نقصان پہنچائیں۔",
      },
      {
        title: "Sustainable Sourcing",
        urduTitle: "پائیدار ذرائع",
        body:
          "Seasonal harvesting and controlled extraction preserve the natural formation cycle of Shilajet.",
        urdu:
          "موسمی اور محدود مقدار میں جمع کرنا سلاجیت کی قدرتی تشکیل کے عمل کو محفوظ رکھتا ہے۔",
      },
      {
        title: "Protecting Himalayan Ecosystems",
        urduTitle: "ہمالیائی ماحولیات کا تحفظ",
        body:
          "Low-impact processing and careful site management reduce ecological disturbance in fragile alpine zones.",
        urdu:
          "کم اثرات والے طریقہ کار اور مناسب نگرانی نازک پہاڑی ماحول کو نقصان سے بچاتے ہیں۔",
      },
      {
        title: "Supporting Mountain Communities",
        urduTitle: "پہاڑی کمیونٹیز کی معاونت",
        body:
          "Ethical trade ensures local communities receive fair compensation and long-term partnership benefits.",
        urdu:
          "منصفانہ تجارت کے ذریعے مقامی آبادی کو مناسب معاوضہ اور مستقل تعاون حاصل ہوتا ہے۔",
      },
      {
        title: "Eco-Conscious Packaging",
        urduTitle: "ماحول دوست پیکجنگ",
        body:
          "Glass jars and reduced plastic use reflect a commitment to sustainability without compromising premium presentation.",
        urdu:
          "شیشے کے جار اور کم پلاسٹک استعمال کرنا پائیداری اور اعلیٰ معیار سے وابستگی ظاہر کرتا ہے۔",
      },
    ],
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
  const title = locale === "ur" ? article.urduTitle : article.title;
  const description =
    locale === "ur" ? article.urduDescription ?? article.description : article.description;
  const hubLabel = locale === "ur" ? "نالج ہب" : "Knowledge Hub";
  const basePath = `/knowledge/${slug}`;
  return {
    title: `${title} | ${hubLabel}`,
    description,
    alternates: {
      canonical: basePath,
      languages: {
        en: basePath,
        ur: `${basePath}?lang=ur`,
      },
    },
    openGraph: {
      title: `${title} | ${hubLabel}`,
      description,
      type: "article",
      url: basePath,
      images: [
        {
          url: "/images/banners/mountains-peak.jpg",
          width: 1200,
          height: 630,
          alt: isUrdu
            ? "ہمالیائی سلاجیت اور ویلنَس مضمون"
            : "Himalayan Shilajit knowledge article",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${hubLabel}`,
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

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug as ArticleKey];
  if (!article) notFound();
  const locale = await getLocale();
  const isUrdu = locale === "ur";
  const articleTitle = isUrdu ? article.urduTitle : article.title;
  const articleDescription = isUrdu
    ? article.urduDescription ?? article.description
    : article.description;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articleTitle,
    description: articleDescription,
    author: {
      "@type": "Organization",
      name: "Everest Organic Shilajit",
    },
    publisher: {
      "@type": "Organization",
      name: "Everest Organic Shilajit",
      logo: {
        "@type": "ImageObject",
        url: "https://everestorganicshilajet.com/images/brand/logo.jpeg",
      },
    },
    mainEntityOfPage: `https://everestorganicshilajet.com/knowledge/${slug}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <KnowledgeArticleClient article={article} />
    </>
  );
}
