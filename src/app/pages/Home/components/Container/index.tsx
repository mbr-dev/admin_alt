import * as C from "../";
import * as S from "./styles";
import { useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";

export const Container = () => {
  const { getData } = useStorage();
  const hierarchy = Number(getData("hierarquia"));

  const componentsByHierarchy: Record<number, JSX.Element> = {
    [UserRole.ADMIN]: <C.Coordinator />,
    [UserRole.COORDINATOR]: <C.Coordinator />,
    [UserRole.TEACHER]: <C.Teacher />,
    [UserRole.STUDENT]: <C.Student />,
    [UserRole.SECRETARY]: <C.SME />,
    [UserRole.RESPONSIBLE]: <C.Responsible />,
  };

  return (
    <S.Container>
      {componentsByHierarchy[hierarchy] ?? null}
    </S.Container>
  )
}