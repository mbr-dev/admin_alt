import { useContext } from "react";
import { DidacticContext } from "../../context";

export const useDidactic = () => {
  return useContext(DidacticContext);
}