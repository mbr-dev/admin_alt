import * as S from "./styles";
import { extractParenLabel } from "../Box4SupportLevel";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { useEffect, useId, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Ordem fixa do eixo X — valores da API são casados pelo trecho em `patterns` (sem acentos). */
const EVOLUTION_AXIS: { label: string; patterns: string[] }[] = [
  { label: "Meta Atingida", patterns: ["meta atingida"] },
  { label: "Evolução Parcial", patterns: ["evolucao parcial"] },
  { label: "Estagnação", patterns: ["estagnacao"] },
  { label: "Regressão", patterns: ["regressao"] },
];

function normalizeForMatch(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

type LineDatum = {
  label: string;
  descricao: string;
  frequencia: number;
  quantidade: number;
};

type AreaDatum = {
  label: string;
  descricaoFull: string;
  frequencia: number;
  quantidade: number;
};

function reportToLineData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): LineDatum[] {
  const rows = res?.data ?? [];
  return EVOLUTION_AXIS.map(({ label, patterns }) => {
    const found = rows.find((item) => {
      const n = normalizeForMatch(item.descricao ?? "");
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

function reportToSupportLevelAreaData(res: ReportUserSessionService.IReportUserSessionReportResponse | null): AreaDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => {
    const full = item.descricao.trim();
    return {
      label: extractParenLabel(full),
      descricaoFull: full,
      frequencia: item.frequencia,
      quantidade: item.quantidade,
    };
  });
}

type TooltipEvolutionProps = {
  active?: boolean;
  payload?: { payload: LineDatum }[];
};

function EvolutionTooltip({ active, payload }: TooltipEvolutionProps) {
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

type AreaTooltipProps = {
  active?: boolean;
  payload?: { payload: AreaDatum }[];
};

function SupportLevelTooltip({ active, payload }: AreaTooltipProps) {
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

type Props = {
  idUsuario: number;
};

const EVOLUTION_SUBTITLE =
  "Apresenta o progresso do paciente ao longo das sessões. Permite identificar tendências de melhora ou necessidade de ajuste na intervenção.";

const SUPPORT_SUBTITLE =
  "Apresenta o nível de ajuda necessário para o paciente realizar as atividades, variando de suporte total até independência.";

export function Box2SessionCharts({ idUsuario }: Props) {
  const fillGradientId = `b2sl-${useId().replace(/[^a-zA-Z0-9_-]/g, "") || "0"}`;
  const { getEvolution, getSupportLevel } = ReportUserSession();

  const [loading, setLoading] = useState(true);
  const [evolutionRes, setEvolutionRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);
  const [supportRes, setSupportRes] = useState<ReportUserSessionService.IReportUserSessionReportResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setEvolutionRes(null);
      setSupportRes(null);

      const params = { id_usuario: idUsuario };

      const [evo, support] = await Promise.all([getEvolution(params), getSupportLevel(params)]);

      if (cancelled) return;
      setEvolutionRes(evo);
      setSupportRes(support);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callbacks do serviço mudam a cada render (useApi)
  }, [idUsuario]);

  const evolutionChartData = useMemo(() => reportToLineData(evolutionRes), [evolutionRes]);
  const supportChartData = useMemo(() => reportToSupportLevelAreaData(supportRes), [supportRes]);

  return (
    <S.Box2>
      <S.BoxTitle>Suporte × Resultado</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">Carregando gráficos…</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>Evolução</S.ChartCardTitle>
            <S.ChartCardSubtitle>{EVOLUTION_SUBTITLE}</S.ChartCardSubtitle>
            <S.ChartWrap>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="78%" data={evolutionChartData}>
                  <PolarGrid stroke="#d1d5db" />
                  <PolarAngleAxis dataKey="label" tick={{ fill: "#5C5C5C", fontSize: 10 }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "#929292", fontSize: 10 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Radar
                    name="Frequência"
                    dataKey="frequencia"
                    stroke="#0065A4"
                    fill="#0065A4"
                    fillOpacity={0.35}
                    strokeWidth={2}
                  />
                  <Tooltip content={<EvolutionTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </S.ChartWrap>
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartCardTitle>Nível de suporte</S.ChartCardTitle>
            <S.ChartCardSubtitle>{SUPPORT_SUBTITLE}</S.ChartCardSubtitle>
            {supportChartData.length === 0 ? (
              <S.EmptyHint>Sem dados de nível de suporte para este aluno.</S.EmptyHint>
            ) : (
              <S.ChartWrap>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={supportChartData} margin={{ top: 12, right: 12, left: 0, bottom: 8 }}>
                    <defs>
                      <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0065A4" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#0065A4" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#5C5C5C" }} interval={0} />
                    <YAxis
                      domain={[0, 100]}
                      width={40}
                      tick={{ fontSize: 10, fill: "#5C5C5C" }}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip content={<SupportLevelTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="frequencia"
                      name="Frequência"
                      stroke="#0065A4"
                      strokeWidth={2}
                      fill={`url(#${fillGradientId})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </S.ChartWrap>
            )}
          </S.ChartCard>
        </S.ChartsGrid>
      )}
    </S.Box2>
  );
}
