import * as S from "./styles";
import * as C from "..";

export const Coordinator = () => {
  return (
    <S.Container>
      <C.Welcome />
      <C.Painel />
      <C.Infos />
    </S.Container>
  )
}