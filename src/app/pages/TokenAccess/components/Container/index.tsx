import * as S from "./styles";
import { useLogin } from "@/app/pages/Login/hook";
import { ImgSVG, ImgPng } from "@/components/images";
import { useStorage } from "@/data/hooks";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";
import { FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const startedCodes = new Set<string>();

export function Container() {
  const { handleAccessByCode } = useLogin();
  const { getData } = useStorage();
  const { t, i18n } = useTranslation("login");
  const nav = useNavigate();

  useEffect(() => {
    const isLoggedIn = Boolean(getData("token"));
    if (isLoggedIn) return;

    const browserLanguage = resolveLanguageFromBrowser(navigator.language);
    if (i18n.language !== browserLanguage) {
      void i18n.changeLanguage(browserLanguage);
    }
  }, [getData, i18n]);

  useEffect(() => {
    const codigo = new URLSearchParams(window.location.search).get("codigo")?.trim() ?? "";
    if (!codigo) {
      nav("/login", { replace: true });
      return;
    }

    if (startedCodes.has(codigo)) return;
    startedCodes.add(codigo);

    void handleAccessByCode(codigo).then((authenticated) => {
      if (!authenticated) startedCodes.delete(codigo);
    });
  }, [handleAccessByCode, nav]);

  return (
    <S.Container style={{ backgroundImage: `url(${ImgSVG.Login4})` }}>
      <S.Wave>
        <img src={ImgSVG.Login3} alt="" />
      </S.Wave>

      <S.Guys>
        <img src={ImgSVG.Login1} alt="" />
      </S.Guys>

      <S.Main>
        <S.Form onSubmit={(event: FormEvent<HTMLFormElement>) => event.preventDefault()}>
          <S.Logo>
            <img src={ImgSVG.LogoMbr} alt="" />
          </S.Logo>

          <h2>{t("title")}</h2>
          <S.BgMain>
            <img src={ImgPng.Login2} alt="" />
          </S.BgMain>

          <S.Status role="status" aria-live="polite">
            {t("loading")}
          </S.Status>
        </S.Form>
      </S.Main>
    </S.Container>
  );
}
