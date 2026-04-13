import * as S from "./styles";
import { ATLSession, Professionals } from "@/data/services";
import { AltSessionService, ProfessionalsService } from "@/data/models";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DataTable, FloatingAddButton, Pagination } from "@/components/template";
import { Animations, FormAltSession, FormMedicalRecord } from "..";
import { FaCircleCheck, FaDownload, FaPencil, FaRegFileLines, FaSpinner, FaTriangleExclamation } from "react-icons/fa6";
import { jsPDF } from "jspdf";

function formatPdfSessionDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatPdfSessionDuration(startIso: string, endIso: string): string {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) return "00:00";
  const totalMinutes = Math.floor((end - start) / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function Container() {
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { toast } = useToast();
  const { getAltSessionsByNetwork, getAltSessionById, changeAltSessionStatusById, getMedicalRecordSessionBySessionId, getMedicalRecordQuestions } =
    ATLSession();
  const { getAllClinicProfession } = Professionals();

  const [sessions, setSessions] = useState<AltSessionService.IAltSession[]>([]);
  const [sessionToEdit, setSessionToEdit] = useState<AltSessionService.IAltSession | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(1);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showMedicalRecordForm, setShowMedicalRecordForm] = useState<boolean>(false);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const [downloadingSessionId, setDownloadingSessionId] = useState<number | null>(null);
  const [editingStatusSessionId, setEditingStatusSessionId] = useState<number | null>(null);
  const [changingStatusSessionId, setChangingStatusSessionId] = useState<number | null>(null);
  const [sessionToMedicalRecord, setSessionToMedicalRecord] = useState<AltSessionService.IAltSession | null>(null);
  const [professionalName, setProfessionalName] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [dateRange, setDateRange] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [appliedProfessionalName, setAppliedProfessionalName] = useState<string>("");
  const [appliedPatientName, setAppliedPatientName] = useState<string>("");
  const [appliedSessionType, setAppliedSessionType] = useState<string>("");
  const [appliedDateRange, setAppliedDateRange] = useState<string>("");
  const [appliedStatusFilter, setAppliedStatusFilter] = useState<string>("");
  const [clinicProfessions, setClinicProfessions] = useState<ProfessionalsService.IClinicProfession[]>([]);

  const getDataRef = useRef(getData);
  const setLoadRef = useRef(setLoad);
  const getAltSessionsByNetworkRef = useRef(getAltSessionsByNetwork);
  const getAltSessionByIdRef = useRef(getAltSessionById);
  const changeAltSessionStatusByIdRef = useRef(changeAltSessionStatusById);
  const getMedicalRecordSessionBySessionIdRef = useRef(getMedicalRecordSessionBySessionId);
  const getMedicalRecordQuestionsRef = useRef(getMedicalRecordQuestions);
  const getAllClinicProfessionRef = useRef(getAllClinicProfession);

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
    changeAltSessionStatusByIdRef.current = changeAltSessionStatusById;
    getMedicalRecordSessionBySessionIdRef.current = getMedicalRecordSessionBySessionId;
    getMedicalRecordQuestionsRef.current = getMedicalRecordQuestions;
    getAllClinicProfessionRef.current = getAllClinicProfession;
  }, [getData, setLoad, getAltSessionsByNetwork, getAltSessionById, changeAltSessionStatusById, getMedicalRecordSessionBySessionId, getMedicalRecordQuestions, getAllClinicProfession]);

  useEffect(() => {
    const loadClinicProfessions = async () => {
      const data = await getAllClinicProfessionRef.current();
      setClinicProfessions(data ?? []);
    };
    void loadClinicProfessions();
  }, []);

  const sessionTypeFilterOptions = useMemo(() => {
    const seen = new Set<string>();
    return clinicProfessions.filter((item) => {
      const value = (item.tipo_atendimento ?? item.descricao ?? "").trim();
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }, [clinicProfessions]);

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
        nome_profissional: appliedProfessionalName.trim() || undefined,
        nome_aluno: appliedPatientName.trim() || undefined,
        tipo_sessao: appliedSessionType || undefined,
        periodo_data: (appliedDateRange || undefined) as AltSessionService.IGetAltSessionsByNetworkParams["periodo_data"],
        status: (appliedStatusFilter || undefined) as AltSessionService.TAltSessionStatus | undefined,
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
  }, [currentPage, appliedProfessionalName, appliedPatientName, appliedSessionType, appliedDateRange, appliedStatusFilter]);

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

  const handleDownloadMedicalRecordPdf = async (session: AltSessionService.IAltSession) => {
    if (downloadingSessionId === session.id) return;

    try {
      setDownloadingSessionId(session.id);
      const [medicalRecordResponse, questionsResponse] = await Promise.all([
        getMedicalRecordSessionBySessionIdRef.current(session.id),
        getMedicalRecordQuestionsRef.current(session.id),
      ]);

      if (!medicalRecordResponse || !questionsResponse) {
        toast({ title: "Sessões ALT", description: "Não foi possível gerar o PDF do prontuário.", variant: "destructive" });
        return;
      }

      const questions = questionsResponse.data.flatMap((item) => item.pergunta ?? []);
      const responseById = new Map<number, AltSessionService.IMedicalRecordOption["descricao"]>();
      for (const question of questions) {
        for (const option of question.opcoes) {
          responseById.set(option.id_resposta, option.descricao);
        }
      }
    

      const getQuestionType = (question: AltSessionService.IMedicalRecordQuestion) => {
        const normalizedType = (question.tipo ?? "").toLowerCase();
        if (normalizedType.includes("input_number")) return "input_number";
        if (normalizedType.includes("check")) return "check";
        if (normalizedType.includes("select")) return "select";
        return "input";
      };

      const recordsByQuestion = medicalRecordResponse.reduce<Record<number, AltSessionService.ICreateMedicalRecordSessionItem[]>>((acc, record) => {
        if (!acc[record.id_pergunta]) acc[record.id_pergunta] = [];
        acc[record.id_pergunta].push(record);
        return acc;
      }, {});

      const loadFooterLogoWatermark = async () => {
      try {
        const response = await fetch("/mbr_logo.svg");
        if (!response.ok) return null;

        const svgContent = await response.text();
        const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;

        const imageElement = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = svgDataUrl;
        });

        const baseWidth = 140;
        const ratio = imageElement.width > 0 ? imageElement.height / imageElement.width : 0.3;
        const canvas = document.createElement("canvas");
        canvas.width = baseWidth;
        canvas.height = Math.max(1, Math.round(baseWidth * ratio));

        const context = canvas.getContext("2d");
        if (!context) return null;

        // Baixa opacidade para funcionar como marca d'agua discreta.
        context.globalAlpha = 0.12;
        context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        return {
          dataUrl: canvas.toDataURL("image/png"),
          width: canvas.width,
          height: canvas.height,
        };
      } catch {
        return null;
      }
      };

      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 5;
      const blockPadding = 3;
      let y = 16;

      const ensureSpace = (requiredHeight: number) => {
        if (y + requiredHeight <= pageHeight - 14) return;
        doc.addPage();
        y = 16;
      };

      const dataLineText = `Data Início: ${formatPdfSessionDateTime(session.data_inicio)} - Data Término: ${formatPdfSessionDateTime(session.data_final)} - Duração: ${formatPdfSessionDuration(session.data_inicio, session.data_final)}`;
      const headerDataLines = doc.splitTextToSize(dataLineText, maxWidth - 6) as string[];
      const headerBlockHeight = 14 + 5 + 5 + headerDataLines.length * lineHeight + 5 + 8;

      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(245, 247, 250);
      doc.roundedRect(margin, y, maxWidth, headerBlockHeight, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text("Prontuário da Sessão", pageWidth / 2, y + 8, { align: "center" });

      const leftX = margin + 3;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Paciente: ${session.nome_paciente}`, leftX, y + 16);
      doc.text(`Tipo Sessão: ${session.tipo_sessao}`, leftX, y + 21);
      doc.text(headerDataLines, leftX, y + 26);
      doc.text(`Profissional: ${session.nome_profissional}`, leftX, y + 26 + headerDataLines.length * lineHeight + 2);

      y += headerBlockHeight + 6;

      questions.forEach((question, index) => {
        const questionType = getQuestionType(question);
        const records = recordsByQuestion[question.id_pergunta] ?? [];
        let answerText = "-";

        if (questionType === "check") {
          const values = records
            .map((item) => item.id_resposta)
            .filter((value): value is number => typeof value === "number")
            .map((id) => responseById.get(id) ?? `Opção ${id}`);
          answerText = values.length > 0 ? values.join(", ") : "-";
        } else if (questionType === "select") {
          const selectedId = records[0]?.id_resposta;
          answerText = typeof selectedId === "number" ? responseById.get(selectedId) ?? `Opção ${selectedId}` : "-";
        } else {
          answerText = records[0]?.resposta_texto?.trim() || "-";
        }

        const questionLines = doc.splitTextToSize(`${index + 1}. ${question.descricao}`, maxWidth - blockPadding * 2) as string[];
        const answerLines = doc.splitTextToSize(`Resposta: ${answerText}`, maxWidth - blockPadding * 2) as string[];
        const blockHeight = (questionLines.length + answerLines.length) * lineHeight + blockPadding * 2 + 3;

        ensureSpace(blockHeight);

        doc.setDrawColor(230, 230, 230);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin, y, maxWidth, blockHeight, 1.5, 1.5, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10.5);
        doc.text(questionLines, margin + blockPadding, y + blockPadding + lineHeight - 1);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(answerLines, margin + blockPadding, y + blockPadding + questionLines.length * lineHeight + lineHeight);

        y += blockHeight + 4;
      });

      const footerLogo = await loadFooterLogoWatermark();
      const pageCount = doc.getNumberOfPages();
      for (let page = 1; page <= pageCount; page += 1) {
        doc.setPage(page);
        if (footerLogo) {
          const logoWidth = 34;
          const logoHeight = (footerLogo.height / footerLogo.width) * logoWidth;
          const logoX = (pageWidth - logoWidth) / 2;
          const logoY = pageHeight - logoHeight - 10;
          doc.addImage(footerLogo.dataUrl, "PNG", logoX, logoY, logoWidth, logoHeight);
        }
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`Página ${page} de ${pageCount}`, pageWidth - margin, pageHeight - 6, { align: "right" });
      }

      doc.save(`prontuario-sessao-${session.id}.pdf`);
    } finally {
      setDownloadingSessionId(null);
    }
  };

  const handleFormSuccess = async () => {
    await loadData();
    setSessionToEdit(null);
    setShowForm(false);
    setIsFormLoading(false);
  };

  const normalizeStatus = (status: string) => (status === "em_andamento" ? "em andamento" : status);
  const toApiStatus = (status: string): AltSessionService.TAltSessionStatus => (status === "em andamento" ? "em_andamento" : status) as AltSessionService.TAltSessionStatus;

  const getSessionAlertVariant = (session: AltSessionService.IAltSession): "danger" | "warning" | "attention" | null => {
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
  };

  const getSessionRowClassName = (session: AltSessionService.IAltSession) => {
    const variant = getSessionAlertVariant(session);
    if (variant === "danger") return "bg-red-100 hover:bg-red-100";
    if (variant === "warning") return "bg-yellow-100 hover:bg-yellow-100";
    if (variant === "attention") return "bg-orange-100 hover:bg-orange-100";
    return "";
  };

  const handleQuickStatusChange = async (session: AltSessionService.IAltSession, status: AltSessionService.TAltSessionStatus) => {
    if (changingStatusSessionId === session.id) return;
    if (session.status === status) {
      setEditingStatusSessionId(null);
      return;
    }

    try {
      setChangingStatusSessionId(session.id);
      const response = await changeAltSessionStatusByIdRef.current(session.id, { status });
      if (!response) return;

      toast({ title: "Sessões ALT", description: "Status atualizado com sucesso!", variant: "successful" });
      setEditingStatusSessionId(null);
      await loadData();
    } finally {
      setChangingStatusSessionId(null);
    }
  };

  const handleApplyFilters = () => {
    setAppliedProfessionalName(professionalName);
    setAppliedPatientName(patientName);
    setAppliedSessionType(sessionType);
    setAppliedDateRange(dateRange);
    setAppliedStatusFilter(statusFilter);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setProfessionalName("");
    setPatientName("");
    setSessionType("");
    setDateRange("");
    setStatusFilter("");
    setAppliedProfessionalName("");
    setAppliedPatientName("");
    setAppliedSessionType("");
    setAppliedDateRange("");
    setAppliedStatusFilter("");
    setCurrentPage(1);
  };

  const columns = [
    { key: "nome_profissional", label: "Profissional" },
    { key: "nome_paciente", label: "Aluno" },
    { key: "tipo_sessao", label: "Tipo de sessão" },
    {
      key: "data_inicio",
      label: "Data/Hora Início",
      render: (row: AltSessionService.IAltSession) => formatDate(row.data_inicio),
    },
    {
      key: "data_final",
      label: "Data/Hora Fim",
      render: (row: AltSessionService.IAltSession) => formatDate(row.data_final),
    },
    {
      key: "status",
      label: "Status",
      render: (row: AltSessionService.IAltSession) =>
        editingStatusSessionId === row.id ? (
          <S.QuickStatusSelect
            autoFocus
            value={toApiStatus(row.status)}
            disabled={changingStatusSessionId === row.id}
            onBlur={() => setEditingStatusSessionId(null)}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => void handleQuickStatusChange(row, e.target.value as AltSessionService.TAltSessionStatus)}
          >
            <option value="aberta">aberta</option>
            <option value="em_andamento">em andamento</option>
            <option value="finalizada">finalizada</option>
            <option value="cancelada">cancelada</option>
          </S.QuickStatusSelect>
        ) : (
          <S.StatusTagButton type="button" title="Clique para alterar status" onClick={() => setEditingStatusSessionId(row.id)}>
            <S.StatusTag $status={normalizeStatus(row.status)}>{normalizeStatus(row.status)}</S.StatusTag>
          </S.StatusTagButton>
        ),
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
          {normalizeStatus(row.status) === "finalizada" ? (
            <>
              <S.ActionIcon
                type="button"
                aria-label={`Abrir formulário da sessão ${row.id}`}
                onClick={() => handleOpenMedicalRecordForm(row)}
              >
                <FaRegFileLines />
              </S.ActionIcon>

              {row.preenchimento_formulario ? (
                <>
                  <S.ActionStatusIcon
                    $variant="check"
                    title="Prontuário preenchido."
                    aria-label={`Formulário preenchido da sessão ${row.id}`}
                  >
                    <FaCircleCheck />
                  </S.ActionStatusIcon>
                  <S.ActionIcon
                    type="button"
                    title={downloadingSessionId === row.id ? "Gerando PDF..." : "Baixar prontuário em PDF."}
                    aria-label={`Baixar prontuário da sessão ${row.id}`}
                    disabled={downloadingSessionId === row.id}
                    onClick={() => void handleDownloadMedicalRecordPdf(row)}
                  >
                    {downloadingSessionId === row.id ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                  </S.ActionIcon>
                </>
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
  ];

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
            <S.FilterBox>
              <S.FilterGrid>
                <S.FilterInput
                  value={professionalName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setProfessionalName(e.target.value)}
                  placeholder="Nome do Profissional"
                />
                <S.FilterInput
                  value={patientName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientName(e.target.value)}
                  placeholder="Nome do Aluno"
                />
                <S.FilterSelect value={sessionType} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSessionType(e.target.value)}>
                  <option value="">Tipo de Sessão</option>
                  {sessionType.trim() &&
                    !sessionTypeFilterOptions.some(
                      (item) => (item.tipo_atendimento ?? item.descricao ?? "").trim() === sessionType.trim()
                    ) && (
                      <option value={sessionType}>{sessionType}</option>
                    )}
                  {sessionTypeFilterOptions.map((item) => {
                    const label = (item.tipo_atendimento ?? item.descricao ?? "").trim();
                    return (
                      <option key={item.id} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </S.FilterSelect>
                <S.FilterSelect value={dateRange} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDateRange(e.target.value)}>
                  <option value="">Data</option>
                  <option value="hoje">Hoje</option>
                  <option value="ultimos_7_dias">Ultimos 7 dias</option>
                  <option value="ultimos_15_dias">Ultimos 15 dias</option>
                  <option value="ultimos_30_dias">Ultimos 30 dias</option>
                </S.FilterSelect>
                <S.FilterSelect value={statusFilter} onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}>
                  <option value="">Status</option>
                  <option value="aberta">aberta</option>
                  <option value="em_andamento">em andamento</option>
                  <option value="finalizada">finalizada</option>
                  <option value="cancelada">cancelada</option>
                </S.FilterSelect>
              </S.FilterGrid>

              <S.FilterActions>
                <S.FilterButton type="button" $variant="secondary" onClick={handleClearFilters}>
                  Limpar
                </S.FilterButton>
                <S.FilterButton type="button" $variant="primary" onClick={handleApplyFilters}>
                  Aplicar filtros
                </S.FilterButton>
              </S.FilterActions>
            </S.FilterBox>

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
                <DataTable
                  columns={columns}
                  rows={sessions}
                  getRowKey={(row) => row.id}
                  getRowClassName={(row) => getSessionRowClassName(row)}
                  emptyMessage="Nenhuma sessão encontrada."
                />

                <S.LegendBox>
                  <S.LegendTitle>Legenda de alertas</S.LegendTitle>
                  <S.LegendList>
                    <S.LegendItem>
                      <S.LegendColor $variant="red" />
                      Sessao de dia passado pendente (nao finalizada/cancelada)
                    </S.LegendItem>
                    <S.LegendItem>
                      <S.LegendColor $variant="yellow" />
                      Sessao aberta em andamento no horario atual
                    </S.LegendItem>
                    <S.LegendItem>
                      <S.LegendColor $variant="orange" />
                      Sessao em andamento com horario final excedido
                    </S.LegendItem>
                  </S.LegendList>
                </S.LegendBox>

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
