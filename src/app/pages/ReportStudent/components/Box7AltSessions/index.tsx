import * as S from "./styles";
import { ATLSession } from "@/data/services";
import { AltSessionService } from "@/data/models";
import { useStorage } from "@/data/hooks";
import { useEffect, useMemo, useState } from "react";

function normalizeStatus(status: string): string {
  return status === "em_andamento" ? "em andamento" : status;
}

function formatSessionDate(dateValue?: string): string {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("pt-BR");
}

type Props = {
  idUnidade: number;
  nomeAluno: string;
};

const PAGE_LIMIT = 50;

export function Box7AltSessions({ idUnidade, nomeAluno }: Props) {
  const { getData } = useStorage();
  const { getAltSessionsByNetwork } = ATLSession();

  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<AltSessionService.IAltSession[]>([]);

  const canFetch = useMemo(() => {
    return idUnidade > 0 && nomeAluno.trim().length > 0;
  }, [idUnidade, nomeAluno]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!canFetch) {
        setSessions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setSessions([]);

      const unitNetworkRaw = getData("id_unidade_rede") || getData("id_rede");
      const idUnidadeRede = Number(unitNetworkRaw);

      if (Number.isNaN(idUnidadeRede) || idUnidadeRede <= 0) {
        if (!cancelled) {
          setSessions([]);
          setLoading(false);
        }
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
      setSessions(response?.data ?? []);
      setLoading(false);
    }

    void load();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- getAltSessionsByNetwork instável (useApi)
  }, [canFetch, idUnidade, nomeAluno]);

  const bodyContent = !canFetch ? (
    <S.EmptyHint>Informações de unidade ou nome do aluno insuficientes para buscar sessões ALT.</S.EmptyHint>
  ) : loading ? (
    <S.LoadingHint>Carregando sessões…</S.LoadingHint>
  ) : sessions.length === 0 ? (
    <S.EmptyHint>Nenhuma sessão ALT encontrada para este aluno nesta unidade.</S.EmptyHint>
  ) : (
    <>
      <S.SessionsList>
        {sessions.map((session) => {
          const statusNorm = normalizeStatus(session.status);
          return (
            <S.SessionCard key={session.id} $statusNorm={statusNorm}>
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
      {sessions.length >= PAGE_LIMIT ? (
        <S.MetaHint>Exibindo até {PAGE_LIMIT} registros. Use a página de sessões ALT para ver mais.</S.MetaHint>
      ) : null}
    </>
  );

  return (
    <S.Box7>
      <S.BoxTitle>Sessões ALT</S.BoxTitle>
      <S.Body>{bodyContent}</S.Body>
    </S.Box7>
  );
}
