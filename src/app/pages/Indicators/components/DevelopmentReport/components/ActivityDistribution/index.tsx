import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as S from "./styles";
import { CHART_COLORS, EXPORT_CHART_SIZE } from "../../utils";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { translateSkillCategory } from "@/lib/i18n/translate-skill-category";
import {
  Pie,
  Cell,
  Tooltip,
  Legend,
  PieChart,
  type PieLabelRenderProps,
} from "recharts";

interface IActivityDistribution {
  items: ALTDevelopmentReportService.IDistributionActivitiesPerformedItem[];
  isExporting?: boolean;
}

type PieDatum = {
  id: number;
  name: string;
  value: number;
};

type TranslateFn = (key: string, options?: { ns?: string }) => string;

const RADIAN = Math.PI / 180;

const toPieData = (
  items: ALTDevelopmentReportService.IDistributionActivitiesPerformedItem[],
  t: TranslateFn
): PieDatum[] =>
  items
    .map((item) => {
      const realizada = Number(item.realizada);
      const atividadeRealizada = Number(item.atividade_realizada);

      const value =
        !Number.isNaN(realizada) && realizada > 0
          ? realizada
          : !Number.isNaN(atividadeRealizada) && atividadeRealizada > 0
            ? atividadeRealizada
            : 0;

      const rawTag = item.tag?.trim() || "—";

      return {
        id: item.id_tag,
        name: rawTag === "—" ? rawTag : translateSkillCategory(t, rawTag),
        value,
      };
    })
    .filter((item) => item.value > 0);

const renderPieLabel = (props: PieLabelRenderProps) => {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent } = props;
  if (percent == null || percent < 0.03) return null;

  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.52;
  const x = Number(cx) + radius * Math.cos(-RADIAN * Number(midAngle));
  const y = Number(cy) + radius * Math.sin(-RADIAN * Number(midAngle));

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      textAnchor="middle"
      dominantBaseline="central"
      className="pointer-events-none text-[11px] font-bold sm:text-xs"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

const renderPieChart = (data: PieDatum[], width: number, height: number, animated: boolean) => (
  <PieChart width={width} height={height} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius="78%"
      labelLine={false}
      label={renderPieLabel}
      paddingAngle={data.length > 1 ? 2 : 0}
      isAnimationActive={animated}
    >
      {data.map((item, index) => (
        <Cell key={item.id} fill={CHART_COLORS[index % CHART_COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value: number, name: string) => [value, name]} />
    <Legend
      layout="horizontal"
      verticalAlign="bottom"
      align="center"
      iconType="circle"
      iconSize={8}
      wrapperStyle={{ fontSize: 12, lineHeight: 1.35, paddingTop: 8 }}
      formatter={(value: string) => (value.length > 28 ? `${value.slice(0, 28)}…` : value)}
    />
  </PieChart>
);

const DEFAULT_CHART_SIZE = { width: 320, height: 280 };

export const ActivityDistribution = ({ items, isExporting = false }: IActivityDistribution) => {
  const { t } = useTranslation("indicators");
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const { width: exportWidth, height: exportHeight } = EXPORT_CHART_SIZE.distribution;

  const pieData = useMemo(() => toPieData(items, t), [items, t]);
  const hasData = pieData.length > 0;

  useLayoutEffect(() => {
    if (isExporting) return;

    const element = chartRef.current;
    if (!element) return;

    const updateSize = () => {
      const { width, height } = element.getBoundingClientRect();
      setChartSize({
        width: Math.max(Math.floor(width), 0),
        height: Math.max(Math.floor(height), 0),
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [isExporting, hasData]);

  useEffect(() => {
    if (isExporting || !hasData) return;

    const frame = window.requestAnimationFrame(() => {
      const element = chartRef.current;
      if (!element) return;

      const { width, height } = element.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;

      setChartSize({
        width: Math.floor(width),
        height: Math.floor(height),
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isExporting, hasData, items]);

  const chartWidth = chartSize.width > 0 ? chartSize.width : DEFAULT_CHART_SIZE.width;
  const chartHeight = chartSize.height > 0 ? chartSize.height : DEFAULT_CHART_SIZE.height;

  return (
    <S.Card>
      <S.Title>{t("dev_distributionTitle")}</S.Title>
      <S.Subtitle>{t("dev_distributionSubtitle")}</S.Subtitle>

      {hasData ? (
        <S.ChartWrapper $exporting={isExporting}>
          <S.ChartMeasure ref={chartRef}>
            {isExporting
              ? renderPieChart(pieData, exportWidth, exportHeight, false)
              : renderPieChart(pieData, chartWidth, chartHeight, true)}
          </S.ChartMeasure>
        </S.ChartWrapper>
      ) : (
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      )}
    </S.Card>
  );
};
