import React from "react";
import { ALTDevelopmentNetworkService } from "@/data/models";

export interface IMonitoringContextProvider {
  children: React.ReactNode;
}

export type TMonitoringPeriodFilter = 15 | 30 | 90 | 180;

export interface IMonitoringContext {
  data: any | null;
  filter: TMonitoringPeriodFilter;
  setFilter: (filter: TMonitoringPeriodFilter) => void;
  statisticNetwork: ALTDevelopmentNetworkService.IGetStatisticNetworkResponse | null;
  isStatisticNetworkLoading: boolean;
  numbersNetwork: ALTDevelopmentNetworkService.IGetNumbersNetworkResponse | null;
  isNumbersNetworkLoading: boolean;
  skillsDeveloped: ALTDevelopmentNetworkService.IGetSkillsDevelopedResponse | null;
  isSkillsDevelopedLoading: boolean;
  unitCompare: ALTDevelopmentNetworkService.IGetUnitCompareResponse | null;
  isUnitCompareLoading: boolean;
}
