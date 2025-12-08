import * as C from "../";
import * as S from "./styles";
import { useStorage } from "@/data/hooks";


export const Container = () => {
  const { getData } = useStorage();

  const componentsByHierarchy = [
    null,
    <C.Coordinator />,
    <C.Coordinator />,
    <C.Teacher />,
    <C.Student />,
    <C.SME />
  ];

  return (
    <S.Container>
      {componentsByHierarchy[Number(getData("hierarquia"))]}
    </S.Container>
  )
}