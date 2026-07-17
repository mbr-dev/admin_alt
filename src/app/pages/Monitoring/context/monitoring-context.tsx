import { useMain, useStorage } from "@/data/hooks";
import * as IMC from "./monitoring-model";
import { Monitoring, ALTDevelopmentNetwork } from "@/data/services";
import { ALTDevelopmentNetworkService } from "@/data/models";
import { useState, createContext, useEffect, useRef } from "react";

export const MonitoringContext = createContext({} as IMC.IMonitoringContext);

export function MonitoringContextProvider({ children }: IMC.IMonitoringContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();
  const { getLogAltTotalStudentPlayed } = Monitoring();
  const {
    getStatisticNetwork,
    getNumbersNetwork,
    getSkillsDeveloped,
    getUnitCompare,
  } = ALTDevelopmentNetwork();

  const [data, setData] = useState<any | null>(null);
  const [filter, setFilter] = useState<IMC.TMonitoringPeriodFilter>(30);
  const [statisticNetwork, setStatisticNetwork] =
    useState<ALTDevelopmentNetworkService.IGetStatisticNetworkResponse | null>(null);
  const [isStatisticNetworkLoading, setIsStatisticNetworkLoading] = useState(true);
  const [numbersNetwork, setNumbersNetwork] =
    useState<ALTDevelopmentNetworkService.IGetNumbersNetworkResponse | null>(null);
  const [isNumbersNetworkLoading, setIsNumbersNetworkLoading] = useState(true);
  const [skillsDeveloped, setSkillsDeveloped] =
    useState<ALTDevelopmentNetworkService.IGetSkillsDevelopedResponse | null>(null);
  const [isSkillsDevelopedLoading, setIsSkillsDevelopedLoading] = useState(true);
  const [unitCompare, setUnitCompare] =
    useState<ALTDevelopmentNetworkService.IGetUnitCompareResponse | null>(null);
  const [isUnitCompareLoading, setIsUnitCompareLoading] = useState(true);

  const getDataRef = useRef(getData);
  const getStatisticNetworkRef = useRef(getStatisticNetwork);
  const getNumbersNetworkRef = useRef(getNumbersNetwork);
  const getSkillsDevelopedRef = useRef(getSkillsDeveloped);
  const getUnitCompareRef = useRef(getUnitCompare);
  const setLoadRef = useRef(mainContext.setLoad);
  const getLogAltTotalStudentPlayedRef = useRef(getLogAltTotalStudentPlayed);

  useEffect(() => {
    getDataRef.current = getData;
    getStatisticNetworkRef.current = getStatisticNetwork;
    getNumbersNetworkRef.current = getNumbersNetwork;
    getSkillsDevelopedRef.current = getSkillsDeveloped;
    getUnitCompareRef.current = getUnitCompare;
    setLoadRef.current = mainContext.setLoad;
    getLogAltTotalStudentPlayedRef.current = getLogAltTotalStudentPlayed;
  }, [
    getData,
    getStatisticNetwork,
    getNumbersNetwork,
    getSkillsDeveloped,
    getUnitCompare,
    mainContext.setLoad,
    getLogAltTotalStudentPlayed,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadRef.current(true);

        const response = await getLogAltTotalStudentPlayedRef.current();
        if (response) {
          setData(response);
          sessionStorage.setItem(
            "monitoring-data",
            JSON.stringify({ monitoring: response })
          );
        }
      } finally {
        setLoadRef.current(false);
      }
    };

    const cached = sessionStorage.getItem("monitoring-data");

    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed.monitoring);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchNetworkData = async () => {
      const idRede = Number(getDataRef.current("id_rede"));
      if (Number.isNaN(idRede) || idRede <= 0) {
        if (!cancelled) {
          setStatisticNetwork(null);
          setNumbersNetwork(null);
          setSkillsDeveloped(null);
          setUnitCompare(null);
          setIsStatisticNetworkLoading(false);
          setIsNumbersNetworkLoading(false);
          setIsSkillsDevelopedLoading(false);
          setIsUnitCompareLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setIsStatisticNetworkLoading(true);
        setIsNumbersNetworkLoading(true);
        setIsSkillsDevelopedLoading(true);
        setIsUnitCompareLoading(true);
      }

      const params = { id_rede: idRede, filter };
      const [statisticResponse, numbersResponse, skillsResponse, unitCompareResponse] =
        await Promise.all([
          getStatisticNetworkRef.current(params),
          getNumbersNetworkRef.current(params),
          getSkillsDevelopedRef.current(params),
          getUnitCompareRef.current(params),
        ]);

      if (!cancelled) {
        setStatisticNetwork(statisticResponse);
        setNumbersNetwork(numbersResponse);
        setSkillsDeveloped(skillsResponse);
        setUnitCompare(unitCompareResponse);
        setIsStatisticNetworkLoading(false);
        setIsNumbersNetworkLoading(false);
        setIsSkillsDevelopedLoading(false);
        setIsUnitCompareLoading(false);
      }
    };

    fetchNetworkData();

    return () => {
      cancelled = true;
    };
  }, [filter]);

  return (
    <MonitoringContext.Provider
      value={{
        data,
        filter,
        setFilter,
        statisticNetwork,
        isStatisticNetworkLoading,
        numbersNetwork,
        isNumbersNetworkLoading,
        skillsDeveloped,
        isSkillsDevelopedLoading,
        unitCompare,
        isUnitCompareLoading,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
}
