import * as S from "./styles";
import * as B8 from "../Box8TechnicalIaReport/styles";
import { ReportABASession } from "@/data/services";
import { ReportABASessionService } from "@/data/models";
import { translateProntuarioOpcaoByDescricaoPt } from "@/lib/i18n/tables/lookup";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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

const ABA_HELP_INTERPRETACAO_KEYS: Record<string, string> = {
  "muito dependente": "aba_help_highly_dependent",
  "highly dependent": "aba_help_highly_dependent",
  "muy dependiente": "aba_help_highly_dependent",
  "dependencia moderada": "aba_help_moderate_dependence",
  "moderate dependence": "aba_help_moderate_dependence",
  "moderadamente dependiente": "aba_help_moderate_dependence",
  "alta independencia": "aba_help_high_independence",
  "high independence": "aba_help_high_independence",
  "muy independiente": "aba_help_high_independence",
};

const ABA_INTENSITY_INTERPRETACAO_KEYS: Record<string, string> = {
  "sem dados para interpretacao": "aba_intensity_no_data",
  "no hay datos para su interpretacion": "aba_intensity_no_data",
  "no data for interpretation": "aba_intensity_no_data",
  "leve predominante": "aba_intensity_mild",
  "predominantemente leve": "aba_intensity_mild",
  "predominantly mild": "aba_intensity_mild",
  "moderado predominante": "aba_intensity_moderate",
  "predominantemente moderado": "aba_intensity_moderate",
  "predominantly moderate": "aba_intensity_moderate",
  "grave predominante": "aba_intensity_severe",
  "predominantemente grave": "aba_intensity_severe",
  "predominantly severe": "aba_intensity_severe",
};

const ABA_PERFORMANCE_CLASS_KEYS: Record<string, string> = {
  "deficit de aquisicao": "aba_performance_class_deficit",
  "acquisition deficit": "aba_performance_class_deficit",
  "deficit de adquisicion": "aba_performance_class_deficit",
  "aquisicao inicial": "aba_performance_class_initial",
  "initial acquisition": "aba_performance_class_initial",
  "adquisicion inicial": "aba_performance_class_initial",
  "aquisicao intermediaria": "aba_performance_class_intermediate",
  "intermediate acquisition": "aba_performance_class_intermediate",
  "adquisicion intermedia": "aba_performance_class_intermediate",
  "aquisicao avancada": "aba_performance_class_advanced",
  "advanced acquisition": "aba_performance_class_advanced",
  "adquisicion avanzada": "aba_performance_class_advanced",
  "dominio estabelecido": "aba_performance_class_mastery",
  "established mastery": "aba_performance_class_mastery",
  "dominio establecido": "aba_performance_class_mastery",
};

const ABA_PERFORMANCE_CLINICAL_KEYS: Record<string, string> = {
  "respostas inconsistentes ou ausencia de aprendizagem funcional": "aba_performance_clinical_inconsistent",
  "inconsistent responses or lack of functional learning": "aba_performance_clinical_inconsistent",
  "respuestas inconsistentes o ausencia de aprendizaje funcional": "aba_performance_clinical_inconsistent",
  "respostas emergentes, dependencia de suporte e baixa generalizacao": "aba_performance_clinical_emerging",
  "emerging responses, reliance on support, and low generalization": "aba_performance_clinical_emerging",
  "respuestas emergentes, dependencia del apoyo y baja generalizacion": "aba_performance_clinical_emerging",
  "respostas consistentes, porem ainda dependentes de condicoes especificas": "aba_performance_clinical_specific",
  "consistent responses, though still dependent on specific conditions": "aba_performance_clinical_specific",
  "respuestas consistentes, pero aun dependientes de condiciones especificas": "aba_performance_clinical_specific",
  "alto nivel de acerto, inicio de independencia e estabilidade": "aba_performance_clinical_high_accuracy",
  "high accuracy, emerging independence, and stability": "aba_performance_clinical_high_accuracy",
  "alto nivel de precision, inicio de independencia y estabilidad": "aba_performance_clinical_high_accuracy",
  "resposta independente, consistente e generalizavel": "aba_performance_clinical_independent",
  "independent, consistent, and generalizable response": "aba_performance_clinical_independent",
  "respuesta independiente, consistente y generalizable": "aba_performance_clinical_independent",
  "sem dados para interpretacao": "aba_performance_clinical_no_data",
  "no data for interpretation": "aba_performance_clinical_no_data",
  "sin datos para interpretacion": "aba_performance_clinical_no_data",
};

