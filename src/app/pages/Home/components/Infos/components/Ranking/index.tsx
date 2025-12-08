import * as S from "./styles";
import * as C from "./components";
import { useTranslation } from "react-i18next";

export const Ranking = () => {
  const { t } = useTranslation("home");

  return (
    <S.Container>
      <C.Podium/>
      <C.Position />
      <S.Button disabled>{t("button_ranking")}</S.Button>
    </S.Container>
  )
}