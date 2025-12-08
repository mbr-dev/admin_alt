import { useContext } from "react";
import { IndicatorsContext } from "../../context";

export const useIndicators = () => {
  return useContext(IndicatorsContext);
}