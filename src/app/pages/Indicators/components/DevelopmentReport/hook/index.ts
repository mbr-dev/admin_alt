import { useState, useEffect, useCallback, RefObject } from "react";
import { useIndicators } from "../../../hook";
import { StudentService, ALTDevelopmentReportService } from "@/data/models";
import { ALTDevelopmentReport, PainelStudent } from "@/data/services";
import { useToast } from "@/data/hooks";
import {
  exportDevelopmentReportPdf,
  sanitizePdfFilename,
} from "../utils/exportDevelopmentReportPdf";

export const useDevelopmentReport = (reportRef: RefObject<HTMLDivElement | null>) => {
  const indicatorsContext = useIndicators();
  const { toast } = useToast();
  const {
    getGeneralDevelopmentIndex,
    getPerformanceSubtag,
    getCompetencyTree,
    getEvolutionAltTag,
    getDistributionActivitiesPerformed,
  } = ALTDevelopmentReport();
  const { getStudentByStudentId } = PainelStudent();

  const [loading, setLoading] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<StudentService.IStudentService | null>(null);
  const [generalIndex, setGeneralIndex] =
    useState<ALTDevelopmentReportService.IGetGeneralDevelopmentIndexResponse | null>(null);
  const [performance, setPerformance] =
    useState<ALTDevelopmentReportService.IGetPerformanceSubtagResponse | null>(null);
  const [evolution, setEvolution] =
    useState<ALTDevelopmentReportService.IGetEvolutionAltTagResponse | null>(null);
  const [distribution, setDistribution] =
    useState<ALTDevelopmentReportService.IGetDistributionActivitiesPerformedResponse | null>(null);
  const [competencyTree, setCompetencyTree] =
    useState<ALTDevelopmentReportService.IGetCompetencyTreeResponse | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const studentId = Number(indicatorsContext.studentSelected);

      const student = await getStudentByStudentId(studentId);
      if (student) setStudentData(student);

      const userId = Number(student?.id_usuario);
      if (!userId) {
        setGeneralIndex(null);
        setPerformance(null);
        setEvolution(null);
        setDistribution(null);
        setCompetencyTree(null);
        return;
      }

      const [general, performanceSubtag, competencyTreeData, evolutionAltTag, distributionActivities] =
        await Promise.all([
          getGeneralDevelopmentIndex({ id_usuario: userId }),
          getPerformanceSubtag({ id_usuario: userId }),
          getCompetencyTree({ id_usuario: userId }),
          getEvolutionAltTag({ id_usuario: userId }),
          getDistributionActivitiesPerformed({ id_usuario: userId }),
        ]);

      setGeneralIndex(general);
      setPerformance(performanceSubtag);
      setCompetencyTree(competencyTreeData);
      setEvolution(evolutionAltTag);
      setDistribution(distributionActivities);
    } finally {
      setLoading(false);
    }
  };

  //Função que muda de relatório (o Container troca para o PainelStudent quando id !== 3)
  const handleChangeReport = (id: number) => {
    if (id === indicatorsContext.typeSelected) return;
    indicatorsContext.setTypeSelected(id);
  };

  const handleBack = () => {
    setStudentData(null);
    setGeneralIndex(null);
    setPerformance(null);
    setEvolution(null);
    setDistribution(null);
    setCompetencyTree(null);
    indicatorsContext.handleToggleModal(false, -1);
    indicatorsContext.setShowReports(false);
  };

  const handleDownload = useCallback(async () => {
    const element = reportRef.current;
    if (loading || isExporting || !element) return;

    try {
      setIsExporting(true);
      window.dispatchEvent(new Event("resize"));
      await new Promise((resolve) => window.setTimeout(resolve, 600));
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

      const studentSlug = sanitizePdfFilename(studentData?.nome ?? "aluno");
      await exportDevelopmentReportPdf(element, `relatorio-desenvolvimento-${studentSlug}.pdf`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Relatório de Desenvolvimento",
        description: "Não foi possível gerar o PDF do relatório.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  }, [loading, isExporting, reportRef, studentData?.nome, toast]);

  useEffect(() => {
    if (indicatorsContext.showReports && indicatorsContext.typeSelected === 3) {
      fetchData();
    }
  }, [indicatorsContext.showReports, indicatorsContext.studentSelected, indicatorsContext.typeSelected]);

  return {
    loading,
    isExporting,
    studentData,
    generalIndex,
    performance,
    competencyTree,
    evolution,
    distribution,
    handleBack,
    handleDownload,
    handleChangeReport,
  };
};
