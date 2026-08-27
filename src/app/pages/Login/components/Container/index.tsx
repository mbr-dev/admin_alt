import * as S from "./styles";
import { useLogin } from "../../hook";
import { FormEvent, useEffect, useState } from "react";
import { ImgSVG, ImgPng } from "@/components/images";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useStorage } from "@/data/hooks";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";

export function Container() {
  const loginContext = useLogin();
  const { getData } = useStorage();
  const { t, i18n } = useTranslation("login");

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = Boolean(getData("token"));
    if (isLoggedIn) return;

    const browserLanguage = resolveLanguageFromBrowser(navigator.language);
    if (i18n.language !== browserLanguage) {
      void i18n.changeLanguage(browserLanguage);
    }
  }, [getData, i18n]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginContext.handleSignIn(name, password);
  };

  return (
    <S.Container style={{ backgroundImage: `url(${ImgSVG.Login4})` }}>
      <S.Wave>
        <img src={ImgSVG.Login3} alt="" />
      </S.Wave>

      <S.Guys>
        <img src={ImgSVG.Login1} alt="" />
      </S.Guys>

      <S.Main>
        <S.Form onSubmit={handleSubmit}>
          <S.Logo>
            <img src={ImgSVG.LogoMbr} alt="" />
          </S.Logo>

          <h2>{t("title")}</h2>
          <S.BgMain>
            <img src={ImgPng.Login2} alt="" />
          </S.BgMain>

          <S.Label htmlFor="user_name">
            {t("user")}
            <input
              type="text"
              id="user_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loginContext.load}
            />
          </S.Label>

          <S.Label htmlFor="user_password">
            {t("password")}
            <input
              type={showPassword ? "text" : "password"}
              id="user_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginContext.load}
            />

            <S.ButtonEyes
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loginContext.load}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </S.ButtonEyes>
          </S.Label>

          <S.Button type="submit" disabled={loginContext.load}>
            {loginContext.load ? t("loading") : t("submit")}
          </S.Button>
        </S.Form>
      </S.Main>
    </S.Container>
  );
}
