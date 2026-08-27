import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { translateProntuarioOpcaoById } from "@/lib/i18n/tables/lookup";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

const RADIAL_COLORS = ["#FA912C", "#F07DB0", "#46C080", "#E14FBE", "#F9A05D", "#48D8BB", "#FDDB20", "#F37A69"];

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

type RadialDatum = {
  name: string;
  descricaoFull: string;
  frequencia: number;
  quantidade: number;
  fill: string;
};

function mapReportToRadialData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  language: string,
  itemFallback: (n: number) => string
): RadialDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item, index) => {
    const fallback = item.descricao.trim();
    const full = translateProntuarioOpcaoById(item.id_resposta, language, fallback);
    return {
      name: full || itemFallback(index + 1),
      descricaoFull: full,
      frequencia: Math.max(0, Math.min(100, item.frequencia)),
      quantidade: item.quantidade,
      fill: RADIAL_COLORS[index % RADIAL_COLORS.length],
    };
  });
}

type RadialTooltipProps = {
  active?: boolean;
  payload?: { payload: RadialDatum }[];
};

function RadialTooltip({ active, payload }: RadialTooltipProps) {
  const { t } = useTranslation("reportStudent");
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.descricaoFull}</p>
      <p className="mt-1 text-mbr-gray-50">{t("frequency_value", { value: row.frequencia })}</p>
      <p className="text-mbr-gray-50">{t("quantity_value", { value: row.quantidade })}</p>
    </S.TooltipBox>
  );
}

type RadialFocusChartProps = {
  data: RadialDatum[];
};

/**
 * Radial Bar com legenda clicável para destacar uma faixa (opacidade nas demais),
 * conforme [Radial Bar Chart with Click to Focus Legend](https://recharts.github.io/en-US/examples/RadialBarChartClickToFocusLegendExample/).
 */
function RadialFocusChart({ data }: RadialFocusChartProps) {
  const { t } = useTranslation("reportStudent");
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const chartData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        fill: focusIndex === null || focusIndex === i ? d.fill : hexToRgba(d.fill, 0.22),
      })),
    [data, focusIndex]
  );

  const handleLegendClick = (_payload: unknown, index: number) => {
    if (index < 0 || index >= data.length) return;
    setFocusIndex((prev) => (prev === index ? null : index));
  };

  return (
    <S.ChartWrap>
      <S.ChartPlot>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="18%"
            outerRadius="88%"
            barSize={12}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              dataKey="frequencia"
              background={{ fill: "#E8E8E8" }}
              cornerRadius={4}
            />
            <Tooltip content={<RadialTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </S.ChartPlot>
      <S.LegendRow>
        {data.map((item, index) => (
          <S.LegendItem
            key={`${item.name}-${index}`}
            type="button"
            $dimmed={focusIndex !== null && focusIndex !== index}
            aria-pressed={focusIndex === index}
            onClick={() => handleLegendClick(undefined, index)}
          >
            <S.LegendDot style={{ backgroundColor: item.fill }} />
            {item.name}
          </S.LegendItem>
        ))}
      </S.LegendRow>
      <S.LegendHint>{t("legend_hint")}</S.LegendHint>
    </S.ChartWrap>
  );
}

type Props = {
  idUsuario: number;
};

export function Box5Behaviors({ idUsuario }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
  const { getBehaviors, getBehaviorFunction } = ReportUserSession();

  const [loading, setLoading] = useState(true);
  const [behaviorsRes, setBehaviorsRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);
  const [behaviorFnRes, setBehaviorFnRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setBehaviorsRes(null);
      setBehaviorFnRes(null);

      const params = { id_usuario: idUsuario };
      const [b, bf] = await Promise.all([getBehaviors(params), getBehaviorFunction(params)]);

      if (cancelled) return;
      setBehaviorsRes(b);
      setBehaviorFnRes(bf);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUsuario]);

  const behaviorsData = useMemo(
    () => mapReportToRadialData(behaviorsRes, i18n.language, (n) => t("item_fallback", { n })),
    [behaviorsRes, i18n.language, t]
  );
  const behaviorFnData = useMemo(
    () => mapReportToRadialData(behaviorFnRes, i18n.language, (n) => t("item_fallback", { n })),
    [behaviorFnRes, i18n.language, t]
  );

  return (
    <S.Box5>
      <S.BoxTitle>{t("behaviors_title")}</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">{t("loading_charts")}</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>{t("behaviors_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("behaviors_subtitle")}</S.ChartCardSubtitle>
            {behaviorsData.length === 0 ? (
              <S.EmptyHint>{t("empty_behaviors")}</S.EmptyHint>
            ) : (
              <RadialFocusChart data={behaviorsData} />
            )}
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>{t("behavior_function_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("behavior_function_subtitle")}</S.ChartCardSubtitle>
            {behaviorFnData.length === 0 ? (
              <S.EmptyHint>{t("empty_behavior_function")}</S.EmptyHint>
            ) : (
              <RadialFocusChart data={behaviorFnData} />
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box5>
  );
}
