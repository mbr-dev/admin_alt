import * as S from "./styles";
import { ImgSVG } from "@/components/images";

export const Animations = () => {
  return (
    <>
      <S.Banana><img src={ImgSVG.Banana} alt="Banana" /></S.Banana>
      <S.Coracao><img src={ImgSVG.Coracao} alt="Coração" /></S.Coracao>
      <S.Nuvem1><img src={ImgSVG.Nuvem1} alt="Nuven" /></S.Nuvem1>
      <S.Nuvem3><img src={ImgSVG.Nuvem3} alt="Nuven" /></S.Nuvem3>
      <S.Nuvem4><img src={ImgSVG.Nuvem4} alt="Nuven" /></S.Nuvem4>
      <S.LetraA><img src={ImgSVG.LetraA} alt="Letra A" /></S.LetraA>
      <S.Bolha><img src={ImgSVG.Bolha} alt="Nuven" /></S.Bolha>
      <S.Bolha2><img src={ImgSVG.Bolha} alt="Nuven" /></S.Bolha2>
      <S.Bolha3><img src={ImgSVG.Bolha} alt="Nuven" /></S.Bolha3>
    </>
  )
}