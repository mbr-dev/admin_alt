import * as S from "./styles";
import { ATLSession, ReportUserSession } from "@/data/services";
import { AltSessionService, ReportUserSessionService } from "@/data/models";
import { useStorage } from "@/data/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, type PieLabelRenderProps } from "recharts";

const PIE_COLORS = ["#0065A4", "#FA912C", "#F07DB0", "#3F37A6", "#46C080", "#E14FBE", "#48D8BB"];
const RADIAN = Math.PI / 180;

function normalizeStatus(status: string): string {
  return status === "em_andamento" ? "em andamento" : status;
}

function getSessionAlertVariant(session: AltSessionService.IAltSession): "danger" | "warning" | "attention" | null {
  const now = new Date();
  const startDate = new Date(session.data_inicio);
  const endDate = new Date(session.data_final);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;

  const status = normalizeStatus(session.status);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sessionStartDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const isPastDay = sessionStartDay.getTime() < today.getTime();
  const isToday = sessionStartDay.getTime() === today.getTime();

  if (isPastDay && status !== "finalizada" && status !== "cancelada") {
    return "danger";
  }

  if (status === "em andamento" && isToday && endDate < now) {
    return "attention";
  }

  if (status === "aberta" && isToday && startDate <= now && endDate >= now) {
    return "warning";
  }

  return null;
}

function formatSessionDate(dateValue?: string): string {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("pt-BR");
}

type PieRow = {
  name: string;
  tipoFull: string;
  value: number;
  quantidade: number;
};

function distributionToPieData(res: ReportUserSessionService.ISessionTypesDistributionResponse | null): PieRow[] {
  if (!res?.data?.length) return [];
  return res.data.map((row) => {
    const full = row.tipo_sessao?.trim() || "—";
    const short = full.length > 36 ? `${full.slice(0, 36)}…` : full;
    return {
      name: short,
      tipoFull: full,
      value: Math.max(0, row.frequencia),
      quantidade: row.quantidade,
    };
  });
}

/** Rótulo no estilo [Pie Chart With Customized Label](https://recharts.github.io/en-US/examples/PieChartWithCustomizedLabel/). */
function SessionTypePieLabel(props: PieLabelRenderProps) {
  const { cx = 0, cy = 0, midAngle = 0, innerRadius = 0, outerRadius = 0, percent } = props;
  if (percent == null || percent < 0.03) return null;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.52;
  const x = Number(cx) + radius * Math.cos(-RADIAN * Number(midAngle));
  const y = Number(cy) + radius * Math.sin(-RADIAN * Number(midAngle));
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="pointer-events-none text-[11px] font-bold drop-shadow-sm sm:text-xs"
    >
      {`${Math.round(percent * 100)}%`}
    </text>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: { payload: PieRow }[];
};

function DistributionTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="max-w-xs rounded-lg border border-mbr-gray-40 bg-white px-3 py-2 text-left text-xs shadow-md sm:text-sm">
      <p className="font-medium text-mbr-gray-30">{row.tipoFull}</p>
      <p className="mt-1 text-mbr-gray-50">Frequência: {row.value}%</p>
      <p className="text-mbr-gray-50">Quantidade: {row.quantidade}</p>
    </div>
  );
}

type Props = {
  idUsuario: number;
  idUnidade: number;
  nomeAluno: string;
};

const PAGE_LIMIT = 50;

