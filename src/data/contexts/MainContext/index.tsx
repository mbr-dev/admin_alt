import * as IMC from "./model";
import { useStorage } from "@/data/hooks";
import { Loading } from "@/components/template";
import { useState, createContext, useEffect } from "react";

export const MainContext = createContext({} as IMC.IMainContext);

export function MainContextProvider({ children }: IMC.IMainContextProvider) {
  const { getData } = useStorage();

  const [load, setLoad] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  //Função que pegar o avatar e hierarquia
  const fetchData = () => {
    setIsReady(true);
  }

  useEffect(() => {
    if (getData("token")) {
      console.log("passou aqui")
      fetchData();
    }
  }, []);

  return (
    <MainContext.Provider value={{ isReady, load, setLoad }}>
      {load && <Loading />}
      {children}
    </MainContext.Provider>
  );
}