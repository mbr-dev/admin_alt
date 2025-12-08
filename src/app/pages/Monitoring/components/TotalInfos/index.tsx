import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";

export const TotalInfos = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();

  const infos = [
    {id:0,label:t("total0"),icone:ImgSVG.Controle,data:monitoringContext?.data?.total_rodadas,color:"#EC5691"},
    {id:1,label:t("total1"),icone:ImgSVG.Aluno,data:monitoringContext?.data?.total_alunos,color:"#7DB73D"},
    {id:2,label:t("total2"),icone:ImgSVG.Escola,data:monitoringContext?.data?.total_unidades_ativas,color:"#FA9300"},
  ];

  return (
    <S.Container>
      {infos.map((item) => (
        <S.Div key={item.id} style={{ backgroundColor: item.color}}>
          <img src={item.icone} alt="" />
          <h3>{item.data}</h3>
          <p>{item.label}</p>
        </S.Div>
      ))}
    </S.Container>
  );
}