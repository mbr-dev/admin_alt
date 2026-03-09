import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { UnitService } from "@/data/models";

export function Unit() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const createUnit = useCallback(
    async (dataToSend: UnitService.IUnitRegister) => {
      try {
        const { data } = await api.post("unit/createUnit", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Unidade", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const updateUnitById = useCallback(
    async (id: number, dataToSend: Partial<UnitService.IUnitRegister>) => {
      try {
        const { data } = await api.patch(`unit/updateUnitById/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Unidade", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const deleteUnitById = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.patch(`unit/patch_unit_deleteUnitById/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Unidade", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getAllUnitByNetworkIdPaged = useCallback(
    async (
      id: number,
      page: number,
      descriptionQuery = ""
    ): Promise<UnitService.IUnitByNetworkPg[] | UnitService.IUnitByNetworkPgResponse | null> => {
      try {
        const { data } = await api.get(`unit/getAllUnitByNetworkIdPaged?id=${id}&page=${page}&limit=10${descriptionQuery}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Unidade", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const getUnitById = useCallback(
    async (id: number): Promise<UnitService.IUnitById | null> => {
      try {
        const { data } = await api.get(`unit/getUnitById/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Unidade", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  return { createUnit, updateUnitById, deleteUnitById, getAllUnitByNetworkIdPaged, getUnitById };
}
