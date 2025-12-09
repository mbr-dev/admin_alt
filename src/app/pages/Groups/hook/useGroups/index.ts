import { useContext } from "react";
import { GroupsContext } from "../../context";

export const useGroups = () => {
  return useContext(GroupsContext);
}