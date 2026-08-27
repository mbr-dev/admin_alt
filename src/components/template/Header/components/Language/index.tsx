import * as S from "./styles";
import { ModalLanguage } from "../";
import { useLanguage } from "./hook";
import { useTranslation } from "react-i18next";

export function Language() {
  const hook = useLanguage();
  const { t } = useTranslation("header");
  const currentFlag = hook.currentLanguage?.img;

  return (
    <S.Container>
      <ModalLanguage
        languages={hook.flags}
        show={hook.showFlags}
        close={hook.setShowFlags}
        changeLanguage={hook.handleLanguageChange}
      />

      <S.Flag
        type="button"
        onClick={() => hook.setShowFlags(true)}
        aria-label={t("language")}
        title={t("language")}
      >
        {currentFlag ? (
          <img src={currentFlag} alt={hook.currentLanguage?.label ?? t("language")} />
        ) : null}
      </S.Flag>
    </S.Container>
  );
}
