import { useState } from "react";
import { useGroups } from "../../../hook";
import { useStorage } from "@/data/hooks";
import { Classes } from "@/data/services";
import { ClassService } from "@/data/models";
import { useToast, useMain } from "@/data/hooks";

export const useRegisterClass = () => {
  const { registerClass, verifyCodeClass } = Classes();
  const { getData } = useStorage();
  const mainContext = useMain();
  const { toast } = useToast();
  const { setSelectType } = useGroups();

  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  const [disabledBtnCode, setDisabledBtnCode] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      if (!validateData()) return;

      setDisabledBtn(true);

      const dataToSend: ClassService.IRegisterClassService = {
        descricao: description.trim(),
        codigo: code.trim(),
        num_serie: Number(1),
        id_unidade: Number(Number(getData("id_unidade"))),
      };

      const response = await registerClass(dataToSend);
      if (response) {
        toast({ title: "Grupo", description: "Grupo cadastrado com sucesso!", variant: "successful" });
        cleanData();
        setSelectType(0);
      }

      setDisabledBtn(true);
    } finally {
      setDisabledBtn(true);
    }
  };

  const handleGenerateCode = async () => {
    setDisabledBtnCode(true);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomCode = Array.from({ length: 7 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
    
    setCode(randomCode);
    
    const response = await verifyCodeClass(randomCode);
    if (response) {
      toast({ title: "Error", description: "Código já registrado!", variant: "destructive" });
    } else {
      toast({ title: "Grupo", description: "Código válido com sucesso!", variant: "successful" });
    }
    setDisabledBtnCode(false);
  }

  const validateData = () => {
    let result = true;

    if (description === "") {
      toast({ title: "Error", description: "Informe o nome do grupo!", variant: "destructive" });
      result = false;
    } else if (code === "") {
      toast({ title: "Error", description: "Informe o código!", variant: "destructive" });
      result = false;
    }

    return result;
  }

  const cleanData = () => {
    setCode("");
    setDescription("");
  };

  return { description, setDescription, code, handleSubmit, disabledBtn, handleGenerateCode, disabledBtnCode };
};
