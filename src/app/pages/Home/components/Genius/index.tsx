import * as S from "./styles";
import { Animations } from "./components";
import { ImgSVG } from "@/components/images";
import { TypeAnimation } from "react-type-animation";

export const Genius = () => {
  return (
    <S.Container>
      <Animations />

      <S.Main>
        <S.Div>
          <TypeAnimation
            sequence={[
              `BEM VINDO`,
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontWeight: "bold", display: "inline-block" }}
            repeat={Infinity}
          />
        </S.Div>

        <S.Kid>
          <img src={ImgSVG.Kid} alt="" />
        </S.Kid>
      </S.Main>
    </S.Container>
  )
}