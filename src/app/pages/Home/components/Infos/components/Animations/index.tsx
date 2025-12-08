import * as S from "./styles";
import { ImgSVG } from "@/components/images";

export const Animations = () => {
  return (
    <>
      <S.Nuvem1><img src={ImgSVG.Nuvem2} alt="Nuven" /></S.Nuvem1>
      <S.Nuvem2><img src={ImgSVG.Nuvem3} alt="Nuven" /></S.Nuvem2>
      <S.Nuvem3><img src={ImgSVG.Nuvem4} alt="Nuven" /></S.Nuvem3>
      <S.Bolha1><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha1>
      <S.Bolha2><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha2>
      <S.Bolha3><img src={ImgSVG.Bolha} alt="Bolha" /></S.Bolha3>
      <S.Lapis><img src={ImgSVG.Lapis} alt="Lápis" /></S.Lapis>
      <S.Carro><img src={ImgSVG.Carro} alt="Carro" /></S.Carro>
    </>
  )
}