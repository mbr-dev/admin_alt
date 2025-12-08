import { useContext } from "react";
import { HomeContext } from "../../context";

export const useHome = () => {
  return useContext(HomeContext);
}