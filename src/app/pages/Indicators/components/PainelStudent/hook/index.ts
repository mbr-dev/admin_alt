import { useMain } from "@/data/hooks";
import { useState, useEffect } from "react";
import { useIndicators } from "../../../hook";
import { StudentService } from "@/data/models";
import { PainelStudent } from "@/data/services";

export const usePainelStudent = () => {
  const mainContext = useMain();
  const indicatorsContext = useIndicators();
  const { getStudentByStudentId, studentALTAverage, studentALTRounds, studentALTFrequency } = PainelStudent();

  const [reportData, setReportData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(0);
  const [showIAP, setShowIAP] = useState<boolean>(false);
  const [showICA, setShowICA] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<StudentService.IStudentService | null>(null);
  //Função que busca os dados para PainelStudent
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);
      //Busca informação do aluno
      const response = await getStudentByStudentId(Number(indicatorsContext.studentSelected));
      if (response) {
        setStudentData(response);
      }
      //Busca os dados do relatório pelo tipo
      const responseReport = 
        indicatorsContext.typeSelected === 0 ? await studentALTAverage(Number(indicatorsContext.studentSelected), currentPage) :
        indicatorsContext.typeSelected === 1 ? await studentALTRounds(Number(indicatorsContext.studentSelected), currentPage) :
          await studentALTFrequency(Number(indicatorsContext.studentSelected), currentPage)

      if (responseReport) {
        setReportData(responseReport.data);
        setTotalOfPages(responseReport.totalPages);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }
  //Função que muda de relatório
  const handleChangeReport = (id: number) => {
    mainContext.setLoad(true);
    setReportData([]);
    setCurrentPage(1);
    indicatorsContext.setTypeSelected(id);
  }
  //Função que retorna para mudar o aluno
  const handleBack = () => {
    setCurrentPage(1);
    setStudentData(null);
    setTotalOfPages(0);
    setReportData([]);
    indicatorsContext.handleToggleModal(false, -1);
    indicatorsContext.setShowReports(false);
  }
  //Função para ordenar o reportData
  const handleOrderData = (type: number, key: string) => {
    setReportData((prevData) => {
      const sorted = [...prevData].sort((a, b) => {
        const aValue = isNaN(a[key]) ? a[key] : Number(a[key]);
        const bValue = isNaN(b[key]) ? b[key] : Number(b[key]);

        if (aValue < bValue) return type === 0 ? -1 : 1;
        if (aValue > bValue) return type === 0 ? 1 : -1;
        return 0;
      });
      return sorted;
    });
  }
  //Função para mostrar o modal de ICA e IAP
  const handleShowDoubt = (type: number, show: boolean) => {
    if (type === 0) {
      setShowIAP(show);
    } else {
      setShowICA(show);
    }
  }

  useEffect(() => {
    if (indicatorsContext.showReports) {
      fetchData();
    }
  }, [indicatorsContext.showReports, indicatorsContext.typeSelected, currentPage]);

  return { studentData, handleOrderData, setCurrentPage, showIAP, showICA, handleChangeReport, handleBack, totalOfPages, reportData, currentPage, handleShowDoubt };
}