export function Box7AltSessions({ idUsuario, idUnidade, nomeAluno }: Props) {
  const { getData } = useStorage();
  const { getAltSessionsByNetwork } = ATLSession();
  const { getSessionTypesDistribution } = ReportUserSession();

  const [distribution, setDistribution] = useState<ReportUserSessionService.ISessionTypesDistributionResponse | null>(
    null
  );
  const [distributionLoading, setDistributionLoading] = useState(true);

  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [sessions, setSessions] = useState<AltSessionService.IAltSession[]>([]);
  const sessionsFetchedRef = useRef(false);

  const canFetchSessions = useMemo(() => {
    return idUnidade > 0 && nomeAluno.trim().length > 0;
  }, [idUnidade, nomeAluno]);

  const toggleSessionsList = () => {
    setSessionsOpen((open) => {
      const next = !open;
      if (next && !sessionsFetchedRef.current && canFetchSessions) {
        setSessionsLoading(true);
      }
      return next;
    });
  };

  const pieData = useMemo(() => distributionToPieData(distribution), [distribution]);

  useEffect(() => {
    let cancelled = false;

    async function loadDistribution() {
      if (!idUsuario || idUsuario <= 0) {
        setDistribution(null);
        setDistributionLoading(false);
        return;
      }

      setDistributionLoading(true);
      setDistribution(null);

      const data = await getSessionTypesDistribution({ id_usuario: idUsuario });

      if (cancelled) return;
      setDistribution(data);
      setDistributionLoading(false);
    }

    void loadDistribution();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getSessionTypesDistribution instável (useApi)
  }, [idUsuario]);

  useEffect(() => {
    if (!sessionsOpen || sessionsFetchedRef.current) return;

    let cancelled = false;

    async function loadSessions() {
      if (!canFetchSessions) {
        setSessions([]);
        sessionsFetchedRef.current = true;
        setSessionsLoading(false);
        return;
      }

      const unitNetworkRaw = getData("id_unidade_rede") || getData("id_rede");
      const idUnidadeRede = Number(unitNetworkRaw);

      if (Number.isNaN(idUnidadeRede) || idUnidadeRede <= 0) {
        setSessions([]);
        sessionsFetchedRef.current = true;
        setSessionsLoading(false);
        return;
      }

      const response = await getAltSessionsByNetwork({
        id_unidade_rede: idUnidadeRede,
        id_unidade: idUnidade,
        nome_aluno: nomeAluno.trim(),
        page: 1,
        limit: PAGE_LIMIT,
      });

      if (cancelled) return;
      sessionsFetchedRef.current = true;
      setSessions(response?.data ?? []);
      setSessionsLoading(false);
    }

    void loadSessions();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getAltSessionsByNetwork instável (useApi)
  }, [sessionsOpen, canFetchSessions, idUnidade, nomeAluno]);

  const distributionBlock = !idUsuario || idUsuario <= 0 ? (
    <S.EmptyHint>Identificador do usuário inválido para o gráfico de tipos de sessão.</S.EmptyHint>
  ) : distributionLoading ? (
    <S.LoadingHint>Carregando distribuição…</S.LoadingHint>
  ) : !distribution || pieData.length === 0 ? (
    <S.EmptyHint>Nenhum dado de distribuição por tipo de sessão.</S.EmptyHint>
  ) : (
    <S.ChartBlock>
      {distribution.total_sessoes != null ? (
        <S.ChartMeta>Total de sessões consideradas: {distribution.total_sessoes}</S.ChartMeta>
      ) : null}
      <S.ChartWrap>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={SessionTypePieLabel}
              outerRadius="78%"
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              paddingAngle={pieData.length > 1 ? 2 : 0}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<DistributionTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px", lineHeight: "1.35", paddingTop: 8 }}
              formatter={(value: string) => (value.length > 40 ? `${value.slice(0, 40)}…` : value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </S.ChartWrap>
    </S.ChartBlock>
  );

  const sessionsBody = !sessionsOpen ? null : !canFetchSessions ? (
    <S.EmptyHint>Informações de unidade ou nome do aluno insuficientes para buscar sessões ALT.</S.EmptyHint>
  ) : sessionsLoading ? (
    <S.LoadingHint>Carregando sessões…</S.LoadingHint>
  ) : sessions.length === 0 ? (
    <S.EmptyHint>Nenhuma sessão ALT encontrada para este aluno nesta unidade.</S.EmptyHint>
  ) : (
    <>
      <S.SessionsList>
        {sessions.map((session) => {
          const statusNorm = normalizeStatus(session.status);
          const alertVariant = getSessionAlertVariant(session);
          return (
            <S.SessionCard key={session.id} $statusNorm={statusNorm} $alertVariant={alertVariant}>
              <S.SessionHeader>
                <S.SessionType>{session.tipo_sessao || "Sessão ALT"}</S.SessionType>
                <S.StatusBadge $statusNorm={statusNorm}>{statusNorm}</S.StatusBadge>
              </S.SessionHeader>
              <S.SessionGrid>
                <S.Field>
                  <S.FieldLabel>Profissional</S.FieldLabel>
                  <S.FieldValue>{session.nome_profissional || "—"}</S.FieldValue>
                </S.Field>
                <S.Field>
                  <S.FieldLabel>Aluno</S.FieldLabel>
                  <S.FieldValue>{session.nome_paciente || "—"}</S.FieldValue>
                </S.Field>
                <S.Field>
                  <S.FieldLabel>Início</S.FieldLabel>
                  <S.FieldValue>{formatSessionDate(session.data_inicio)}</S.FieldValue>
                </S.Field>
                <S.Field>
                  <S.FieldLabel>Término</S.FieldLabel>
                  <S.FieldValue>{formatSessionDate(session.data_final)}</S.FieldValue>
                </S.Field>
                <S.Field>
                  <S.FieldLabel>Formulário</S.FieldLabel>
                  <S.FieldValue>{session.preenchimento_formulario ? "Preenchido" : "Pendente"}</S.FieldValue>
                </S.Field>
              </S.SessionGrid>
            </S.SessionCard>
          );
        })}
      </S.SessionsList>
      <S.AlertLegend>
        <S.AlertLegendItem>
          <S.AlertLegendColor $variant="red" />
          Sessão de dia passado pendente (não finalizada/cancelada)
        </S.AlertLegendItem>
        <S.AlertLegendItem>
          <S.AlertLegendColor $variant="yellow" />
          Sessão aberta em andamento no horário atual
        </S.AlertLegendItem>
        <S.AlertLegendItem>
          <S.AlertLegendColor $variant="orange" />
          Sessão em andamento com horário final excedido
        </S.AlertLegendItem>
      </S.AlertLegend>
      {sessions.length >= PAGE_LIMIT ? (
        <S.MetaHint>Exibindo até {PAGE_LIMIT} registros. Use a página de sessões ALT para ver mais.</S.MetaHint>
      ) : null}
    </>
  );

  return (
    <S.Box7>
      <S.BoxTitle>Sessões</S.BoxTitle>
      <S.Body>
        {distributionBlock}

        <S.CurtainBar>
          <S.ExpandToggle type="button" onClick={toggleSessionsList} aria-expanded={sessionsOpen}>
            {sessionsOpen ? (
              <>
                <FaChevronUp aria-hidden className="shrink-0" />
                Ocultar lista de sessões
              </>
            ) : (
              <>
                <FaChevronDown aria-hidden className="shrink-0" />
                Ver lista de sessões
              </>
            )}
          </S.ExpandToggle>
          <S.CurtainHint>
            A lista detalhada só é carregada ao expandir.
          </S.CurtainHint>
        </S.CurtainBar>

        {sessionsBody}
      </S.Body>
    </S.Box7>
  );
}
