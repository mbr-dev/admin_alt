import * as S from "./styles";
import * as C from "./components";
import { useTranslation } from "react-i18next";
import { ATLSession } from "@/data/services";
import { AltSessionService } from "@/data/models";
import { useStorage } from "@/data/hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Infos = () => {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const { getData } = useStorage();
  const { getAltSessionsByNetwork } = ATLSession();
  const SessionsBox = (S as unknown as { SessionsBox: typeof S.Infos }).SessionsBox;
  const EmptyBox = (S as unknown as { EmptyBox: typeof S.Infos }).EmptyBox;
  const SessionCard = (S as unknown as { SessionCard: typeof S.Infos }).SessionCard;
  const SessionRow = (S as unknown as { SessionRow: typeof S.Infos }).SessionRow;
  const SessionItem = (S as unknown as { SessionItem: typeof S.Infos }).SessionItem;
  const ItemLabel = (S as unknown as { ItemLabel: typeof S.Infos }).ItemLabel;
  const ItemValue = (S as unknown as { ItemValue: typeof S.Infos }).ItemValue;

  const [sessions, setSessions] = useState<AltSessionService.IAltSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getDataRef = useRef(getData);
  const getAltSessionsByNetworkRef = useRef(getAltSessionsByNetwork);

  useEffect(() => {
    getDataRef.current = getData;
    getAltSessionsByNetworkRef.current = getAltSessionsByNetwork;
  }, [getData, getAltSessionsByNetwork]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setIsLoading(true);
        const unitNetworkRaw = getDataRef.current("id_unidade_rede") || getDataRef.current("id_rede");
        const unitNetworkId = Number(unitNetworkRaw);

        if (Number.isNaN(unitNetworkId) || unitNetworkId <= 0) {
          setSessions([]);
          return;
        }

        const response = await getAltSessionsByNetworkRef.current({
          id_unidade_rede: unitNetworkId,
          page: 1,
          limit: 10,
          periodo_data: "hoje",
        });

        setSessions(response?.data ?? []);
      } finally {
        setIsLoading(false);
      }
    };

    void loadSessions();
  }, []);

  const formatDate = (dateValue?: string) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("pt-BR");
  };

  const normalizeStatus = (status: string) => (status === "em_andamento" ? "em andamento" : status);

  return (
    <S.Container>
      <C.Animations />

      <S.Main>
        <S.Infos>
          <h2>{t("alt_session")}</h2>
          {isLoading ? (
            <S.SkeletonBox>
              {Array.from({ length: 3 }).map((_, index) => (
                <S.SkeletonCard key={`session-skeleton-${index}`}>
                  <S.SkeletonRow>
                    <S.SkeletonCell />
                    <S.SkeletonCell />
                    <S.SkeletonCell />
                    <S.SkeletonCell />
                    <S.SkeletonCell />
                    <S.SkeletonCell />
                  </S.SkeletonRow>
                </S.SkeletonCard>
              ))}
            </S.SkeletonBox>
          ) : (
            <SessionsBox>
              {sessions.length === 0 ? (
                <EmptyBox>Nenhuma sessão para hoje.</EmptyBox>
              ) : (
                sessions.map((session) => (
                  <SessionCard key={session.id} $status={normalizeStatus(session.status)}>
                    <SessionRow>
                      <SessionItem>
                        <ItemLabel>Profissional</ItemLabel>
                        <ItemValue>{session.nome_profissional || "-"}</ItemValue>
                      </SessionItem>

                      <SessionItem>
                        <ItemLabel>Aluno</ItemLabel>
                        <ItemValue>{session.nome_paciente || "-"}</ItemValue>
                      </SessionItem>

                      <SessionItem>
                        <ItemLabel>Tipo de Sessão</ItemLabel>
                        <ItemValue>{session.tipo_sessao || "-"}</ItemValue>
                      </SessionItem>

                      <SessionItem>
                        <ItemLabel>Data/Hora Início</ItemLabel>
                        <ItemValue>{formatDate(session.data_inicio)}</ItemValue>
                      </SessionItem>

                      <SessionItem>
                        <ItemLabel>Data/Hora Término</ItemLabel>
                        <ItemValue>{formatDate(session.data_final)}</ItemValue>
                      </SessionItem>

                      <SessionItem>
                        <ItemLabel>Status</ItemLabel>
                        <ItemValue>{normalizeStatus(session.status)}</ItemValue>
                      </SessionItem>
                    </SessionRow>
                  </SessionCard>
                ))
              )}
            </SessionsBox>
          )}
          <S.Actions>
            <S.ViewMoreButton type="button" onClick={() => navigate("/alt_session")}>
              Ver mais
            </S.ViewMoreButton>
          </S.Actions>
        </S.Infos>
      </S.Main>
    </S.Container>
  );
};