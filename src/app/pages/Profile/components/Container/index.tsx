import * as S from "./styles";
import { useMain } from "@/data/hooks";
import { Animations, Avatar, InfosCoordinator, InfosStudent, InfosTeacher, ModalEditAvatar } from "../";

export const Container = () => {
  const mainContext = useMain();

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
        {infoByHierarchy[mainContext.tokenData.hierarquia]}
      </S.Main>
    </S.Container>
  )
}