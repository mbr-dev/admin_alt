import * as S from "./styles";
import { Fragment } from "react";
import { useHome } from "../../hook";
import { useTranslation } from "react-i18next";
import homeVideo from "@/components/videos/home.mp4";

interface IWelcomeHeroProps {
  gladKey?: string;
  subtitleKeys?: string[];
}

export function WelcomeHero({
  gladKey = "welcome_glad",
  subtitleKeys = ["welcome_line3", "welcome_line4"],
}: IWelcomeHeroProps) {
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
        <S.Glad>{t(gladKey)}</S.Glad>
        <S.Subtitle>
          {subtitleKeys.map((key, index) => (
            <Fragment key={key}>
              {index > 0 ? <br /> : null}
              {t(key)}
            </Fragment>
          ))}
        </S.Subtitle>
      </S.Content>
    </S.Card>
  );
}
