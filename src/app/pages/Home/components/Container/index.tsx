import * as C from "../";
import * as S from "./styles";
import { useMain } from "@/data/hooks";


export const Container = () => {
  const mainContext = useMain();

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
      {componentsByHierarchy[mainContext.tokenData?.hierarquia]}
    </S.Container>
  )
}