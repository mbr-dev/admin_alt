import { useMemo } from "react";
import * as S from "./styles";
import { CHART_COLORS } from "../../utils";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface IEvolutionChart {
  periods: ALTDevelopmentReportService.IEvolutionAltTagPeriod[];
}

export const EvolutionChart = ({ periods }: IEvolutionChart) => {
  const { t } = useTranslation("indicators");
  //Lista as tags únicas na ordem de aparição para gerar uma linha por tag
  const tags = useMemo(() => {
    const seen = new Map<string, string>();
    periods.forEach((period) => {
      period.tags.forEach((tag) => {
        if (!seen.has(tag.tag)) seen.set(tag.tag, tag.tag);
      });
    });
    return Array.from(seen.keys());
  }, [periods]);
  //Converte os períodos em linhas com uma coluna por tag para o gráfico
  const data = useMemo(
    () =>
      periods.map((period) => {
        const row: Record<string, string | number> = { periodo: period.periodo };
        period.tags.forEach((tag) => {
          row[tag.tag] = tag.percentual;
        });
        return row;
      }),
    [periods]
  );

  if (!periods || periods.length <= 0) {
    return (
      <S.Card>
        <S.Title>{t("dev_evolutionTitle")}</S.Title>
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      </S.Card>
    );
  }

  return (
    <S.Card>
      <S.Title>{t("dev_evolutionTitle")}</S.Title>
      <S.Subtitle>{t("dev_evolutionSubtitle")}</S.Subtitle>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
            <XAxis dataKey="periodo" tick={{ fill: "#5C5C5C", fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#929292", fontSize: 12 }} />
            <Tooltip
              formatter={(value: number, name: string) => [`${value}%`, name]}
              contentStyle={{ borderRadius: 8, borderColor: "#E0E0E0" }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {tags.map((tag, index) => (
              <Line
                key={tag}
                type="monotone"
                dataKey={tag}
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Card>
  );
};
