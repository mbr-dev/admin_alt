import * as S from "./styles";
import { cn } from "@/lib/utils";
import { useStorage } from "@/data/hooks";
import { useStudents } from "../../hook";
import { UserRole } from "@/data/constants/user-roles";

export const SelectType = () => {
  const { getData } = useStorage();
  const studentsContext = useStudents();

  const TYPES = [
    {id:0,label:"Listar Alunos",hierarquia:[UserRole.TEACHER, UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.ADMIN]},
    {id:1,label:"Registrar Aluno",hierarquia:[UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.ADMIN]}
  ];

  return (
    <S.Container>
      {TYPES.map((item) => {
        return item.hierarquia.includes(Number(getData("hierarquia"))) && (
          <S.Button
            key={item.id}
            onClick={() => studentsContext.setSelectType(item.id)}
            className={cn(studentsContext.selectType === item.id && "bg-mbr-red-20")}
          >
            {item.label}
          </S.Button>
        )
      })}
    </S.Container>
  )
}