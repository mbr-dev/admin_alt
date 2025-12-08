import { useCallback, useMemo } from "react";
import { GetError } from "@/data/constants";
import { useToast } from "..";

import Cookies from "universal-cookie";

export function useStorage() {
  const cookies = useMemo(() => new Cookies(), []);
  const { toast } = useToast();

  const getData = useCallback(
    (key: string) => {
      try {
        return cookies.get(key);
      } catch (error) {
        toast({ title: "Erro nos Cookies!", description: GetError(error), variant: "destructive" });
      }
    },
    [toast, cookies]
  );

  const removeData = useCallback(
    (key: string) => {
      try {
        cookies.remove(key);
        return true;
      } catch (error) {
        toast({ title: "Erro nos Cookies!", description: GetError(error), variant: "destructive" });
      }
    },
    [toast, cookies]
  );

  const setData = useCallback(
    (key: string, value: unknown) => {
      try {
        cookies.set(key, value, { path: "/" });
        return true;
      } catch (error) {
        toast({ title: "Erro nos Cookies!", description: GetError(error), variant: "destructive" });
      }
    },
    [toast, cookies]
  );

  const removeAll = useCallback(() => {
    try {
      Object.keys(cookies.getAll()).forEach((key) => removeData(key));
      localStorage.clear();
      return true;
    } catch (error) {
      toast({ title: "Erro nos Cookies!", description: GetError(error), variant: "destructive" });
    }
  }, [toast, cookies, removeData]);

  return { getData, removeData, setData, removeAll };
}