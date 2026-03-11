import * as S from "./styles";
import { ATLSession } from "@/data/services";
import { AltSessionService } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DataTable, FloatingAddButton, Pagination } from "@/components/template";
import { Animations, FormAltSession, FormMedicalRecord } from "..";
import { FaCircleCheck, FaPencil, FaRegFileLines, FaTriangleExclamation } from "react-icons/fa6";

export function Container() {
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { getAltSessionsByNetwork, getAltSessionById } = ATLSession();

  const [sessions, setSessions] = useState<AltSessionService.IAltSession[]>([]);
  const [sessionToEdit, setSessionToEdit] = useState<AltSessionService.IAltSession | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(1);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMedicalRecordForm, setShowMedicalRecordForm] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [sessionToMedicalRecord, setSessionToMedicalRecord] = useState<AltSessionService.IAltSession | null>(null);

  const getDataRef = useRef(getData);
  const setLoadRef = useRef(setLoad);
  const getAltSessionsByNetworkRef = useRef(getAltSessionsByNetwork);
  const getAltSessionByIdRef = useRef(getAltSessionById);

  const formatDate = (dateValue?: string) => {
    if (!dateValue) return "-";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("pt-BR");
  };

  useEffect(() => {
    getDataRef.current = getData;
    setLoadRef.current = setLoad;
    getAltSessionsByNetworkRef.current = getAltSessionsByNetwork;
    getAltSessionByIdRef.current = getAltSessionById;
  }, [getData, setLoad, getAltSessionsByNetwork, getAltSessionById]);

  const loadData = useCallback(async () => {
    try {
      setLoadRef.current(true);
      setIsTableLoading(true);

      const unitNetworkRaw = getDataRef.current("id_unidade_rede") || getDataRef.current("id_rede");
      const unitNetworkId = Number(unitNetworkRaw);

      if (Number.isNaN(unitNetworkId) || unitNetworkId <= 0) {
        setSessions([]);
        setTotalOfPages(1);
        return;
      }

      const response = await getAltSessionsByNetworkRef.current({
        id_unidade_rede: unitNetworkId,
        page: currentPage,
        limit: 10,
      });

      if (!response) {
        setSessions([]);
        setTotalOfPages(1);
        return;
      }

      setSessions(response.data ?? []);
      setTotalOfPages(response.totalPages > 0 ? response.totalPages : 1);
    } finally {
      setIsTableLoading(false);
      setLoadRef.current(false);
    }
  }, [currentPage]);

  const handleOpenForm = async (session: AltSessionService.IAltSession | null = null) => {
    if (!session) {
      setSessionToEdit(null);
      setShowForm(true);
      setIsFormLoading(false);
      return;
    }

    setSessionToEdit(null);
    setShowForm(true);
    setIsFormLoading(true);

    try {
      const response = await getAltSessionByIdRef.current(session.id);
      if (response) {
        setSessionToEdit(response);
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCloseForm = () => {
    setSessionToEdit(null);
    setShowForm(false);
    setIsFormLoading(false);
  };

  const handleOpenMedicalRecordForm = (session: AltSessionService.IAltSession) => {
    setSessionToMedicalRecord(session);
    setShowMedicalRecordForm(true);
  };

  const handleCloseMedicalRecordForm = () => {
    setSessionToMedicalRecord(null);
    setShowMedicalRecordForm(false);
  };

  const handleFormSuccess = async () => {
    await loadData();
    setSessionToEdit(null);
    setShowForm(false);
    setIsFormLoading(false);
  };

  const columns = useMemo(
    () => [
      { key: "nome_profissional", label: "Profissional" },
      { key: "nome_paciente", label: "Paciente" },
      { key: "tipo_sessao", label: "Tipo de sessão" },
      {
        key: "data_inicio",
        label: "Início",
        render: (row: AltSessionService.IAltSession) => formatDate(row.data_inicio),
      },
      {
        key: "data_final",
        label: "Fim",
        render: (row: AltSessionService.IAltSession) => formatDate(row.data_final),
      },
      {
        key: "status",
        label: "Status",
        render: (row: AltSessionService.IAltSession) => <S.StatusTag $status={row.status}>{row.status}</S.StatusTag>,
      },
      {
        key: "editar",
        label: "Editar",
        render: (row: AltSessionService.IAltSession) => (
          <S.ActionCell>
            <S.ActionIcon type="button" aria-label={`Editar sessão ${row.id}`} onClick={() => void handleOpenForm(row)}>
              <FaPencil />
            </S.ActionIcon>
          </S.ActionCell>
        ),
      },
      {
        key: "formulario",
        label: "Formulário",
        render: (row: AltSessionService.IAltSession) => (
          <S.ActionCell>
            {row.status === "finalizada" ? (
              <>
                <S.ActionIcon
                  type="button"
                  aria-label={`Abrir formulário da sessão ${row.id}`}
                  onClick={() => handleOpenMedicalRecordForm(row)}
                >
                  <FaRegFileLines />
                </S.ActionIcon>

                {row.preenchimento_formulario ? (
                  <S.ActionStatusIcon
                    $variant="check"
                    title="Prontuário preenchido."
                    aria-label={`Formulário preenchido da sessão ${row.id}`}
                  >
                    <FaCircleCheck />
                  </S.ActionStatusIcon>
                ) : (
                  <S.ActionStatusIcon
                    $variant="warning"
                    title="Prontuário não preenchido."
                    aria-label={`Atenção: formulário pendente da sessão ${row.id}`}
                  >
                    <FaTriangleExclamation />
                  </S.ActionStatusIcon>
                )}
              </>
            ) : (
              "-"
            )}
          </S.ActionCell>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return (
    <S.Container>
      <Animations />

      <S.Main>
        {showForm ? (
          <FormAltSession sessionToEdit={sessionToEdit} isLoading={isFormLoading} onClose={handleCloseForm} onSuccess={handleFormSuccess} />
        ) : showMedicalRecordForm && sessionToMedicalRecord ? (
          <FormMedicalRecord session={sessionToMedicalRecord} onClose={handleCloseMedicalRecordForm} onSuccess={handleFormSuccess} />
        ) : (
          <S.TableArea>
            {isTableLoading ? (
              <S.TableSkeleton>
                <S.SkeletonHeader />
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
                <S.SkeletonRow>
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                  <S.SkeletonCell />
                </S.SkeletonRow>
              </S.TableSkeleton>
            ) : (
              <>
                <DataTable columns={columns} rows={sessions} getRowKey={(row) => row.id} emptyMessage="Nenhuma sessão encontrada." />

                {totalOfPages > 1 && (
                  <Pagination
                    numberOfPageButton={totalOfPages}
                    currentPage={currentPage}
                    onChangePage={setCurrentPage}
                  />
                )}
              </>
            )}
          </S.TableArea>
        )}
      </S.Main>

      {!showForm && !showMedicalRecordForm && <FloatingAddButton onClick={() => void handleOpenForm()} ariaLabel="Cadastrar sessão ALT" />}
    </S.Container>
  );
}
