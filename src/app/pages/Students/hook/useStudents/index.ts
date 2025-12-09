import { useContext } from "react";
import { StudentsContext } from "../../context";

export const useStudents = () => {
  return useContext(StudentsContext);
}