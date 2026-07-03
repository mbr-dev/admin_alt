import { useState, useEffect } from "react";
import { useIndicators } from "../../../hook";
import { StudentService, ALTDevelopmentReportService } from "@/data/models";
import { ALTDevelopmentReport, PainelStudent } from "@/data/services";

export const useDevelopmentReport = () => {
  const indicatorsContext = useIndicators();
  const {
    getGeneralDevelopmentIndex,
    getPerformanceSubtag,
    getEvolutionAltTag,
    getDistributionActivitiesPerformed,
  } = ALTDevelopmentReport();
  const { getStudentByStudentId } = PainelStudent();

  const [loading, setLoading] = useState<boolean>(true);
  const [studentData, setStudentData] = useState<StudentService.IStudentService | null>(null);
  const [generalIndex, setGeneralIndex] =
    useState<ALTDevelopmentReportService.IGetGeneralDevelopmentIndexResponse | null>(null);
  const [performance, setPerformance] =
    useState<ALTDevelopmentReportService.IGetPerformanceSubtagResponse | null>(null);
  const [evolution, setEvolution] =
    useState<ALTDevelopmentReportService.IGetEvolutionAltTagResponse | null>(null);
  const [distribution, setDistribution] =
    useState<ALTDevelopmentReportService.IGetDistributionActivitiesPerformedResponse | null>(null);
  //Busca os dados do relatório de desenvolvimento e as informações do aluno
  const fetchData = async () => {
    try {
      setLoading(true);
      const studentId = Number(indicatorsContext.studentSelected);

      //Busca o aluno primeiro para obter o id_usuario correto usado pelos endpoints do relatório
      const student = await getStudentByStudentId(studentId);
      if (student) setStudentData(student);

      const userId = Number(student?.id_usuario);
      if (!userId) {
        setGeneralIndex(null);
        setPerformance(null);
        setEvolution(null);
        setDistribution(null);
        return;
      }

      const [general, performanceSubtag, evolutionAltTag, distributionActivities] = await Promise.all([
        getGeneralDevelopmentIndex({ id_usuario: userId }),
        getPerformanceSubtag({ id_usuario: userId }),
        getEvolutionAltTag({ id_usuario: userId }),
        getDistributionActivitiesPerformed({ id_usuario: userId }),
      ]);

      setGeneralIndex(general);
      setPerformance(performanceSubtag);
      setEvolution(evolutionAltTag);
      setDistribution(distributionActivities);
    } finally {
      setLoading(false);
    }
  };
  //Retorna para a seleção de aluno/relatório
  const handleBack = () => {
    setStudentData(null);
    setGeneralIndex(null);
    setPerformance(null);
    setEvolution(null);
    setDistribution(null);
    indicatorsContext.handleToggleModal(false, -1);
    indicatorsContext.setShowReports(false);
  };

  useEffect(() => {
    if (indicatorsContext.showReports) {
      fetchData();
    }
  }, [indicatorsContext.showReports, indicatorsContext.studentSelected]);

  return { loading, studentData, generalIndex, performance, evolution, distribution, handleBack };
};
