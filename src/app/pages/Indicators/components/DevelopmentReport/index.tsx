import * as S from "./styles";
import { useDevelopmentReport } from "./hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import {
  GeneralIndex,
  HighlightList,
  EvolutionChart,
  CategoryPerformance,
  PerformanceAccordion,
  ActivityDistribution,
} from "./components";

export const DevelopmentReport = () => {
  const hook = useDevelopmentReport();
  const { t } = useTranslation("indicators");

  const hasGeneralIndex = !!hook.generalIndex;
  const hasPerformance = !!hook.performance?.tags?.length;
  const hasEvolution = !!hook.evolution?.periodos?.length;
  const hasDistribution = !!hook.distribution?.tags?.length;
  const hasStrengths = !!hook.performance?.pontos_fortes?.length;
  const hasWeaknesses = !!hook.performance?.pontos_fracos?.length;
  const hasSummary = hasDistribution || hasStrengths || hasWeaknesses;
  const isEmpty = !hasGeneralIndex && !hasPerformance && !hasEvolution && !hasSummary;

  return (
    <S.Container>
      <S.ButtonBack onClick={hook.handleBack}>
        <FaArrowLeft /> {t("back")}
      </S.ButtonBack>

      <S.Header>
        <h2>{t("button3").toLocaleUpperCase()}</h2>
        <p>{hook.studentData?.nome}</p>
      </S.Header>

      {hook.loading && (
        <>
          <S.Session>
            <S.SkeletonCard />
            <S.SkeletonCard />
          </S.Session>
          <S.SkeletonTable />
          <S.SkeletonTable />
          <S.SessionTriple>
            <S.SkeletonCard />
            <S.SkeletonCard />
            <S.SkeletonCard />
          </S.SessionTriple>
        </>
      )}

      {!hook.loading && (
        <>
          {hasGeneralIndex && (
            <S.Session>
              <GeneralIndex value={hook.generalIndex!.indice_geral} />
              <CategoryPerformance categories={hook.generalIndex!.categorias ?? []} />
            </S.Session>
          )}

          {hasPerformance && <PerformanceAccordion tags={hook.performance!.tags} />}

          {hasEvolution && <EvolutionChart periods={hook.evolution!.periodos} />}

          {hasSummary && (
            <S.SessionTriple>
              <ActivityDistribution items={hook.distribution?.tags ?? []} />
              <HighlightList
                title={t("dev_strengthsTitle")}
                variant="strong"
                items={hook.performance?.pontos_fortes ?? []}
              />
              <HighlightList
                title={t("dev_weaknessesTitle")}
                variant="weak"
                items={hook.performance?.pontos_fracos ?? []}
              />
            </S.SessionTriple>
          )}

          {isEmpty && (
            <S.Empty>
              <p>{t("empty")}</p>
            </S.Empty>
          )}
        </>
      )}
    </S.Container>
  );
};
