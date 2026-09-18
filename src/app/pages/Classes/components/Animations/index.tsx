import * as S from "./styles";
import { ImgSVG } from "@/components/images";

export function Animations() {
  return (
    <>
      <S.Nuvem1><img src={ImgSVG.Nuvem1} alt="" /></S.Nuvem1>
      <S.Nuvem2><img src={ImgSVG.Nuvem3} alt="" /></S.Nuvem2>
      <S.Nuvem3><img src={ImgSVG.Nuvem3} alt="" /></S.Nuvem3>
      <S.Nuvem4><img src={ImgSVG.Nuvem4} alt="" /></S.Nuvem4>
      <S.Bolha><img src={ImgSVG.Bolha} alt="" /></S.Bolha>
      <S.Bolha2><img src={ImgSVG.Bolha} alt="" /></S.Bolha2>
      <S.Bolha3><img src={ImgSVG.Bolha} alt="" /></S.Bolha3>
      <S.Bolha4><img src={ImgSVG.Bolha} alt="" /></S.Bolha4>
    </>
  );
}
