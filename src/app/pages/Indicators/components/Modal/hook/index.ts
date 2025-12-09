import { Select } from "@/data/models";
import { useStorage } from "@/data/hooks";
import { useEffect, useState } from "react";
import { Indicators } from "@/data/services";
import { useIndicators } from "../../../hook";

export const useModal = () => {
  const { getData } = useStorage();
  const indicatorsContext = useIndicators();
  const { getStudentsByUnit } = Indicators();

  const [students, setStudents] = useState<Select.ISelect>({ list: [], selected: "" });
  const [loadLabel, setLoadLabel] = useState<boolean>(false);
  //Função que busca os alunos pela unidade
  const fetchData = async () => {
    try {
      setLoadLabel(true);

      const response = await getStudentsByUnit(Number(getData("id_unidade")));
      if(response.length > 0) {
        const formatResponse = response.map((item) => ({ id: item.id.toString(), label: item.nome }));
        setStudents((prev) => ({
          ...prev,
          list: formatResponse
        }));
        //Salva no session storage
        const sessionData = {
          studentsTeacher: formatResponse
        }
        sessionStorage.setItem("students-teacher", JSON.stringify(sessionData));
      }
      
      setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que Seleciona a aluno
  const handleSelectStudent = (value: string) => {
    indicatorsContext.setStudentSelected(Number(value));
    setStudents((prev) => ({ ...prev, selected: value }));
  }
  //FUnção para confirmar a busca do relatório do aluno
  const handleConfirm = () => {
    if (students.selected === "") return;
    indicatorsContext.setShowReports(true);
  }

  useEffect(() => {
    //Pega os dados da sessão
    const cached = sessionStorage.getItem("students-teacher");
    //Caso tenha dados na sessão carrega
    if (cached) {
      const parsed = JSON.parse(cached);
      setStudents((prev) => ({
        ...prev,
        list: parsed.studentsTeacher
      }))
    //Caso não tenha dados na seção busca
    } else {
      fetchData();
    }
  }, [indicatorsContext.showModal]);

  return { handleConfirm, loadLabel, students, handleSelectStudent };
}