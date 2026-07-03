import { useIndicators } from "../../hook";
import { SelectReport, PainelStudent, DevelopmentReport } from "../";

export const Container = () => {
  const indicatorsContext = useIndicators();

  if (!indicatorsContext.showReports) return <SelectReport />;
  if (indicatorsContext.typeSelected === 3) return <DevelopmentReport />;
  return <PainelStudent />;
}
