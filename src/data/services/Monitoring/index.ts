import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import {  } from "@/data/models";

export function Monitoring() {
  const { api, get_error } = useApi();

  const getLogAltTotalStudentPlayed = useCallback(
    async () => {
      try {
        const { data } = await api.get("logAlt/getLogAltTotalStudentPlayed");
        return data ?? null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  return { getLogAltTotalStudentPlayed };
}
