import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) 
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', 
    debug: true, 
    supportedLngs: ['en', 'es', 'fr', 'de', 'hi', 'mr'], 
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'], 
      caches: ['cookie'], 
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;