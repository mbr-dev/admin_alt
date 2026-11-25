import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { FaHeart, FaStar } from "react-icons/fa";

export function ResponsibleMessage() {
  const { t } = useTranslation("home");

  return (
    <S.Card>
      <S.Star aria-hidden>
        <FaStar />
      </S.Star>
      <S.Text>
        <S.Title>{t("responsible_message_title")}</S.Title>
        <S.Subtitle>{t("responsible_message_subtitle")}</S.Subtitle>
      </S.Text>
      <S.Heart aria-hidden>
        <FaHeart />
      </S.Heart>
    </S.Card>
  );
}
