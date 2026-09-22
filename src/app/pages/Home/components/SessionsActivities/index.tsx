import * as S from "./styles";
import { useHome } from "../../hook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { HomeService } from "@/data/models";
import { resolveLanguageFromBrowser } from "@/lib/i18n/resolve-language";

const STATUS_I18N_KEYS: Record<string, "status_open" | "status_in_progress" | "status_finished" | "status_cancelled"> = {
  aberta: "status_open",
  "em andamento": "status_in_progress",
  em_andamento: "status_in_progress",
  finalizada: "status_finished",
  cancelada: "status_cancelled",
};

function toDateLocale(language: string): string {
  const resolved = resolveLanguageFromBrowser(language);
  if (resolved === "pt_BR") return "pt-BR";
  if (resolved === "es") return "es-ES";
  return "en-US";
}

function formatSessionTime(value: string | undefined, language: string): string {
  if (!value) return "--:--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString(toDateLocale(language), { hour: "2-digit", minute: "2-digit" });
}

function formatActivityDate(value: string | undefined, language: string): string {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString(toDateLocale(language));
}

function normalizeStatus(status: string) {
  return status === "em_andamento" ? "em andamento" : status;
}

function getActivityInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const word = parts[0];
    return `${word.charAt(0).toUpperCase()}${word.charAt(1).toLowerCase()}`;
  }
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

function SessionsCard({ sessions }: { sessions: HomeService.ISecretaryHomeUpcomingSession[] }) {
  const { t, i18n } = useTranslation("home");
  const { t: tSession } = useTranslation("altSession");
  const navigate = useNavigate();

  const translateStatus = (status: string) => {
    const key = STATUS_I18N_KEYS[status] ?? STATUS_I18N_KEYS[normalizeStatus(status)];
    return key ? tSession(key) : status;
  };

  return (
    <S.Card>
      <S.CardHeader>
        <S.SessionsIcon aria-hidden>
          <FaCalendarAlt />
        </S.SessionsIcon>
        <S.CardTitle>{t("today_sessions_title")}</S.CardTitle>
      </S.CardHeader>

      {sessions.length === 0 ? (
        <S.Empty>{t("empty_upcoming_sessions")}</S.Empty>
      ) : (
        <S.List>
          {sessions.map((session, index) => {
            const studentName = session.nome_aluno || session.nome_paciente || session.aluno || "-";
            const sessionType = session.tipo_sessao || "-";
            const status = session.status || "";

            return (
              <S.SessionRow key={session.id ?? `upcoming-session-${index}`}>
                <S.TimeBadge>{formatSessionTime(session.data_inicio || session.data, i18n.language)}</S.TimeBadge>
                <S.SessionInfo>
                  <S.SessionStudent title={studentName}>{studentName}</S.SessionStudent>
                  <S.SessionType title={sessionType}>{sessionType}</S.SessionType>
                </S.SessionInfo>
                {status ? (
                  <S.StatusTag $status={normalizeStatus(status)}>{translateStatus(status)}</S.StatusTag>
                ) : null}
              </S.SessionRow>
            );
          })}
        </S.List>
      )}

      <S.Footer>
        <S.FooterButton type="button" onClick={() => navigate("/alt_session")}>
          <FaCalendarAlt aria-hidden />
          {t("view_all_sessions")}
        </S.FooterButton>
      </S.Footer>
    </S.Card>
  );
}

function ActivitiesCard({ activities }: { activities: HomeService.ISecretaryHomeRecentActivity[] }) {
  const { t, i18n } = useTranslation("home");
  const navigate = useNavigate();

  return (
    <S.Card>
      <S.CardHeader>
        <S.ActivitiesIcon aria-hidden>
          <RxActivityLog />
        </S.ActivitiesIcon>
        <S.CardTitle>{t("recent_activities")}</S.CardTitle>
      </S.CardHeader>

      {activities.length === 0 ? (
        <S.Empty>{t("empty_recent_activities")}</S.Empty>
      ) : (
        <S.List>
          {activities.map((activity) => {
            const userName = activity.nome || "";
            return (
              <S.ActivityRow key={activity.id}>
                <S.Initials title={userName} aria-hidden>{getActivityInitials(userName)}</S.Initials>
                <S.ActivityInfo>
                  <S.ActivityAction>{activity.acao}</S.ActivityAction>
                  <S.ActivityDescription>{activity.descricao}</S.ActivityDescription>
                  <S.ActivityDate dateTime={activity.data_cadastro}>
                    {formatActivityDate(activity.data_cadastro, i18n.language)}
                  </S.ActivityDate>
                </S.ActivityInfo>
              </S.ActivityRow>
            );
          })}
        </S.List>
      )}

      <S.Footer>
        <S.FooterButton type="button" onClick={() => navigate("/alt_logs")}>
          <RxActivityLog aria-hidden />
          {t("view_all_activities")}
        </S.FooterButton>
      </S.Footer>
    </S.Card>
  );
}

export function SessionsActivities() {
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Section>
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.Section>
    );
  }

  return (
    <S.Section>
      <SessionsCard sessions={homeContext.clinicData?.upcoming_sessions ?? []} />
      <ActivitiesCard activities={homeContext.clinicData?.recent_activities ?? []} />
    </S.Section>
  );
}
