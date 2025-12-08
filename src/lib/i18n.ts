import i18n from "i18next";
import * as lg from "../lib/i18n/index.ts";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      pt_BR: {
        common: lg.common_ptBR,
        profile: lg.profile_ptBR,
        support: lg.support_ptBR,
        home: lg.home_ptBR,
        monitoring: lg.monitoring_ptBR,
        didactic: lg.didactic_ptBR,
        indicators: lg.indicators_ptBR,
        header: lg.header_ptBR
      },
      en: {
        common: lg.common_en,
        profile: lg.profile_en,
        support: lg.support_en,
        home: lg.home_en,
        monitoring: lg.monitoring_en,
        didactic: lg.didactic_en,
        indicators: lg.indicators_en,
        header: lg.header_en
      },
      es: {
        common: lg.common_es,
        profile: lg.profile_es,
        support: lg.support_es,
        home: lg.home_es,
        monitoring: lg.monitoring_es,
        didactic: lg.didactic_es,
        indicators: lg.indicators_es,
        header: lg.header_es
      }
    },
    fallbackLng: "pt_BR",
    lng: "pt_BR",
    ns: [
      "common",
      "profile",
      "support",
      "home",
      "monitoring",
      "didactic",
      "indicators",
      "header"
    ],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });
// Console logs para debug do idioma
console.log("🎯 Idioma atual:", i18n.language);
console.log("🔄 Idioma detectado pelo navegador:", navigator.language);
// Listener para mudanças de idioma
i18n.on('languageChanged', (lng) => {
  console.log("🔄 Idioma alterado para:", lng);
});

export default i18n;