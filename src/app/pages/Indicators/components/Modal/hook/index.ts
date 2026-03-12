import { Select, StudentService } from "@/data/models";
import { useStorage } from "@/data/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { Student } from "@/data/services";
import { useIndicators } from "../../../hook";

export const useModal = () => {
  const { getData } = useStorage();
  const indicatorsContext = useIndicators();
  const { getAllStudentsNetwork } = Student();

  const [students, setStudents] = useState<Select.ISelect>({ list: [], selected: "" });
  const [loadLabel, setLoadLabel] = useState<boolean>(false);
  const getDataRef = useRef(getData);
  const getAllStudentsNetworkRef = useRef(getAllStudentsNetwork);

  useEffect(() => {
    getDataRef.current = getData;
    getAllStudentsNetworkRef.current = getAllStudentsNetwork;
  }, [getData, getAllStudentsNetwork]);
  //Função que busca os alunos pela rede
  const fetchData = useCallback(async () => {
    try {
      setLoadLabel(true);

      const networkIdRaw = getDataRef.current("id_rede") || getDataRef.current("id_unidade_rede");
      const networkId = Number(networkIdRaw);

      if (Number.isNaN(networkId) || networkId <= 0) {
        setStudents((prev) => ({ ...prev, list: [] }));
        return;
      }

      const response = await getAllStudentsNetworkRef.current(networkId, 1, 9999);
      const studentList: StudentService.IStudent[] = Array.isArray(response) ? response : (response?.data ?? []);

      if(studentList.length > 0) {
        const formatResponse = studentList.map((item: StudentService.IStudent) => ({ id: item.id.toString(), label: item.nome }));
        setStudents((prev) => ({
          ...prev,
          list: formatResponse
        }));
      } else {
        setStudents((prev) => ({
          ...prev,
          list: []
        }));
      }
      
      setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }, []);
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
    if (!indicatorsContext.showModal) return;
    void fetchData();
  }, [indicatorsContext.showModal, fetchData]);

  return { handleConfirm, loadLabel, students, handleSelectStudent };
}