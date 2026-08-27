import { ATLSession } from "@/data/services";
import { Professionals, Student } from "@/data/services";
import { AltSessionService } from "@/data/models";
import { ProfessionalsService, StudentService } from "@/data/models";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function professionalMatchesSessionType(
  professional: ProfessionalsService.IProfessionalByNetwork,
  sessionType: string
): boolean {
  const st = sessionType.trim();
  if (!st) return true;
  const profissoes = professional.profissoes ?? [];
  if (profissoes.length === 0) return false;
  return profissoes.some((p) => {
    const t = (p.tipo_atendimento ?? "").trim();
    if (!t) return false;
    if (t === st) return true;
    return t.split(",").map((s) => s.trim()).some((part) => part === st);
  });
}

interface IUseFormAltSession {
  onClose: () => void;
  onSuccess: () => Promise<void>;
  sessionToEdit?: AltSessionService.IAltSession | null;
}

export function useFormAltSession({ onClose, onSuccess, sessionToEdit = null }: IUseFormAltSession) {
  const { t } = useTranslation("altSession");
  const { setLoad } = useMain();
  const { toast } = useToast();
  const { getData } = useStorage();
  const { createAltSession, updateAltSessionById, changeAltSessionStatusById } = ATLSession();
  const { getClinicProfessionalsByNetwork, getAllClinicProfession } = Professionals();
  const { getAllStudentsNetwork } = Student();

  const [idProfessional, setIdProfessional] = useState<string>("");
  const [idPatient, setIdPatient] = useState<string>("");
  const [professionalName, setProfessionalName] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("");
  const [status, setStatus] = useState<string>("aberta");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [professionals, setProfessionals] = useState<ProfessionalsService.IProfessionalByNetwork[]>([]);
  const [students, setStudents] = useState<StudentService.IStudent[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const [clinicProfessions, setClinicProfessions] = useState<ProfessionalsService.IClinicProfession[]>([]);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [strictFilterProfessionals, setStrictFilterProfessionals] = useState<boolean>(false);
  const [showProfessionMismatchDialog, setShowProfessionMismatchDialog] = useState<boolean>(false);
  const mismatchDialogClosingForSubmitRef = useRef(false);
  const isEditMode = !!sessionToEdit;

  const getDataRef = useRef(getData);
  const getClinicProfessionalsByNetworkRef = useRef(getClinicProfessionalsByNetwork);
  const getAllClinicProfessionRef = useRef(getAllClinicProfession);
  const getAllStudentsNetworkRef = useRef(getAllStudentsNetwork);

  useEffect(() => {
    getDataRef.current = getData;
    getClinicProfessionalsByNetworkRef.current = getClinicProfessionalsByNetwork;
    getAllClinicProfessionRef.current = getAllClinicProfession;
    getAllStudentsNetworkRef.current = getAllStudentsNetwork;
  }, [getData, getClinicProfessionalsByNetwork, getAllClinicProfession, getAllStudentsNetwork]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const networkId = Number(getDataRef.current("id_rede"));

        if (Number.isNaN(networkId) || networkId <= 0) {
          setProfessionals([]);
          setStudents([]);
          return;
        }

        const loadedProfessionals: ProfessionalsService.IProfessionalByNetwork[] = [];
        const loadedStudents: StudentService.IStudent[] = [];

        const clinicProfessionsResponse = await getAllClinicProfessionRef.current();
        setClinicProfessions(clinicProfessionsResponse ?? []);

        const firstProfessionalsPage = await getClinicProfessionalsByNetworkRef.current(networkId, 1);
        if (firstProfessionalsPage?.data) {
          loadedProfessionals.push(...firstProfessionalsPage.data);
          for (let page = 2; page <= firstProfessionalsPage.totalPages; page += 1) {
            const nextPage = await getClinicProfessionalsByNetworkRef.current(networkId, page);
            if (nextPage?.data) loadedProfessionals.push(...nextPage.data);
          }
        }

        const firstStudentsPage = await getAllStudentsNetworkRef.current(networkId, 1, 100);
        if (Array.isArray(firstStudentsPage)) {
          loadedStudents.push(...firstStudentsPage);
        } else if (firstStudentsPage?.data) {
          loadedStudents.push(...firstStudentsPage.data);
          const totalPages = firstStudentsPage.totalPages ?? 1;
          for (let page = 2; page <= totalPages; page += 1) {
            const nextPage = await getAllStudentsNetworkRef.current(networkId, page, 100);
            if (Array.isArray(nextPage)) {
              loadedStudents.push(...nextPage);
            } else if (nextPage?.data) {
              loadedStudents.push(...nextPage.data);
            }
          }
        }

        setProfessionals(loadedProfessionals);
        setStudents(loadedStudents);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    void loadOptions();
  }, []);

  useEffect(() => {
    if (!sessionToEdit) return;

    const toDatetimeLocalValue = (dateValue?: string) => {
      if (!dateValue) return "";
      const date = new Date(dateValue);
      if (Number.isNaN(date.getTime())) return "";
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
    };

    setIdProfessional(String(sessionToEdit.id_profissional));
    setIdPatient(String(sessionToEdit.id_paciente));
    setProfessionalName(sessionToEdit.nome_profissional ?? "");
    setPatientName(sessionToEdit.nome_paciente ?? "");
    setSessionType(sessionToEdit.tipo_sessao ?? "");
    setStatus(sessionToEdit.status ?? "aberta");
    setStartDate(toDatetimeLocalValue(sessionToEdit.data_inicio));
    setEndDate(toDatetimeLocalValue(sessionToEdit.data_final));
  }, [sessionToEdit]);

  useEffect(() => {
    if (sessionToEdit) return;
    if (clinicProfessions.length === 0) return;
    setSessionType((prev) => {
      if (prev.trim()) return prev;
      const first = clinicProfessions[0];
      return (first.tipo_atendimento ?? first.descricao ?? "").trim();
    });
  }, [clinicProfessions, sessionToEdit]);

  const sessionTypeOptions = useMemo(() => {
    const seen = new Set<string>();
    return clinicProfessions.filter((item) => {
      const value = (item.tipo_atendimento ?? item.descricao ?? "").trim();
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }, [clinicProfessions]);

  const professionalsForPicker = useMemo(() => {
    if (!strictFilterProfessionals || !sessionType.trim()) return professionals;
    return professionals.filter((p) => professionalMatchesSessionType(p, sessionType));
  }, [professionals, strictFilterProfessionals, sessionType]);

  const filteredProfessionals = professionalsForPicker
    .filter((item) => (item.nome ?? "").toLowerCase().includes(professionalName.toLowerCase()))
    .slice(0, 8);

  const filteredStudents = students
    .filter((item) => (item.nome ?? "").toLowerCase().includes(patientName.toLowerCase()))
    .slice(0, 8);

  const handleSelectProfessional = (item: ProfessionalsService.IProfessionalByNetwork) => {
    setIdProfessional(String(item.id_usuario ?? ""));
    setProfessionalName(item.nome ?? "");
  };

  const handleProfessionalNameChange = (value: string) => {
    setProfessionalName(value);
    setIdProfessional("");
  };

  const handleSessionTypeChange = (value: string) => {
    setSessionType(value);
    setStrictFilterProfessionals(true);
    if (!idProfessional.trim()) return;
    const prof = professionals.find((p) => String(p.id_usuario) === idProfessional);
    if (!prof || !professionalMatchesSessionType(prof, value)) {
      setIdProfessional("");
      setProfessionalName("");
    }
  };

  const handleSelectPatient = (item: StudentService.IStudent) => {
    setIdPatient(String(item.id_usuario));
    setPatientName(item.nome);
  };

  const handlePatientNameChange = (value: string) => {
    setPatientName(value);
    setIdPatient("");
  };

  const verifyData = () => {
    if (!idProfessional.trim()) {
      toast({ title: t("toast_title"), description: t("validation_professional"), variant: "destructive" });
      return false;
    }
    if (!idPatient.trim()) {
      toast({ title: t("toast_title"), description: t("validation_patient"), variant: "destructive" });
      return false;
    }
    if (!sessionType.trim()) {
      toast({ title: t("toast_title"), description: t("validation_session_type"), variant: "destructive" });
      return false;
    }
    if (!startDate) {
      toast({ title: t("toast_title"), description: t("validation_start"), variant: "destructive" });
      return false;
    }
    if (!endDate) {
      toast({ title: t("toast_title"), description: t("validation_end"), variant: "destructive" });
      return false;
    }
    return true;
  };

  const submitSession = useCallback(async () => {
    const dataToSend: AltSessionService.ICreateAltSessionPayload = {
      id_profissional: Number(idProfessional),
      id_paciente: Number(idPatient),
      tipo_sessao: sessionType.trim(),
      data_inicio: new Date(startDate).toISOString(),
      data_final: new Date(endDate).toISOString(),
      status: status as AltSessionService.TAltSessionStatus,
    };

    if (isEditMode && sessionToEdit) {
      const updatePayload: AltSessionService.IUpdateAltSessionPayload = {
        id_profissional: Number(idProfessional),
        id_paciente: Number(idPatient),
        tipo_sessao: sessionType.trim(),
        data_inicio: new Date(startDate).toISOString(),
        data_final: new Date(endDate).toISOString(),
      };

      const updatedSession = await updateAltSessionById(sessionToEdit.id, updatePayload);
      if (!updatedSession) return;

      if (status !== sessionToEdit.status) {
        const changedStatus = await changeAltSessionStatusById(sessionToEdit.id, {
          status: status as AltSessionService.TAltSessionStatus,
        });
        if (!changedStatus) return;
      }

      toast({ title: t("toast_title"), description: t("success_update"), variant: "successful" });
      await onSuccess();
      onClose();
      return;
    }

    const response = await createAltSession(dataToSend);
    if (!response) return;

    toast({ title: t("toast_title"), description: t("success_create"), variant: "successful" });
    await onSuccess();
    onClose();
  }, [
    idProfessional,
    idPatient,
    sessionType,
    startDate,
    endDate,
    status,
    isEditMode,
    sessionToEdit,
    createAltSession,
    updateAltSessionById,
    changeAltSessionStatusById,
    onSuccess,
    onClose,
    toast,
    t,
  ]);

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const selectedProfessional = professionals.find((p) => String(p.id_usuario) === idProfessional.trim());
      if (!selectedProfessional) {
        toast({ title: t("toast_title"), description: t("validation_professional"), variant: "destructive" });
        return;
      }

      if (!professionalMatchesSessionType(selectedProfessional, sessionType)) {
        setShowProfessionMismatchDialog(true);
        return;
      }

      await submitSession();
    } finally {
      setDisabledBtn(false);
      setLoad(false);
    }
  };

  const handleMismatchDialogYes = async () => {
    if (!verifyData()) return;
    mismatchDialogClosingForSubmitRef.current = true;
    setShowProfessionMismatchDialog(false);
    try {
      setLoad(true);
      setDisabledBtn(true);
      await submitSession();
    } finally {
      mismatchDialogClosingForSubmitRef.current = false;
      setDisabledBtn(false);
      setLoad(false);
    }
  };

  const handleMismatchDialogOpenChange = (open: boolean) => {
    if (!open) {
      if (mismatchDialogClosingForSubmitRef.current) return;
      setStrictFilterProfessionals(true);
      setIdProfessional("");
      setProfessionalName("");
    }
  };

  return {
    idProfessional,
    professionalName,
    setProfessionalName: handleProfessionalNameChange,
    filteredProfessionals,
    handleSelectProfessional,
    idPatient,
    patientName,
    setPatientName: handlePatientNameChange,
    filteredStudents,
    handleSelectPatient,
    sessionType,
    setSessionType: handleSessionTypeChange,
    showProfessionMismatchDialog,
    handleMismatchDialogYes,
    handleMismatchDialogOpenChange,
    setShowProfessionMismatchDialog,
    clinicProfessions,
    sessionTypeOptions,
    status,
    setStatus,
    isEditMode,
    isLoadingOptions,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    disabledBtn,
    handleSubmit,
  };
}
