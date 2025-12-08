import { useMain } from "@/data/hooks";
import * as ICDC from "./didactic-model";
import { Didactic } from "@/data/services";
import { ProjectInfosService } from "@/data/models";
import { useState, createContext, useEffect } from "react";
import { UserRole } from "@/data/constants/user-roles";

export const DidacticContext = createContext({} as ICDC.IDidacticContext);

export function DidacticContextProvider({ children }: ICDC.IDidacticContextProvider) {
  const mainContext = useMain();
  const { getStudentProjectInfoWithModules, getAllProjectModuleActivityByModule, getProjectInfosWithModules } = Didactic();;

  const [data, setData] = useState<ProjectInfosService.IProjectInfosService | null>(null);
  const [modules, setModules] = useState<ProjectInfosService.IProjectInfosModule[]>([]);
  const [activities, setActivities] = useState<ProjectInfosService.IProjectActivity[]>([]);
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const [activitySelectedTitle, setActivitySelectedTitle] = useState<string>("");
  const [showGame, setShowGame] = useState<boolean>(false);
  const [selected, setSelected] = useState<ICDC.ISelected>({ id_atividade: 0, id_modulo: 0 });
  //Função que busca os dados para Didactic
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = mainContext.tokenData.hierarquia === UserRole.STUDENT ?
        await getStudentProjectInfoWithModules(1)
        :
        await getProjectInfosWithModules(1);
    
      if (response) {
        setData(response);
        setModules(response.modulos);
        //Salva os dados no session storage
        const sessionData = {
          module: response
        };

        sessionStorage.setItem("didactic-module", JSON.stringify(sessionData));
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }
  //Função que buscas as atividade
  const fetchActivities = async (data: ProjectInfosService.IProjectInfosModule) => {
    try {
      mainContext.setLoad(true);

      const response = await getAllProjectModuleActivityByModule(data.id);
      if (response) {
        setActivities(response);
        setShowActivities(true);
        setActivitySelectedTitle(data.descricao);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }
  //Função que fecha a atividades
  const handleClose = () => {
    setShowActivities(false);
    setActivities([]);
    setActivitySelectedTitle("");
  }
  //Função que pega a atividade
  const handleGetActivity = (data: ProjectInfosService.IProjectActivity) => {
    setSelected({ id_modulo: data.id_modulo, id_atividade: data.atividade_id });
    setShowGame(true);
  }

  useEffect(() => {
    const cached = sessionStorage.getItem("didactic-module");

    if (cached) {
      const parsed = JSON.parse(cached);
      setData(parsed.module);
      setModules(parsed.module.modulos);
    } else {
      fetchData();
    }
  }, []);

  return (
    <DidacticContext.Provider value={{ data, handleClose, handleGetActivity, activitySelectedTitle, showActivities, activities, selected, fetchActivities, showGame, setShowGame, modules }}>
      {children}
    </DidacticContext.Provider>
  );
}