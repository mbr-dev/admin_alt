
import React, { Dispatch, SetStateAction } from "react";
import { ProjectInfosService } from "@/data/models";

export interface IDidacticContextProvider {
  children: React.ReactNode;
}

export interface IDidacticContext {
  data: ProjectInfosService.IProjectInfosService | null;
  modules: ProjectInfosService.IProjectInfosModule[];
  showGame: boolean;
  showActivities: boolean;
  selected: ISelected;
  activitySelectedTitle: string;
  activities: ProjectInfosService.IProjectActivity[];
  setShowGame: Dispatch<SetStateAction<boolean>>;
  fetchActivities: (data: ProjectInfosService.IProjectInfosModule) => Promise<void>;
  handleClose: () => void;
  handleGetActivity: (data: ProjectInfosService.IProjectActivity) => void;
}

export interface ISelected {
  id_modulo: number;
  id_atividade: number;
}