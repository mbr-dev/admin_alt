import * as S from "./styles";
import { useHome } from "../../../hook";
import { useTranslation } from "react-i18next";
import { HomeService } from "@/data/models";
import { formatResponsibleDate, getChildInitials } from "../format";

function childMeta(child: HomeService.IResponsibleHomeChild): string {
  return [child.parentesco, child.unidade, child.usuario].filter(Boolean).join(" · ");
}

function activityLabel(activity: HomeService.IResponsibleHomeChildActivity): string {
  return activity.atividade || activity.modulo || "-";
}

export function ResponsibleChildren() {
  const { t, i18n } = useTranslation("home");
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Section aria-busy="true" aria-label={t("responsible_children_loading")}>
        <S.Title>{t("responsible_children_linked")}</S.Title>
        <S.Grid>
          <S.SkeletonCard />
          <S.SkeletonCard />
        </S.Grid>
      </S.Section>
    );
  }

  const children = homeContext.responsibleData?.filhos_vinculados ?? [];

  return (
    <S.Section aria-label={t("responsible_children_linked")}>
      <S.Title>{t("responsible_children_linked")}</S.Title>
      {children.length === 0 ? (
        <S.Empty>{t("responsible_empty_children")}</S.Empty>
      ) : (
        <S.Grid>
          {children.map((child) => {
            const name = child.nome || t("responsible_child_fallback");
            const meta = childMeta(child);

            return (
              <S.Card key={child.id_paciente}>
                <S.Header>
                  <S.Initials aria-hidden>{getChildInitials(name)}</S.Initials>
                  <S.Identity>
                    <S.Name title={name}>{name}</S.Name>
                    {meta ? <S.Meta>{meta}</S.Meta> : null}
                  </S.Identity>
                </S.Header>

                <S.ActivitiesTitle>{t("responsible_latest_activities")}</S.ActivitiesTitle>
                {child.ultimas_atividades.length === 0 ? (
                  <S.ActivityEmpty>{t("responsible_empty_activities")}</S.ActivityEmpty>
                ) : (
                  <S.ActivityList>
                    {child.ultimas_atividades.map((activity) => {
                      const label = activityLabel(activity);
                      return (
                        <S.ActivityItem key={activity.id}>
                          <S.ActivityTop>
                            <S.ActivityName title={label}>{label}</S.ActivityName>
                            <S.Result $correct={activity.acertou}>
                              {t(activity.acertou ? "responsible_activity_correct" : "responsible_activity_incorrect")}
                            </S.Result>
                          </S.ActivityTop>
                          {activity.modulo && activity.atividade ? <S.ActivityModule>{activity.modulo}</S.ActivityModule> : null}
                          <S.Alternatives>
                            {t("responsible_chosen_alternative", { value: activity.alternativa_escolhida || "-" })}
                            {" · "}
                            {t("responsible_correct_alternative", { value: activity.alternativa_correta || "-" })}
                          </S.Alternatives>
                          <S.ActivityDate dateTime={String(activity.data_inicio)}>
                            {formatResponsibleDate(activity.data_inicio, i18n.language)}
                          </S.ActivityDate>
                        </S.ActivityItem>
                      );
                    })}
                  </S.ActivityList>
                )}
              </S.Card>
            );
          })}
        </S.Grid>
      )}
    </S.Section>
  );
}
