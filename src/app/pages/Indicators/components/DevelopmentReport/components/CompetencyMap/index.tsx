import { useMemo, useState } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { formatPercent } from "../../utils";
import {
  getCategoryMedia,
  getCompetencyMapPerformanceColor,
  getTagIcon,
  getTagSoftColor,
  hasCompetencyContent,
} from "./utils";

interface ICompetencyMap {
  tags: ALTDevelopmentReportService.ICompetencyTreeTag[];
  categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[];
  forceExpanded?: boolean;
}

export const CompetencyMap = ({ tags, categories, forceExpanded = false }: ICompetencyMap) => {
  const { t } = useTranslation("indicators");
  const visibleTags = useMemo(
    () =>
      (tags ?? []).filter((tag) =>
        tag.subtags?.some((subtag) => (subtag.competencias?.length ?? 0) > 0)
      ),
    [tags]
  );

  const [openIds, setOpenIds] = useState<number[]>(
    visibleTags.length ? [visibleTags[0].id_tag] : []
  );
  const allIds = visibleTags.map((tag) => tag.id_tag);
  const effectiveOpenIds = forceExpanded ? allIds : openIds;

  const allOpen = visibleTags.length > 0 && effectiveOpenIds.length === visibleTags.length;

  const toggleTag = (id: number) => {
    if (forceExpanded) return;
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (forceExpanded) return;
    setOpenIds(allOpen ? [] : allIds);
  };

  if (!hasCompetencyContent(tags)) {
    return (
      <S.Card>
        <S.Title>{t("dev_competencyMapTitle")}</S.Title>
        <S.Subtitle>{t("dev_competencyMapSubtitle")}</S.Subtitle>
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      </S.Card>
    );
  }

  return (
    <S.Card>
      <S.Title>{t("dev_competencyMapTitle")}</S.Title>
      <S.Subtitle>{t("dev_competencyMapSubtitle")}</S.Subtitle>

      {!forceExpanded && (
        <S.Toolbar>
          <S.ExpandButton type="button" onClick={toggleAll}>
            {allOpen ? t("dev_competencyMap_collapseAll") : t("dev_competencyMap_expandAll")}
          </S.ExpandButton>
        </S.Toolbar>
      )}

      <S.TagList>
        {visibleTags.map((tag, tagIndex) => {
          const isOpen = effectiveOpenIds.includes(tag.id_tag);
          const colors = getTagSoftColor(tagIndex);
          const media = getCategoryMedia(categories, tag.id_tag);
          const mediaColor =
            media !== null
              ? getCompetencyMapPerformanceColor(media)
              : colors.accent;
          const tagIcon = getTagIcon(tag.id_tag);

          return (
            <S.TagCard key={tag.id_tag}>
              <S.AreaHeader
                type="button"
                onClick={() => toggleTag(tag.id_tag)}
                aria-expanded={isOpen}
                aria-controls={`competency-area-${tag.id_tag}`}
              >
                <S.TagIconBox $accent={colors.accent} aria-hidden>
                  {tagIcon && <img src={tagIcon} alt="" />}
                </S.TagIconBox>

                <S.AreaInfo>
                  <S.AreaLabel>{t("dev_competencyMap_area")}</S.AreaLabel>
                  <S.AreaTitle>{tag.tag}</S.AreaTitle>
                </S.AreaInfo>

                {media !== null && (
                  <S.AreaPercent $color={mediaColor}>{formatPercent(media)}%</S.AreaPercent>
                )}

                <S.Chevron $open={isOpen} />
              </S.AreaHeader>

              {isOpen && (
                <S.AreaBody id={`competency-area-${tag.id_tag}`}>
                  {tag.subtags.map((subtag) => {
                    const competencias = subtag.competencias ?? [];
                    if (competencias.length <= 0) return null;

                    const subtagPercent = subtag.percentual ?? 0;
                    const subtagColor = getCompetencyMapPerformanceColor(subtagPercent);
                    const safeSubtagPercent = Math.min(Math.max(subtagPercent, 0), 100);

                    return (
                      <S.CompetencyBlock key={subtag.id_subtag}>
                        <S.CompetencyHeader>
                          <S.CompetencyName>{subtag.subtag}</S.CompetencyName>
                          <S.CompetencyPercent>{formatPercent(subtagPercent)}%</S.CompetencyPercent>
                        </S.CompetencyHeader>

                        <S.BarTrack>
                          <S.BarFill
                            style={{
                              width: `${safeSubtagPercent}%`,
                              backgroundColor: subtagColor,
                            }}
                          />
                        </S.BarTrack>

                        <S.SkillsList>
                          {competencias.map((skill) => {
                            const skillColor = getCompetencyMapPerformanceColor(
                              skill.percentual ?? 0
                            );

                            return (
                              <S.SkillRow key={skill.id_competencia}>
                                <S.SkillDot $color={skillColor} aria-hidden />
                                <S.SkillName>{skill.competencia}</S.SkillName>
                                <S.SkillPercent>{formatPercent(skill.percentual)}%</S.SkillPercent>
                              </S.SkillRow>
                            );
                          })}
                        </S.SkillsList>
                      </S.CompetencyBlock>
                    );
                  })}
                </S.AreaBody>
              )}
            </S.TagCard>
          );
        })}
      </S.TagList>
    </S.Card>
  );
};
