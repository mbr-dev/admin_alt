import * as S from "./styles";
import { Animations, Coordinator, SME, Teacher } from "..";
import { useStorage } from "@/data/hooks";

export const Container = () => {
  const { getData } = useStorage();

  const infoByHierarchy = [
    null,
    <SME />,
    <Coordinator />,
    <Teacher />,
    null,
  ]
  return (
    <S.Container>
      <Animations />

      <S.Main>
        {infoByHierarchy[Number(getData("hierarquia"))]}
      </S.Main>
    </S.Container>
  )
}