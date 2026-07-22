import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { Pie, Cell, PieChart, ResponsiveContainer } from "recharts";

interface IGeneralIndex {
  value: number;
  isExporting?: boolean;
}

const TRACK_COLOR = "rgba(255, 255, 255, 0.18)";
const VALUE_COLOR = "#60F1FC";
const EXPORT_CHART_SIZE = 260;

const getLevelKey = (value: number): "low" | "mid" | "high" => {
  if (value < 50) return "low";
  if (value < 80) return "mid";
  return "high";
};

const formatPercent = (value: number): string =>
  Number.isInteger(value) ? String(value) : value.toFixed(1);

const renderPieChart = (data: { name: string; value: number }[], animated: boolean) => (
  <Pie
    data={data}
    dataKey="value"
    startAngle={90}
    endAngle={-270}
    innerRadius="72%"
    outerRadius="100%"
    cornerRadius={8}
    stroke="none"
    isAnimationActive={animated}
  >
    <Cell fill={VALUE_COLOR} />
    <Cell fill={TRACK_COLOR} />
  </Pie>
);

export const GeneralIndex = ({ value, isExporting = false }: IGeneralIndex) => {
  const { t } = useTranslation("indicators");

  const safeValue = Math.min(Math.max(value ?? 0, 0), 100);
  const levelKey = getLevelKey(safeValue);

  const data = [
    { name: "value", value: safeValue },
    { name: "rest", value: 100 - safeValue },
  ];

  return (
    <S.Card>
      <S.Title>{t("dev_generalIndexTitle")}</S.Title>

      <S.ChartSection>
        <S.ChartWrapper $exporting={isExporting}>
          {isExporting ? (
            <PieChart width={EXPORT_CHART_SIZE} height={EXPORT_CHART_SIZE}>
              {renderPieChart(data, false)}
            </PieChart>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>{renderPieChart(data, true)}</PieChart>
            </ResponsiveContainer>
          )}

          <S.CenterLabel>
            <S.Percent>{formatPercent(safeValue)}%</S.Percent>
          </S.CenterLabel>
        </S.ChartWrapper>
          <S.Level>{t(`dev_level_${levelKey}`)}</S.Level>
      </S.ChartSection>

      <S.Description>{t(`dev_level_${levelKey}_desc`)}</S.Description>
    </S.Card>
  );
};
