import * as S from "./styles";
import { useHome } from "../../../hook";
import { useTranslation } from "react-i18next";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import { HomeService } from "@/data/models";
import { formatResponsibleDate } from "../format";

const STATUS_I18N_KEYS: Record<string, "status_open" | "status_in_progress" | "status_finished" | "status_cancelled"> = {
  aberta: "status_open",
  em_andamento: "status_in_progress",
  "em andamento": "status_in_progress",
  finalizada: "status_finished",
  cancelada: "status_cancelled",
};

function SessionsCard({ sessions }: { sessions: HomeService.IResponsibleHomeUpcomingSession[] }) {
  const { t, i18n } = useTranslation("home");
  const { t: tSession } = useTranslation("altSession");

  const translateStatus = (status: string) => {
    const key = STATUS_I18N_KEYS[status];
    return key ? tSession(key) : status;
  };

  return (
    <S.Card>
      <S.CardHeader>
        <S.SessionsIcon aria-hidden>
          <FaCalendarAlt />
        </S.SessionsIcon>
        <S.CardTitle>{t("responsible_upcoming_title")}</S.CardTitle>
      </S.CardHeader>

      {sessions.length === 0 ? (
        <S.Empty>{t("empty_upcoming_sessions")}</S.Empty>
      ) : (
        <S.List>
          {sessions.map((session) => {
            const studentName = session.nome_aluno || "-";
            const details = [session.tipo_sessao, session.nome_profissional].filter(Boolean).join(" · ");
            const status = session.status || "";

            return (
              <S.SessionRow key={session.id}>
                <S.TimeBadge>{formatResponsibleDate(session.data_inicio, i18n.language)}</S.TimeBadge>
                <S.SessionInfo>
                  <S.SessionStudent title={studentName}>{studentName}</S.SessionStudent>
                  {details ? <S.SessionType title={details}>{details}</S.SessionType> : null}
                </S.SessionInfo>
                {status ? <S.StatusTag $status={status}>{translateStatus(status)}</S.StatusTag> : null}
              </S.SessionRow>
            );
          })}
        </S.List>
      )}
    </S.Card>
  );
}

function NoticesCard({ notices }: { notices: HomeService.IResponsibleHomeNotification[] }) {
  const { t, i18n } = useTranslation("home");

  return (
    <S.Card>
      <S.CardHeader>
        <S.NoticesIcon aria-hidden>
          <FaBell />
        </S.NoticesIcon>
        <S.CardTitle>{t("responsible_notices_title")}</S.CardTitle>
      </S.CardHeader>

      {notices.length === 0 ? (
        <S.Empty>{t("responsible_empty_notices")}</S.Empty>
      ) : (
        <S.List>
          {notices.map((notice) => (
            <S.NoticeRow key={notice.id_notificacao_user}>
              <S.NoticeTop>
                <S.NoticeTitle>{notice.titulo}</S.NoticeTitle>
                {notice.status_visualizacao === 0 ? <S.NoticeBadge>{t("responsible_notice_new")}</S.NoticeBadge> : null}
              </S.NoticeTop>
              <S.NoticeMessage>{notice.mensagem}</S.NoticeMessage>
              <S.NoticeDate dateTime={notice.data_cadastro}>
                {formatResponsibleDate(notice.data_cadastro, i18n.language)}
              </S.NoticeDate>
            </S.NoticeRow>
          ))}
        </S.List>
      )}
    </S.Card>
  );
}

export function ResponsiblePanels() {
  const { t } = useTranslation("home");
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Section aria-busy="true" aria-label={t("responsible_panels_loading")}>
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.Section>
    );
  }

  const data = homeContext.responsibleData;

  return (
    <S.Section>
      <SessionsCard sessions={data?.proximas_sessoes ?? []} />
      <NoticesCard notices={data?.notificacoes ?? []} />
    </S.Section>
  );
}
