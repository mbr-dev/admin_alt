import * as IHC from "./home-model";
import { Home } from "@/data/services";
import { useMain, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { useState, createContext, useEffect } from "react";

export const HomeContext = createContext({} as IHC.IHomeContext);

export function HomeContextProvider({ children }: IHC.IHomeContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();

  const { getStudentDatasForHomeALT, getTeacherDatasForHomeALT, getSecretaryDatasForHomeALT, getCoordinatorDatasForHomeALT } = Home();

  const [ranking, setRanking] = useState<IHC.IUserPosition[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [userPosition, setUserPosition] = useState<IHC.IUserPosition | null>(null);
  //Função que busca os dados para home
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = 
        Number(getData("hierarquia")) === UserRole.COORDINATOR ? await getCoordinatorDatasForHomeALT() :
        Number(getData("hierarquia")) === UserRole.TEACHER ? await getTeacherDatasForHomeALT() :
        Number(getData("hierarquia")) === UserRole.STUDENT ? await getStudentDatasForHomeALT() : await getSecretaryDatasForHomeALT();

      if (response) {
        const eventByHierarchy = Number(getData("hierarquia")) === UserRole.SECRETARY ? response.eventsHome : response.eventsActivity;

        setUserPosition(response.rakingHome.usuario_posicao);
        setRanking(response.rakingHome.data);
        setEvents(eventByHierarchy);
        //Salva no storage
        const sessionData = {
          ranking: response.rakingHome.data,
          userPosition: response.rakingHome.usuario_posicao,
          events: eventByHierarchy,
        }
        sessionStorage.setItem("home-data", JSON.stringify(sessionData));
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }

  useEffect(() => {
    //Verifica se tem no session os dados
    const cached = sessionStorage.getItem("home-data");

    if (cached) {
      const parsed = JSON.parse(cached);
      setRanking(parsed.ranking);
      setUserPosition(parsed.userPosition);
      setEvents(parsed.events);
    } else if (mainContext.isReady && Number(getData("hierarquia"))) {
      fetchData();
    }
  }, [mainContext.isReady]);

  return (
    <HomeContext.Provider value={{ ranking, userPosition, events }}>
      {children}
    </HomeContext.Provider>
  );
}