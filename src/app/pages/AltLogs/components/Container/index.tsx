import * as S from "./styles";
import { useTranslation } from "react-i18next";

export function Container() {
  const { t } = useTranslation("altLogs");

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.EmptyCard>{t("empty")}</S.EmptyCard>
    </S.Container>
  );
}
