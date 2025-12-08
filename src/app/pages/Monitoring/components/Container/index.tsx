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

      {monitoringContext.data &&
        <S.Main>
          <C.TotalInfos />
          <C.ChartLine
            unidades={monitoringContext.data.unidades || []}
            dataKey="total_alunos"
            title={t("evolutionUnit")}
          />
          <C.ChartLine
            unidades={monitoringContext.data.unidades || []}
            dataKey="total_alunos"
            title={t("evolutionRound")}
          />
          <C.Ranking />
          <C.Inactive />
          <C.Details />
        </S.Main>}
    </S.Container>
  )
}