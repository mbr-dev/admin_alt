import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { useEffect, useMemo, useState } from "react";
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from "recharts";

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

function mapReportToRadialData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): RadialDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item, index) => {
    const full = item.descricao.trim();
    const short = full.length > 24 ? `${full.slice(0, 24)}…` : full;
    return {
      name: short || `Item ${index + 1}`,
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
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.descricaoFull}</p>
      <p className="mt-1 text-mbr-gray-50">Frequência: {row.frequencia}%</p>
      <p className="text-mbr-gray-50">Quantidade: {row.quantidade}</p>
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
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="18%"
          outerRadius="100%"
          barSize={12}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            dataKey="frequencia"
            background={{ fill: "#E8E8E8" }}
            cornerRadius={4}
            className="[&_.recharts-radial-bar-sector]:cursor-pointer"
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: "11px", paddingLeft: 8, cursor: "pointer" }}
            iconType="circle"
            iconSize={8}
            onClick={handleLegendClick}
          />
          <Tooltip content={<RadialTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
      <S.LegendHint>Toque na legenda para destacar uma categoria.</S.LegendHint>
    </S.ChartWrap>
  );
}

type Props = {
  idUsuario: number;
};

const BEHAVIORS_SUBTITLE =
  "Apresenta a frequência de comportamentos que podem dificultar a aprendizagem, como fuga, estereotipias ou oposição.";

const BEHAVIOR_FUNCTION_SUBTITLE =
  "Indica o motivo provável desses comportamentos, como busca por atenção, fuga de demandas ou estímulo sensorial.";

export function Box5Behaviors({ idUsuario }: Props) {
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

  const behaviorsData = useMemo(() => mapReportToRadialData(behaviorsRes), [behaviorsRes]);
  const behaviorFnData = useMemo(() => mapReportToRadialData(behaviorFnRes), [behaviorFnRes]);

  return (
    <S.Box5>
      <S.BoxTitle>Comportamentos</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">Carregando gráficos…</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>Comportamentos</S.ChartCardTitle>
            <S.ChartCardSubtitle>{BEHAVIORS_SUBTITLE}</S.ChartCardSubtitle>
            {behaviorsData.length === 0 ? (
              <S.EmptyHint>Sem dados de comportamentos.</S.EmptyHint>
            ) : (
              <RadialFocusChart data={behaviorsData} />
            )}
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>Função do comportamento</S.ChartCardTitle>
            <S.ChartCardSubtitle>{BEHAVIOR_FUNCTION_SUBTITLE}</S.ChartCardSubtitle>
            {behaviorFnData.length === 0 ? (
              <S.EmptyHint>Sem dados de função do comportamento.</S.EmptyHint>
            ) : (
              <RadialFocusChart data={behaviorFnData} />
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box5>
  );
}
