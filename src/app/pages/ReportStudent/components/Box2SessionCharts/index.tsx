import * as S from "./styles";
import { extractParenLabel } from "../Box4SupportLevel";
import { ReportUserSession } from "@/data/services";
import { ReportUserSessionService } from "@/data/models";
import { translateProntuarioOpcaoById } from "@/lib/i18n/tables/lookup";
import { useEffect, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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

/** Ordem fixa do radar — `idResposta` casa `data[].id_resposta` com `prontuario_opcoes.json`. */
const EVOLUTION_AXIS: {
  labelKey: "evolution_goal_met" | "evolution_partial" | "evolution_stagnation" | "evolution_regression";
  idResposta: number;
}[] = [
  { labelKey: "evolution_goal_met", idResposta: 48 },
  { labelKey: "evolution_partial", idResposta: 49 },
  { labelKey: "evolution_stagnation", idResposta: 50 },
  { labelKey: "evolution_regression", idResposta: 51 },
];

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

function reportToLineData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  resolveLabel: (key: (typeof EVOLUTION_AXIS)[number]["labelKey"]) => string,
  language: string
): LineDatum[] {
  const rows = res?.data ?? [];
  return EVOLUTION_AXIS.map(({ labelKey, idResposta }) => {
    const label = resolveLabel(labelKey);
    const found = rows.find((item) => item.id_resposta === idResposta);
    const fallback = found?.descricao?.trim() || label;
    return {
      label,
      descricao: translateProntuarioOpcaoById(found?.id_resposta ?? idResposta, language, fallback),
      frequencia: found?.frequencia ?? 0,
      quantidade: found?.quantidade ?? 0,
    };
  });
}

function reportToSupportLevelAreaData(
  res: ReportUserSessionService.IReportUserSessionReportResponse | null,
  language: string
): AreaDatum[] {
  if (!res?.data?.length) return [];
  return res.data.map((item) => {
    const fallback = item.descricao.trim();
    const full = translateProntuarioOpcaoById(item.id_resposta, language, fallback);
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

type AreaTooltipProps = {
  active?: boolean;
  payload?: { payload: AreaDatum }[];
};

function SupportLevelTooltip({ active, payload }: AreaTooltipProps) {
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

type Props = {
  idUsuario: number;
};

export function Box2SessionCharts({ idUsuario }: Props) {
  const { t, i18n } = useTranslation("reportStudent");
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

  const evolutionChartData = useMemo(
    () => reportToLineData(evolutionRes, (key) => t(key), i18n.language),
    [evolutionRes, t, i18n.language]
  );
  const supportChartData = useMemo(
    () => reportToSupportLevelAreaData(supportRes, i18n.language),
    [supportRes, i18n.language]
  );

  return (
    <S.Box2>
      <S.BoxTitle>{t("support_result_title")}</S.BoxTitle>
      {loading ? (
        <div className="px-4 py-10 text-center text-sm text-mbr-gray-50 sm:px-6">{t("loading_charts")}</div>
      ) : (
        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartCardTitle>{t("evolution_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("evolution_subtitle")}</S.ChartCardSubtitle>
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
                    name={t("frequency")}
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
            <S.ChartCardTitle>{t("support_level_title")}</S.ChartCardTitle>
            <S.ChartCardSubtitle>{t("support_level_subtitle")}</S.ChartCardSubtitle>
            {supportChartData.length === 0 ? (
              <S.EmptyHint>{t("empty_support_level")}</S.EmptyHint>
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
                      name={t("frequency")}
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
