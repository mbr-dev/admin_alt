import { useContext } from "react";
import { LoginContext } from "../../context";

export const useLogin = () => {
  return useContext(LoginContext);
}