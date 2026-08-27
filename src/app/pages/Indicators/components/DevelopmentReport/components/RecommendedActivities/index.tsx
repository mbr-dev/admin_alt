import { useMemo } from "react";
import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import {
  translateActivityTypeLabel,
  translateAltTagById,
  translateProjetoModuloById,
} from "@/lib/i18n/tables/lookup";

interface IRecommendedActivities {
  groups: ALTDevelopmentReportService.IRecommendedActivityGroup[];
  isExporting?: boolean;
}

function flattenActivities(
  groups: ALTDevelopmentReportService.IRecommendedActivityGroup[]
): ALTDevelopmentReportService.IRecommendedActivity[] {
  const seen = new Map<number, ALTDevelopmentReportService.IRecommendedActivity>();

  groups.forEach((group) => {
    group.atividades?.forEach((activity) => {
      if (!seen.has(activity.atividade_id)) {
        seen.set(activity.atividade_id, activity);
      }
    });
  });

  return Array.from(seen.values());
}

export function RecommendedActivities({
  groups,
  isExporting = false,
}: IRecommendedActivities) {
  const { t, i18n } = useTranslation("indicators");
  const { URL_FILES } = useApi();

  const activities = useMemo(() => flattenActivities(groups ?? []), [groups]);

  return (
    <S.Card>
      <S.Title>{t("dev_recommendedTitle")}</S.Title>
      <S.Subtitle>{t("dev_recommendedSubtitle")}</S.Subtitle>

      {activities.length > 0 ? (
        <S.ScrollRow $exporting={isExporting}>
          {activities.map((activity) => {
            const iconSrc = activity.icone_modulo
              ? `${URL_FILES}${activity.icone_modulo}`
              : null;
            const backgroundColor = activity.cor_modulo?.trim() || "#F73571";
            const moduleLabel = translateProjetoModuloById(
              activity.id_modulo,
              i18n.language,
              activity.descricao_modulo
            );
            const typeLabel = translateActivityTypeLabel(
              t,
              activity.descricao,
              activity.descricao
            );

            return (
              <S.ActivityCard
                key={activity.id}
                $exporting={isExporting}
                style={{ backgroundColor }}
              >
                <S.HeaderRow>
                  {iconSrc && (
                    <S.IconWrap>
                      <img src={iconSrc} alt="" />
                    </S.IconWrap>
                  )}

                  <S.HeaderText>
                    <S.ActivityTitle>{moduleLabel}</S.ActivityTitle>
                    <S.ActivitySubtitle>{typeLabel}</S.ActivitySubtitle>
                  </S.HeaderText>
                </S.HeaderRow>

                {activity.tags?.length > 0 && (
                  <S.TagsList>
                    {activity.tags.map((tag) => (
                      <S.TagItem key={tag.id_tag}>
                        {translateAltTagById(tag.id_tag, i18n.language, tag.tag)}
                      </S.TagItem>
                    ))}
                  </S.TagsList>
                )}
              </S.ActivityCard>
            );
          })}
        </S.ScrollRow>
      ) : (
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      )}
    </S.Card>
  );
}
