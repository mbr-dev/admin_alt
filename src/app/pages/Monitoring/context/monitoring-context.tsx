import { useMain } from "@/data/hooks";
import * as IMC from "./monitoring-model";
import { Monitoring } from "@/data/services";
import { useState, createContext, useEffect } from "react";

export const MonitoringContext = createContext({} as IMC.IMonitoringContext);

export function MonitoringContextProvider({ children }: IMC.IMonitoringContextProvider) {
  const mainContext = useMain();
  const { getLogAltTotalStudentPlayed } = Monitoring();

  const [data, setData] = useState<any | null>(null);
  //Função que busca os dados para Monitoring
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = await getLogAltTotalStudentPlayed();
      if (response) {
        setData(response);
        //Salva no storage do navegador
        const sessionData = {
          monitoring: response
        }

        sessionStorage.setItem("monitoring-data", JSON.stringify(sessionData));
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }

  useEffect(() => {
    const cached = sessionStorage.getItem("monitoring-data");

    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed.monitoring);
    } else {
      fetchData();
    }
  }, []);

  return (
    <MonitoringContext.Provider value={{ data }}>
      {children}
    </MonitoringContext.Provider>
  );
}