
import React, { Dispatch, SetStateAction } from "react";
import { StudentService } from "@/data/models";

export interface IStudentsContextProvider {
  children: React.ReactNode;
}

export interface IStudentsContext {
  selectType: number;
  totalOfPages: number;
  currentPage: number;
  showData: boolean;
  selectedData: StudentService.IStudent | null;
  students: StudentService.IStudent[];
  setSelectType: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  handleShowData: (open: boolean, data: StudentService.IStudent | null) => void;
}