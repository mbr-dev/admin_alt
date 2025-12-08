import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import { ProjectInfosService } from "@/data/models";

export function Didactic() {
  const { api, get_error } = useApi();

  const getStudentProjectInfoWithModules = useCallback(
    async (id: number): Promise<ProjectInfosService.IProjectInfosService | null> => {
      try {
        const { data } = await api.get(`projectInfos/getStudentProjectInfoWithModules/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  const getProjectInfosWithModules = useCallback(
    async (id: number): Promise<ProjectInfosService.IProjectInfosService | null> => {
      try {
        const { data } = await api.get(`projectInfos/getProjectInfosWithModules/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  const getAllProjectModuleActivityByModule = useCallback(
    async (id: number): Promise<ProjectInfosService.IProjectActivity[]> => {
      try {
        const { data } = await api.get(`projectModuleActivity/getAllProjectModuleActivityByModule/${id}`);
        if (data.length > 0) return data;
        return [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  return { getStudentProjectInfoWithModules, getAllProjectModuleActivityByModule, getProjectInfosWithModules };
}
