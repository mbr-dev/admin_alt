import { Class } from "@/data/services";
import { ClassService } from "@/data/models";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMain, useToast } from "@/data/hooks";
import { useTranslation } from "react-i18next";

interface IUseFormClass {
  classToEdit: ClassService.IClassService | null;
  unitId: number;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

const CLASS_TYPES = [
  { value: "Regular", labelKey: "type_regular" },
  { value: "Reforço", labelKey: "type_reforco" },
  { value: "Módulo", labelKey: "type_modulo" },
] as const;

const CLASS_CYCLES = [
  { value: "Anual", labelKey: "cycle_anual" },
  { value: "Mensal", labelKey: "cycle_mensal" },
  { value: "Bimestral", labelKey: "cycle_bimestral" },
  { value: "Trimestral", labelKey: "cycle_trimestral" },
  { value: "Semestral", labelKey: "cycle_semestral" },
] as const;
const MAX_CODE_ATTEMPTS = 10;
const CODE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function createRandomClassCode() {
  return Array.from({ length: 7 }, () => CODE_CHARACTERS.charAt(Math.floor(Math.random() * CODE_CHARACTERS.length))).join("");
}

function toDateInputValue(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 10);
}

export function useFormClass({ classToEdit, unitId, onClose, onSuccess }: IUseFormClass) {
  const { t } = useTranslation("classes");
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { createClass, updateClassById, verifyCodeClass } = Class();

  const [descricao, setDescricao] = useState<string>("");
  const [codigo, setCodigo] = useState<string>("");
  const [tipoTurma, setTipoTurma] = useState<string>("");
  const [tipoCiclo, setTipoCiclo] = useState<string>("Anual");
  const [anoLetivo, setAnoLetivo] = useState<string>(String(new Date().getFullYear()));
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");
  const [numSerie, setNumSerie] = useState<string>("");
  const [status, setStatus] = useState<string>("1");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [disabledBtnCode, setDisabledBtnCode] = useState<boolean>(false);
  const [isCodeValid, setIsCodeValid] = useState<boolean>(false);

  const isEditMode = !!classToEdit;
  const verifyCodeClassRef = useRef(verifyCodeClass);
  const tRef = useRef(t);
  const toastRef = useRef(toast);

  useEffect(() => {
    verifyCodeClassRef.current = verifyCodeClass;
    tRef.current = t;
    toastRef.current = toast;
  }, [verifyCodeClass, t, toast]);

  const classTypes = CLASS_TYPES.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
  }));

  const classCycles = CLASS_CYCLES.map((item) => ({
    value: item.value,
    label: t(item.labelKey),
  }));

  const cleanData = () => {
    setDescricao("");
    setCodigo("");
    setTipoTurma("");
    setTipoCiclo("Anual");
    setAnoLetivo(String(new Date().getFullYear()));
    setDataInicio("");
    setDataFim("");
    setNumSerie("");
    setStatus("1");
    setIsCodeValid(false);
  };

  const generateUniqueCode = useCallback(async () => {
    for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
      const randomCode = createRandomClassCode();
      setCodigo(randomCode);

      const alreadyRegistered = await verifyCodeClassRef.current(randomCode);
      if (!alreadyRegistered) {
        setIsCodeValid(true);
        return true;
      }
    }

    setIsCodeValid(false);
    return false;
  }, []);

  const handleGenerateCode = async () => {
    setDisabledBtnCode(true);

    try {
      const isValid = await generateUniqueCode();
      if (isValid) {
        toast({ title: t("title"), description: t("code_valid"), variant: "successful" });
        return;
      }

      toast({ title: t("title"), description: t("code_already_registered"), variant: "destructive" });
    } finally {
      setDisabledBtnCode(false);
    }
  };

  useEffect(() => {
    if (classToEdit) {
      setDescricao(classToEdit.descricao ?? "");
      setCodigo(classToEdit.codigo ?? "");
      setTipoTurma(classToEdit.tipo_turma ?? "");
      setTipoCiclo(classToEdit.tipo_ciclo || "Anual");
      setAnoLetivo(classToEdit.ano_letivo ? String(classToEdit.ano_letivo) : String(new Date().getFullYear()));
      setDataInicio(toDateInputValue(classToEdit.data_inicio));
      setDataFim(toDateInputValue(classToEdit.data_fim));
      setNumSerie(classToEdit.num_serie ? String(classToEdit.num_serie) : "");
      setStatus(String(classToEdit.status ?? 1));
      setIsCodeValid(true);
      return;
    }

    let isMounted = true;

    const generateInitialCode = async () => {
      cleanData();
      setDisabledBtnCode(true);

      try {
        const isValid = await generateUniqueCode();
        if (!isMounted) return;
        if (!isValid) {
          toastRef.current({ title: tRef.current("title"), description: tRef.current("code_already_registered"), variant: "destructive" });
        }
      } finally {
        if (isMounted) setDisabledBtnCode(false);
      }
    };

    void generateInitialCode();

    return () => {
      isMounted = false;
    };
  }, [classToEdit, generateUniqueCode]);

  const verifyData = () => {
    if (!descricao.trim()) {
      toast({ title: t("title"), description: t("validation_required_name"), variant: "destructive" });
      return false;
    }

    if (!codigo.trim() || !isCodeValid) {
      toast({ title: t("title"), description: t("validation_required_codigo"), variant: "destructive" });
      return false;
    }

    if (!tipoTurma) {
      toast({ title: t("title"), description: t("validation_required_type"), variant: "destructive" });
      return false;
    }

    if (!tipoCiclo) {
      toast({ title: t("title"), description: t("validation_required_cycle"), variant: "destructive" });
      return false;
    }

    if (!anoLetivo.trim() || Number(anoLetivo) <= 0) {
      toast({ title: t("title"), description: t("validation_required_school_year"), variant: "destructive" });
      return false;
    }

    if (!dataInicio) {
      toast({ title: t("title"), description: t("validation_required_start_date"), variant: "destructive" });
      return false;
    }

    if (!dataFim) {
      toast({ title: t("title"), description: t("validation_required_end_date"), variant: "destructive" });
      return false;
    }

    if (dataFim < dataInicio) {
      toast({ title: t("title"), description: t("validation_invalid_period"), variant: "destructive" });
      return false;
    }

    if (!numSerie.trim() || Number(numSerie) <= 0) {
      toast({ title: t("title"), description: t("validation_required_class_year"), variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const dataToSend: ClassService.IClassRegister = {
        id_unidade: unitId,
        descricao: descricao.trim(),
        codigo: codigo.trim(),
        tipo_turma: tipoTurma,
        tipo_ciclo: tipoCiclo,
        ano_letivo: Number(anoLetivo),
        data_inicio: dataInicio,
        data_fim: dataFim,
        num_serie: Number(numSerie),
        status: Number(status),
      };

      if (isEditMode && classToEdit) {
        const response = await updateClassById(classToEdit.id, dataToSend);
        if (response) {
          toast({ title: t("title"), description: t("success_update"), variant: "successful" });
          await onSuccess();
          onClose();
        }
        return;
      }

      const response = await createClass(dataToSend);
      if (response) {
        toast({ title: t("title"), description: t("success_create"), variant: "successful" });
        await onSuccess();
        onClose();
      }
    } finally {
      setDisabledBtn(false);
      setLoad(false);
    }
  };

  return {
    t,
    isEditMode,
    descricao,
    codigo,
    tipoTurma,
    tipoCiclo,
    anoLetivo,
    dataInicio,
    dataFim,
    numSerie,
    status,
    classTypes,
    classCycles,
    disabledBtn,
    disabledBtnCode,
    setDescricao,
    setTipoTurma,
    setTipoCiclo,
    setAnoLetivo,
    setDataInicio,
    setDataFim,
    setNumSerie,
    setStatus,
    handleGenerateCode,
    handleSubmit,
  };
}
