export const SUPPORTED_LANGUAGES = ["pt_BR", "en", "es"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export function resolveLanguageFromBrowser(raw?: string): SupportedLanguage {
  const value = (raw ?? (typeof navigator !== "undefined" ? navigator.language : "") ?? "")
    .replace("-", "_")
    .toLowerCase();

  if (value.startsWith("pt")) return "pt_BR";
  if (value.startsWith("es")) return "es";
  if (value.startsWith("en")) return "en";

  return DEFAULT_LANGUAGE;
}

export function languageCodeToId(code: string): number {
  switch (code) {
    case "pt_BR":
      return 1;
    case "en":
      return 2;
    case "es":
      return 3;
    default:
      return languageCodeToId(DEFAULT_LANGUAGE);
  }
}

export function languageIdToCode(id?: string | number): SupportedLanguage {
  switch (String(id)) {
    case "1":
      return "pt_BR";
    case "2":
      return "en";
    case "3":
      return "es";
    default:
      return DEFAULT_LANGUAGE;
  }
}
