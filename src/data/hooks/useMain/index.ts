import { useContext } from "react";
import { MainContext } from "@/data/contexts";

export const useMain = () => {
  return useContext(MainContext);
}