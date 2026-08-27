import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { translateProntuarioOpcaoById } from "@/lib/i18n/tables/lookup";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type PieLabelRenderProps,
} from "recharts";

const PIE_COLORS = ["#FA912C", "#F07DB0", "#3F37A6", "#46C080"];
const RADIAN = Math.PI / 180;

type AreaLabelKey =
  | "area_sensorimotor"
  | "area_cognitive"
  | "area_communication"
  | "area_socioemotional"
  | "area_daily_living";

type BarDatum = {
  label: string;
  descricao: string;
  frequencia: number;
  quantidade: number;
};

type PieDatum = {
  name: string;
  value: number;
  quantidade: number;
};

/** Eixo fixo — `idsResposta` casa `data[].id_resposta` com `prontuario_opcoes.json` (ids 1–5 e 9–13). */
const AREAS_WORKED_AXIS: { labelKey: AreaLabelKey; idsResposta: number[] }[] = [
  { labelKey: "area_sensorimotor", idsResposta: [1, 9] },
  { labelKey: "area_cognitive", idsResposta: [2, 10] },
  { labelKey: "area_communication", idsResposta: [3, 11] },
  { labelKey: "area_socioemotional", idsResposta: [4, 12] },
  { labelKey: "area_daily_living", idsResposta: [5, 13] },
];

type RoundedBarPayload = Readonly<{
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}>;

/** Barras com topo arredondado — shape do Recharts usa `(props: unknown) => JSX.Element`. */
function RoundedTopBar(props: unknown) {
  const { fill = "#0065A4", x = 0, y = 0, width = 0, height = 0 } = props as RoundedBarPayload;
  const w = width;
  const h = height;
  if (w <= 0 || h <= 0) return <g />;
  const r = Math.min(10, w / 3, h / 2);
  const d = `
    M${x},${y + h}
    L${x},${y + r}
    Q${x},${y} ${x + r},${y}
    L${x + w - r},${y}
    Q${x + w},${y} ${x + w},${y + r}
    L${x + w},${y + h}
    Z
  `;
  return <path d={d.trim()} fill={fill} stroke="none" />;
}

function reportToAreasWorkedData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  resolveLabel: (key: AreaLabelKey) => string,
  language: string
): BarDatum[] {
  const rows = res?.data ?? [];
  return AREAS_WORKED_AXIS.map(({ labelKey, idsResposta }) => {
    const label = resolveLabel(labelKey);
    const found = rows.find((item) => idsResposta.includes(item.id_resposta));
    const idResposta = found?.id_resposta ?? idsResposta[0];
    const fallback = found?.descricao?.trim() || label;
    return {
      label,
      descricao: translateProntuarioOpcaoById(idResposta, language, fallback),
      frequencia: found?.frequencia ?? 0,
      quantidade: found?.quantidade ?? 0,
    };
  });
}

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

type BarTooltipProps = {
  active?: boolean;
  payload?: { payload: BarDatum }[];
};

function BarDatumTooltip({ active, payload }: BarTooltipProps) {
  const { t } = useTranslation("reportStudent");
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.descricao}</p>
      <p className="mt-1 text-mbr-gray-50">{t("frequency_value", { value: row.frequencia })}</p>
      <p className="text-mbr-gray-50">{t("quantity_value", { value: row.quantidade })}</p>
    </S.TooltipBox>
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

type Props = {
  idUsuario: number;
};

export function Box3SessionCharts({ idUsuario }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
  const { getAreasWorked, getTypeActivity } = ReportUserSession();

  const [loading, setLoading] = useState(true);
  const [areasRes, setAreasRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);
  const [typeActivityRes, setTypeActivityRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setAreasRes(null);
      setTypeActivityRes(null);

      const params = { id_usuario: idUsuario };
      const [areas, tipo] = await Promise.all([getAreasWorked(params), getTypeActivity(params)]);

      if (cancelled) return;
      setAreasRes(areas);
      setTypeActivityRes(tipo);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callbacks do serviço mudam a cada render (useApi)
  }, [idUsuario]);

  const areasData = useMemo(
    () => reportToAreasWorkedData(areasRes, (key) => t(key), i18n.language),
    [areasRes, t, i18n.language]
  );
  const pieData = useMemo(
    () => reportToPieData(typeActivityRes, i18n.language),
    [typeActivityRes, i18n.language]
  );

  return (
    <S.Box3>
      <S.BoxTitle>{t("areas_title")}</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">{t("loading_charts")}</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>{t("areas_worked_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("areas_worked_subtitle")}</S.ChartCardSubtitle>
            <S.ChartWrap>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={areasData} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    interval={0}
                    tick={{ fontSize: 9, fill: "#5C5C5C" }}
                    angle={-35}
                    height={88}
                    textAnchor="end"
                  />
                  <YAxis domain={[0, 100]} width={40} tick={{ fontSize: 10, fill: "#5C5C5C" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<BarDatumTooltip />} cursor={{ fill: "rgba(0, 101, 164, 0.06)" }} />
                  <Bar dataKey="frequencia" name={t("frequency")} fill="#0065A4" shape={RoundedTopBar} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </S.ChartWrap>
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>{t("activity_types_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("activity_types_subtitle")}</S.ChartCardSubtitle>
            {pieData.length === 0 ? (
              <S.EmptyHint>{t("empty_activity_types")}</S.EmptyHint>
            ) : (
              <S.ChartWrap>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <Pie
                      data={pieData}
                      cx="36%"
                      cy="50%"
                      labelLine={false}
                      label={renderPieLabel}
                      outerRadius="72%"
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      paddingAngle={2}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{
                        fontSize: "11px",
                        lineHeight: "1.35",
                        paddingLeft: "4px",
                        maxWidth: "52%",
                      }}
                      formatter={(value: string) => (value.length > 28 ? `${value.slice(0, 28)}…` : value)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </S.ChartWrap>
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box3>
  );
}
