import * as S from "./styles";
import { useHome } from "../../hook";
import { useTranslation } from "react-i18next";
import homeVideo from "@/components/videos/home.mp4";

export function WelcomeHero() {
  const { t } = useTranslation("home");
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return <S.Skeleton aria-hidden />;
  }

  const name = homeContext.name.trim();
  const hello = name ? t("welcome_hello", { name }) : t("welcome_hello_fallback");

  return (
    <S.Card aria-label={hello}>
      <S.Video autoPlay muted loop playsInline aria-hidden>
        <source src={homeVideo} type="video/mp4" />
      </S.Video>
      <S.Overlay aria-hidden />
      <S.Content>
        <S.Hello>{hello}</S.Hello>
        <S.Glad>{t("welcome_glad")}</S.Glad>
        <S.Subtitle>
          {t("welcome_line3")}
          <br />
          {t("welcome_line4")}
        </S.Subtitle>
      </S.Content>
    </S.Card>
  );
}
