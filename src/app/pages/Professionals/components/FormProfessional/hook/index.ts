import { Indicators, Professionals, User } from "@/data/services";
import { ProfessionalsService, UnitNetworkService } from "@/data/models";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { useTranslation } from "react-i18next";

interface IUseFormProfessional {
  professionalToEdit: ProfessionalsService.IProfessionalByUserId | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function useFormProfessional({ professionalToEdit, onClose, onSuccess }: IUseFormProfessional) {
  const { t } = useTranslation("professionals");
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { verifyUser } = User();
  const { createClinicProfessional, updateClinicProfessionalByUserId } = Professionals();
  const { getAllUnitsFromUnitNetworkByUser } = Indicators();

  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cpfCnpj, setCpfCnpj] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [especialidade, setEspecialidade] = useState<string>("");
  const [registroProfissional, setRegistroProfissional] = useState<string>("");
  const [status, setStatus] = useState<number>(1);
  const [units, setUnits] = useState<UnitNetworkService.IUnitNetworkService["unit"]>([]);
  const [isUserAvailable, setIsUserAvailable] = useState<boolean | null>(null);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEditMode = !!professionalToEdit;
  const initialUser = professionalToEdit?.usuario?.trim() ?? "";
  const previousUserPrefixRef = useRef<string>("");

  const getDataRef = useRef(getData);
  const getAllUnitsFromUnitNetworkByUserRef = useRef(getAllUnitsFromUnitNetworkByUser);

