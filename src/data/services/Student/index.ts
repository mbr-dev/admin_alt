import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { StudentService } from "@/data/models";

export function Student() {
  const { toast } = useToast();
  const { api, get_error } = useApi();

  const getStudentsByUnitPaged = useCallback(
    async (id: number, page: number) => {
      try {
        const { data } = await api.get(`unitUser/getStudentsByUnitPaged?id=${id}&page=${page}&limit=10`);
        if (data.data.length > 0) return data;
        return {} as StudentService.IStudent;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const registerStudent = useCallback(
    async (dataToSend: unknown) => {
      try {
        const { data } = await api.post("student/createStudent", dataToSend);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const deleteStudentByUserId = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.patch(`student/deleteStudentByUserId/${id}`);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const updateStudentByUserId = useCallback(
    async (id: number, dataToSend: any) => {
      try {
        const { data } = await api.patch(`student/updateStudentByUserId/${id}`, dataToSend);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const verifyUser = useCallback(
    async (user: string) => {
      try {
        const { data } = await api.get(`user/verifyUser?user=${user}`);
        if (data) {
          toast({ title: "Usuário", description: "Usuário já cadastrado!", variant: "destructive" });
          return data;
        }
        return null;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [toast, api, get_error]
  );

  const getUnitById = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.get(`unit/getUnitById/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  return { getStudentsByUnitPaged, getUnitById, verifyUser, registerStudent, deleteStudentByUserId, updateStudentByUserId };
}