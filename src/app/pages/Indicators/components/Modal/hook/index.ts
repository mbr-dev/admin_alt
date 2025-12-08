import { Select } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { useEffect, useState } from "react";
import { Indicators } from "@/data/services";
import { useIndicators } from "../../../hook";
import { UserRole } from "@/data/constants/user-roles";

export const useModal = () => {
  const mainContext = useMain();
  const { getData } = useStorage();
  const indicatorsContext = useIndicators();
  const { getAllClassesByTeacher, getAllStudentByClass, getAllClassByUnit, getAllUnitsFromUnitNetworkByUser } = Indicators();

  const [units, setUnits] = useState<Select.ISelect>({ list: [], selected: "" });
  const [classes, setClasses] = useState<Select.ISelect>({ list: [], selected: "" });
  const [students, setStudents] = useState<Select.ISelect>({ list: [], selected: "" });
  const [loadLabel, setLoadLabel] = useState<boolean>(false);

  const unitId = Number(getData("id_unidade"));
  //Função que busca os dados para o select secretário
  const fetchDataSME = async () => {
    try {
      setLoadLabel(true);

      const response = await getAllUnitsFromUnitNetworkByUser(mainContext.tokenData?.id);
      if(response) {
        const formatResponse = response.unit.map((item) => ({ id: item.id.toString(), label: item.descricao }));
        setUnits((prev) => ({
          ...prev,
          list: formatResponse
        }));
        //Salva no session storage
        const sessionData = {
          classesSme: formatResponse
        }
        sessionStorage.setItem("class-sme", JSON.stringify(sessionData));
      }
    
      setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que busca os dados para o select coordenador
  const fetchDataCood = async () => {
    try {
      setLoadLabel(true);

      const response = await getAllClassByUnit(unitId);
      if(response.length > 0) {
        const formatResponse = response.map((item) => ({ id: item.id.toString(), label: item.descricao }));
        setClasses((prev) => ({
          ...prev,
          list: formatResponse
        }));
        //Salva no session storage
        const sessionData = {
          classesCood:formatResponse
        }
        sessionStorage.setItem("class-cood", JSON.stringify(sessionData));
      }

     setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que busca os dados para o select professor
  const fetchDataTeacher = async () => {
    try {
      setLoadLabel(true);

      const response = await getAllClassesByTeacher(mainContext.tokenData?.id, unitId);
      if(response.length > 0) {
        const formatResponse = response.map((item) => ({ id: item.id_turma.toString(), label: item.descricao }));
        setClasses((prev) => ({
          ...prev,
          list: formatResponse
        }));
        //Salva no session storage
        const sessionData = {
          classesTeacher: formatResponse
        }
        sessionStorage.setItem("class-teacher", JSON.stringify(sessionData));
      }
      
      setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que busca os alunos pela turma
  const fetchStudentByClass = async (id: string) => {
    try {
      setLoadLabel(true);

      const response = await getAllStudentByClass(Number(id));
      if (response) {
        const formatResponse = response.map((item) => ({ id: item.id_aluno.toString(), label: item.nome }));
        setStudents((prev) => ({
          ...prev,
          list: formatResponse
        }));
      }
    
     setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que busca as turmas pela unidade
  const fetchClassByUnit = async (id: string) => {
    try {
      setLoadLabel(true);

      const response = await getAllClassByUnit(Number(id));
      if (response) {
        const formatResponse = response.map((item) => ({ id: item.id.toString(), label: item.descricao }));
        setClasses((prev) => ({
          ...prev,
          list: formatResponse
        }));
      }

     setLoadLabel(false);
    } finally {
      setLoadLabel(false);
    }
  }
  //Função que Seleciona a turma
  const handleSelectClass = async (value: string) => {
    setClasses((prev) => ({ ...prev, selected: value }));
    await fetchStudentByClass(value);
  }
  //Função que Seleciona a Unidade
  const handleSelectUnit = async (value: string) => {
    setUnits((prev) => ({ ...prev, selected: value }));
    await fetchClassByUnit(value);
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
    if (mainContext.tokenData.hierarquia === UserRole.SECRETARY && indicatorsContext.showModal) {
      const cached = sessionStorage.getItem("class-sme");
      if (cached) {
        const parsed = JSON.parse(cached);
        setUnits((prev) => ({
          ...prev,
          list: parsed.classesSme
        }))
      } else {
        fetchDataSME();
      }
    } else if (mainContext.tokenData.hierarquia === UserRole.COORDINATOR && indicatorsContext.showModal) {
      const cached = sessionStorage.getItem("class-cood");
      if (cached) {
        const parsed = JSON.parse(cached);
        setClasses((prev) => ({
          ...prev,
          list: parsed.classesCood
        }));
      } else {
        fetchDataCood();
      }
    } else if (mainContext.tokenData.hierarquia === UserRole.TEACHER && indicatorsContext.showModal) {
      const cached = sessionStorage.getItem("class-teacher");
      if (cached) {
        const parsed = JSON.parse(cached);
        setClasses((prev) => ({
          ...prev,
          list: parsed.classesTeacher
        }))
      } else {
        fetchDataTeacher();
      }
    }
  }, [indicatorsContext.showModal]);

  return { units, classes, handleConfirm, loadLabel, students, handleSelectClass, handleSelectStudent, handleSelectUnit };
}