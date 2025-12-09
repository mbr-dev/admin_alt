import * as S from "./styles";
import { useStudents } from "../../hook";
import { SelectType, ModalShow, ListData } from "../";

export const Teacher = () => {
  const studentsContext = useStudents();

  return (
    <S.Container>
      {studentsContext.showData && <ModalShow />}
      <SelectType />

      <S.ListData>
        <ListData />
      </S.ListData>
    </S.Container>
  )
}