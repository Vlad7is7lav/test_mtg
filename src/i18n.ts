import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import data from '../data.json'
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    detection: { order: ["path", "navigator"] },
    fallbackLng: "en",
    resources: data,
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

  export default i18n