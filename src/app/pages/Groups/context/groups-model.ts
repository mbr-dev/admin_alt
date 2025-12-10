
import React, { Dispatch, SetStateAction } from "react";
import { ClassService } from "@/data/models";

export interface IGroupsContextProvider {
  children: React.ReactNode;
}

export interface IGroupsContext {
  selectType: number;
  classSelected: number;
  showModalStudent: boolean;
  showModalTeacher: boolean;
  classes: ClassService.IClassService[];
  setSelectType: Dispatch<SetStateAction<number>>;
  handleShowStudent: (open: boolean, id: number) => void;
  handleShowTeacher: (open: boolean, id: number) => void;
  fetchData: () => Promise<void>;
}