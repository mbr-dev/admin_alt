import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";

export const Ranking = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();

  return (
    <S.Container>
      <h2>{t("ranking")}</h2>
      <div className="flex flex-col items-center flex-wrap justify-center gap-4 landscape:flex-row md:flex-row">
        <S.Div>
          <img src={ImgSVG.Trof1} alt="" />
          <S.DivBox>
            <h3 title={monitoringContext?.data.unidades[0]?.nome_unidade}>{monitoringContext?.data.unidades[0]?.nome_unidade}</h3>
            <p>{`${t("totalStudent")} ${monitoringContext?.data.unidades[0]?.total_alunos}`}</p>
            <p>{`${monitoringContext?.data.unidades[0]?.total_rodadas} ${t("round")}`}</p>
          </S.DivBox>
        </S.Div>

        {/* <S.Div>
          <img src={ImgSVG.Trof2} alt="" />
          <S.DivBox>
            <h3 title={monitoringContext?.data.unidades[1].nome_unidade}>{monitoringContext?.data.unidades[1].nome_unidade}</h3>
            <p>{`${t("totalStudent")} ${monitoringContext?.data.unidades[1].total_alunos}`}</p>
            <p>{`${monitoringContext?.data.unidades[1].total_rodadas} ${t("round")}`}</p>
          </S.DivBox>
        </S.Div>

        <S.Div>
          <img src={ImgSVG.Trof3} alt="" />
          <S.DivBox>
            <h3 title={monitoringContext?.data.unidades[2].nome_unidade}>{monitoringContext?.data.unidades[2].nome_unidade}</h3>
            <p>{`${t("totalStudent")} ${monitoringContext?.data.unidades[2].total_alunos}`}</p>
            <p>{`${monitoringContext?.data.unidades[2].total_rodadas} ${t("round")}`}</p>
          </S.DivBox>
        </S.Div> */}
      </div>
    </S.Container>
  )
}