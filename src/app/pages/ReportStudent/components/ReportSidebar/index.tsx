import * as S from "./styles";
import { getFirstName, getStudentInitials } from "../Box1Profile/formatters";
import * as B1 from "../Box1Profile/styles";
import {
  FaCalendarDays,
  FaChartColumn,
  FaChartSimple,
  FaIdCard,
  FaRobot,
  FaUserGroup,
} from "react-icons/fa6";
import type { ReportSectionId } from "../reportSections";
import type { IconType } from "react-icons";

type Props = {
  alunoNome: string;
  activeId: ReportSectionId;
  onSelect: (id: ReportSectionId) => void;
};

const ITEMS: { id: ReportSectionId; label: string; Icon: IconType }[] = [
  { id: "personal-cid", label: "Dados pessoais + CID", Icon: FaIdCard },
  { id: "guardian", label: "Responsável", Icon: FaUserGroup },
  { id: "support-result", label: "Suporte × Resultado", Icon: FaChartSimple },
  { id: "areas", label: "Áreas Trabalhadas & Planejamentos", Icon: FaChartSimple },
  { id: "attention-emotion", label: "Atenção e regulação emocional", Icon: FaChartSimple },
  { id: "behaviors", label: "Comportamentos", Icon: FaChartSimple },
  { id: "strategies", label: "Estratégias terapêuticas", Icon: FaChartSimple },
  { id: "metodo-aba", label: "ABA", Icon: FaChartColumn },
  { id: "technical-ia", label: "Resumo Técnico IA", Icon: FaRobot },
  { id: "sessions", label: "Sessões", Icon: FaCalendarDays },
];

export function ReportSidebar({ alunoNome, activeId, onSelect }: Props) {
  const displayName = alunoNome.trim() || "—";
  const first = getFirstName(displayName);

  return (
    <S.Aside aria-label="Seções do relatório">
      <S.IdentityBlock>
        <B1.InitialsCircle aria-hidden>{getStudentInitials(displayName)}</B1.InitialsCircle>
        <S.FirstName>{first}</S.FirstName>
      </S.IdentityBlock>

      <S.Nav>
        {ITEMS.map(({ id, label, Icon }) => {
          const active = activeId === id;
          return (
            <S.NavButton
              key={id}
              type="button"
              $active={active}
              aria-current={active ? "true" : undefined}
              onClick={() => onSelect(id)}
            >
              <S.NavIcon aria-hidden>
                <Icon />
              </S.NavIcon>
              <span className="min-w-0 flex-1 leading-snug">{label}</span>
            </S.NavButton>
          );
        })}
      </S.Nav>
    </S.Aside>
  );
}
