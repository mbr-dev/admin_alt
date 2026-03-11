import * as ISC from "./students-model";
import { Student } from "@/data/services";
import { StudentService } from "@/data/models";
import { useMain, useStorage } from "@/data/hooks";
import { createContext, useEffect, useState } from "react";

export const StudentsContext = createContext({} as ISC.IStudentsContext);

export function StudentsContextProvider({ children }: ISC.IStudentsContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();
  const { getAllStudentsNetwork } = Student();
  
  const [selectType, setSelectType] = useState<number>(0);
  const [students, setStudents] = useState<StudentService.IStudent[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterName, setFilterName] = useState<string>("");
  const [totalOfPages, setTotalOfPages] = useState<number>(0);
  const [selectedData, setSelectedData] = useState<StudentService.IStudent | null>(null);
  const [showData, setShowData] = useState<boolean>(false);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      mainContext.setLoad(true);
      setIsTableLoading(true);

      const response = await getAllStudentsNetwork(Number(getData("id_rede")), currentPage, 10, filterName);
      if (!response) {
        setStudents([]);
        setTotalOfPages(1);
        return;
      }

      if (Array.isArray(response)) {
        setStudents(response);
        setTotalOfPages(1);
        return;
      }

      setStudents(response.data ?? []);
      setTotalOfPages(response.totalPages > 0 ? response.totalPages : 1);
    } finally {
      setIsTableLoading(false);
      mainContext.setLoad(false);
    }
  };

  const handleShowData = (open: boolean, data: StudentService.IStudent | null) => {
    setShowData(open);
    setSelectedData(data);

    if (!open) {
      void fetchData();
    }
  };

  useEffect(() => {
    if (selectType === 0) void fetchData();
  }, [selectType, currentPage, filterName]);

  return (
    <StudentsContext.Provider
      value={{
        selectType,
        handleShowData,
        setSelectType,
        students,
        totalOfPages,
        currentPage,
        setCurrentPage,
        selectedData,
        showData,
        filterName,
        setFilterName,
        fetchData,
        isTableLoading,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}