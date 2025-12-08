import { useContext } from "react";
import { MonitoringContext } from "../../context";

export const useMonitoring = () => {
  return useContext(MonitoringContext);
}