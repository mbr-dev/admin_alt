import * as S from "./styles";
import { Animations } from "./components";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";
import { useMain, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";

export const Genius = () => {
  const { t } = useTranslation("home");
  const mainContext = useMain();
  const { getData } = useStorage();

  const GENIUS_IMG = [
    "",
    "https://plataformadev.mbrplay.com.br/assets/genius_wallpaper-Cmq-GLUK.svg",
    "https://plataformadev.mbrplay.com.br/assets/genius_wallpaper_1-DDmd6-UB.svg",
    "https://plataformadev.mbrplay.com.br/assets/genius_wallpaper_2-B1czChHV.svg"
  ];

  return (
    <S.Container>
      <Animations />

      <S.Main>
        <S.Div>
          <S.Genio2>
            <img src={GENIUS_IMG[Number(getData("id_idioma"))]} alt="Genio" />
          </S.Genio2>
          {(mainContext.tokenData.hierarquia === UserRole.STUDENT || mainContext.tokenData.hierarquia === UserRole.TEACHER) &&
            <S.ButtonPlay>{t("button_play")}</S.ButtonPlay>}
        </S.Div>

        <S.Genio>
          <img src={ImgSVG.GeniusBtn} alt="Genio" />
        </S.Genio>
      </S.Main>
    </S.Container>
  )
}