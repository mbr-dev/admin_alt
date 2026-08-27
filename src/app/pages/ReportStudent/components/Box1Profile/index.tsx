import * as S from "./styles";
import { StudentService } from "@/data/models";
import {
  formatBirthWithAge,
  formatCidLine,
  getStudentInitials,
  normalizeCidRows,
} from "./formatters";
import { FaCalendarDays, FaEnvelope, FaPhone } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { translateCidById } from "@/lib/i18n/tables/lookup";

export type Box1ProfileVariant = "full" | "personal-cid" | "guardian";

type Props = {
  data: StudentService.IClinicStudentDetails;
  /** `full`: layout antigo (duas colunas + CID). Demais: uma seção por vez (menu lateral). */
  variant?: Box1ProfileVariant;
};

export function Box1Profile({ data, variant = "full" }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
  const alunoNome = data.aluno?.nome?.trim() || "—";
  const cidRows = normalizeCidRows(data.cid_usuario);

  const birthWithAge = (birthDate: string | null | undefined) =>
    formatBirthWithAge(birthDate, (date, age) => t("birth_with_age", { date, age }));

  const dadosPessoaisBlock = (
    <S.Section aria-labelledby="report-dados-pessoais">
      <S.BlockTitle id="report-dados-pessoais">{t("personal_data")}</S.BlockTitle>
      <S.PersonalRow>
        <S.InitialsCircle aria-hidden>{getStudentInitials(alunoNome)}</S.InitialsCircle>
        <S.PersonalTextCol>
          <S.PersonalName>{alunoNome}</S.PersonalName>
          <S.MetaRow>
            <S.MetaIcon>
              <FaCalendarDays aria-hidden />
            </S.MetaIcon>
            <span>{birthWithAge(data.aluno?.data_nascimento)}</span>
          </S.MetaRow>
        </S.PersonalTextCol>
      </S.PersonalRow>
    </S.Section>
  );

  const responsavelBlock = (
    <S.Section aria-labelledby="report-responsavel">
      <S.BlockTitle id="report-responsavel">{t("guardian")}</S.BlockTitle>
      <S.GuardianBlock>
        <S.GuardianName>{data.responsavel?.nome?.trim() || "—"}</S.GuardianName>
        <S.InfoRow>
          <S.MetaIcon>
            <FaCalendarDays aria-hidden />
          </S.MetaIcon>
          <span>{birthWithAge(data.responsavel?.data_nascimento)}</span>
        </S.InfoRow>
        <S.InfoRow>
          <S.MetaIcon>
            <FaEnvelope aria-hidden />
          </S.MetaIcon>
          <span className="break-all">{data.responsavel?.email?.trim() || "—"}</span>
        </S.InfoRow>
        <S.InfoRow>
          <S.MetaIcon>
            <FaPhone aria-hidden />
          </S.MetaIcon>
          <span>{data.responsavel_contato?.contato?.trim() || "—"}</span>
        </S.InfoRow>
      </S.GuardianBlock>
    </S.Section>
  );

  const cidBlock = (
    <S.Section aria-labelledby="report-cid">
      <S.BlockTitle id="report-cid">{t("cid")}</S.BlockTitle>
      <S.CidBlock>
        {cidRows.length === 0 ? (
          <S.CidEmpty>{t("empty_cid")}</S.CidEmpty>
        ) : (
          cidRows.map((row, index) => {
            const descricao = translateCidById(row.id_cid, i18n.language, row.descricao);
            return (
              <S.CidLine key={`${row.id_cid ?? row.sigla}-${index}`}>
                {formatCidLine({ ...row, descricao })}
              </S.CidLine>
            );
          })
        )}
      </S.CidBlock>
    </S.Section>
  );

  if (variant === "personal-cid") {
    return (
      <S.Box1>
        {dadosPessoaisBlock}
        <S.SectionDivider />
        {cidBlock}
      </S.Box1>
    );
  }

  if (variant === "guardian") {
    return <S.Box1>{responsavelBlock}</S.Box1>;
  }

  return (
    <S.Box1>
      <S.TopPairGrid>
        {dadosPessoaisBlock}
        {responsavelBlock}
      </S.TopPairGrid>

      <S.SectionDivider />

      {cidBlock}
    </S.Box1>
  );
}