const ABA_PCT_INTERPRETACAO_KEYS: Record<string, string> = {
  "desempenho elevado com progressao consistente": "aba_pct_high_consistent",
  "high performance with consistent progression": "aba_pct_high_consistent",
  "alto rendimiento con progreso constante": "aba_pct_high_consistent",
  "desempenho elevado com instabilidade pontual": "aba_pct_high_occasional_instability",
  "high performance with occasional instability": "aba_pct_high_occasional_instability",
  "alto rendimiento con inestabilidad ocasional": "aba_pct_high_occasional_instability",
  "desempenho consolidado e estavel": "aba_pct_consolidated_stable",
  "consolidated and stable performance": "aba_pct_consolidated_stable",
  "rendimiento consolidado y estable": "aba_pct_consolidated_stable",
  "desempenho elevado com variabilidade": "aba_pct_high_variability",
  "high performance with variability": "aba_pct_high_variability",
  "alto rendimiento con variabilidad": "aba_pct_high_variability",
  "leve queda em desempenho previamente consolidado": "aba_pct_slight_drop",
  "slight drop in previously consolidated performance": "aba_pct_slight_drop",
  "ligera disminucion del rendimiento previamente consolidado": "aba_pct_slight_drop",
  "queda de desempenho com alta instabilidade": "aba_pct_drop_high_instability",
  "drop in performance with high instability": "aba_pct_drop_high_instability",
  "disminucion del rendimiento con alta inestabilidad": "aba_pct_drop_high_instability",
  "evolucao consistente em processo de aquisicao": "aba_pct_consistent_acquisition",
  "consistent progress during the acquisition process": "aba_pct_consistent_acquisition",
  "evolucion constante en el proceso de adquisicion": "aba_pct_consistent_acquisition",
  "evolucao com instabilidade no desempenho": "aba_pct_evolution_instability",
  "progress with performance instability": "aba_pct_evolution_instability",
  "evolucion con inestabilidad en el rendimiento": "aba_pct_evolution_instability",
  "desempenho moderado sem progressao significativa": "aba_pct_moderate_no_progress",
  "moderate performance without significant progression": "aba_pct_moderate_no_progress",
  "rendimiento moderado sin progreso significativo": "aba_pct_moderate_no_progress",
  "desempenho inconsistente com variacao frequente": "aba_pct_inconsistent_frequent",
  "inconsistent performance with frequent variation": "aba_pct_inconsistent_frequent",
  "rendimiento inconsistente con variacion frecuente": "aba_pct_inconsistent_frequent",
  "reducao gradual de desempenho": "aba_pct_gradual_decline",
  "gradual decline in performance": "aba_pct_gradual_decline",
  "reduccion gradual del rendimiento": "aba_pct_gradual_decline",
  "queda com alta variabilidade e instabilidade": "aba_pct_decline_high_variability",
  "decline with high variability and instability": "aba_pct_decline_high_variability",
  "disminucion con alta variabilidad e inestabilidad": "aba_pct_decline_high_variability",
  "inicio de aquisicao com progresso gradual": "aba_pct_onset_gradual",
  "onset of acquisition with gradual progress": "aba_pct_onset_gradual",
  "inicio de la adquisicion con progreso gradual": "aba_pct_onset_gradual",
  "tentativas de aquisicao com inconsistencia": "aba_pct_acquisition_inconsistency",
  "acquisition attempts with inconsistency": "aba_pct_acquisition_inconsistency",
  "intentos de adquisicion con inconsistencia": "aba_pct_acquisition_inconsistency",
  "baixo desempenho persistente": "aba_pct_persistently_low",
  "persistently low performance": "aba_pct_persistently_low",
  "rendimiento bajo persistente": "aba_pct_persistently_low",
  "baixo desempenho com variabilidade": "aba_pct_low_variability",
  "low performance with variability": "aba_pct_low_variability",
  "rendimiento bajo con variabilidad": "aba_pct_low_variability",
  "dificuldade crescente na execucao": "aba_pct_increasing_difficulty",
  "increasing difficulty in execution": "aba_pct_increasing_difficulty",
  "dificultad creciente en la ejecucion": "aba_pct_increasing_difficulty",
  "desempenho critico com alta instabilidade": "aba_pct_critical_instability",
  "critical performance with high instability": "aba_pct_critical_instability",
  "rendimiento critico con alta inestabilidad": "aba_pct_critical_instability",
};

