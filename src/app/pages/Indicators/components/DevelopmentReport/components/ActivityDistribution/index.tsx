import * as S from "./styles";
import { CHART_COLORS, EXPORT_CHART_SIZE } from "../../utils";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { Pie, Cell, Tooltip, Legend, PieChart, ResponsiveContainer } from "recharts";

interface IActivityDistribution {
  items: ALTDevelopmentReportService.IDistributionActivitiesPerformedItem[];
  isExporting?: boolean;
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  if (!percent) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      fontSize={12}
      fontWeight="bold"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderPieContent = (items: ALTDevelopmentReportService.IDistributionActivitiesPerformedItem[]) => (
  <>
    <Pie
      data={items}
      dataKey="atividade_realizada"
      nameKey="tag"
      cx="50%"
      cy="50%"
      outerRadius="80%"
      labelLine={false}
      label={renderCustomizedLabel}
    >
      {items.map((item, index) => (
        <Cell key={item.id_tag} fill={CHART_COLORS[index % CHART_COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value: number, name: string) => [value, name]} />
    <Legend wrapperStyle={{ fontSize: 12 }} />
  </>
);

export const ActivityDistribution = ({ items, isExporting = false }: IActivityDistribution) => {
  const { t } = useTranslation("indicators");
  const { width, height } = EXPORT_CHART_SIZE.distribution;

  const total = items.reduce((acc, item) => acc + (item.atividade_realizada ?? 0), 0);
  const hasData = items.length > 0 && total > 0;

  return (
    <S.Card>
      <S.Title>{t("dev_distributionTitle")}</S.Title>
      <S.Subtitle>{t("dev_distributionSubtitle")}</S.Subtitle>

      {hasData ? (
        <S.ChartWrapper $exporting={isExporting}>
          {isExporting ? (
            <PieChart width={width} height={height}>
              {renderPieContent(items)}
            </PieChart>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>{renderPieContent(items)}</PieChart>
            </ResponsiveContainer>
          )}
        </S.ChartWrapper>
      ) : (
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      )}
    </S.Card>
  );
};
