import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import { ClassStudentService, ClassTeacherService, ClassService, StudentService } from "@/data/models";

export function Classes() {
  const { api, get_error } = useApi();

  const getAllStudentByClass = useCallback(
    async (id: number): Promise<ClassStudentService.IClassStudentService[] | undefined> => {
      try {
        const { data } = await api.get(`classStudent/getAllStudentByClass/${id}`);
        return data ?? [];
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const getStudentsByUnitThatDontHaveClass = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.get(`unitUser/getStudentsByUnitThatDontHaveClass/${id}`);
        if (data.length > 0) return data;
        return [] as StudentService.IStudent[];
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const regiterTeacherToClass = useCallback(
    async (dataToSend: ClassService.IRegisterTeacherToClassService) => {
      try {
        const { data } = await api.post("classTeacher/createClassTeacher", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const deleteClassStudenById = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.patch(`classStudent/deleteClassStudenById/${id}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const deleteClassTeacherById = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.patch(`classTeacher/deleteClassTeacherById/${id}`);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const getAllTeacherByClass = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.get(`classTeacher/getAllTeachersByClass/${id}`);
        if (data.length > 0) return data;
        return [] as ClassTeacherService.IClassTeacherService[];
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const verifyCodeClass = useCallback(
    async (code: string) => {
      try {
        const { data } = await api.get(`class/verifyCodeClass/${code}`);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const registerClass = useCallback(
    async (dataToSend: ClassService.IRegisterClassService) => {
      try {
        const { data } = await api.post("class/createClass", dataToSend);
        if (data) return data;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const getTeachersByUnit = useCallback(
    async (id: number) => {
      try {
        const { data } = await api.get(`unitUser/getTeachersByUnit/${id}`);
        if (data.length > 0) return data;
        return [] as StudentService.IStudent[];
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  const regiterStudentToClass = useCallback(
    async (dataToSend: ClassService.IRegisterStudentToClassService) => {
      try {
        const { data } = await api.post("classStudent/createClassStudent", dataToSend);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
      }
    },
    [api, get_error]
  );

  return { getAllStudentByClass, regiterStudentToClass, getTeachersByUnit, registerClass, getStudentsByUnitThatDontHaveClass, verifyCodeClass, regiterTeacherToClass, getAllTeacherByClass, deleteClassStudenById, deleteClassTeacherById };
}
