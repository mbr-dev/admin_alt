import * as S from "./styles";
import { StudentService } from "@/data/models";
import {
  formatBirthWithAge,
  formatCidLine,
  getStudentInitials,
  normalizeCidRows,
} from "./formatters";
import { FaCalendarDays, FaEnvelope, FaPhone } from "react-icons/fa6";

export type Box1ProfileVariant = "full" | "personal-cid" | "guardian";

type Props = {
  data: StudentService.IClinicStudentDetails;
  /** `full`: layout antigo (duas colunas + CID). Demais: uma seção por vez (menu lateral). */
  variant?: Box1ProfileVariant;
};

export function Box1Profile({ data, variant = "full" }: Props) {
  const alunoNome = data.aluno?.nome?.trim() || "—";
  const cidRows = normalizeCidRows(data.cid_usuario);

  const dadosPessoaisBlock = (
    <S.Section aria-labelledby="report-dados-pessoais">
      <S.BlockTitle id="report-dados-pessoais">Dados pessoais</S.BlockTitle>
      <S.PersonalRow>
        <S.InitialsCircle aria-hidden>{getStudentInitials(alunoNome)}</S.InitialsCircle>
        <S.PersonalTextCol>
          <S.PersonalName>{alunoNome}</S.PersonalName>
          <S.MetaRow>
            <S.MetaIcon>
              <FaCalendarDays aria-hidden />
            </S.MetaIcon>
            <span>{formatBirthWithAge(data.aluno?.data_nascimento)}</span>
          </S.MetaRow>
        </S.PersonalTextCol>
      </S.PersonalRow>
    </S.Section>
  );

  const responsavelBlock = (
    <S.Section aria-labelledby="report-responsavel">
      <S.BlockTitle id="report-responsavel">Responsável</S.BlockTitle>
      <S.GuardianBlock>
        <S.GuardianName>{data.responsavel?.nome?.trim() || "—"}</S.GuardianName>
        <S.InfoRow>
          <S.MetaIcon>
            <FaCalendarDays aria-hidden />
          </S.MetaIcon>
          <span>{formatBirthWithAge(data.responsavel?.data_nascimento)}</span>
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
      <S.BlockTitle id="report-cid">CID</S.BlockTitle>
      <S.CidBlock>
        {cidRows.length === 0 ? (
          <S.CidEmpty>Nenhum CID cadastrado.</S.CidEmpty>
        ) : (
          cidRows.map((row, index) => (
            <S.CidLine key={`${row.sigla}-${row.descricao}-${index}`}>{formatCidLine(row)}</S.CidLine>
          ))
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
