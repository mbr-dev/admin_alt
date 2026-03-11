import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { CidService } from "@/data/models";

export function CID() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getAllCidGrouped = useCallback(async (): Promise<CidService.IGetAllCidGroupedResponse | null> => {
    try {
      const { data } = await api.get("cid/getAllCidGrouped");
      if (data) return data;
      return null;
    } catch (error) {
      const errorMessage = get_error(error);
      console.log(errorMessage);
      toast({ title: "CID", description: errorMessage, variant: "destructive" });
      return null;
    }
  }, [api, get_error, toast]);

  return { getAllCidGrouped };
}
