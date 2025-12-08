import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { Animations } from "./components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Alt = () => {
  const { URL_FILES } = useApi();
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <S.Container>
      <Animations />

      <S.Painel>
        <S.PainelIcon>
          <img src={`${URL_FILES}images/didaticos/icones/alt/imagem_alfabetizacao.svg`} alt="icone" />
        </S.PainelIcon>

        <div>
          <h2>{t("literacy")}</h2>
          <S.ButtonPlay onClick={() => navigate("/didactic")}>{t("start")}</S.ButtonPlay>
        </div>
      </S.Painel>
    </S.Container>
  )
}