const ABA_TREND_KEYS: Record<string, string> = {
  crescente: "aba_trend_increasing",
  increasing: "aba_trend_increasing",
  "en aumento": "aba_trend_increasing",
  estavel: "aba_trend_stable",
  stable: "aba_trend_stable",
  estable: "aba_trend_stable",
  decrescente: "aba_trend_decreasing",
  decreasing: "aba_trend_decreasing",
  "en disminucion": "aba_trend_decreasing",
};

const ABA_VARIABILITY_KEYS: Record<string, string> = {
  baixa: "aba_variability_low",
  baixo: "aba_variability_low",
  low: "aba_variability_low",
  bajo: "aba_variability_low",
  moderada: "aba_variability_moderate",
  moderado: "aba_variability_moderate",
  moderate: "aba_variability_moderate",
  alta: "aba_variability_high",
  alto: "aba_variability_high",
  high: "aba_variability_high",
};

function normalizeInterpretacao(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[."“”']/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function translateAbaInterpretacao(
  t: (key: string) => string,
  value: string | null | undefined,
  keys: Record<string, string>
): string {
  const raw = (value ?? "").trim();
  if (!raw) return "—";
  const normalized = normalizeInterpretacao(raw);
  const exactKey = keys[normalized];
  if (exactKey) return t(exactKey);

  const partial = Object.entries(keys).find(([phrase]) => phrase.length > 20 && normalized.includes(phrase));
  return partial ? t(partial[1]) : raw;
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
function formatSeconds(value: unknown, formatWithUnit: (base: string) => string): string {
  const base = formatMedia(value);
  if (base === "—") return "—";
  return formatWithUnit(base);
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
  const { t, i18n } = useTranslation("reportStudent");
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
    const rows = engagement.data.map((item, i) => {
      const fallback = item.rotulo?.trim() || "—";
      return {
        rotulo: translateProntuarioOpcaoByDescricaoPt(item.rotulo, i18n.language, fallback),
        total: typeof item.total === "number" && Number.isFinite(item.total) ? item.total : 0,
        fill: FREQUENCY_BAR_COLORS[i % FREQUENCY_BAR_COLORS.length],
      };
    });
    const maxSum = rows.reduce((acc, r) => acc + r.total, 0);
    return { rows, maxSum };
  }, [engagement, i18n.language]);

  const percentageLineRows = useMemo((): PercentageLineDatum[] => {
    if (!percentageCorrect?.data?.length) return [];
    return [...percentageCorrect.data]
      .sort((a, b) => a.id_sessao - b.id_sessao)
      .map((d) => ({
        id_sessao: d.id_sessao,
        sessaoLabel: t("session_id", { id: d.id_sessao }),
        sessaoCount: `${d.independent_agreements}/${d.frequency}`,
        total_percent: typeof d.total_percent === "number" && Number.isFinite(d.total_percent) ? d.total_percent : 0,
        media_movel: d.media_movel === null || d.media_movel === undefined || !Number.isFinite(d.media_movel) ? null : d.media_movel,
      }));
  }, [percentageCorrect, t]);

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

  const secondsLabel = (base: string) => t("seconds_value", { value: base });

  if (!idUsuario || idUsuario <= 0) {
    return (
      <B8.Box>
        <B8.Title>{t("aba_title")}</B8.Title>
        <B8.Body>
          <B8.Hint>{t("invalid_user")}</B8.Hint>
        </B8.Body>
      </B8.Box>
    );
  }

  if (loading) {
    return (
      <B8.Box>
        <B8.Title>{t("aba_title")}</B8.Title>
        <B8.Body>
          <B8.Loading>{t("loading_aba")}</B8.Loading>
        </B8.Body>
      </B8.Box>
    );
  }

  return (
    <B8.Box>
      <B8.Title>{t("aba_title")}</B8.Title>
      <B8.Body>
        <S.GridTwo>
          {/* Box 1 — Nível de Independência */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.independencia }}>{t("independence_level")}</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>{t("independence_subtitle")}</S.CardSubtitle>
              {averageHelp ? (
                <>
                  <div className="mt-3">
                    <S.MetricBlock>
                      <S.MetricCircle
                        style={{ backgroundColor: ACCENT.independencia, color: "#fff" }}
                      >
                        <span className="tabular-nums">{formatMedia(averageHelp.media as unknown)}</span>
                      </S.MetricCircle>
                      <S.MetricLabel>{translateAbaInterpretacao(t, averageHelp.interpretacao, ABA_HELP_INTERPRETACAO_KEYS)}</S.MetricLabel>
                    </S.MetricBlock>
                  </div>
                  <p className="mt-2 text-center text-xs text-mbr-gray-50">
                    {t("sessions_used", { count: averageHelp.sessoes_utilizadas })}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">{t("empty_independence")}</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>

          {/* Box 2 — Intensidade dos Comportamentos */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.intensidade }}>{t("behavior_intensity")}</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>{t("behavior_intensity_subtitle")}</S.CardSubtitle>
              {mediumIntensity ? (
                <>
                  <div className="mt-3">
                    <S.MetricBlock>
                      <S.MetricCircle
                        style={{ backgroundColor: ACCENT.intensidade, color: "#fff" }}
                      >
                        <span className="tabular-nums">{formatMedia(mediumIntensity.media as unknown)}</span>
                      </S.MetricCircle>
                      <S.MetricLabel>{translateAbaInterpretacao(t, mediumIntensity.interpretacao, ABA_INTENSITY_INTERPRETACAO_KEYS)}</S.MetricLabel>
                    </S.MetricBlock>
                  </div>
                  <p className="mt-2 text-center text-xs text-mbr-gray-50">
                    {t("total_sessions_considered", { count: mediumIntensity.total_sessoes })}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">{t("empty_intensity")}</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>
        </S.GridTwo>

        <S.GridTwo>
          {/* Box 3 — Progresso da Habilidade */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.progresso }}>{t("skill_progress")}</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>{t("skill_progress_subtitle")}</S.CardSubtitle>
              {performance ? (
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <S.MetricCircle style={{ backgroundColor: ACCENT.progresso, color: "#fff" }}>
                      <span className="tabular-nums">{formatMedia(performance.media as unknown)}</span>
                    </S.MetricCircle>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <S.FieldLabel>{t("technical_classification")}</S.FieldLabel>
                      <S.FieldValue>{translateAbaInterpretacao(t, performance.classificacao_tecnica, ABA_PERFORMANCE_CLASS_KEYS)}</S.FieldValue>
                    </div>
                    <div>
                      <S.FieldLabel>{t("clinical_interpretation")}</S.FieldLabel>
                      <S.FieldValue>{translateAbaInterpretacao(t, performance.interpretacao_clinica, ABA_PERFORMANCE_CLINICAL_KEYS)}</S.FieldValue>
                    </div>
                    <p className="text-xs text-mbr-gray-50">{t("sessions_count", { count: performance.total_sessao })}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">{t("empty_performance")}</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>

          {/* Box 4 — Latência de Resposta */}
          <B8.ThemeCard>
            <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.latencia }}>{t("response_latency")}</B8.ThemeCardHeader>
            <B8.ThemeCardBody>
              <S.CardSubtitle>{t("response_latency_subtitle")}</S.CardSubtitle>
              {latencyTime ? (
                <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <S.MetricCircle style={{ backgroundColor: ACCENT.latencia, color: "#fff" }}>
                      <span className="tabular-nums">{formatMedia(latencyTime.media as unknown)}</span>
                    </S.MetricCircle>
                    <p className="mt-2 text-center text-xs text-mbr-gray-50">{t("average_seconds")}</p>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <S.FieldLabel>{t("min_time")}</S.FieldLabel>
                      <S.FieldValue>{formatSeconds(latencyTime.menor_valor as unknown, secondsLabel)}</S.FieldValue>
                    </div>
                    <div>
                      <S.FieldLabel>{t("max_time")}</S.FieldLabel>
                      <S.FieldValue>{formatSeconds(latencyTime.maior_valor as unknown, secondsLabel)}</S.FieldValue>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-mbr-gray-50">{t("empty_latency")}</p>
              )}
            </B8.ThemeCardBody>
          </B8.ThemeCard>
        </S.GridTwo>

        {/* Box 5 — Frequência de Comportamentos Interferentes */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.frequencia }}>
            {t("interfering_frequency")}
          </B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>{t("interfering_frequency_subtitle")}</S.CardSubtitle>
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
                        <span className="min-w-0 text-xs leading-snug text-mbr-gray-50 sm:text-sm">
                          {translateProntuarioOpcaoByDescricaoPt(item.rotulo, i18n.language, item.rotulo)}
                        </span>
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
              <p className="mt-4 text-sm text-mbr-gray-50">{t("empty_interfering")}</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>

        {/* Box 6 — Nível de Engajamento */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.engajamento }}>{t("engagement_level")}</B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>{t("engagement_level_subtitle")}</S.CardSubtitle>
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
                      formatter={(value: number | string) => [formatMedia(value as unknown), t("total")]}
                      labelFormatter={(label) => String(label)}
                    />
                    <Bar dataKey="total" name={t("total")} maxBarSize={48} shape={RoundedTopBar}>
                      {engagementChart.rows.map((entry, index) => (
                        <Cell key={`eng-bar-${entry.rotulo}-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="mt-4 text-sm text-mbr-gray-50">{t("empty_engagement")}</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>

        {/* Box 7 — Desempenho de Resposta */}
        <B8.ThemeCard>
          <B8.ThemeCardHeader style={{ backgroundColor: ACCENT.desempenho }}>{t("response_performance")}</B8.ThemeCardHeader>
          <B8.ThemeCardBody>
            <S.CardSubtitle>{t("response_performance_subtitle")}</S.CardSubtitle>
            {percentageCorrect && percentageLineRows.length > 0 ? (
              <>
                <S.FieldValue>
                  {translateAbaInterpretacao(t, percentageCorrect.interpretacao_final, ABA_PCT_INTERPRETACAO_KEYS)}
                </S.FieldValue>
                <S.GridTwo>
                  <div>
                    <S.FieldLabel>{t("trend")}</S.FieldLabel>
                    <S.FieldValue>
                      {translateAbaInterpretacao(t, percentageCorrect.tendencia, ABA_TREND_KEYS)}
                    </S.FieldValue>
                  </div>
                  <div>
                    <S.FieldLabel>{t("variability_classification")}</S.FieldLabel>
                    <S.FieldValue>
                      {translateAbaInterpretacao(t, percentageCorrect.variabilidade_classificacao, ABA_VARIABILITY_KEYS)}
                    </S.FieldValue>
                  </div>
                </S.GridTwo>
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
                          name === "total_percent" ? t("percent_per_session") : t("trend"),
                        ]}
                        labelFormatter={(_, payload) => {
                          const p = payload?.[0]?.payload as PercentageLineDatum | undefined;
                          return p ? `${p.sessaoLabel} (${p.sessaoCount})` : "";
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                        formatter={(value) => (value === "total_percent" ? t("percent_per_session") : t("trend"))}
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
                        name={t("trend")}
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
              <p className="mt-4 text-sm text-mbr-gray-50">{t("empty_response_performance")}</p>
            )}
          </B8.ThemeCardBody>
        </B8.ThemeCard>
      </B8.Body>
    </B8.Box>
  );
}
