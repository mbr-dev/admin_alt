import * as S from "./styles";
import { useStorage } from "@/data/hooks";
import { Animations, Avatar, InfosCoordinator, InfosStudent, InfosTeacher, ModalEditAvatar } from "../";

export const Container = () => {
  const { getData } = useStorage();

  const infoByHierarchy = [
    null,
    null,
    <InfosCoordinator />,
    <InfosTeacher />,
    <InfosStudent />,
  ]
  return (
    <S.Container>
      <Animations />
      <ModalEditAvatar />

      <S.Main>
        <Avatar />
        {infoByHierarchy[Number(getData("hierarquia"))]}
      </S.Main>
    </S.Container>
  )
}