import { Classes } from "@/data/services";
import { useEffect, useState } from "react";
import { StudentService, ClassService } from "@/data/models";
import { useStorage, useToast, useMain } from "@/data/hooks";

export const useRegisterTeacherToClass = () => {
  const { regiterStudentToClass, getStudentsByUnitThatDontHaveClass } = Classes();
  const { getData } = useStorage();
  const { toast } = useToast();
  const mainContext = useMain();

  const [loadRegister, setLoadRegister] = useState<boolean>(false);
  const [showClass, setShowClass] = useState<boolean>(false);
  const [students, setStudents] = useState<StudentService.IStudent[]>([]);
  const [studentsSelecteds, setStudentsSelecteds] = useState<number[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false);
  //Busca os aluno que não estão cadastrado em turmas
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const teachersResponse = await getStudentsByUnitThatDontHaveClass(Number(getData("id_unidade")));
      if (teachersResponse) setStudents(teachersResponse);

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }
  //Registra os aluno em turma
  const handleRegisterStudents = async () => {
    try {
      if (selectedClass === "") return;

      setDisabledBtn(true);
      setLoadRegister(true);
      mainContext.setLoad(true);

      let allSuccessful = true;

      for (const item of studentsSelecteds) {
        const turmaId = Number(selectedClass.replace(/"/g, '').trim());

        const dataToSendo: ClassService.IRegisterStudentToClassService = {
          id_aluno: Number(item),
          id_turma: turmaId
        }

        const response = await regiterStudentToClass(dataToSendo);
        if (!response) {
          allSuccessful = false;
          break;
        }
      }

      if (allSuccessful) {
        toast({ title: `${studentsSelecteds.length > 1 ? "Alunos(a)" : "Aluno(a)"}`, description: `${studentsSelecteds.length > 1 ? "Alunos(a)" : "Aluno(a)"} adicionado em um grupo com sucesso!`, variant: "successful" });
        setStudentsSelecteds([]);
      }

      setLoadRegister(false);
      setDisabledBtn(false);
      setShowClass(false);
      mainContext.setLoad(false);

      await fetchData();
    } finally {
      setLoadRegister(false);
      setDisabledBtn(false);
      setShowClass(false);
      mainContext.setLoad(false);
    }
  }
  //Mostrar os grupo para cadastrar
  const onSetShowClass = (value: boolean) => {
    if (studentsSelecteds.length < 1) return;
    setShowClass(value);
  }
  //Selecionar o aluno
  const handleGetStudents = (id: number) => {
    setStudentsSelecteds((state) => state.includes(id) ? state.filter((item) => item !== id) : [...state, id]);
  }

  useEffect(() => { fetchData(); }, []);

  return { disabledBtn, students, handleGetStudents, studentsSelecteds, showClass, onSetShowClass, handleRegisterStudents, setSelectedClass, selectedClass, loadRegister };
};
