import { Classes } from "@/data/services";
import { useEffect, useState } from "react";
import { useStorage, useToast, useMain } from "@/data/hooks";
import { StudentService, ClassService } from "@/data/models";

export const useRegisterTeacherToClass = () => {
  const { regiterTeacherToClass, getTeachersByUnit } = Classes();
  const { getData } = useStorage();
  const { toast } = useToast();
  const mainContext = useMain();

  const [loadRegister, setLoadRegister] = useState<boolean>(false);
  const [showClass, setShowClass] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<StudentService.IStudent[]>([]);
  const [teachersSelecteds, setTeachersSelecteds] = useState<number[]>([]);
  const [selectedClass, setSelectedClass] = useState<number>(0);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  //Busca os professores
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const teachersResponse = await getTeachersByUnit(Number(getData("id_unidade")));
      if (teachersResponse) setTeachers(teachersResponse);

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  };
  //Registra o professor na turma
  const handleRegisterTeachers = async () => {
    try {
      if (selectedClass === 0) return;

      setDisabledBtn(true);
      setLoadRegister(true);

      let allSuccessful = true;

      for (const item of teachersSelecteds) {
        const dataToSendo: ClassService.IRegisterTeacherToClassService = {
          id_professor: Number(item),
          id_turma: Number(selectedClass)
        }

        const response = await regiterTeacherToClass(dataToSendo);
        if (!response) {
          allSuccessful = false;
          break;
        }
      }

      if (allSuccessful) {
        toast({ title: `${teachersSelecteds.length > 1 ? "Médicos(a)" : "Médico(a)"}`, description: `${teachersSelecteds.length > 1 ? "Médicos(a)" : "Médico(a)"} adicionado em um grupo com sucesso!`, variant: "successful" });
        setTeachersSelecteds([]);
      }

      setLoadRegister(false);
      setDisabledBtn(false);
      setShowClass(false);
    } finally {
      setLoadRegister(false);
      setDisabledBtn(false);
      setShowClass(false);
    }
  };
  //Mostrar os grupo para selecionar
  const onSetShowClass = (value: boolean) => {
    if (teachersSelecteds.length < 1) return;
    setShowClass(value);
  };
  //Seleciona os médicos
  const handleGetTeachers = (id: number) => {
    setTeachersSelecteds((state) => state.includes(id) ? state.filter((item) => item !== id) : [...state, id]);
  };

  useEffect(() => { fetchData(); }, []);

  return { disabledBtn, teachers, handleGetTeachers, teachersSelecteds, showClass, onSetShowClass, handleRegisterTeachers, setSelectedClass, selectedClass, loadRegister };
};
