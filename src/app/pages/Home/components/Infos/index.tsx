import * as S from "./styles";
import * as C from "./components";
import { useTranslation } from "react-i18next";

export const Infos = () => {
  const { t } = useTranslation("home");

  return (
    <S.Container>
      <C.Animations />

      <S.Main>
        <S.Infos>
          <h2>{t("ranking")}</h2>
          <C.Ranking />
        </S.Infos>
        <S.Infos>
          <h2>{t("event")}</h2>
          <C.Events />
        </S.Infos>
      </S.Main>
    </S.Container>
  )
}