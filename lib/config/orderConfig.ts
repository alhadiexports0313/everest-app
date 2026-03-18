const noteSuggestionsUrdu = [
  "براہ کرم پروڈکٹ کی دستیابی کی تصدیق کریں۔",
  "مہربانی کر کے ادائیگی کے طریقہ کار کی تفصیل شیئر کریں۔",
  "براہ کرم ڈیلیوری وقت بتائیں۔",
  "اگر ممکن ہو تو جلد ڈیلیوری فراہم کریں۔",
  "براہ کرم اصل پروڈکٹ کی تصدیق کریں۔",
  "مہربانی کر کے شپنگ چارجز بتائیں۔",
  "براہ کرم اسٹاک دستیابی کی تصدیق کریں۔",
  "میں محفوظ پیکجنگ چاہتا ہوں۔",
  "براہ کرم بھیجنے سے پہلے رابطہ کریں۔",
  "مناسب سائز کے بارے میں رہنمائی کریں۔",
];

const noteSuggestionsEnglish = [
  "Please confirm product availability.",
  "Kindly share payment method details.",
  "Please provide delivery time estimate.",
  "I prefer fast delivery if possible.",
  "Please confirm original product authenticity.",
  "Kindly share shipping charges.",
  "Please confirm stock availability.",
  "I would like secure packaging.",
  "Please contact me before dispatch.",
  "Kindly guide me about best size option.",
];

export const getOrderNoteSuggestions = (isUrdu: boolean) =>
  isUrdu ? noteSuggestionsUrdu : noteSuggestionsEnglish;
