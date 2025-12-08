import { useIndicators } from "../../hook";
import { SelectReport, PainelStudent } from "../";

export const Container = () => {
  const indicatorsContext = useIndicators();
  return indicatorsContext.showReports ? <PainelStudent /> : <SelectReport />
}