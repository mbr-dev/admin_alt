import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import { ClassTeacherService, ClassStudentService, ClassService, UnitNetworkService, StudentService } from "@/data/models";

export function Indicators() {
  const { api, get_error } = useApi();

  const getAllClassesByTeacher = useCallback(
    async (id: number, idUnit: number): Promise<ClassTeacherService.IClassTeacherService[]> => {
      try {
        const { data } = await api.get(`classTeacher/getAllClassByTeacher?idUser=${id}&idUnit=${idUnit}`);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  const getAllStudentByClass = useCallback(
    async (id: number): Promise<ClassStudentService.IClassStudentService[]> => {
      try {
        const { data } = await api.get(`classStudent/getAllStudentByClass/${id}`);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  const getStudentsByUnit = useCallback(
    async (idUnit: number): Promise<StudentService.IUnitStudent[]> => {
      try {
        const { data } = await api.get(`unitUser/getStudentsByUnit/${idUnit}`);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  const getAllClassByUnit = useCallback(
    async (id: number): Promise<ClassService.IClassService[]> => {
      try {
        const { data } = await api.get(`class/getAllClassByUnit/${id}`);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  const getAllUnitsFromUnitNetworkByUser = useCallback(
    async (id: number): Promise<UnitNetworkService.IUnitNetworkService | null> => {
      try {
        const { data } = await api.get(`unitNetwork/getAllUnitsFromUnitNetworkByUser/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  return { getAllClassesByTeacher, getAllClassByUnit, getAllUnitsFromUnitNetworkByUser, getAllStudentByClass, getStudentsByUnit };
}
