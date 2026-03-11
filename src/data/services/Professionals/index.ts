import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ProfessionalsService } from "@/data/models";

export function Professionals() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getClinicProfessionalsByNetwork = useCallback(
    async (idNetwork: number, page: number): Promise<ProfessionalsService.IProfessionalByNetworkResponse | null> => {
      try {
        const { data } = await api.get(
          `clinicProfessional/getClinicProfessionalsByNetwork?id_unidade_rede=${idNetwork}&page=${page}`
        );
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Profissionais", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const createClinicProfessional = useCallback(
    async (dataToSend: ProfessionalsService.IProfessionalRegister) => {
      try {
        const { data } = await api.post("clinicProfessional/createClinicProfessional", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Profissionais", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return { getClinicProfessionalsByNetwork, createClinicProfessional };
}
