import * as IHC from "./home-model";
import { Home } from "@/data/services";
import { useMain, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { useState, createContext, useEffect } from "react";

export const HomeContext = createContext({} as IHC.IHomeContext);

export function HomeContextProvider({ children }: IHC.IHomeContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();

  const { getStudentDatasForHomeALT, getTeacherDatasForHomeALTClinic, getSecretaryDatasForHomeALT, getCoordinatorDatasForHomeALT } = Home();

  const [ranking, setRanking] = useState<IHC.IUserPosition[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  //Função que busca os dados para home
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);
      //Busca os dados pela hierarquia
      const response = 
        Number(getData("hierarquia")) === UserRole.COORDINATOR ? await getCoordinatorDatasForHomeALT() :
        Number(getData("hierarquia")) === UserRole.TEACHER ? await getTeacherDatasForHomeALTClinic() :
        Number(getData("hierarquia")) === UserRole.STUDENT ? await getStudentDatasForHomeALT() : await getSecretaryDatasForHomeALT();

      if (response) {
        //Filtra o evento pela hierarquia
        const eventByHierarchy = Number(getData("hierarquia")) === UserRole.SECRETARY ? response.eventsHome : response.eventsActivity;
        console.log("name", response.name)
        setRanking(response.rakingHome.data);
        setEvents(eventByHierarchy);
        setName(response.name);
        //Salva no storage
        const sessionData = {
          ranking: response.rakingHome.data,
          events: eventByHierarchy,
          name: response.name
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
    //Caso tenha session usar ele
    if (cached) {
      const parsed = JSON.parse(cached);
      setRanking(parsed.ranking);
      setEvents(parsed.events);
      setName(parsed.name);
      //Caso não tenha recarregue
    } else if (mainContext.isReady && Number(getData("hierarquia"))) {
      fetchData();
    }
  }, [mainContext.isReady]);

  return (
    <HomeContext.Provider value={{ ranking, name, events }}>
      {children}
    </HomeContext.Provider>
  );
}