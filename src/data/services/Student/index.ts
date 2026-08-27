import { useCallback } from "react";
import { useApi, useToast } from "@/data/hooks";
import { StudentService } from "@/data/models";
import { formatValidationErrorDescription } from "@/data/constants";

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

  const getAllStudentsNetwork = useCallback(
    async (id_rede: number, page = 1, limit = 10, nome = "") => {
      try {
        const nomeQuery = nome ? `&nome=${encodeURIComponent(nome)}` : "";
        const { data } = await api.get(`student/getAllStudentsNetwork/${id_rede}?page=${page}&limit=${limit}${nomeQuery}`);
        if (data) return data;
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

  const createClinicStudent = useCallback(
    async (dataToSend: StudentService.ICreateClinicStudentPayload) => {
      try {
        const { data } = await api.post("clinicStudent/createClinicStudent", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = formatValidationErrorDescription(error);
        console.log(errorMessage);
        toast({ title: "Alunos", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, toast]
  );

  const getClinicStudentByUserId = useCallback(
    async (id: number): Promise<StudentService.IClinicStudentDetails | null> => {
      try {
        const { data } = await api.get(`clinicStudent/getClinicStudentByUserId/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  const updateClinicStudentByUserId = useCallback(
    async (id: number, dataToSend: StudentService.ICreateClinicStudentPayload) => {
      try {
        const { data } = await api.patch(`clinicStudent/updateClinicStudentByUserId/${id}`, dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        const errorMessage = formatValidationErrorDescription(error);
        console.log(errorMessage);
        toast({ title: "Alunos", description: errorMessage, variant: "destructive" });
        return null;
      }
    },
    [api, toast]
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
    async (id: number, dataToSend: unknown) => {
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

  return {
    getStudentsByUnitPaged,
    getAllStudentsNetwork,
    getUnitById,
    verifyUser,
    registerStudent,
    createClinicStudent,
    getClinicStudentByUserId,
    updateClinicStudentByUserId,
    deleteStudentByUserId,
    updateStudentByUserId,
  };
}