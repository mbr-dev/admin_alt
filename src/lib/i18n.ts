import i18n from "i18next";
import * as lg from "../lib/i18n/index.ts";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  DEFAULT_LANGUAGE,
  resolveLanguageFromBrowser,
  SUPPORTED_LANGUAGES,
} from "./i18n/resolve-language";

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
        header: lg.header_ptBR,
        units: lg.units_ptBR,
        professionals: lg.professionals_ptBR,
        login: lg.login_ptBR,
        students: lg.students_ptBR,
        reportStudent: lg.reportStudent_ptBR,
        altSession: lg.altSession_ptBR,
      },
      en: {
        common: lg.common_en,
        profile: lg.profile_en,
        support: lg.support_en,
        home: lg.home_en,
        monitoring: lg.monitoring_en,
        didactic: lg.didactic_en,
        indicators: lg.indicators_en,
        header: lg.header_en,
        units: lg.units_en,
        professionals: lg.professionals_en,
        login: lg.login_en,
        students: lg.students_en,
        reportStudent: lg.reportStudent_en,
        altSession: lg.altSession_en,
      },
      es: {
        common: lg.common_es,
        profile: lg.profile_es,
        support: lg.support_es,
        home: lg.home_es,
        monitoring: lg.monitoring_es,
        didactic: lg.didactic_es,
        indicators: lg.indicators_es,
        header: lg.header_es,
        units: lg.units_es,
        professionals: lg.professionals_es,
        login: lg.login_es,
        students: lg.students_es,
        reportStudent: lg.reportStudent_es,
        altSession: lg.altSession_es,
      },
    },
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: DEFAULT_LANGUAGE,
    ns: [
      "common",
      "profile",
      "support",
      "home",
      "monitoring",
      "didactic",
      "indicators",
      "header",
      "units",
      "professionals",
      "login",
      "students",
      "reportStudent",
      "altSession",
    ],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["navigator"],
      caches: [],
      convertDetectedLanguage: (lng) => resolveLanguageFromBrowser(lng),
    },
  });

export default i18n;
