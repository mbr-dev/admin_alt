import * as S from "./styles";
import { useProfile } from "../../hook";
import { useTranslation } from "react-i18next";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { SME } from "@/data/services";
import { SmeService } from "@/data/models";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";
import { BarChart3, Shield, ShieldCheck, Users } from "lucide-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const permissionItems = [
  { key: "manageUnits", icon: Shield },
  { key: "manageProfessionals", icon: Users },
  { key: "viewReports", icon: BarChart3 },
  { key: "fullNetworkAccess", icon: ShieldCheck },
] as const;

function toDateLocale(language: string): string {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "pt-BR";
  if (resolved === "es") return "es-ES";
  return "en-US";
}

function formatLastAccess(value: string | undefined, language: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(toDateLocale(language));
}

function PermissionsCard() {
  const { t } = useTranslation("profile");

  return (
    <S.Card>
      <S.Title>{t("permissions.title")}</S.Title>
      <S.PermissionList>
        {permissionItems.map((item) => {
          const Icon = item.icon;

          return (
            <S.PermissionItem key={item.key}>
              <S.PermissionIcon>
                <Icon aria-hidden={true} />
              </S.PermissionIcon>
              <p>{t(`permissions.${item.key}`)}</p>
            </S.PermissionItem>
          );
        })}
      </S.PermissionList>
    </S.Card>
  );
}

export const InfosSecretary = () => {
  const { t, i18n } = useTranslation("profile");
  const profileContext = useProfile();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { toast } = useToast();
  const { updateSecretaryByUserId } = SME();
  const secretaryData = profileContext.userData as SmeService.ISecretaryProfile | null;

  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setUsuario(secretaryData?.usuario ?? "");
    setNome(secretaryData?.nome ?? "");
    setEmail(secretaryData?.email ?? "");
    setSenha("");
    setShowPassword(false);
  }, [secretaryData]);

  const handleSave = async () => {
    const trimmedName = nome.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = senha.trim();
    const userId = Number(secretaryData?.id_usuario ?? getData("id"));
    const idRede = Number(getData("id_rede"));

    if (!trimmedName) {
      toast({ title: t("secretary_edit_title"), description: t("secretary_required_name"), variant: "destructive" });
      return;
    }

    if (!trimmedEmail) {
      toast({ title: t("secretary_edit_title"), description: t("secretary_required_email"), variant: "destructive" });
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      toast({ title: t("secretary_edit_title"), description: t("secretary_invalid_email"), variant: "destructive" });
      return;
    }

    try {
      setLoad(true);
      const response = await updateSecretaryByUserId(userId, {
        id_unidade_rede: idRede,
        nome: trimmedName,
        email: trimmedEmail,
        ...(trimmedPassword ? { senha: trimmedPassword } : {}),
        tipo: "CLINICA",
        status: 1,
      });

      if (!response) return;

      toast({ title: t("secretary_edit_title"), description: t("secretary_update_success"), variant: "successful" });
      setSenha("");
      setShowPassword(false);
    } finally {
      setLoad(false);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Title>{t("secretary_edit_title")}</S.Title>

        <S.Grid>
          <S.Field htmlFor="profile-secretary-username">
            {t("secretary_user")}
            <S.Input id="profile-secretary-username" value={usuario} disabled />
          </S.Field>

          <S.Field htmlFor="profile-secretary-password">
            {t("secretary_password")}
            <S.PasswordWrap>
              <S.PasswordInput
                id="profile-secretary-password"
                type={showPassword ? "text" : "password"}
                value={senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
              />
              <S.ButtonEyes
                type="button"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword((prev) => !prev);
                }}
                aria-label={showPassword ? t("hide_password") : t("show_password")}
              >
                {showPassword ? <FaRegEyeSlash aria-hidden={true} /> : <FaRegEye aria-hidden={true} />}
              </S.ButtonEyes>
            </S.PasswordWrap>
          </S.Field>

          <S.Field htmlFor="profile-secretary-name">
            {t("secretary_name")}
            <S.Input id="profile-secretary-name" value={nome} onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
          </S.Field>

          <S.Field htmlFor="profile-secretary-email">
            {t("email")}
            <S.Input
              id="profile-secretary-email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </S.Field>

          <S.Field htmlFor="profile-secretary-org">
            {t("secretary_org")}
            <S.Input id="profile-secretary-org" value={secretaryData?.nome_rede ?? ""} disabled />
          </S.Field>

          <S.Field htmlFor="profile-secretary-location">
            {t("secretary_location")}
            <S.Input id="profile-secretary-location" value={secretaryData?.network_local ?? ""} disabled />
          </S.Field>

          <S.Field htmlFor="profile-secretary-role">
            {t("secretary_role")}
            <S.Input id="profile-secretary-role" value={t("secretary_role_value")} disabled />
          </S.Field>

          <S.Field htmlFor="profile-secretary-last-access">
            {t("secretary_last_access")}
            <S.Input
              id="profile-secretary-last-access"
              value={formatLastAccess(secretaryData?.penultimo_acesso_login, i18n.language)}
              disabled
            />
          </S.Field>
        </S.Grid>

        <S.Footer>
          <S.Button type="button" onClick={() => void handleSave()}>
            {t("save")}
          </S.Button>
        </S.Footer>
      </S.Card>

      <PermissionsCard />
    </S.Container>
  );
};
