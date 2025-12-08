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

  const unitId = Number(getData("id_unidade"));

  //Função que busca os dados para o select professor
  const fetchData = async () => {
    try {
      setLoadLabel(true);

      const response = await getStudentsByUnit(unitId);
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
    const cached = sessionStorage.getItem("students-teacher");
    if (cached) {
      const parsed = JSON.parse(cached);
      setStudents((prev) => ({
        ...prev,
        list: parsed.studentsTeacher
      }))
    } else {
      fetchData();
    }
  }, [indicatorsContext.showModal]);

  return { handleConfirm, loadLabel, students, handleSelectStudent };
}