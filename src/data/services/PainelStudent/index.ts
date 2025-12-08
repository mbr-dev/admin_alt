import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import { StudentService  } from "@/data/models";

export function PainelStudent() {
  const { api, get_error } = useApi();

  const getStudentByStudentId = useCallback(
    async (idUser: number): Promise<StudentService.IStudentService> => {
      try {
        const { data } = await api.get(`student/getStudentByStudentId/${idUser}`);
        return data ?? {} as StudentService.IStudentService;
      } catch (error) {
        console.log(get_error(error));
        return {} as StudentService.IStudentService;
      }
    },
    [api, get_error]
  );

  const studentALTAverage = useCallback(
    async (idUser: number, page: number) => {
      try {
        const { data } = await api.get(`individualReport/studentALTAverage?id_aluno=${idUser}&page=${page}&limit=10`);
        if (data.data.length > 0) {
          return data;
        }
        return {};
      } catch (error) {
        console.log(get_error(error));
        return {};
      }
    },
    [api, get_error]
  );

  const studentALTRounds = useCallback(
    async (idUser: number, page: number) => {
      try {
        const { data } = await api.get(`individualReport/studentALTRounds?id_aluno=${idUser}&page=${page}&limit=10`);
        if (data.data.length > 0) {
          return data;
        }
        return {};
      } catch (error) {
        console.log(get_error(error));
        return {};
      }
    },
    [api, get_error]
  );

  const studentALTFrequency = useCallback(
    async (idUser: number, page: number) => {
      try {
        const { data } = await api.get(`individualReport/studentALTFrequency?id_aluno=${idUser}&page=${page}&limit=10`);
        if (data.data.length > 0) {
          return data;
        }
        return {};
      } catch (error) {
        console.log(get_error(error));
        return {};
      }
    },
    [api, get_error]
  );
  //Esse não é aqui
  const getLogAltTotalStudentPlayed = useCallback(
    async () => {
      try {
        const { data } = await api.get(`logAlt/getLogAltTotalStudentPlayed`);
        console.log(data);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
        return [];
      }
    },
    [api, get_error]
  );

  return { getStudentByStudentId, getLogAltTotalStudentPlayed, studentALTAverage, studentALTRounds, studentALTFrequency };
}