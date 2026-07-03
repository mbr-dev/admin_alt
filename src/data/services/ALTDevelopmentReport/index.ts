import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ALTDevelopmentReportService } from "@/data/models";

export function ALTDevelopmentReport() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getGeneralDevelopmentIndex = useCallback(
    async (
      params: ALTDevelopmentReportService.IALTDevelopmentReportQueryParams
    ): Promise<ALTDevelopmentReportService.IGetGeneralDevelopmentIndexResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `altDevelopmentReport/generalDevelopmentIndex?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentReportService.IGetGeneralDevelopmentIndexResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Relatório de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getPerformanceSubtag = useCallback(
    async (
      params: ALTDevelopmentReportService.IALTDevelopmentReportQueryParams
    ): Promise<ALTDevelopmentReportService.IGetPerformanceSubtagResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `altDevelopmentReport/performanceSubtag?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentReportService.IGetPerformanceSubtagResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Relatório de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getCompetencyTree = useCallback(
    async (
      params: ALTDevelopmentReportService.IALTDevelopmentReportQueryParams
    ): Promise<ALTDevelopmentReportService.IGetCompetencyTreeResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `altDevelopmentReport/competencyTree?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentReportService.IGetCompetencyTreeResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Relatório de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getEvolutionAltTag = useCallback(
    async (
      params: ALTDevelopmentReportService.IALTDevelopmentReportQueryParams
    ): Promise<ALTDevelopmentReportService.IGetEvolutionAltTagResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `altDevelopmentReport/evolutionAltTag?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentReportService.IGetEvolutionAltTagResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Relatório de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getDistributionActivitiesPerformed = useCallback(
    async (
      params: ALTDevelopmentReportService.IALTDevelopmentReportQueryParams
    ): Promise<ALTDevelopmentReportService.IGetDistributionActivitiesPerformedResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `altDevelopmentReport/distributionActivitiesPerformed?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ALTDevelopmentReportService.IGetDistributionActivitiesPerformedResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({
          title: "Relatório de Desenvolvimento",
          description: errorMessage,
          variant: "destructive",
        });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return {
    getGeneralDevelopmentIndex,
    getPerformanceSubtag,
    getCompetencyTree,
    getEvolutionAltTag,
    getDistributionActivitiesPerformed,
  };
}
