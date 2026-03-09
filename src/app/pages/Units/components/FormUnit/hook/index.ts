import { Unit } from "@/data/services";
import { UnitService } from "@/data/models";
import { consultarCep } from "@/lib/consultarCep";
import { useEffect, useState } from "react";
import { useMain, useStorage, useToast } from "@/data/hooks";
import { useTranslation } from "react-i18next";

interface IUseFormUnit {
  unitToEdit: UnitService.IUnitById | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export function useFormUnit({ unitToEdit, onClose, onSuccess }: IUseFormUnit) {
  const { t } = useTranslation("units");
  const { toast } = useToast();
  const { setLoad } = useMain();
  const { getData } = useStorage();
  const { createUnit, updateUnitById } = Unit();

  const [descricao, setDescricao] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [regiao, setRegiao] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [observacao, setObservacao] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);

  const isEditMode = !!unitToEdit;

  const cleanData = () => {
    setDescricao("");
    setCnpj("");
    setEmail("");
    setTelefone("");
    setCep("");
    setLogradouro("");
    setNumero("");
    setBairro("");
    setRegiao("");
    setCidade("");
    setEstado("");
    setObservacao("");
  };

  useEffect(() => {
    if (!unitToEdit) {
      cleanData();
      return;
    }

    setDescricao(unitToEdit.descricao ?? "");
    setCnpj(unitToEdit.cnpj ?? "");
    setEmail(unitToEdit.email ?? "");
    setTelefone(unitToEdit.telefone ?? "");
    setCep(unitToEdit.cep ?? "");
    setLogradouro(unitToEdit.logradouro ?? "");
    setNumero(unitToEdit.numero ?? "");
    setBairro(unitToEdit.bairro ?? "");
    setRegiao(unitToEdit.regiao ?? "");
    setCidade(unitToEdit.cidade ?? "");
    setEstado(unitToEdit.estado ?? "");
    setObservacao(unitToEdit.observacao ?? "");
  }, [unitToEdit]);

  const verifyData = () => {
    if (!descricao.trim()) {
      toast({ title: t("title"), description: t("validation_required_institution"), variant: "destructive" });
      return false;
    }

    if (!cep.trim()) {
      toast({ title: t("title"), description: t("validation_required_cep"), variant: "destructive" });
      return false;
    }

    if (!cidade.trim()) {
      toast({ title: t("title"), description: t("validation_required_city"), variant: "destructive" });
      return false;
    }

    if (!estado.trim()) {
      toast({ title: t("title"), description: t("validation_required_state"), variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleCepBlur = async () => {
    if (!cep.trim()) return;

    const data = await consultarCep(cep);
    if (!data) return;

    setLogradouro(data.logradouro ?? "");
    setBairro(data.bairro ?? "");
    setCidade(data.localidade ?? "");
    setEstado(data.uf ?? "");
  };

  const handleSubmit = async () => {
    try {
      setLoad(true);
      setDisabledBtn(true);

      if (!verifyData()) return;

      const dataToSend: UnitService.IUnitRegister = {
        id_rede: Number(getData("id_rede")),
        id_pais: 1,
        id_idioma: 1,
        tipo: "CLINICA",
        cnpj: cnpj.trim() || undefined,
        email: email.trim() || undefined,
        telefone: telefone.trim() || undefined,
        logradouro: logradouro.trim() || undefined,
        bairro: bairro.trim() || undefined,
        regiao: regiao.trim() || undefined,
        numero: numero.trim() || undefined,
        observacao: observacao.trim() || undefined,
        fuso_horario: "UTC -03:00 - Brasília, Buenos Aires",
        descricao: descricao.trim(),
        cep: cep.trim(),
        cidade: cidade.trim(),
        estado: estado.trim(),
      };

      if (isEditMode && unitToEdit) {
        const response = await updateUnitById(unitToEdit.id, dataToSend);
        if (response) {
          toast({ title: t("title"), description: t("success_update"), variant: "successful" });
          await onSuccess();
          onClose();
        }
        return;
      }

      const response = await createUnit(dataToSend);
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
    cnpj,
    email,
    telefone,
    cep,
    logradouro,
    numero,
    bairro,
    regiao,
    cidade,
    estado,
    observacao,
    disabledBtn,
    setDescricao,
    setCnpj,
    setEmail,
    setTelefone,
    setCep,
    setLogradouro,
    setNumero,
    setBairro,
    setRegiao,
    setCidade,
    setEstado,
    setObservacao,
    handleCepBlur,
    handleSubmit,
  };
}
