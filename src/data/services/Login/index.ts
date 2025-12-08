import { useCallback } from "react";
import { decodeToken } from "react-jwt";
import { useApi, useToast } from "@/data/hooks";
import { StudentService } from "@/data/models";

export function Login() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const Auth = useCallback(async (dataToSend: any) => {
    try {
      const { data } = await api.post("auth/login", dataToSend);
      if (data?.access_token) {
        const decoded = decodeToken(data.access_token);
        return { ...data, ...(decoded && typeof decoded === "object" ? decoded : {}) };
      }
      return {};
    } catch (error) {
      console.log(get_error(error));
      toast({ title: "Login", description: get_error(error), variant: "destructive" });
    }
  }, [api, get_error]);

  const getUserUnitAndIdByIdUser = useCallback(
    async (id: number): Promise<StudentService.IUserUnitAndId> => {
      try {
        const { data } = await api.get(`unitUser/getUserUnitAndIdByIdUser/${id}`);
        if (data) return data;
        return {} as StudentService.IUserUnitAndId;
      } catch (error) {
        console.log(get_error(error));
        return {} as StudentService.IUserUnitAndId;
      }
    },
    [api, get_error]
  );

  return { Auth, getUserUnitAndIdByIdUser };
}