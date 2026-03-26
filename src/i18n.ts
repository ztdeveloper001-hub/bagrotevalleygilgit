import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Bagrote Valley",
      "explore": "Explore the Valleys",
      "blog": "Our Blog",
      "gallery": "Gallery",
      "directory": "Directory",
      "admin": "Admin Panel",
      "bookings": "Bookings",
      "packages": "Tour Packages",
      "marketplace": "Marketplace",
      "investors": "Investors",
      "ads": "Local Ads",
      "footer_text": "A visual journey through the peaks, glaciers, and vibrant culture of Bagrote.",
      "hero_subtitle": "Discover the hidden paradise of the Karakoram range.",
      "latest_stories": "Latest Stories",
      "read_more": "Read More",
      "book_now": "Book Now",
      "all": "All",
      "mountains": "Mountains",
      "glaciers": "Glaciers",
      "culture": "Culture",
      "festivals": "Festivals",
      "villages": "Villages"
    }
  },
  ur: {
    translation: {
      "welcome": "بگروٹ ویلی میں خوش آمدید",
      "explore": "وادیاں دریافت کریں",
      "blog": "ہمارا بلاگ",
      "gallery": "گیلری",
      "directory": "ڈائرکٹری",
      "admin": "ایڈمن پینل",
      "bookings": "بکنگ",
      "packages": "ٹور پیکجز",
      "marketplace": "مارکیٹ پلیس",
      "investors": "سرمایہ کار",
      "ads": "مقامی اشتہارات",
      "footer_text": "بگروٹ کی چوٹیوں، گلیشیئرز اور متحرک ثقافت کا ایک بصری سفر۔",
      "hero_subtitle": "قراقرم رینج کی چھپی ہوئی جنت دریافت کریں۔",
      "latest_stories": "تازہ ترین کہانیاں",
      "read_more": "مزید پڑھیں",
      "book_now": "ابھی بک کریں",
      "all": "تمام",
      "mountains": "پہاڑ",
      "glaciers": "گلیشیئرز",
      "culture": "ثقافت",
      "festivals": "تہوار",
      "villages": "گاؤں"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
