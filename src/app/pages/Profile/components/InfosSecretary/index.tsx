import * as S from "./styles";
import { useProfile } from "../../hook";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { SME } from "@/data/services";

export const InfosSecretary = () => {
  const { t } = useTranslation("profile");
  const profileContext = useProfile();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { toast } = useToast();
  const { updateSecretaryByUserId } = SME();

  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  useEffect(() => {
    setUsuario(profileContext.userData?.usuario ?? "");
    setNome(profileContext.userData?.nome ?? "");
    setSenha("");
  }, [profileContext.userData]);

  const handleSave = async () => {
    const trimmedName = nome.trim();
    const trimmedPassword = senha.trim();
    const userId = Number(profileContext.userData?.id_usuario ?? getData("id"));
    const idRede = Number(getData("id_rede"));

    if (!trimmedName) {
      toast({ title: t("secretary_edit_title"), description: t("secretary_required_name"), variant: "destructive" });
      return;
    }

    try {
      setLoad(true);
      const response = await updateSecretaryByUserId(userId, {
        id_unidade_rede: idRede,
        nome: trimmedName,
        ...(trimmedPassword ? { senha: trimmedPassword } : {}),
        tipo: "CLINICA",
        status: 1,
      });

      if (!response) return;

      toast({ title: t("secretary_edit_title"), description: t("secretary_update_success"), variant: "successful" });
      setSenha("");
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
            <S.Input
              id="profile-secretary-password"
              type="password"
              value={senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
            />
          </S.Field>

          <S.Field htmlFor="profile-secretary-name">
            {t("secretary_name")}
            <S.Input id="profile-secretary-name" value={nome} onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)} />
          </S.Field>
        </S.Grid>

        <S.Footer>
          <S.Button type="button" onClick={() => void handleSave()}>
            {t("save")}
          </S.Button>
        </S.Footer>
      </S.Card>
    </S.Container>
  );
};
