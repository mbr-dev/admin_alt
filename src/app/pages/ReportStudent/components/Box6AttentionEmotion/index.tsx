import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { useEffect, useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";

const PIE_COLORS = ["#FA912C", "#F07DB0", "#46C080", "#E14FBE", "#F9A05D", "#48D8BB", "#FDDB20", "#F37A69"];

const RADIAN = Math.PI / 180;

type PieDatum = {
  name: string;
  value: number;
  quantidade: number;
};

function reportToPieData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): PieDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => ({
    name: item.descricao.trim() || "—",
    value: Math.max(0, item.frequencia),
    quantidade: item.quantidade,
  }));
}

/** Rótulo % dentro da fatia — semicírculo ([Straight Angle Pie Chart](https://recharts.github.io/en-US/examples/StraightAnglePieChart/)). */
function renderStraightPieLabel(props: PieLabelRenderProps) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent } = props;
  if (percent == null || percent < 0.05) return null;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.55;
  const x = Number(cx) + radius * Math.cos(-RADIAN * Number(midAngle));
  const y = Number(cy) + radius * Math.sin(-RADIAN * Number(midAngle));
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      className="pointer-events-none text-[10px] font-semibold sm:text-xs"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}

type TooltipPieProps = {
  active?: boolean;
  payload?: { payload: PieDatum }[];
};

function PieTooltip({ active, payload }: TooltipPieProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.name}</p>
      <p className="mt-1 text-mbr-gray-50">Frequência: {row.value}%</p>
      <p className="text-mbr-gray-50">Quantidade: {row.quantidade}</p>
    </S.TooltipBox>
  );
}

type StraightPieProps = {
  data: PieDatum[];
};

/** Semicírculo: `startAngle={180}` · `endAngle={0}` como no exemplo oficial. */
const pieLegendProps = {
  layout: "vertical" as const,
  align: "right" as const,
  verticalAlign: "middle" as const,
  iconType: "circle" as const,
  iconSize: 8,
  wrapperStyle: {
    fontSize: "11px",
    lineHeight: "1.35",
    paddingLeft: "4px",
    maxWidth: "52%",
  },
  formatter: (value: string) => (value.length > 28 ? `${value.slice(0, 28)}…` : value),
};

function StraightAnglePie({ data }: StraightPieProps) {
  return (
    <S.ChartWrap>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
          <Pie
            data={data}
            cx="36%"
            cy="58%"
            labelLine={false}
            label={renderStraightPieLabel}
            outerRadius="72%"
            innerRadius="34%"
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            startAngle={180}
            endAngle={0}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
          <Legend {...pieLegendProps} />
        </PieChart>
      </ResponsiveContainer>
    </S.ChartWrap>
  );
}

type Props = {
  idUsuario: number;
};

const ATTENTION_SUBTITLE =
  "Mostra o padrão de foco do paciente durante as sessões, como atenção sustentada, oscilante ou dispersa.";

const EMOTION_SUBTITLE =
  "Indica a estabilidade emocional do paciente, identificando possíveis oscilações ou crises.";

export function Box6AttentionEmotion({ idUsuario }: Props) {
  const { getAttention, getEmotionalRegulation } = ReportUserSession();

  const [loading, setLoading] = useState(true);
  const [attentionRes, setAttentionRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);
  const [emotionRes, setEmotionRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setAttentionRes(null);
      setEmotionRes(null);

      const params = { id_usuario: idUsuario };
      const [att, emo] = await Promise.all([getAttention(params), getEmotionalRegulation(params)]);

      if (cancelled) return;
      setAttentionRes(att);
      setEmotionRes(emo);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUsuario]);

  const attentionData = useMemo(() => reportToPieData(attentionRes), [attentionRes]);
  const emotionData = useMemo(() => reportToPieData(emotionRes), [emotionRes]);

  return (
    <S.Box6>
      <S.BoxTitle>Atenção e regulação emocional</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">Carregando gráficos…</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>Atenção</S.ChartCardTitle>
            <S.ChartCardSubtitle>{ATTENTION_SUBTITLE}</S.ChartCardSubtitle>
            {attentionData.length === 0 ? (
              <S.EmptyHint>Sem dados de atenção.</S.EmptyHint>
            ) : (
              <StraightAnglePie data={attentionData} />
            )}
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>Regulação emocional</S.ChartCardTitle>
            <S.ChartCardSubtitle>{EMOTION_SUBTITLE}</S.ChartCardSubtitle>
            {emotionData.length === 0 ? (
              <S.EmptyHint>Sem dados de regulação emocional.</S.EmptyHint>
            ) : (
              <StraightAnglePie data={emotionData} />
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box6>
  );
}
