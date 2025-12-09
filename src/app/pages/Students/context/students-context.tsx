import * as ISC from "./students-model";
import { Student } from "@/data/services";
import { StudentService } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { createContext, useEffect, useState } from "react";

export const StudentsContext = createContext({} as ISC.IStudentsContext);

export function StudentsContextProvider({ children }: ISC.IStudentsContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();
  const { getStudentsByUnitPaged } = Student();
  
  const [selectType, setSelectType] = useState<number>(0);
  const [students, setStudents] = useState<StudentService.IStudent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOfPages, setTotalOfPages] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<StudentService.IStudent | null>(null);
  const [showData, setShowData] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = await getStudentsByUnitPaged(Number(getData("id_unidade")), currentPage);
      if (response.data) {
        setStudents(response.data);
        setTotalOfPages(response.totalPages);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  };

  const handleShowData = (open: boolean, data: StudentService.IStudent | null) => {
    setShowData(open);
    setSelectedData(data);

    if (!open && selectType === 0) {
      fetchData();
    }
  };

  useEffect(() => {
    if (selectType === 0) fetchData();
  }, [selectType, currentPage]);

  return (
    <StudentsContext.Provider value={{ selectType, handleShowData, setSelectType, students, totalOfPages, currentPage, setCurrentPage, selectedData, showData }}>
      {children}
    </StudentsContext.Provider>
  );
}