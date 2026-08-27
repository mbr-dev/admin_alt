import * as ILC from "./login-model";
import { Login, PreferenceUser } from "@/data/services";
import { useStorage } from "@/data/hooks";
import { useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import { UserRole } from "../../../../data/constants/user-roles";
import i18n from "@/lib/i18n";
import { languageCodeToId, languageIdToCode, resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";

export const LoginContext = createContext({} as ILC.ILoginContext);

export function LoginContextProvider({ children }: ILC.ILoginContextProvider) {
  const nav = useNavigate();
  const { Auth, getUserUnitAndIdByIdUser, getAllUnitByNetworkId } = Login();
  const { getPreferenceByUserId } = PreferenceUser();
  const { setData } = useStorage();

  const [load, setLoad] = useState<boolean>(false);

  const applyLanguageFromPreference = async (userId: number) => {
    const preference = await getPreferenceByUserId(userId);
    const preferenceId = Number(preference?.id_preferencia);

    if (!Number.isFinite(preferenceId) || preferenceId <= 0) return;

    setData("id_idioma", preferenceId);
    const language = languageIdToCode(preferenceId);
    if (i18n.language !== language) {
      await i18n.changeLanguage(language);
    }
  };

  //Faz o login
  const handleSignIn = async (user: string, password: string) => {
    try {
      setLoad(true);

      const response = await Auth({ usuario: user, senha: password});
      if (response) {
        saveDataInStorage({ keys: Object.keys(response), values: Object.values(response) });

        if (response.hierarquia === UserRole.SECRETARY) {
          const responseUnit = await getAllUnitByNetworkId(response.id_rede);
          if (responseUnit) {
            setData("id_unidade", responseUnit[0].id);
          }
        } else {
          const responseUnit = await getUserUnitAndIdByIdUser(response.id);
          if (responseUnit) {
            setData("id_unidade", responseUnit.id_unidade);
          }
        }

        const userId = Number(response.id);
        if (Number.isFinite(userId) && userId > 0) {
          await applyLanguageFromPreference(userId);
        }

        goToHome();
      }
    } finally {
      setLoad(false);
    }
  }
  //Salva os dados no cookie
  const saveDataInStorage = (data: any) => {
    data.keys.forEach((key: any, index: any) => {
      if (data.values[index] === 0 || data.values[index] === "") return;

      if (key === "access_token") {
        setData("token", data.values[index]);
        return;
      }

      setData(key, data.values[index]);
    });

    setData("id_idioma", languageCodeToId(resolveLanguageFromBrowser(i18n.language)));
  }
  //Manda para Home
  const goToHome = () => {
    nav("/");
    window.location.reload();
  }

  return (
    <LoginContext.Provider value={{ handleSignIn, load }}>
      {children}
    </LoginContext.Provider>
  );
}