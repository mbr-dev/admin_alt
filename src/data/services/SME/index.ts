import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { SmeService } from "@/data/models";

export function SME() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getSecretaryByUserId = useCallback(
    async (id: number): Promise<SmeService.ISecretaryByUserId | null> => {
      try {
        const { data } = await api.get(`secretary/getSecretaryByUserId/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "SME", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getSecretaryProfile = useCallback(async (): Promise<SmeService.ISecretaryProfile | null> => {
    try {
      const { data } = await api.get("secretary/getSecretaryProfile");
      if (data) return data;
      return null;
    } catch (error) {
      const errorMessage = get_error(error);
      console.log(errorMessage);
      toast({ title: "SME", description: errorMessage, variant: "destructive" });
      return null;
    }
  }, [api, get_error, toast]);

  const updateSecretaryByUserId = useCallback(
    async (id: number, dataToSend: SmeService.ISecretaryUpdateByUserId) => {
      try {
        const { data } = await api.patch(`secretary/updateSecretaryByUserId/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "SME", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return { getSecretaryByUserId, getSecretaryProfile, updateSecretaryByUserId };
}
