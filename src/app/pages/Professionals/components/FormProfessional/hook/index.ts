import { Indicators, Professionals, User } from "@/data/services";
import { ProfessionalsService, UnitNetworkService } from "@/data/models";
import { useEffect, useRef, useState } from "react";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { useTranslation } from "react-i18next";

interface IUseFormProfessional {
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function useFormProfessional({ onClose, onSuccess }: IUseFormProfessional) {
  const { t } = useTranslation("professionals");
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { verifyUser } = User();
  const { createClinicProfessional } = Professionals();
  const { getAllUnitsFromUnitNetworkByUser } = Indicators();

  const [usuario, setUsuario] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [cpfCnpj, setCpfCnpj] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [especialidade, setEspecialidade] = useState<string>("");
  const [registroProfissional, setRegistroProfissional] = useState<string>("");
  const [units, setUnits] = useState<UnitNetworkService.IUnitNetworkService["unit"]>([]);
  const [isUserAvailable, setIsUserAvailable] = useState<boolean | null>(null);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const verifyData = () => {
    if (!usuario.trim()) {
      toast({ title: t("title"), description: t("validation_required_user"), variant: "destructive" });
      return false;
    }

    if (isUserAvailable !== true) {
      toast({ title: t("title"), description: t("validation_user_unavailable"), variant: "destructive" });
      return false;
    }

    if (!senha.trim()) {
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

    const userExists = await verifyUser(userValue);
    if (userExists === null) return;

    if (userExists) {
      setIsUserAvailable(false);
      toast({ title: t("title"), description: t("validation_user_unavailable"), variant: "destructive" });
      return;
    }

    setIsUserAvailable(true);
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;
      const selectedUnit = units.find((unit) => String(unit.id) === selectedUnitId);

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
    usuario,
    senha,
    selectedUnitId,
    nome,
    cpfCnpj,
    email,
    especialidade,
    registroProfissional,
    units,
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
    handleBlurUser,
    handleSubmit,
  };
}
