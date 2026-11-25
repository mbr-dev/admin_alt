import * as S from "./styles";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IFirstAccessModalProps {
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (codigo: string) => Promise<void> | void;
}

export function FirstAccessModal({ isSubmitting, onClose, onConfirm }: IFirstAccessModalProps) {
  const { t } = useTranslation("login");
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const codigo = code.trim();
    if (!codigo) {
      setError(t("first_access_code_required"));
      return;
    }

    setError("");
    void onConfirm(codigo);
  };

  return (
    <S.Overlay onClick={isSubmitting ? undefined : onClose}>
      <S.Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="first-access-title"
        aria-describedby="first-access-hint"
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
      >
        <S.Title id="first-access-title">{t("first_access_title")}</S.Title>
        <S.Hint id="first-access-hint">{t("first_access_hint")}</S.Hint>
        <S.Form onSubmit={handleSubmit}>
          <S.Label htmlFor="first-access-code">
            {t("first_access_code")}
            <S.Input
              id="first-access-code"
              value={code}
              autoFocus
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "first-access-error" : "first-access-hint"}
              disabled={isSubmitting}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCode(event.target.value);
                if (error) setError("");
              }}
            />
          </S.Label>
          {error ? <S.Error id="first-access-error">{error}</S.Error> : null}
          <S.Actions>
            <S.CancelButton type="button" onClick={onClose} disabled={isSubmitting}>
              {t("first_access_cancel")}
            </S.CancelButton>
            <S.ConfirmButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? t("loading") : t("first_access_confirm")}
            </S.ConfirmButton>
          </S.Actions>
        </S.Form>
      </S.Dialog>
    </S.Overlay>
  );
}
