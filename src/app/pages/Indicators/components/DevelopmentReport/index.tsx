import { useRef } from "react";
import * as S from "./styles";
import { useDevelopmentReport } from "./hook";
import { useIndicators } from "../../hook";
import { FaArrowLeft, FaDownload } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import {
  GeneralIndex,
  HighlightList,
  EvolutionChart,
  CategoryPerformance,
  PerformanceAccordion,
  ActivityDistribution,
  RecommendedActivities,
  //CompetencyMap,
} from "./components";

export const DevelopmentReport = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const hook = useDevelopmentReport(reportRef);
  const { t } = useTranslation("indicators");
  const indicatorsContext = useIndicators();

  const hasGeneralIndex = !!hook.generalIndex;
  const hasPerformance = !!hook.performance?.tags?.length;
  const hasEvolution = !!hook.evolution?.periodos?.length;
  const hasCompetencyTree = !!hook.competencyTree?.tags?.length;
  const hasDistribution = !!hook.distribution?.tags?.length;
  const hasStrengths = !!hook.performance?.pontos_fortes?.length;
  const hasWeaknesses = !!hook.performance?.pontos_fracos?.length;
  const hasRecommended =
    !!hook.performance?.atividades_recomendadas?.some((group) => group.atividades?.length > 0);
  const hasSummary = hasDistribution || hasStrengths || hasWeaknesses;
  const isEmpty =
    !hasGeneralIndex &&
    !hasPerformance &&
    !hasEvolution &&
    !hasCompetencyTree &&
    !hasSummary &&
    !hasRecommended;

  return (
    <S.Container>
      <S.ButtonBack onClick={hook.handleBack}>
        <FaArrowLeft /> {t("back")}
      </S.ButtonBack>

      <S.ExportArea ref={reportRef} $exporting={hook.isExporting}>
        <S.ExportSection data-export-section>
          <S.Header $exporting={hook.isExporting}>
            <S.TitleRow>
              <S.HeaderTitle>{t("button3").toLocaleUpperCase()}</S.HeaderTitle>

              {!hook.loading && !isEmpty && (
                <S.DownloadButton
                  type="button"
                  data-export-ignore
                  $exporting={hook.isExporting}
                  onClick={() => void hook.handleDownload()}
                  disabled={hook.isExporting}
                  aria-busy={hook.isExporting}
                  aria-label={t("dev_downloadReport")}
                  title={t("dev_downloadReport")}
                >
                  {hook.isExporting ? <S.DownloadSpinner /> : <FaDownload />}
                  <S.DownloadLabel $exporting={hook.isExporting}>
                    {hook.isExporting ? t("dev_downloadPreparing") : t("dev_downloadReport")}
                  </S.DownloadLabel>
                </S.DownloadButton>
              )}
            </S.TitleRow>

            <S.StudentName $exporting={hook.isExporting} data-export-student-name>
              {hook.studentData?.nome}
            </S.StudentName>
          </S.Header>
        </S.ExportSection>

        <S.Filter data-export-ignore>
          <h2>{t("select")}</h2>

          <S.Div>
            {indicatorsContext.BUTTONS.map((item, index) => (
              <S.FilterDiv key={index}>
                <input
                  type="radio"
                  name="filterOption"
                  value={item.id}
                  checked={indicatorsContext.typeSelected === item.id}
                  onChange={() => hook.handleChangeReport(item.id)}
                />
                {item.label}
              </S.FilterDiv>
            ))}
          </S.Div>
        </S.Filter>

        {hook.loading && (
          <>
            <S.ExportSection data-export-section>
              <S.Session data-export-grid $exporting={hook.isExporting}>
                <S.SkeletonCard />
                <S.SkeletonCard />
              </S.Session>
            </S.ExportSection>
            <S.SkeletonTable />
            <S.SkeletonTable />
            <S.ExportSection data-export-section>
              <S.SessionTriple data-export-grid $exporting={hook.isExporting}>
                <S.SkeletonCard />
                <S.SkeletonCard />
                <S.SkeletonCard />
              </S.SessionTriple>
            </S.ExportSection>
          </>
        )}

        {!hook.loading && (
          <S.ReportContent>
            {hasGeneralIndex && (
              <S.ExportSection data-export-section>
                <S.Session data-export-grid $exporting={hook.isExporting}>
                  <GeneralIndex
                    value={hook.generalIndex!.indice_geral}
                    isExporting={hook.isExporting}
                  />
                  <CategoryPerformance
                    categories={hook.generalIndex!.categorias ?? []}
                    isExporting={hook.isExporting}
                  />
                </S.Session>
              </S.ExportSection>
            )}

            {hasSummary && (
              <S.ExportSection data-export-section>
                <S.SessionTriple data-export-grid $exporting={hook.isExporting}>
                  <ActivityDistribution
                    items={hook.distribution?.tags ?? []}
                    isExporting={hook.isExporting}
                  />
                  <HighlightList
                    title={t("dev_strengthsTitle")}
                    variant="strong"
                    items={hook.performance?.pontos_fortes ?? []}
                    isExporting={hook.isExporting}
                  />
                  <HighlightList
                    title={t("dev_weaknessesTitle")}
                    variant="weak"
                    items={hook.performance?.pontos_fracos ?? []}
                    isExporting={hook.isExporting}
                  />
                </S.SessionTriple>
              </S.ExportSection>
            )}

            {hasRecommended && (
              <S.ExportSection data-export-section data-export-page-break-before>
                <RecommendedActivities
                  groups={hook.performance!.atividades_recomendadas ?? []}
                  isExporting={hook.isExporting}
                />
              </S.ExportSection>
            )}

            {hasEvolution && (
              <S.ExportSection data-export-section data-export-page-break-before>
                <EvolutionChart
                  periods={hook.evolution!.periodos}
                  isExporting={hook.isExporting}
                />
              </S.ExportSection>
            )}

            {hasPerformance && (
              <S.ExportSection data-export-section>
                <PerformanceAccordion
                  tags={hook.performance!.tags}
                  isExporting={hook.isExporting}
                />
              </S.ExportSection>
            )}

            {/* {hasCompetencyTree && (
              <S.ExportSection data-export-section>
                <CompetencyMap
                  tags={hook.competencyTree!.tags}
                  categories={hook.generalIndex?.categorias ?? []}
                  forceExpanded={hook.isExporting}
                />
              </S.ExportSection>
            )} */}

            {isEmpty && (
              <S.Empty>
                <p>{t("empty")}</p>
              </S.Empty>
            )}
          </S.ReportContent>
        )}
      </S.ExportArea>
    </S.Container>
  );
};
