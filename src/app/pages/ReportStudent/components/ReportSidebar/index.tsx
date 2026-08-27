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
import { useTranslation } from "react-i18next";

type Props = {
  alunoNome: string;
  activeId: ReportSectionId;
  onSelect: (id: ReportSectionId) => void;
};

const ITEMS: { id: ReportSectionId; labelKey: string; Icon: IconType }[] = [
  { id: "personal-cid", labelKey: "nav_personal_cid", Icon: FaIdCard },
  { id: "guardian", labelKey: "nav_guardian", Icon: FaUserGroup },
  { id: "support-result", labelKey: "nav_support_result", Icon: FaChartSimple },
  { id: "areas", labelKey: "nav_areas", Icon: FaChartSimple },
  { id: "attention-emotion", labelKey: "nav_attention_emotion", Icon: FaChartSimple },
  { id: "behaviors", labelKey: "nav_behaviors", Icon: FaChartSimple },
  { id: "strategies", labelKey: "nav_strategies", Icon: FaChartSimple },
  { id: "metodo-aba", labelKey: "nav_aba", Icon: FaChartColumn },
  { id: "technical-ia", labelKey: "nav_technical_ia", Icon: FaRobot },
  { id: "sessions", labelKey: "nav_sessions", Icon: FaCalendarDays },
];

export function ReportSidebar({ alunoNome, activeId, onSelect }: Props) {
  const { t } = useTranslation("reportStudent");
  const displayName = alunoNome.trim() || "—";
  const first = getFirstName(displayName);

  return (
    <S.Aside aria-label={t("sidebar_aria")}>
      <S.IdentityBlock>
        <B1.InitialsCircle aria-hidden>{getStudentInitials(displayName)}</B1.InitialsCircle>
        <S.FirstName>{first}</S.FirstName>
      </S.IdentityBlock>

      <S.Nav>
        {ITEMS.map(({ id, labelKey, Icon }) => {
          const active = id === activeId;
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
              <span className="min-w-0 flex-1 leading-snug">{t(labelKey)}</span>
            </S.NavButton>
          );
        })}
      </S.Nav>
    </S.Aside>
  );
}
