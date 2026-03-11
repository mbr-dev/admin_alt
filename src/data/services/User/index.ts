import { useApi, useToast } from "@/data/hooks";

export function User() {
  const { api, get_error } = useApi();
  const { toast } = useToast();

  const verifyUser = async (userName: string): Promise<boolean | null> => {
    try {
      const { data } = await api.get(`user/verifyUser?user=${encodeURIComponent(userName)}`);

      if (!data) return false;
      if (Array.isArray(data)) return data.length > 0;
      if (typeof data === "object") return Object.keys(data).length > 0;
      if (typeof data === "string") return data.trim() !== "";

      return Boolean(data);
    } catch (error) {
        const errorMessage = get_error(error);
        console.log(errorMessage);
        toast({ title: "Usuário", description: errorMessage, variant: "destructive" });
        return null;
    }
  };

  return { verifyUser };
}
