import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { translateProntuarioOpcaoById } from "@/lib/i18n/tables/lookup";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";

const PIE_COLORS = ["#FA912C", "#F07DB0", "#46C080", "#E14FBE", "#F9A05D", "#48D8BB", "#FDDB20", "#F37A69"];

const RADIAN = Math.PI / 180;

type PieDatum = {
  name: string;
  value: number;
  quantidade: number;
};

function reportToPieData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  language: string
): PieDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => {
    const fallback = item.descricao.trim() || "—";
    return {
      name: translateProntuarioOpcaoById(item.id_resposta, language, fallback),
      value: Math.max(0, item.frequencia),
      quantidade: item.quantidade,
    };
  });
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
  const { t } = useTranslation("reportStudent");
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.name}</p>
      <p className="mt-1 text-mbr-gray-50">{t("frequency_value", { value: row.value })}</p>
      <p className="text-mbr-gray-50">{t("quantity_value", { value: row.quantidade })}</p>
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

export function Box6AttentionEmotion({ idUsuario }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
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

  const attentionData = useMemo(
    () => reportToPieData(attentionRes, i18n.language),
    [attentionRes, i18n.language]
  );
  const emotionData = useMemo(
    () => reportToPieData(emotionRes, i18n.language),
    [emotionRes, i18n.language]
  );

  return (
    <S.Box6>
      <S.BoxTitle>{t("attention_emotion_title")}</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">{t("loading_charts")}</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>{t("attention_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("attention_subtitle")}</S.ChartCardSubtitle>
            {attentionData.length === 0 ? (
              <S.EmptyHint>{t("empty_attention")}</S.EmptyHint>
            ) : (
              <StraightAnglePie data={attentionData} />
            )}
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>{t("emotion_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("emotion_subtitle")}</S.ChartCardSubtitle>
            {emotionData.length === 0 ? (
              <S.EmptyHint>{t("empty_emotion")}</S.EmptyHint>
            ) : (
              <StraightAnglePie data={emotionData} />
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box6>
  );
}
