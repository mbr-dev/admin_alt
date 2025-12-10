import * as IGC from "./groups-model";
import { useMain, useStorage } from "@/data/hooks";
import { Indicators } from "@/data/services";
import { ClassService } from "@/data/models";
import { createContext, useEffect, useState } from "react";

export const GroupsContext = createContext({} as IGC.IGroupsContext);

export function GroupsContextProvider({ children }: IGC.IGroupsContextProvider) {
  const mainContext = useMain();
  const { getData } = useStorage();
  const { getAllClassByUnit } = Indicators();

  const [selectType, setSelectType] = useState<number>(0);//Depois voltar para -1
  const [classes, setClasses] = useState<ClassService.IClassService[]>([]);
  const [classSelected, setClassSelected] = useState<number>(0);
  const [showModalStudent, setShowModalStudent] = useState<boolean>(false);
  const [showModalTeacher, setShowModalTeacher] = useState<boolean>(false);
  //Busca os dados do grupo
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = await getAllClassByUnit(Number(getData("id_unidade")));
      if (response) {
        setClasses(response);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }

  const handleShowStudent = (open: boolean, id: number) => {
    if (open) setClassSelected(id);
    setShowModalStudent(open);
  };

  const handleShowTeacher = (open: boolean, id: number) => {
    if (open) setClassSelected(id);
    setShowModalTeacher(open);
  };

  useEffect(() => {
    if (selectType === 0) fetchData();
  }, [selectType]);

  return (
    <GroupsContext.Provider value={{ selectType, setSelectType, classes, classSelected, handleShowStudent, handleShowTeacher, showModalStudent, showModalTeacher, fetchData }}>
      {children}
    </GroupsContext.Provider>
  );
}