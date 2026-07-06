import * as S from "./styles";
import { EXPORT_CHART_SIZE } from "../../utils";
import { ALTDevelopmentReportService } from "@/data/models";
import { useTranslation } from "react-i18next";
import {
  Radar,
  Tooltip,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ICategoryPerformance {
  categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[];
  isExporting?: boolean;
}

const renderRadarChart = (categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[], title: string) => (
  <RadarChart data={categories} outerRadius="70%">
    <PolarGrid stroke="#E0E0E0" />
    <PolarAngleAxis dataKey="categoria" tick={{ fill: "#5C5C5C", fontSize: 12 }} />
    <PolarRadiusAxis
      domain={[0, 100]}
      angle={90}
      tick={{ fill: "#929292", fontSize: 10 }}
      axisLine={false}
    />
    <Radar name={title} dataKey="media" stroke="#0288D1" fill="#0288D1" fillOpacity={0.5} />
    <Tooltip
      formatter={(value: number) => [`${value}%`, ""]}
      contentStyle={{ borderRadius: 8, borderColor: "#E0E0E0" }}
    />
  </RadarChart>
);

export const CategoryPerformance = ({ categories, isExporting = false }: ICategoryPerformance) => {
  const { t } = useTranslation("indicators");
  const { width, height } = EXPORT_CHART_SIZE.wide;

  return (
    <S.Card>
      <S.Title>{t("dev_categoryTitle")}</S.Title>
      <S.Subtitle>{t("dev_categorySubtitle")}</S.Subtitle>

      <S.ChartWrapper $exporting={isExporting}>
        {isExporting ? (
          <RadarChart width={width} height={height} data={categories} outerRadius="70%">
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis dataKey="categoria" tick={{ fill: "#5C5C5C", fontSize: 12 }} />
            <PolarRadiusAxis
              domain={[0, 100]}
              angle={90}
              tick={{ fill: "#929292", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name={t("dev_categoryTitle")}
              dataKey="media"
              stroke="#0288D1"
              fill="#0288D1"
              fillOpacity={0.5}
            />
          </RadarChart>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {renderRadarChart(categories, t("dev_categoryTitle"))}
          </ResponsiveContainer>
        )}
      </S.ChartWrapper>
    </S.Card>
  );
};
