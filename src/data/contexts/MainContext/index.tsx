import * as IMC from "./model";
import { decodeToken } from "react-jwt";
import { useStorage } from "@/data/hooks";
import { useLocation } from "react-router";
import { Loading } from "@/components/template";
import { useState, createContext, useEffect, useMemo } from "react";

export const MainContext = createContext({} as IMC.IMainContext);

export function MainContextProvider({ children }: IMC.IMainContextProvider) {
  const { setData } = useStorage();
  const { search } = useLocation();

  const getToken = useMemo(() => new URLSearchParams(search).get("token"), [search]);
  const getUnitID = useMemo(() => Number(new URLSearchParams(search).get("id_unidade")), [search]);

  const [idioma, setIdioma] = useState<number>(0);
  const [load, setLoad] = useState<boolean>(false);
  const [avatarUser, setAvatarUser] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<IMC.ITokenData>({} as IMC.ITokenData);
  //Função que pegar o avatar e hierarquia
  const fetchData = () => {      
    const decoded: any = decodeToken(getToken!);

    setAvatarUser(decoded.avatar);
    setTokenData(decoded);
    setData("token", getToken);
    setData("id_unidade", getUnitID);
    setData("id_idioma", decoded.id_idioma);
    setIsReady(true);
  }

  //useEffect(() => { fetchData(); }, []);

  return (
    <MainContext.Provider value={{ tokenData, isReady, idioma, load, setIdioma, setAvatarUser, setLoad, avatarUser }}>
      {load && <Loading />}
      {children}
    </MainContext.Provider>
  );
}