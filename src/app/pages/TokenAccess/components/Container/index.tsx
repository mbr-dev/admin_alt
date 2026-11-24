import * as S from "./styles";
import { useLogin } from "@/app/pages/Login/hook";
import { ImgSVG, ImgPng } from "@/components/images";
import { useStorage } from "@/data/hooks";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";
import { CircleCheck, CircleX } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const accessByCode = new Map<string, Promise<boolean>>();
const SUCCESS_DELAY_MS = 1600;
const ERROR_DELAY_MS = 2600;

type AccessStatus = "loading" | "success" | "error";

const messageKeyByStatus: Record<AccessStatus, "codeLoading" | "codeSuccess" | "codeError"> = {
  loading: "codeLoading",
  success: "codeSuccess",
  error: "codeError",
};

function redirectToHome() {
  const basename = String(import.meta.env.VITE_BASENAME ?? "").replace(/\/$/, "");
  window.location.replace(`${window.location.origin}${basename}/`);
}

export function Container() {
  const { handleAccessByCode } = useLogin();
  const { getData } = useStorage();
  const { t, i18n } = useTranslation("login");
  const nav = useNavigate();
  const handleAccessByCodeRef = useRef(handleAccessByCode);
  const [status, setStatus] = useState<AccessStatus>("loading");

  handleAccessByCodeRef.current = handleAccessByCode;

  useEffect(() => {
    const isLoggedIn = Boolean(getData("token"));
    if (isLoggedIn) return;

    const browserLanguage = resolveLanguageFromBrowser(navigator.language);
    if (i18n.language !== browserLanguage) {
      void i18n.changeLanguage(browserLanguage);
    }
  }, [getData, i18n]);

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;

    const showError = () => {
      if (cancelled) return;
      setStatus("error");
      timeoutId = window.setTimeout(() => nav("/login", { replace: true }), ERROR_DELAY_MS);
    };

    const codigo = new URLSearchParams(window.location.search).get("codigo")?.trim() ?? "";
    if (!codigo) {
      showError();
      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
      };
    }

    let request = accessByCode.get(codigo);
    if (!request) {
      request = handleAccessByCodeRef.current(codigo);
      accessByCode.set(codigo, request);
    }

    void request.then((authenticated) => {
      if (cancelled) return;

      if (!authenticated) {
        accessByCode.delete(codigo);
        showError();
        return;
      }

      setStatus("success");
      timeoutId = window.setTimeout(redirectToHome, SUCCESS_DELAY_MS);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [nav]);

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
        </S.Form>
      </S.Main>

      <S.Feedback role="status" aria-live="polite">
        <S.Card>
          {status === "loading" && <S.Spinner aria-hidden="true" />}
          {status === "success" && (
            <S.SuccessIcon aria-hidden="true">
              <CircleCheck />
            </S.SuccessIcon>
          )}
          {status === "error" && (
            <S.ErrorIcon aria-hidden="true">
              <CircleX />
            </S.ErrorIcon>
          )}
          <S.Message>{t(messageKeyByStatus[status])}</S.Message>
        </S.Card>
      </S.Feedback>
    </S.Container>
  );
}
