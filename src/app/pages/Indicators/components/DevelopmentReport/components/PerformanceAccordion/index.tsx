import { useState } from "react";
import * as S from "./styles";
import { PerformanceBar } from "../PerformanceBar";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { getPerformanceColor, formatPercent } from "../../utils";

interface IPerformanceAccordion {
  tags: ALTDevelopmentReportService.IPerformanceSubtagTag[];
  isExporting?: boolean;
}

//Média de desempenho de uma categoria a partir das suas subtags
const getAverage = (subtags: ALTDevelopmentReportService.IPerformanceSubtagItem[]): number => {
  if (!subtags.length) return 0;
  const total = subtags.reduce((acc, item) => acc + (item.percentual ?? 0), 0);
  return total / subtags.length;
};

export const PerformanceAccordion = ({ tags, isExporting = false }: IPerformanceAccordion) => {
  const { t } = useTranslation("indicators");
  const [openIds, setOpenIds] = useState<number[]>(tags.length ? [tags[0].id_tag] : []);

  const toggle = (id: number) => {
    if (isExporting) return;
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  if (!tags || tags.length <= 0) {
    return (
      <S.Card data-export-performance={isExporting ? "" : undefined}>
        <S.Title>{t("dev_competencyTitle")}</S.Title>
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      </S.Card>
    );
  }

  return (
    <S.Card data-export-performance={isExporting ? "" : undefined}>
      <S.Title>{t("dev_competencyTitle")}</S.Title>
      {!isExporting && <S.Subtitle>{t("dev_competencySubtitle")}</S.Subtitle>}

      <S.List>
        {tags.map((tag) => {
          const isOpen = !isExporting && openIds.includes(tag.id_tag);
          const average = getAverage(tag.subtags);

          return (
            <S.Item key={tag.id_tag} $exporting={isExporting}>
              <S.Header
                type="button"
                onClick={() => toggle(tag.id_tag)}
                aria-expanded={isOpen}
                aria-controls={isExporting ? undefined : `category-${tag.id_tag}`}
                $exporting={isExporting}
              >
                <S.HeaderLeft $exporting={isExporting}>
                  <S.Category $exporting={isExporting}>{tag.tag}</S.Category>
                  {!isExporting && (
                    <S.Count>
                      ({tag.subtags.length} {t("dev_col_skill").toLocaleLowerCase()})
                    </S.Count>
                  )}
                </S.HeaderLeft>

                <S.HeaderRight>
                  <S.Average style={{ backgroundColor: getPerformanceColor(average) }}>
                    {formatPercent(average)}%
                  </S.Average>
                  <S.Chevron $open={isOpen} $exporting={isExporting} />
                </S.HeaderRight>
              </S.Header>

              {isOpen && (
                <S.Body id={`category-${tag.id_tag}`}>
                  {tag.subtags.map((subtag) => (
                    <S.Row key={subtag.id_subtag}>
                      <S.Skill>{subtag.subtag}</S.Skill>
                      <S.BarBox>
                        <PerformanceBar value={subtag.percentual} />
                      </S.BarBox>
                    </S.Row>
                  ))}
                </S.Body>
              )}
            </S.Item>
          );
        })}
      </S.List>
    </S.Card>
  );
};
