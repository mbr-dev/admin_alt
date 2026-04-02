import * as S from "./styles";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { useEffect, useMemo, useState } from "react";
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

/** Eixo fixo de áreas trabalhadas — valores da API casados por trechos em `patterns` (texto normalizado). */
const AREAS_WORKED_AXIS: { label: string; patterns: string[] }[] = [
  { label: "Sensório-Motora", patterns: ["sensorio motora", "sensoriomotora", "sensorio-motora"] },
  { label: "Cognitiva/Executiva", patterns: ["cognitiva executiva", "cognitiva/executiva"] },
  { label: "Comunicação/Linguagem", patterns: ["comunicacao linguagem", "comunicacao/linguagem"] },
  { label: "Socioemocional", patterns: ["socioemocional", "socio emocional"] },
  {
    label: "Vida Diária (AVDs)",
    patterns: ["vida diaria", "atividades da vida diaria", "avds"],
  },
];

function normalizeForMatch(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

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

function reportToAreasWorkedData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): BarDatum[] {
  const rows = res?.data ?? [];
  return AREAS_WORKED_AXIS.map(({ label, patterns }) => {
    const found = rows.find((item) => {
      const n = normalizeForMatch(item.descricao ?? "");
      if (label === "Vida Diária (AVDs)" && /\bavds?\b/.test(n)) return true;
      return patterns.some((p) => n.includes(p));
    });
    return {
      label,
      descricao: found?.descricao?.trim() || label,
      frequencia: found?.frequencia ?? 0,
      quantidade: found?.quantidade ?? 0,
    };
  });
}

function reportToPieData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): PieDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => ({
    name: item.descricao.trim() || "—",
    value: Math.max(0, item.frequencia),
    quantidade: item.quantidade,
  }));
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
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <S.TooltipBox>
      <p className="font-medium text-mbr-gray-30">{row.descricao}</p>
      <p className="mt-1 text-mbr-gray-50">Frequência: {row.frequencia}%</p>
      <p className="text-mbr-gray-50">Quantidade: {row.quantidade}</p>
    </S.TooltipBox>
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

type Props = {
  idUsuario: number;
};

const AREAS_SUBTITLE =
  "Indica quais domínios do desenvolvimento foram mais estimulados, como cognição, linguagem, socioemocional e atividades de vida diária.";

const TYPE_ACTIVITY_SUBTITLE =
  "Mostra a distribuição dos tipos de intervenção realizados, como aquisição de habilidades, generalização, avaliação ou manejo comportamental.";

export function Box3SessionCharts({ idUsuario }: Props) {
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

  const areasData = useMemo(() => reportToAreasWorkedData(areasRes), [areasRes]);
  const pieData = useMemo(() => reportToPieData(typeActivityRes), [typeActivityRes]);

  return (
    <S.Box3>
      <S.BoxTitle>Áreas Trabalhadas & Planejamentos</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">Carregando gráficos…</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>Áreas trabalhadas</S.ChartCardTitle>
            <S.ChartCardSubtitle>{AREAS_SUBTITLE}</S.ChartCardSubtitle>
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
                  <Bar dataKey="frequencia" name="Frequência" fill="#0065A4" shape={RoundedTopBar} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </S.ChartWrap>
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>Tipos de atividade</S.ChartCardTitle>
            <S.ChartCardSubtitle>{TYPE_ACTIVITY_SUBTITLE}</S.ChartCardSubtitle>
            {pieData.length === 0 ? (
              <S.EmptyHint>Sem dados de tipos de atividade para este aluno.</S.EmptyHint>
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
