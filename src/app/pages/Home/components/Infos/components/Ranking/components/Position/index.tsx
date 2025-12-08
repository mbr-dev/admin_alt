import * as S from "./styles";
import { cn } from "@/lib/utils";
import { ImgSVG } from "@/components/images";
import { useApi, useStorage } from "@/data/hooks";
import { useTranslation } from "react-i18next";
import { useHome } from "../../../../../../hook";
import { UserRole } from "@/data/constants/user-roles";

export const Position = () => {
  const homeContext = useHome();
  const { URL_FILES } = useApi();
  const { getData } = useStorage();
  const { t } = useTranslation("home");

  return (
    <S.Container className={
      cn("blur-sm",
        (Number(getData("hierarquia")) === UserRole.STUDENT || Number(getData("hierarquia")) === UserRole.TEACHER) && "blur-none")
      }
    >
      <h3>{t("position")}</h3>
      <S.Main>
        <S.Left>
          <S.Avatar>
            <img src={`${URL_FILES}images/avatar/${homeContext.userPosition?.avatar}.png`} alt="icone do avatar" />
          </S.Avatar>
          <p title={homeContext.userPosition?.nome}>{homeContext.userPosition?.nome ?? ""}</p>
        </S.Left>

        <S.Right>
          <S.XPInfo title={homeContext.userPosition?.xp}>
            <img src={ImgSVG.XP} alt="Medalha" />
            <p>{homeContext.userPosition?.xp! > 999 ? "+999" : homeContext.userPosition?.xp}XP</p>
          </S.XPInfo>
          <S.Medal title={homeContext.userPosition?.posicao} style={{ backgroundImage: `url(${ImgSVG.MedalhaAzul})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <p>{homeContext.userPosition?.posicao! > 99 ? "+99" : homeContext.userPosition?.posicao}</p>
          </S.Medal>
        </S.Right>
      </S.Main>
    </S.Container>
  )
}