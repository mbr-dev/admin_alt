import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { AltSessionService } from "@/data/models";

export function ATLSession() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const createAltSession = useCallback(
    async (dataToSend: AltSessionService.ICreateAltSessionPayload) => {
      try {
        const { data } = await api.post("altSession/createAltSession", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const updateAltSessionById = useCallback(
    async (id: number, dataToSend: AltSessionService.IUpdateAltSessionPayload) => {
      try {
        const { data } = await api.patch(`altSession/updateAltSessionById/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const changeAltSessionStatusById = useCallback(
    async (id: number, dataToSend: AltSessionService.IChangeAltSessionStatusPayload) => {
      try {
        const { data } = await api.patch(`altSession/changeAltSessionStatusById/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getAltSessionsByNetwork = useCallback(
    async (params: AltSessionService.IGetAltSessionsByNetworkParams): Promise<AltSessionService.IGetAltSessionsByNetworkResponse | null> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("id_unidade_rede", String(params.id_unidade_rede));
        searchParams.set("page", String(params.page ?? 1));
        searchParams.set("limit", String(params.limit ?? 10));

        if (params.id_unidade) searchParams.set("id_unidade", String(params.id_unidade));
        if (params.nome_profissional) searchParams.set("nome_profissional", params.nome_profissional);
        if (params.nome_aluno) searchParams.set("nome_aluno", params.nome_aluno);
        if (params.tipo_sessao) searchParams.set("tipo_sessao", params.tipo_sessao);
        if (params.periodo_data) searchParams.set("periodo_data", params.periodo_data);
        if (params.status) searchParams.set("status", params.status);

        const { data } = await api.get(`altSession/getAltSessionsByNetwork?${searchParams.toString()}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getAltSessionById = useCallback(
    async (id: number): Promise<AltSessionService.IAltSession | null> => {
      try {
        const { data } = await api.get(`altSession/getAltSessionById/${id}`);
        if (!data) return null;
        if (typeof data === "object" && data !== null && "data" in data && data.data) return data.data as AltSessionService.IAltSession;
        return data as AltSessionService.IAltSession;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getMedicalRecordQuestions = useCallback(
    async (): Promise<AltSessionService.IGetMedicalRecordQuestionsResponse | null> => {
      try {
        const { data } = await api.get("altSession/getMedicalRecordQuestions");
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const createMedicalRecordSession = useCallback(
    async (dataToSend: AltSessionService.ICreateMedicalRecordSessionItem[]) => {
      try {
        const { data } = await api.post("altSession/createMedicalRecordSession", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getMedicalRecordSessionBySessionId = useCallback(
    async (id_sessao: number): Promise<AltSessionService.ICreateMedicalRecordSessionItem[] | null> => {
      try {
        const { data } = await api.get(`altSession/getMedicalRecordSessionBySessionId/${id_sessao}`);
        if (!data) return null;
        if (Array.isArray(data)) return data as AltSessionService.ICreateMedicalRecordSessionItem[];
        if (typeof data === "object" && data !== null && "data" in data && Array.isArray(data.data)) {
          return data.data as AltSessionService.ICreateMedicalRecordSessionItem[];
        }
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const updateMedicalRecordSessionBySessionId = useCallback(
    async (id_sessao: number, dataToSend: AltSessionService.IUpdateMedicalRecordSessionBySessionIdPayload) => {
      try {
        const { data } = await api.patch(`altSession/updateMedicalRecordSessionBySessionId/${id_sessao}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Sessões ALT", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return {
    createAltSession,
    updateAltSessionById,
    changeAltSessionStatusById,
    getAltSessionsByNetwork,
    getAltSessionById,
    getMedicalRecordQuestions,
    createMedicalRecordSession,
    getMedicalRecordSessionBySessionId,
    updateMedicalRecordSessionBySessionId,
  };
}
