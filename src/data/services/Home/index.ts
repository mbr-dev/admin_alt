import { useCallback } from "react";
import { useApi } from "@/data/hooks";

export function Home() {
  const { api, get_error } = useApi();

  const getStudentDatasForHomeALT = useCallback(async () => {
    try {
      const { data } = await api.get("home/getStudentDatasForHomeALT");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  const getTeacherDatasForHomeALTClinic = useCallback(async () => {
    try {
      const { data } = await api.get("home/getTeacherDatasForHomeALTClinic");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  const getSecretaryDatasForHomeALT = useCallback(async () => {
    try {
      const { data } = await api.get("home/getSecretaryDatasForHomeALT");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  const getCoordinatorDatasForHomeALT = useCallback(async () => {
    try {
      const { data } = await api.get("home/getCoordinatorDatasForHomeALT");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  return { getStudentDatasForHomeALT, getTeacherDatasForHomeALTClinic, getSecretaryDatasForHomeALT, getCoordinatorDatasForHomeALT };
}
