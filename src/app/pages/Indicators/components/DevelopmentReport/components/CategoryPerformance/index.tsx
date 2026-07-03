import * as S from "./styles";
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
}

export const CategoryPerformance = ({ categories }: ICategoryPerformance) => {
  const { t } = useTranslation("indicators");

  return (
    <S.Card>
      <S.Title>{t("dev_categoryTitle")}</S.Title>
      <S.Subtitle>{t("dev_categorySubtitle")}</S.Subtitle>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={categories} outerRadius="70%">
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis
              dataKey="categoria"
              tick={{ fill: "#5C5C5C", fontSize: 12 }}
            />
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
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{ borderRadius: 8, borderColor: "#E0E0E0" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Card>
  );
};
