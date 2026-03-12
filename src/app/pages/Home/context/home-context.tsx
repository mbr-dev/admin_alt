import * as IHC from "./home-model";
import { Home } from "@/data/services";
import { useMain, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { useState, createContext, useEffect } from "react";

export const HomeContext = createContext({} as IHC.IHomeContext);

export function HomeContextProvider({ children }: IHC.IHomeContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();

  const { getStudentDatasForHomeALT, getTeacherDatasForHomeALTClinic, getSecretaryDatasForHomeALTClinic, getCoordinatorDatasForHomeALTClinc } = Home();

  const [ranking, setRanking] = useState<IHC.IUserPosition[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  //Função que busca os dados para home
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);
      //Busca os dados pela hierarquia
      const response = 
        Number(getData("hierarquia")) === UserRole.COORDINATOR ? await getCoordinatorDatasForHomeALTClinc() :
        Number(getData("hierarquia")) === UserRole.TEACHER ? await getTeacherDatasForHomeALTClinic() :
        Number(getData("hierarquia")) === UserRole.STUDENT ? await getStudentDatasForHomeALT() : await getSecretaryDatasForHomeALTClinic();

      if (response) {
        //Filtra o evento pela hierarquia
        setRanking(response.rakingHome.data);
        setEvents(response.eventsActivity);
        setName(response.name);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }

  useEffect(() => {
    if (mainContext.isReady && Number(getData("hierarquia"))) {
      fetchData();
    }
  }, [mainContext.isReady]);

  return (
    <HomeContext.Provider value={{ ranking, name, events }}>
      {children}
    </HomeContext.Provider>
  );
}