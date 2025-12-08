
import React, { Dispatch, SetStateAction } from "react";

export interface IIndicatorsContextProvider {
  children: React.ReactNode;
}

export interface IIndicatorsContext {
  showModal: boolean;
  showReports: boolean;
  typeSelected: number;
  BUTTONS: any[];
  studentSelected: number;
  setTypeSelected: Dispatch<SetStateAction<number>>;
  setStudentSelected: Dispatch<SetStateAction<number>>;
  setShowReports: Dispatch<SetStateAction<boolean>>;
  handleToggleModal: (open: boolean, type: number) => void;
}