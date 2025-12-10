import * as S from "./styles";
import { useGroups } from "../../hook";
import { Animations, SelectType, ListClasses, ModalStudent, ModalTeacher } from "..";

export const Container = () => {
  const groupsContext = useGroups();

  const components = [
    <ListClasses />,
    <></>
  ];

  return (
    <S.Container>
      {groupsContext.showModalStudent &&
        <ModalStudent
          classSelected={groupsContext.classSelected}
          fetchData={groupsContext.fetchData}
          handleShowStudent={groupsContext.handleShowStudent}
        />}
      {groupsContext.showModalTeacher &&
        <ModalTeacher
          classSelected={groupsContext.classSelected}
          fetchData={groupsContext.fetchData}
          handleShowTeacher={groupsContext.handleShowTeacher}
        />}
      <Animations />
      <SelectType />

      <S.Main>
        {components[groupsContext.selectType]}
      </S.Main>
    </S.Container>
  )
}