  useEffect(() => {
    getDataRef.current = getData;
    getAllUnitsFromUnitNetworkByUserRef.current = getAllUnitsFromUnitNetworkByUser;
  }, [getData, getAllUnitsFromUnitNetworkByUser]);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        setIsLoading(true);
        const userId = Number(getDataRef.current("id"));
        const response = await getAllUnitsFromUnitNetworkByUserRef.current(userId);
        setUnits(response?.unit ?? []);
      } finally {
        setIsLoading(false);
      }
    };

    void loadUnits();
  }, []);

  const selectedUnit = useMemo(
    () => units.find((unit) => String(unit.id) === selectedUnitId) ?? null,
    [selectedUnitId, units]
  );

  const hasSingleUnit = units.length === 1;

  const buildUserPrefix = (unitDescription: string) => {
    const words = unitDescription
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 0) return "";
    if (words.length >= 3) return `${words[0][0]}${words[1][0]}${words[2][0]}_`;
    if (words.length === 2) return `${words[0][0]}${words[1].slice(0, 2)}_`;
    return `${words[0].slice(0, 3)}_`;
  };

  const userPrefix = !isEditMode && selectedUnit?.descricao ? buildUserPrefix(selectedUnit.descricao) : "";

  useEffect(() => {
    if (isEditMode) return;
    if (!hasSingleUnit) return;
    setSelectedUnitId(String(units[0].id));
  }, [hasSingleUnit, isEditMode, units]);

  useEffect(() => {
    if (isEditMode) return;

    const previousPrefix = previousUserPrefixRef.current;
    if (!userPrefix) {
      previousUserPrefixRef.current = "";
      return;
    }

    setUsuario((prevValue) => {
      const baseSuffix =
        previousPrefix && prevValue.startsWith(previousPrefix) ? prevValue.slice(previousPrefix.length) : prevValue;
      return `${userPrefix}${baseSuffix}`;
    });

    previousUserPrefixRef.current = userPrefix;
  }, [isEditMode, userPrefix]);

  const cleanData = () => {
    setUsuario("");
    setSenha("");
    setSelectedUnitId("");
    setNome("");
    setCpfCnpj("");
    setEmail("");
    setEspecialidade("");
    setRegistroProfissional("");
    setStatus(1);
    setIsUserAvailable(null);
  };

  useEffect(() => {
    if (!professionalToEdit) {
      cleanData();
      return;
    }

    setUsuario(professionalToEdit.usuario ?? "");
    setSenha("");
    setSelectedUnitId(professionalToEdit.id_unidade ? String(professionalToEdit.id_unidade) : "");
    setNome(professionalToEdit.nome ?? "");
    setCpfCnpj(professionalToEdit.cpf_cnpj ?? "");
    setEmail(professionalToEdit.email ?? "");
    setEspecialidade(professionalToEdit.especialidade ?? "");
    setRegistroProfissional(professionalToEdit.registro_profissional ?? "");
    setStatus(professionalToEdit.status ?? 1);
    setIsUserAvailable(true);
  }, [professionalToEdit]);

  const verifyData = () => {
    if (!usuario.trim()) {
      toast({ title: t("title"), description: t("validation_required_user"), variant: "destructive" });
      return false;
    }

    if ((!isEditMode || usuario.trim() !== initialUser) && isUserAvailable !== true) {
      toast({ title: t("title"), description: t("validation_user_unavailable"), variant: "destructive" });
      return false;
    }

    if (!isEditMode && !senha.trim()) {
      toast({ title: t("title"), description: t("validation_required_password"), variant: "destructive" });
      return false;
    }

    if (!selectedUnitId) {
      toast({ title: t("title"), description: t("validation_required_unit"), variant: "destructive" });
      return false;
    }

    if (!nome.trim()) {
      toast({ title: t("title"), description: t("validation_required_name"), variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleBlurUser = async () => {
    const userValue = usuario.trim();
    if (!userValue) {
      setIsUserAvailable(null);
      return;
    }

    if (isEditMode && userValue === initialUser) {
      setIsUserAvailable(true);
      return;
    }

    const userExists = await verifyUser(userValue);
    if (userExists === null) return;

    if (userExists) {
      setIsUserAvailable(false);
      toast({ title: t("title"), description: t("validation_user_unavailable"), variant: "destructive" });
      return;
    }

    setIsUserAvailable(true);
  };

  const handleChangeUser = (value: string) => {
    if (isEditMode || !userPrefix) {
      setUsuario(value);
      setIsUserAvailable(null);
      return;
    }

    const valueWithoutPrefix = value.startsWith(userPrefix) ? value.slice(userPrefix.length) : value;
    setUsuario(`${userPrefix}${valueWithoutPrefix}`);
    setIsUserAvailable(null);
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;
      const selectedUnit = units.find((unit) => String(unit.id) === selectedUnitId);

      if (isEditMode && professionalToEdit?.id_usuario) {
        const dataToSend: ProfessionalsService.IProfessionalUpdateByUserId = {
          id_unidade: Number(selectedUnitId),
          id_usuario: professionalToEdit.id_usuario,
          usuario: usuario.trim(),
          nome: nome.trim(),
          cpf_cnpj: cpfCnpj.trim() || undefined,
          email: email.trim() || undefined,
          especialidade: especialidade.trim() || undefined,
          registro_profissional: registroProfissional.trim() || undefined,
          status,
        };

        const password = senha.trim();
        if (password) {
          dataToSend.senha = password;
        }

        const response = await updateClinicProfessionalByUserId(professionalToEdit.id_usuario, dataToSend);
        if (response) {
          toast({ title: t("title"), description: t("success_update"), variant: "successful" });
          await onSuccess();
          onClose();
        }
        return;
      }

      const dataToSend: ProfessionalsService.IProfessionalRegister = {
        usuario: usuario.trim(),
        senha: senha.trim(),
        id_unidade: Number(selectedUnitId),
        id_unidade_rede: selectedUnit?.id_unidade_rede ?? Number(selectedUnitId),
        nome: nome.trim(),
        cpf_cnpj: cpfCnpj.trim() || undefined,
        email: email.trim() || undefined,
        especialidade: especialidade.trim() || undefined,
        registro_profissional: registroProfissional.trim() || undefined,
      };

      const response = await createClinicProfessional(dataToSend);
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
    usuario,
    senha,
    selectedUnitId,
    nome,
    cpfCnpj,
    email,
    especialidade,
    registroProfissional,
    units,
    hasSingleUnit,
    isUserAvailable,
    disabledBtn,
    isLoading,
    setUsuario,
    setSenha,
    setSelectedUnitId,
    setNome,
    setCpfCnpj,
    setEmail,
    setEspecialidade,
    setRegistroProfissional,
    setIsUserAvailable,
    handleChangeUser,
    handleBlurUser,
    handleSubmit,
  };
}
