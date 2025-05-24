import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 翻訳リソース
const resources = {
  ja: {
    translation: {
      "home": "ホーム",
      "rooms": "お部屋",
      "access": "アクセス",
      "contact": "お問い合わせ",
      "theme": "テーマ",
      "language": "言語",
      "menu": "メニュー"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "rooms": "Rooms",
      "access": "Access",
      "contact": "Contact",
      "theme": "Theme",
      "language": "Language",
      "menu": "Menu"
    }
  },
  ko: {
    translation: {
      "home": "홈",
      "rooms": "객실",
      "access": "오시는 길",
      "contact": "문의하기",
      "theme": "테마",
      "language": "언어",
      "menu": "메뉴"
    }
  },
  'zh-CN': {
    translation: {
      "home": "首页",
      "rooms": "客房",
      "access": "交通指南",
      "contact": "联系我们",
      "theme": "主题",
      "language": "语言",
      "menu": "菜单"
    }
  },
  'zh-TW': {
    translation: {
      "home": "首頁",
      "rooms": "客房",
      "access": "交通指南",
      "contact": "聯絡我們",
      "theme": "主題",
      "language": "語言",
      "menu": "選單"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
