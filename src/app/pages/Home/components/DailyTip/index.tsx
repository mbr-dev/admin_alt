import * as S from "./styles";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";

export function DailyTip() {
  const { t } = useTranslation("home");

  return (
    <S.Card>
      <S.Left>
        <S.LetterIcon src={ImgSVG.LetraA} alt="" />
        <S.Text>
          <S.Title>{t("daily_tip_title")}</S.Title>
          <S.Subtitle>{t("daily_tip_subtitle")}</S.Subtitle>
        </S.Text>
      </S.Left>
      <S.CarIcon src={ImgSVG.Carro} alt="" />
    </S.Card>
  );
}
