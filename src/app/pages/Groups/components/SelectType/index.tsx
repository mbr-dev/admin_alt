import * as S from "./styles";
import { cn } from "@/lib/utils";
import { useStorage } from "@/data/hooks";
import { useGroups } from "../../hook";
import { UserRole } from "@/data/constants/user-roles";

export const SelectType = () => {
  const { getData } = useStorage();
  const groupsContext = useGroups();

  const TYPES = [
    {id:0,label:"Listar Grupos",hierarquia:[UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.ADMIN]},
    {id:1,label:"Registrar Grupo",hierarquia:[UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.ADMIN]}
  ];

  return (
    <S.Container>
      {TYPES.map((item) => {
        return item.hierarquia.includes(Number(getData("hierarquia"))) && (
          <S.Button
            key={item.id}
            onClick={() => groupsContext.setSelectType(item.id)}
            className={cn(groupsContext.selectType === item.id && "bg-mbr-red-20")}
          >
            {item.label}
          </S.Button>
        )
      })}
    </S.Container>
  )
}