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
  const [clinicData, setClinicData] = useState<IHC.IHomeContext["clinicData"]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      mainContext.setLoad(true);
      const hierarchy = Number(getData("hierarquia"));
      const storedName = String(getData("nome") ?? getData("usuario") ?? "");

      if (hierarchy === UserRole.SECRETARY) {
        const response = await getSecretaryDatasForHomeALTClinic();
        if (response) {
          setClinicData(response);
          setName(response.nome || storedName);
        }
        return;
      }

      const response =
        hierarchy === UserRole.COORDINATOR || hierarchy === UserRole.ADMIN ? await getCoordinatorDatasForHomeALTClinc() :
        hierarchy === UserRole.TEACHER ? await getTeacherDatasForHomeALTClinic() :
        await getStudentDatasForHomeALT();

      if (response) {
        setRanking(response.rakingHome?.data ?? []);
        setEvents(response.eventsActivity ?? []);
        setName(response.name ?? storedName);
      }
    } finally {
      setIsLoading(false);
      mainContext.setLoad(false);
    }
  }

  useEffect(() => {
    if (mainContext.isReady && Number(getData("hierarquia"))) {
      fetchData();
    }
  }, [mainContext.isReady]);

  return (
    <HomeContext.Provider value={{ ranking, name, events, clinicData, isLoading }}>
      {children}
    </HomeContext.Provider>
  );
}
