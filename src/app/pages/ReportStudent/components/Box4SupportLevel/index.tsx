import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { translateProntuarioOpcaoById } from "@/lib/i18n/tables/lookup";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";

/** Trecho dentro do primeiro `(...)` em `descricao`, ex.: "Independente (I): ..." → "I". */
export function extractParenLabel(descricao: string): string {
  const m = descricao.match(/\(([^)]+)\)/);
  const inner = m?.[1]?.trim();
  return inner || (descricao.trim() ? descricao.trim().slice(0, 14) : "—");
}

const PIE_COLORS = ["#FA912C", "#F07DB0", "#3F37A6", "#46C080"];
const RADIAN = Math.PI / 180;

type PieDatum = {
  name: string;
  value: number;
  quantidade: number;
  descricaoFull: string;
};

function reportToStrategiesPieData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  language: string
): PieDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => {
    const fallback = item.descricao.trim();
    const full = translateProntuarioOpcaoById(item.id_resposta, language, fallback);
    return {
      name: full || "—",
      descricaoFull: full,
      value: Math.max(0, item.frequencia),
      quantidade: item.quantidade,
    };
  });
}

/** `paddingAngle` + `cornerRadius` no `Pie` (exemplo oficial Recharts). */
const PIE_PADDING_ANGLE = 4;
const PIE_CORNER_RADIUS = 6;

function renderPieLabel(props: PieLabelRenderProps) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent } = props;
  if (percent == null || percent < 0.04) return null;
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

function StrategiesPieTooltip({ active, payload }: TooltipPieProps) {
  const { t } = useTranslation("reportStudent");
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.descricaoFull}</p>
      <p className="mt-1 text-mbr-gray-50">{t("frequency_value", { value: row.value })}</p>
      <p className="text-mbr-gray-50">{t("quantity_value", { value: row.quantidade })}</p>
    </S.TooltipBox>
  );
}

type Props = {
  idUsuario: number;
};

export function Box4SupportLevel({ idUsuario }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
  const { getStrategies } = ReportUserSession();

  const [loading, setLoading] = useState(true);
  const [strategiesRes, setStrategiesRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setStrategiesRes(null);

      const data = await getStrategies({ id_usuario: idUsuario });

      if (cancelled) return;
      setStrategiesRes(data);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getStrategies instável por useApi
  }, [idUsuario]);

  const pieData = useMemo(
    () => reportToStrategiesPieData(strategiesRes, i18n.language),
    [strategiesRes, i18n.language]
  );

  return (
    <S.Box4>
      <S.BoxTitle>{t("strategies_title")}</S.BoxTitle>
      <S.ChartBody>
        {loading ? (
          <p className="py-10 text-center text-sm text-mbr-gray-50">{t("loading_chart")}</p>
        ) : (
          <S.ChartCard>
            <S.ChartCardTitle>{t("approaches_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("approaches_subtitle")}</S.ChartCardSubtitle>
            {pieData.length === 0 ? (
              <S.EmptyHint>{t("empty_strategies")}</S.EmptyHint>
            ) : (
              <S.ChartWrap>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <Pie
                      data={pieData}
                      cx="66%"
                      cy="50%"
                      labelLine={false}
                      label={renderPieLabel}
                      innerRadius="48%"
                      outerRadius="78%"
                      paddingAngle={PIE_PADDING_ANGLE}
                      cornerRadius={PIE_CORNER_RADIUS}
                      dataKey="value"
                      nameKey="name"
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<StrategiesPieTooltip />} />
                    <Legend
                      layout="vertical"
                      align="left"
                      verticalAlign="middle"
                      iconType="circle"
                      iconSize={10}
                      wrapperStyle={{
                        fontSize: "13px",
                        fontWeight: 500,
                        lineHeight: "1.5",
                        paddingRight: "6px",
                        maxWidth: "44%",
                      }}
                      formatter={(value: string) => (value.length > 28 ? `${value.slice(0, 28)}…` : value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </S.ChartWrap>
            )}
          </S.ChartCard>
        )}
      </S.ChartBody>
    </S.Box4>
  );
}
