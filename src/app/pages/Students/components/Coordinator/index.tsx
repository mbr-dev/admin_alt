import * as S from "./styles";
import { useStudents } from "../../hook";
import { SelectType, ModalShow, ListData, FormStudent } from "..";

export const Coordinator = () => {
  const studentsContext = useStudents();

  return (
    <S.Container>
      {studentsContext.showData && <ModalShow />}
      <SelectType />

      {studentsContext.selectType === 0 && <S.ListData><ListData /></S.ListData>}
      {studentsContext.selectType === 1 && <FormStudent />}
    </S.Container>
  )
}