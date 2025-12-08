import * as S from "./styles";
import { ImgSVG } from "@/components/images";

export const Animations = () => {
  return (
    <>
      <S.Pincel><img src={ImgSVG.Pincel} alt="Pincel" /></S.Pincel>
      <S.Emoji><img src={ImgSVG.Emoji1} alt="Emoji" /></S.Emoji>
      <S.Nuvem1><img src={ImgSVG.Nuvem1} alt="Nuven" /></S.Nuvem1>
      <S.Nuvem2><img src={ImgSVG.Nuvem3} alt="Nuven" /></S.Nuvem2>
      <S.Bolha><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha>
      <S.Bolha2><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha2>
      <S.Bolha3><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha3>
      <S.Numero1><img src={ImgSVG.Numero1} alt="Numero 1" /></S.Numero1>
    </>
  )
}