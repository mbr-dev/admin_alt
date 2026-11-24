import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { ClassService, ClassStudentService, ClassTeacherService } from "@/data/models";

export function Class() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const getAllClassByUnit = useCallback(
    async (id: number): Promise<ClassService.IClassService[]> => {
      try {
        const { data } = await api.get(`class/getAllClassByUnit/${id}`);
        return data ?? [];
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return [];
      }
    },
    [api, get_error, toast]
  );

  const createClass = useCallback(
    async (dataToSend: ClassService.IClassRegister) => {
      try {
        const { data } = await api.post("class/createClass", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const updateClassById = useCallback(
    async (id: number, dataToSend: Partial<ClassService.IClassRegister>) => {
      try {
        const { data } = await api.patch(`class/updateClassById/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const deleteClassById = useCallback(
    async (id: number) => {
      try {
        await api.patch(`class/deleteClassById/${id}`);
        return true;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return false;
      }
    },
    [api, get_error, toast]
  );

  const getAllStudentByClass = useCallback(
    async (id: number): Promise<ClassStudentService.IClassStudentService[]> => {
      try {
        const { data } = await api.get(`classStudent/getAllStudentByClass/${id}`);
        return data ?? [];
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return [];
      }
    },
    [api, get_error, toast]
  );

  const getAllTeachersByClass = useCallback(
    async (id: number): Promise<ClassTeacherService.IClassTeacherService[]> => {
      try {
        const { data } = await api.get(`classTeacher/getAllTeachersByClass/${id}`);
        return data ?? [];
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return [];
      }
    },
    [api, get_error, toast]
  );

  const getClassById = useCallback(
    async (id: number): Promise<ClassService.IClassService | null> => {
      try {
        const { data } = await api.get(`class/getClassById/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Turmas", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, get_error, toast]
  );

  const verifyCodeClass = useCallback(
    async (code: string): Promise<boolean> => {
      try {
        const { data } = await api.get(`class/verifyCodeClass/${code}`);
        return data === true || data === 1 || data === "true";
      } catch (error) {
        console.log(get_error(error));
        return true;
      }
    },
    [api, get_error]
  );

  return {
    getAllClassByUnit,
    createClass,
    updateClassById,
    deleteClassById,
    getAllStudentByClass,
    getAllTeachersByClass,
    getClassById,
    verifyCodeClass,
  };
}
