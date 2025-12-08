import * as S from "./styles";
import * as Components from "..";

export const Coordinator = () => {
  return (
    <S.Container>
      <Components.Genius />
      <Components.Painel />
      <Components.Infos />
    </S.Container>
  )
}