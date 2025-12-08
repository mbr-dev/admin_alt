import * as S from "./styles";
import { Animations } from "./components";
import { ImgSVG } from "@/components/images";

export const Loading = () => {

  return (
    <S.Container>
      <Animations />
      <S.Main>
        <img src={ImgSVG.MbrLogoWhite} alt="MBR Educational Technology Logo!" />
      </S.Main>
    </S.Container>
  )
}