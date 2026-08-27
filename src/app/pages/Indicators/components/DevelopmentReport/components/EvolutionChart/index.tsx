import { useMemo, useState, type ChangeEvent } from "react";
import * as S from "./styles";
import { CHART_COLORS } from "../../utils";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { translateAltTagById } from "@/lib/i18n/tables/lookup";
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

const ALL_TAGS = "all";

interface IEvolutionChart {
  periods: ALTDevelopmentReportService.IEvolutionAltTagPeriod[];
  isExporting?: boolean;
}

interface IEvolutionTagOption {
  id_tag: number;
  key: string;
  label: string;
}

export function EvolutionChart({ periods, isExporting = false }: IEvolutionChart) {
  const { t, i18n } = useTranslation("indicators");
  const [selectedTag, setSelectedTag] = useState<string>(ALL_TAGS);

  const tags = useMemo<IEvolutionTagOption[]>(() => {
    const seen = new Map<number, IEvolutionTagOption>();

    periods.forEach((period) => {
      period.tags.forEach((tag) => {
        if (seen.has(tag.id_tag)) return;

        seen.set(tag.id_tag, {
          id_tag: tag.id_tag,
          key: String(tag.id_tag),
          label: translateAltTagById(tag.id_tag, i18n.language, tag.tag),
        });
      });
    });

    return Array.from(seen.values());
  }, [periods, i18n.language]);

  const data = useMemo(
    () =>
      periods.map((period) => {
        const row: Record<string, string | number> = { periodo: period.periodo };
        period.tags.forEach((tag) => {
          row[String(tag.id_tag)] = tag.percentual;
        });
        return row;
      }),
    [periods]
  );

  const visibleTags = useMemo(() => {
    if (isExporting || selectedTag === ALL_TAGS) return tags;
    return tags.filter((tag) => tag.key === selectedTag);
  }, [isExporting, selectedTag, tags]);

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

      <S.FilterRow data-export-ignore>
        <S.FilterLabel htmlFor="evolution-tag-filter">{t("dev_evolutionFilterLabel")}</S.FilterLabel>
        <S.FilterSelect
          id="evolution-tag-filter"
          value={selectedTag}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedTag(event.target.value)}
          aria-label={t("dev_evolutionFilterLabel")}
        >
          <option value={ALL_TAGS}>{t("dev_evolutionFilterAll")}</option>
          {tags.map((tag) => (
            <option key={tag.key} value={tag.key}>
              {tag.label}
            </option>
          ))}
        </S.FilterSelect>
      </S.FilterRow>

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
            {visibleTags.map((tag) => {
              const colorIndex = tags.findIndex((item) => item.key === tag.key);
              return (
                <Line
                  key={tag.key}
                  type="monotone"
                  dataKey={tag.key}
                  name={tag.label}
                  stroke={CHART_COLORS[colorIndex % CHART_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={!isExporting}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Card>
  );
}
