import * as C from "../";
import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";

export const Container = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();
  const networkName = monitoringContext?.statisticNetwork?.nome_rede ?? "";

  return (
    <S.Container>
      <C.Animations />

      <S.Titles>
        <h2>{`${t("title")} ${networkName}`}</h2>
        <p>{`${t("subTitle")}${networkName ? ` (${networkName})` : ""}`}</p>
      </S.Titles>

      <C.PeriodFilter />

      <S.Main>
        <C.StatisticCards />
        <C.NetworkSummary />
        <C.SkillsDeveloped />
        <C.Details />
      </S.Main>
    </S.Container>
  );
};
