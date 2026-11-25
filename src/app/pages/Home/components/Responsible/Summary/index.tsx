import * as S from "./styles";
import { useHome } from "../../../hook";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt, FaChild } from "react-icons/fa";

export function ResponsibleSummary() {
  const { t } = useTranslation("home");
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Grid aria-busy="true" aria-label={t("responsible_stats_loading")}>
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.Grid>
    );
  }

  const data = homeContext.responsibleData;

  return (
    <S.Grid>
      <S.Card $tone="children">
        <S.IconCircle $tone="children" aria-hidden>
          <FaChild />
        </S.IconCircle>
        <S.Content>
          <S.Label>{t("responsible_children_linked")}</S.Label>
          <S.Value $tone="children">{data?.filhos ?? 0}</S.Value>
        </S.Content>
      </S.Card>

      <S.Card $tone="sessions">
        <S.IconCircle $tone="sessions" aria-hidden>
          <FaCalendarAlt />
        </S.IconCircle>
        <S.Content>
          <S.Label>{t("responsible_sessions")}</S.Label>
          <S.Value $tone="sessions">{data?.sessoes_hoje ?? 0}</S.Value>
        </S.Content>
      </S.Card>
    </S.Grid>
  );
}
