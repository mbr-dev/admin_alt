import * as S from "./styles";
import * as B8 from "../Box8TechnicalIaReport/styles";
import { ReportABASession } from "@/data/services";
import { ReportABASessionService } from "@/data/models";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  idUsuario: number;
};

const ACCENT = {
  independencia: "#0065A4",
  intensidade: "#F07DB0",
  progresso: "#46C080",
  latencia: "#D97706",
  frequencia: "#51B4DF",
  engajamento: "#6366F1",
  desempenho: "#0E7490",
} as const;

const LINE_TOTAL_PERCENT = "#0065A4";
const LINE_MEDIA_MOVEL = "#EA580C";

/** Cores das barras por linha (ciclo), alinhadas ao mock “Scores por Área”. */
const FREQUENCY_BAR_COLORS = ["#2563EB", "#EA580C", "#DC2626", "#D97706", "#0891B2", "#7C3AED"] as const;

type RoundedBarPayload = Readonly<{
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}>;

/** Barras com topo arredondado (mesmo padrão de `Box3SessionCharts`). */
function RoundedTopBar(props: unknown) {
  const { fill = "#6366F1", x = 0, y = 0, width = 0, height = 0 } = props as RoundedBarPayload;
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

/** Normaliza `media` vinda da API (number, string, vírgula decimal). */
function formatMedia(value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "—";
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  const n = Number(String(value).trim().replace(",", "."));
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/** Exibe número como segundos (valores da API de latência). */
function formatSeconds(value: unknown): string {
  const base = formatMedia(value);
  if (base === "—") return "—";
  return `${base} s`;
}

type PercentageLineDatum = {
  id_sessao: number;
  sessaoLabel: string;
  /** Acertos / oportunidades (para rótulo inferior). */
  sessaoCount: string;
  total_percent: number;
  media_movel: number | null;
};

function PercentageCorrectXAxisTick(props: {
  x?: number;
  y?: number;
  index?: number;
  rows: PercentageLineDatum[];
}) {
  const { x = 0, y = 0, index = 0, rows } = props;
  const row = typeof index === "number" ? rows[index] : undefined;
  if (!row) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={10} textAnchor="middle" fill="#5C5C5C" fontSize={10}>
        {row.sessaoLabel}
      </text>
      <text dy={22} textAnchor="middle" fill="#7C7C7C" fontSize={9}>
        {row.sessaoCount}
      </text>
    </g>
  );
}

/** Rótulo acima dos pontos (estilo Line Chart With Customized Label). */
function TotalPercentPointLabel(props: unknown) {
  const { x, y, value } = props as { x?: number; y?: number; value?: number | string };
  if (x == null || y == null || value === "" || value === undefined || value === null) return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return (
    <text x={x} y={y} dy={-8} fill={LINE_TOTAL_PERCENT} fontSize={10} fontWeight={600} textAnchor="middle">
      {`${n}%`}
    </text>
  );
}

function MediaMovelPointLabel(props: unknown) {
  const { x, y, value } = props as { x?: number; y?: number; value?: number | string };
  if (x == null || y == null || value === "" || value === undefined || value === null) return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return (
    <text x={x} y={y} dy={-18} fill={LINE_MEDIA_MOVEL} fontSize={10} fontWeight={600} textAnchor="middle">
      {`${n}%`}
    </text>
  );
}

export function Box9ABAReport({ idUsuario }: Props) {
  const {
    getABAaverageHelp,
    getABAMediumIntensity,
    getABAperformance,
    getABAlatencyTime,
    getABAfrequencyBehavior,
    getABAengagement,
    getABApercentageCorrect,
  } = ReportABASession();

  const [loading, setLoading] = useState(true);
  const [averageHelp, setAverageHelp] = useState<ReportABASessionService.IGetABAaverageHelpResponse | null>(null);
  const [mediumIntensity, setMediumIntensity] = useState<ReportABASessionService.IGetABAMediumIntensityResponse | null>(null);
  const [performance, setPerformance] = useState<ReportABASessionService.IGetABAperformanceResponse | null>(null);
  const [latencyTime, setLatencyTime] = useState<ReportABASessionService.IGetABAlatencyTimeResponse | null>(null);
  const [frequencyBehavior, setFrequencyBehavior] =
    useState<ReportABASessionService.IGetABAfrequencyBehaviorResponse | null>(null);
  const [engagement, setEngagement] = useState<ReportABASessionService.IGetABAengagementResponse | null>(null);
  const [percentageCorrect, setPercentageCorrect] =
    useState<ReportABASessionService.IGetABApercentageCorrectResponse | null>(null);

  const engagementChart = useMemo(() => {
    if (!engagement?.data?.length) {
      return { rows: [] as { rotulo: string; total: number; fill: string }[], maxSum: 0 };
    }
    const rows = engagement.data.map((item, i) => ({
      rotulo: item.rotulo?.trim() || "—",
      total: typeof item.total === "number" && Number.isFinite(item.total) ? item.total : 0,
      fill: FREQUENCY_BAR_COLORS[i % FREQUENCY_BAR_COLORS.length],
    }));
    const maxSum = rows.reduce((acc, r) => acc + r.total, 0);
    return { rows, maxSum };
  }, [engagement]);

  const percentageLineRows = useMemo((): PercentageLineDatum[] => {
    if (!percentageCorrect?.data?.length) return [];
    return [...percentageCorrect.data]
      .sort((a, b) => a.id_sessao - b.id_sessao)
      .map((d) => ({
        id_sessao: d.id_sessao,
        sessaoLabel: `Sessão ${d.id_sessao}`,
        sessaoCount: `${d.independent_agreements}/${d.frequency}`,
        total_percent: typeof d.total_percent === "number" && Number.isFinite(d.total_percent) ? d.total_percent : 0,
        media_movel: d.media_movel === null || d.media_movel === undefined || !Number.isFinite(d.media_movel) ? null : d.media_movel,
      }));
  }, [percentageCorrect]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!idUsuario || idUsuario <= 0) {
        setAverageHelp(null);
        setMediumIntensity(null);
        setPerformance(null);
        setLatencyTime(null);
        setFrequencyBehavior(null);
        setEngagement(null);
        setPercentageCorrect(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const [avg, mid, perf, lat, freq, eng, pct] = await Promise.all([
        getABAaverageHelp({ id_usuario: idUsuario }),
        getABAMediumIntensity({ id_usuario: idUsuario }),
        getABAperformance({ id_usuario: idUsuario }),
        getABAlatencyTime({ id_usuario: idUsuario }),
        getABAfrequencyBehavior({ id_usuario: idUsuario }),
        getABAengagement({ id_usuario: idUsuario }),
        getABApercentageCorrect({ id_usuario: idUsuario }),
      ]);

      if (cancelled) return;
      setAverageHelp(avg);
      setMediumIntensity(mid);
      setPerformance(perf);
      setLatencyTime(lat);
      setFrequencyBehavior(freq);
      setEngagement(eng);
      setPercentageCorrect(pct);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- serviços instáveis (useApi)
  }, [idUsuario]);

  if (!idUsuario || idUsuario <= 0) {
    return (
      <B8.Box>
        <B8.Title>ABA</B8.Title>
        <B8.Body>
          <B8.Hint>Identificador de usuário inválido.</B8.Hint>
        </B8.Body>
      </B8.Box>
    );
  }

  if (loading) {
    return (
      <B8.Box>
        <B8.Title>ABA</B8.Title>
        <B8.Body>
          <B8.Loading>Carregando indicadores ABA…</B8.Loading>
        </B8.Body>
      </B8.Box>
    );
  }

  return (
    <B8.Box>
      <B8.Title>ABA</B8.Title>
      <B8.Body>
        <S.GridTwo>
          {/* Box 1 — Nível de Independência */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.independencia }}>Nível de Independência</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>Grau de suporte necessário para execução das habilidades</S.CardSubtitle>
              {averageHelp ? (
                <>
                  <div className="mt-3">
                    <S.MetricBlock>
                      <S.MetricCircle
                        style={{ backgroundColor: ACCENT.independencia, color: "#fff" }}
                      >
                        <span className="tabular-nums">{formatMedia(averageHelp.media as unknown)}</span>
                      </S.MetricCircle>
                      <S.MetricLabel>{averageHelp.interpretacao}</S.MetricLabel>
                    </S.MetricBlock>
                  </div>
                  <p className="mt-2 text-center text-xs text-mbr-gray-50">
                    Sessões utilizadas: {averageHelp.sessoes_utilizadas}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">Sem dados de nível de independência.</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>

          {/* Box 2 — Intensidade dos Comportamentos */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.intensidade }}>Intensidade dos Comportamentos</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>Nível médio de severidade dos comportamentos apresentados</S.CardSubtitle>
              {mediumIntensity ? (
                <>
                  <div className="mt-3">
                    <S.MetricBlock>
                      <S.MetricCircle
                        style={{ backgroundColor: ACCENT.intensidade, color: "#fff" }}
                      >
                        <span className="tabular-nums">{formatMedia(mediumIntensity.media as unknown)}</span>
                      </S.MetricCircle>
                      <S.MetricLabel>{mediumIntensity.interpretacao}</S.MetricLabel>
                    </S.MetricBlock>
                  </div>
                  <p className="mt-2 text-center text-xs text-mbr-gray-50">
                    Total de sessões consideradas: {mediumIntensity.total_sessoes}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">Sem dados de intensidade.</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>
        </S.GridTwo>

        <S.GridTwo>
          {/* Box 3 — Progresso da Habilidade */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.progresso }}>Progresso da Habilidade</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>Estágio de aquisição e consolidação das habilidades trabalhadas</S.CardSubtitle>
              {performance ? (
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <S.MetricCircle style={{ backgroundColor: ACCENT.progresso, color: "#fff" }}>
                      <span className="tabular-nums">{formatMedia(performance.media as unknown)}</span>
                    </S.MetricCircle>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <S.FieldLabel>Classificação técnica</S.FieldLabel>
                      <S.FieldValue>{performance.classificacao_tecnica || "—"}</S.FieldValue>
                    </div>
                    <div>
                      <S.FieldLabel>Interpretação clínica</S.FieldLabel>
                      <S.FieldValue>{performance.interpretacao_clinica || "—"}</S.FieldValue>
                    </div>
                    <p className="text-xs text-mbr-gray-50">Sessões: {performance.total_sessao}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">Sem dados de desempenho.</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>

          {/* Box 4 — Latência de Resposta */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.latencia }}>Latência de Resposta</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>Tempo médio para iniciar a resposta após instrução</S.CardSubtitle>
              {latencyTime ? (
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <S.MetricCircle style={{ backgroundColor: ACCENT.latencia, color: "#fff" }}>
                      <span className="tabular-nums">{formatMedia(latencyTime.media as unknown)}</span>
                    </S.MetricCircle>
                    <p className="mt-2 text-center text-xs text-mbr-gray-50">Média (segundos)</p>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <S.FieldLabel>Menor tempo</S.FieldLabel>
                      <S.FieldValue>{formatSeconds(latencyTime.menor_valor as unknown)}</S.FieldValue>
                    </div>
                    <div>
                      <S.FieldLabel>Maior tempo</S.FieldLabel>
                      <S.FieldValue>{formatSeconds(latencyTime.maior_valor as unknown)}</S.FieldValue>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">Sem dados de latência de resposta.</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>
        </S.GridTwo>

        {/* Box 5 — Frequência de Comportamentos Interferentes */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.frequencia }}>
            Frequência de Comportamentos Interferentes
          </B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>Número de ocorrências de comportamentos que impactam a aprendizagem</S.CardSubtitle>
            {frequencyBehavior && frequencyBehavior.data.length > 0 ? (
              <ul className="mt-4 list-none space-y-4 p-0">
                {frequencyBehavior.data.map((item, index) => {
                  const max = frequencyBehavior.total_frequencias;
                  const pct =
                    max > 0 && Number.isFinite(item.total)
                      ? Math.min(100, Math.max(0, (item.total / max) * 100))
                      : 0;
                  const barColor = FREQUENCY_BAR_COLORS[index % FREQUENCY_BAR_COLORS.length];
                  return (
                    <li key={`${item.rotulo}-${index}`}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="min-w-0 text-xs leading-snug text-mbr-gray-50 sm:text-sm">{item.rotulo}</span>
                        <span className="shrink-0 tabular-nums text-sm font-medium text-mbr-gray-30 sm:text-base">
                          {formatMedia(item.total as unknown)}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-mbr-gray-20"
                        role="presentation"
                      >
                        <div
                          className="h-full rounded-full transition-[width]"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: barColor,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-mbr-gray-50">Sem dados de frequência de comportamentos.</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>

        {/* Box 6 — Nível de Engajamento */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.engajamento }}>Nível de Engajamento</B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>Qualidade da atenção durante as atividades propostas</S.CardSubtitle>
            {engagementChart.rows.length > 0 ? (
              <div className="mt-4 h-[260px] w-full sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementChart.rows} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="rotulo"
                      interval={0}
                      tick={{ fontSize: 10, fill: "#5C5C5C" }}
                      angle={-30}
                      height={72}
                      textAnchor="end"
                    />
                    <YAxis
                      domain={[0, Math.max(engagementChart.maxSum, 1)]}
                      width={44}
                      tick={{ fontSize: 10, fill: "#5C5C5C" }}
                      tickFormatter={(v) => formatMedia(v)}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(99, 102, 241, 0.08)" }}
                      formatter={(value: number | string) => [formatMedia(value as unknown), "Total"]}
                      labelFormatter={(label) => String(label)}
                    />
                    <Bar dataKey="total" name="Total" maxBarSize={48} shape={RoundedTopBar}>
                      {engagementChart.rows.map((entry, index) => (
                        <Cell key={`eng-bar-${entry.rotulo}-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="mt-4 text-sm text-mbr-gray-50">Sem dados de engajamento.</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>

        {/* Box 7 — Desempenho de Resposta */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.desempenho }}>Desempenho de Resposta</B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>Percentual de respostas independentes corretas por sessão</S.CardSubtitle>
            {percentageCorrect && percentageLineRows.length > 0 ? (
              <>
                <S.FieldValue className="mt-3">{percentageCorrect.interpretacao_final}</S.FieldValue>
                <div className="mt-4 h-[280px] w-full sm:h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={percentageLineRows}
                      margin={{ top: 28, right: 16, left: 0, bottom: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="sessaoLabel"
                        interval={0}
                        height={56}
                        tickLine={false}
                        axisLine={{ stroke: "#e5e7eb" }}
                        tick={(tickProps) => (
                          <PercentageCorrectXAxisTick {...tickProps} rows={percentageLineRows} />
                        )}
                      />
                      <YAxis
                        domain={[0, 100]}
                        width={44}
                        tick={{ fontSize: 10, fill: "#5C5C5C" }}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        formatter={(value: number | string, name: string) => [
                          typeof value === "number" ? `${formatMedia(value)}%` : String(value),
                          name === "total_percent" ? "% por sessão" : "Tendência",
                        ]}
                        labelFormatter={(_, payload) => {
                          const p = payload?.[0]?.payload as PercentageLineDatum | undefined;
                          return p ? `${p.sessaoLabel} (${p.sessaoCount})` : "";
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                        formatter={(value) => (value === "total_percent" ? "% por sessão" : "Tendência")}
                      />
                      <Line
                        type="monotone"
                        dataKey="total_percent"
                        name="total_percent"
                        stroke={LINE_TOTAL_PERCENT}
                        strokeWidth={2}
                        dot={{ r: 4, fill: LINE_TOTAL_PERCENT }}
                        activeDot={{ r: 6 }}
                      >
                        <LabelList content={TotalPercentPointLabel} />
                      </Line>
                      <Line
                        type="monotone"
                        dataKey="media_movel"
                        name="Tendência"
                        stroke={LINE_MEDIA_MOVEL}
                        strokeWidth={2}
                        connectNulls
                        dot={{ r: 4, fill: LINE_MEDIA_MOVEL }}
                        activeDot={{ r: 6 }}
                      >
                        <LabelList content={MediaMovelPointLabel} />
                      </Line>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <p className="mt-4 text-sm text-mbr-gray-50">Sem dados de desempenho de resposta.</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>
      </B8.Body>
    </B8.Box>
  );
}
