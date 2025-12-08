import { useEffect, useState } from "react";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";
import { useStorage, useMain } from "@/data/hooks";

export const useLanguage = () => {
  const { setData, getData } = useStorage();
  const mainContext = useMain();
  const { i18n, } = useTranslation();

  const languages = [
    {id:0,img:"",code:"",label:""},
    {id:1,img:ImgSVG.FlagBR,code:"pt_BR",label:""},
    {id:2,img:ImgSVG.FlagEUA,code:"en",label:""},
    {id:3,img:ImgSVG.FlagSP,code:"es",label:""},
  ];

  const [flags, setFlags] = useState(languages);
  const [showFlags, setShowFlags] = useState<boolean>(false);
  // Função utilitária para mapear id_idioma para código do idioma
  const getLanguageFromId = (id_idioma?: string | number): string => {
    switch (String(id_idioma)) {
      case "1":
        return "pt_BR";
      case "2":
        return "en";
      case "3":
        return "es";
      default:
        return "pt_BR";
    }
  };

  const handleLanguageChange = async (languageCode: string) => {
    try {
      i18n.changeLanguage(languageCode);

      const selectedLanguage = languages.find(lang => lang.code === languageCode);
      if (selectedLanguage) {
        setData("id_idioma", selectedLanguage.id.toString());
      } else{
        console.log("Não foi encontrado o idioma");
      }

      setShowFlags(false);
    } catch (error) {
      console.error('Erro ao atualizar idioma:', error);
    }
  };

  useEffect(() => {
    const language = getLanguageFromId(getData("idioma"));

    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [mainContext, i18n]);

  return { flags, showFlags, setShowFlags, setFlags, handleLanguageChange };
}