import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { Pie, Cell, PieChart, ResponsiveContainer } from "recharts";

interface IGeneralIndex {
  value: number;
}

const TRACK_COLOR = "rgba(255, 255, 255, 0.18)";
const VALUE_COLOR = "#60F1FC";
//Mapeia o índice geral para a faixa de desenvolvimento correspondente
const getLevelKey = (value: number): "low" | "mid" | "high" => {
  if (value < 50) return "low";
  if (value < 80) return "mid";
  return "high";
};
//Formata o percentual mantendo uma casa decimal apenas quando necessário
const formatPercent = (value: number): string =>
  Number.isInteger(value) ? String(value) : value.toFixed(1);

export const GeneralIndex = ({ value }: IGeneralIndex) => {
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

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius="72%"
              outerRadius="100%"
              cornerRadius={8}
              stroke="none"
            >
              <Cell fill={VALUE_COLOR} />
              <Cell fill={TRACK_COLOR} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <S.CenterLabel>
          <S.Percent>{formatPercent(safeValue)}%</S.Percent>
          <S.Level>{t(`dev_level_${levelKey}`)}</S.Level>
        </S.CenterLabel>
      </S.ChartWrapper>

      <S.Description>{t(`dev_level_${levelKey}_desc`)}</S.Description>
    </S.Card>
  );
};
