import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ReportABASessionService } from "@/data/models";

export function ReportABASession() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getABApercentageCorrect = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABApercentageCorrectResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABApercentageCorrect?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABApercentageCorrectResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAaverageHelp = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAaverageHelpResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAaverageHelp?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAaverageHelpResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAlatencyTime = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAlatencyTimeResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAlatencyTime?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAlatencyTimeResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAfrequencyBehavior = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAfrequencyBehaviorResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAfrequencyBehavior?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAfrequencyBehaviorResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAMediumIntensity = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAMediumIntensityResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAMediumIntensity?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAMediumIntensityResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAengagement = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAengagementResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAengagement?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAengagementResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getABAperformance = useCallback(
    async (
      params: ReportABASessionService.IABAQueryParams
    ): Promise<ReportABASessionService.IGetABAperformanceResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));

        const { data } = await api.get(
          `reportUserSession/getABAperformance?${searchParams.toString()}`
        );
        if (!data) return null;
        return data as ReportABASessionService.IGetABAperformanceResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório ABA", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return {
    getABApercentageCorrect,
    getABAaverageHelp,
    getABAlatencyTime,
    getABAfrequencyBehavior,
    getABAMediumIntensity,
    getABAengagement,
    getABAperformance,
  };
}
