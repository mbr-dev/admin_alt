import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ReportUserSessionService } from "@/data/models";

export function ReportUserSession() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const fetchReport = useCallback(
    async (
      path: string,
      params: ReportUserSessionService.IReportUserSessionQueryParams
    ): Promise<ReportUserSessionService.IReportUserSessionReportResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_usuario", String(params.id_usuario));
        if (params.tipo_sessao) searchParams.set("tipo_sessao", params.tipo_sessao);

        const { data } = await api.get(`reportUserSession/${path}?${searchParams.toString()}`);
        if (!data) return null;
        return data as ReportUserSessionService.IReportUserSessionReportResponse;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Relatório da sessão", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getEvolution = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("evolution", params),
    [fetchReport]
  );

  const getTypeActivity = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("type_activity", params),
    [fetchReport]
  );

  const getAreasWorked = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("areas_worked", params),
    [fetchReport]
  );

  const getSupportLevel = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("support_level", params),
    [fetchReport]
  );

  const getAttention = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("attention", params),
    [fetchReport]
  );

  const getEmotionalRegulation = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("emotional_regulation", params),
    [fetchReport]
  );

  const getBehaviors = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("behaviors", params),
    [fetchReport]
  );

  const getBehaviorFunction = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("behavior_function", params),
    [fetchReport]
  );

  const getStrategies = useCallback(
    (params: ReportUserSessionService.IReportUserSessionQueryParams) => fetchReport("strategies", params),
    [fetchReport]
  );

  return {
    getEvolution,
    getTypeActivity,
    getAreasWorked,
    getSupportLevel,
    getAttention,
    getEmotionalRegulation,
    getBehaviors,
    getBehaviorFunction,
    getStrategies,
  };
}
