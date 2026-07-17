import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";
import { GiProgression } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import { ReactNode } from "react";

type TDiffTone = "positive" | "negative" | "neutral";

interface IStatisticCardConfig {
  id: string;
  titleKey: string;
  subtitleKey: string;
  value: number | null | undefined;
  difference: number | null | undefined;
  icon: ReactNode;
  asPercent?: boolean;
  withPts?: boolean;
}

function formatMetric(value: number | null | undefined, asPercent = true): string {
  if (value === null || value === undefined) {
    return asPercent ? "0%" : "0";
  }

  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(1).replace(".", ",");

  return asPercent ? `${formatted}%` : formatted;
}

function formatDifference(value: number): string {
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs)
    ? String(abs)
    : abs.toFixed(1).replace(".", ",");

  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return "0";
}

function getDiffTone(value: number): TDiffTone {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
}

function DiffIcon({ tone }: { tone: TDiffTone }) {
  if (tone === "positive") return <FaArrowUp aria-hidden />;
  if (tone === "negative") return <FaArrowDown aria-hidden />;
  return <FaMinus aria-hidden />;
}

function StatisticCard({
  title,
  subtitle,
  value,
  difference,
  icon,
  asPercent = true,
  withPts = true,
  ptsLabel,
  vsLabel,
}: {
  title: string;
  subtitle: string;
  value: number | null | undefined;
  difference: number | null | undefined;
  icon: ReactNode;
  asPercent?: boolean;
  withPts?: boolean;
  ptsLabel: string;
  vsLabel: string;
}) {
  const diffValue = difference ?? 0;
  const tone = getDiffTone(diffValue);

  return (
    <S.Card>
      <S.Header>
        {icon}
        <S.Title>{title}</S.Title>
      </S.Header>

      <S.Value>{formatMetric(value, asPercent)}</S.Value>
      <S.Subtitle>{subtitle}</S.Subtitle>

      <S.DiffRow>
        <S.DiffValue $tone={tone}>
          <DiffIcon tone={tone} />
          {formatDifference(diffValue)}
          {withPts ? ptsLabel : ""}
        </S.DiffValue>
        <S.DiffLabel>{vsLabel}</S.DiffLabel>
      </S.DiffRow>
    </S.Card>
  );
}

export function StatisticCards() {
  const { t } = useTranslation("monitoring");
  const { statisticNetwork, isStatisticNetworkLoading } = useMonitoring();

  if (isStatisticNetworkLoading) {
    return (
      <S.Container aria-busy="true" aria-label={t("statisticsLoading")}>
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
        <S.SkeletonCard />
      </S.Container>
    );
  }

  const cards: IStatisticCardConfig[] = [
    {
      id: "progress",
      titleKey: "progressTitle",
      subtitleKey: "progressSubtitle",
      value: statisticNetwork?.progress?.percentual,
      difference: statisticNetwork?.progress?.evolution,
      icon: (
        <S.IconWrap style={{ color: "#EC5691" }}>
          <GiProgression aria-hidden />
        </S.IconWrap>
      ),
    },
    {
      id: "utilization",
      titleKey: "utilizationTitle",
      subtitleKey: "utilizationSubtitle",
      value: statisticNetwork?.utilization?.taxa_atual,
      difference: statisticNetwork?.utilization?.taxa_diferenca,
      icon: (
        <S.IconWrap style={{ color: "#3B82F6" }}>
          <TbTargetArrow aria-hidden />
        </S.IconWrap>
      ),
    },
    {
      id: "performance",
      titleKey: "performanceTitle",
      subtitleKey: "performanceSubtitle",
      value: statisticNetwork?.performance?.taxa_atual,
      difference: statisticNetwork?.performance?.taxa_diferenca,
      icon: (
        <S.IconWrap style={{ color: "#22C55E" }}>
          <SlGraph aria-hidden />
        </S.IconWrap>
      ),
    },
    {
      id: "development",
      titleKey: "developmentTitle",
      subtitleKey: "developmentSubtitle",
      value: statisticNetwork?.development?.taxa_evolucao,
      difference: statisticNetwork?.development?.taxa_diferenca,
      icon: (
        <S.IconWrap style={{ color: "#A855F7" }}>
          <MdOutlineStarPurple500 aria-hidden />
        </S.IconWrap>
      ),
      asPercent: false,
      withPts: false,
    },
  ];

  return (
    <S.Container>
      {cards.map((card) => (
        <StatisticCard
          key={card.id}
          title={t(card.titleKey)}
          subtitle={t(card.subtitleKey)}
          value={card.value}
          difference={card.difference}
          icon={card.icon}
          asPercent={card.asPercent}
          withPts={card.withPts}
          ptsLabel={t("pts")}
          vsLabel={t("vsPreviousPeriod")}
        />
      ))}
    </S.Container>
  );
}
