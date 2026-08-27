import { useEffect, useMemo, useState } from "react";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";
import { useStorage, useMain } from "@/data/hooks";
import { PreferenceUser } from "@/data/services";
import {
  languageIdToCode,
  resolveLanguageFromBrowser,
} from "@/lib/i18n/resolve-language";

const LANGUAGES = [
  { id: 1, img: ImgSVG.FlagBR, code: "pt_BR", label: "Português (BR)" },
  { id: 2, img: ImgSVG.FlagEUA, code: "en", label: "English" },
  { id: 3, img: ImgSVG.FlagSP, code: "es", label: "Español" },
] as const;

export function useLanguage() {
  const { setData, getData } = useStorage();
  const mainContext = useMain();
  const { i18n } = useTranslation();
  const { updatePreference } = PreferenceUser();

  const [showFlags, setShowFlags] = useState<boolean>(false);

  const flags = useMemo(() => [...LANGUAGES], []);

  const currentLanguage = useMemo(() => {
    const fromStorage = languageIdToCode(getData("id_idioma"));
    const code = resolveLanguageFromBrowser(i18n.language || fromStorage);

    return flags.find((lang) => lang.code === code) ?? flags[1];
  }, [flags, getData, i18n.language]);

  const handleLanguageChange = async (languageCode: string) => {
    try {
      await i18n.changeLanguage(languageCode);

      const selectedLanguage = flags.find((lang) => lang.code === languageCode);
      if (selectedLanguage) {
        setData("id_idioma", selectedLanguage.id.toString());

        const userId = Number(getData("id"));
        if (Number.isFinite(userId) && userId > 0) {
          await updatePreference(userId, { id_idioma: selectedLanguage.id });
        }
      }

      setShowFlags(false);
    } catch (error) {
      console.error("Erro ao atualizar idioma:", error);
    }
  };

  useEffect(() => {
    const storedId = getData("id_idioma");
    if (storedId === undefined || storedId === null || storedId === "") return;

    const language = languageIdToCode(storedId);
    if (language && i18n.language !== language) {
      void i18n.changeLanguage(language);
    }
  }, [mainContext, i18n, getData]);

  return { flags, showFlags, setShowFlags, currentLanguage, handleLanguageChange };
}
