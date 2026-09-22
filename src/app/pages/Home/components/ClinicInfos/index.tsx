import * as S from "./styles";
import { useHome } from "../../hook";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { HomeService } from "@/data/models";
import { Animations } from "../Infos/components";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";

function toDateLocale(language: string): string {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "pt-BR";
  if (resolved === "es") return "es-ES";
  return "en-US";
}

function formatHomeDate(value: string | undefined, language: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(toDateLocale(language));
}

function formatFrequency(value: number): string {
  const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
  return `${formatted}%`;
}

function getUpcomingSessionFields(session: HomeService.ISecretaryHomeUpcomingSession) {
  return {
    professional: session.nome_profissional || session.profissional || "-",
    student: session.nome_paciente || session.nome_aluno || session.aluno || "-",
    type: session.tipo_sessao || "-",
    start: session.data_inicio || session.data,
    end: session.data_final,
    status: session.status || "-",
  };
}

function SummaryCards({
  data,
  isLoading,
}: {
  data: HomeService.ISecretaryHomeClinicData | null;
  isLoading: boolean;
}) {
  const { t } = useTranslation("home");

  if (isLoading) {
    return (
      <S.SkeletonStatsGrid aria-busy="true" aria-label={t("clinic_stats_loading")}>
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.SkeletonStatsGrid>
    );
  }

  const cards = [
    { id: "students", label: t("stats_students"), value: String(data?.students ?? 0) },
    { id: "professionals", label: t("stats_professionals"), value: String(data?.professionals ?? 0) },
    { id: "sessions_today", label: t("stats_sessions_today"), value: String(data?.sessions_today ?? 0) },
    { id: "frequency", label: t("stats_frequency"), value: formatFrequency(data?.frequency ?? 0) },
  ];

  return (
    <S.StatsGrid>
      {cards.map((card) => (
        <S.StatCard key={card.id}>
          <S.StatLabel>{card.label}</S.StatLabel>
          <S.StatValue>{card.value}</S.StatValue>
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
}

function UpcomingSessions({
  sessions,
  isLoading,
}: {
  sessions: HomeService.ISecretaryHomeUpcomingSession[];
  isLoading: boolean;
}) {
  const { t, i18n } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <S.Section>
      <S.SectionTitle>{t("upcoming_sessions")}</S.SectionTitle>
      {isLoading ? (
        <S.ListBox aria-busy="true" aria-label={t("upcoming_sessions_loading")}>
          <S.SkeletonCard />
          <S.SkeletonCard />
        </S.ListBox>
      ) : (
        <S.ListBox>
          {sessions.length === 0 ? (
            <S.EmptyBox>{t("empty_upcoming_sessions")}</S.EmptyBox>
          ) : (
            sessions.map((session, index) => {
              const fields = getUpcomingSessionFields(session);
              return (
                <S.SessionCard key={session.id ?? `upcoming-session-${index}`}>
                  <S.SessionRow>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_professional")}</S.ItemLabel>
                      <S.ItemValue>{fields.professional}</S.ItemValue>
                    </S.SessionItem>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_student")}</S.ItemLabel>
                      <S.ItemValue>{fields.student}</S.ItemValue>
                    </S.SessionItem>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_session_type")}</S.ItemLabel>
                      <S.ItemValue>{fields.type}</S.ItemValue>
                    </S.SessionItem>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_start")}</S.ItemLabel>
                      <S.ItemValue>{formatHomeDate(fields.start, i18n.language)}</S.ItemValue>
                    </S.SessionItem>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_end")}</S.ItemLabel>
                      <S.ItemValue>{formatHomeDate(fields.end, i18n.language)}</S.ItemValue>
                    </S.SessionItem>
                    <S.SessionItem>
                      <S.ItemLabel>{t("col_status")}</S.ItemLabel>
                      <S.ItemValue>{fields.status}</S.ItemValue>
                    </S.SessionItem>
                  </S.SessionRow>
                </S.SessionCard>
              );
            })
          )}
        </S.ListBox>
      )}
      <S.Actions>
        <S.ViewMoreButton type="button" onClick={() => navigate("/alt_session")}>
          {t("view_more")}
        </S.ViewMoreButton>
      </S.Actions>
    </S.Section>
  );
}

function RecentActivities({
  activities,
  isLoading,
}: {
  activities: HomeService.ISecretaryHomeRecentActivity[];
  isLoading: boolean;
}) {
  const { t, i18n } = useTranslation("home");

  return (
    <S.Section>
      <S.SectionTitle>{t("recent_activities")}</S.SectionTitle>
      {isLoading ? (
        <S.ListBox aria-busy="true" aria-label={t("recent_activities_loading")}>
          <S.SkeletonCard />
          <S.SkeletonCard />
        </S.ListBox>
      ) : (
        <S.ListBox>
          {activities.length === 0 ? (
            <S.EmptyBox>{t("empty_recent_activities")}</S.EmptyBox>
          ) : (
            activities.map((activity) => (
              <S.ActivityCard key={activity.id}>
                <S.ActivityHeader>
                  <S.ActivityAction>{activity.acao}</S.ActivityAction>
                  <S.ActivityDate dateTime={activity.data_cadastro}>
                    {formatHomeDate(activity.data_cadastro, i18n.language)}
                  </S.ActivityDate>
                </S.ActivityHeader>
                <S.ActivityDescription>{activity.descricao}</S.ActivityDescription>
              </S.ActivityCard>
            ))
          )}
        </S.ListBox>
      )}
    </S.Section>
  );
}

export function ClinicInfos() {
  const homeContext = useHome();
  const { t } = useTranslation("home");
  const isLoading = homeContext.isLoading;
  const clinicData = homeContext.clinicData;

  return (
    <S.Container>
      <Animations />

      <S.Main>
        <S.Section>
          <S.SectionTitle>{t("clinic_overview")}</S.SectionTitle>
          <SummaryCards data={clinicData} isLoading={isLoading} />
        </S.Section>

        <UpcomingSessions sessions={clinicData?.upcoming_sessions ?? []} isLoading={isLoading} />
        <RecentActivities activities={clinicData?.recent_activities ?? []} isLoading={isLoading} />
      </S.Main>
    </S.Container>
  );
}
