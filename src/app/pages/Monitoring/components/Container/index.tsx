import * as C from "../";
import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";

export const Container = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();

  return (
    <S.Container>
      <C.Animations />

      <S.Titles>
        <h2>{`${t("title")} ${monitoringContext?.data?.categoria}`}</h2>
        <p>{`${t("subTitle")} (${monitoringContext?.data?.rede})`}</p>
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
