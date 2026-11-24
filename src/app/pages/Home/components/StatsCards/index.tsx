import * as S from "./styles";
import { useHome } from "../../hook";
import { useTranslation } from "react-i18next";
import { FaUser, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import type { TStatTone } from "./styles";
import { IconType } from "react-icons";

interface IStatCardConfig {
  id: TStatTone;
  labelKey: string;
  value: string;
  icon: IconType;
}

export function StatsCards() {
  const { t } = useTranslation("home");
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Grid aria-busy="true" aria-label={t("clinic_stats_loading")}>
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.Grid>
    );
  }

  const data = homeContext.clinicData;
  const cards: IStatCardConfig[] = [
    { id: "students", labelKey: "stats_students", value: String(data?.students ?? 0), icon: FaUser },
    { id: "professionals", labelKey: "stats_professionals", value: String(data?.professionals ?? 0), icon: FaChalkboardTeacher },
    { id: "sessions", labelKey: "stats_sessions_today", value: String(data?.sessions_today ?? 0), icon: FaCalendarAlt },
    { id: "frequency", labelKey: "stats_frequency", value: String(data?.frequency ?? 0), icon: BsGraphUpArrow },
  ];

  return (
    <S.Grid>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <S.Card key={card.id} $tone={card.id}>
            <S.IconCircle $tone={card.id} aria-hidden>
              <Icon />
            </S.IconCircle>
            <S.Content>
              <S.Value $tone={card.id}>{card.value}</S.Value>
              <S.Label>{t(card.labelKey)}</S.Label>
            </S.Content>
          </S.Card>
        );
      })}
    </S.Grid>
  );
}
