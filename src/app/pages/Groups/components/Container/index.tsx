import * as C from "..";
import * as S from "./styles";
import { useGroups } from "../../hook";

export const Container = () => {
  const groupsContext = useGroups();

  const components = [
    <C.ListClasses />,
    <C.RegisterClass />
  ];

  return (
    <S.Container>
      {groupsContext.showModalStudent &&
        <C.ModalStudent
          classSelected={groupsContext.classSelected}
          fetchData={groupsContext.fetchData}
          handleShowStudent={groupsContext.handleShowStudent}
        />}
      {groupsContext.showModalTeacher &&
        <C.ModalTeacher
          classSelected={groupsContext.classSelected}
          fetchData={groupsContext.fetchData}
          handleShowTeacher={groupsContext.handleShowTeacher}
        />}
      <C.Animations />
      <C.SelectType />

      <S.Main>
        {components[groupsContext.selectType]}
      </S.Main>
    </S.Container>
  )
}