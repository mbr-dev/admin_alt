import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { ImgSVG } from "@/components/images";
import { useHome } from "../../../../../../hook";

export const Podium = () => {
  const homeContext = useHome();
  const { URL_FILES } = useApi();

  return (
    <S.Container>
      <S.Trophies>
        <S.TrophyInfo>
          <S.Avatars>
            <S.Avatar>
              <img src={`${URL_FILES}images/avatar/${homeContext?.ranking[1]?.avatar}.png`} alt="icone do avatar" />
            </S.Avatar>
            <p title={homeContext?.ranking[1]?.nome}>{homeContext?.ranking[1]?.nome}</p>
          </S.Avatars>
  
          <S.XPInfo title={homeContext?.ranking[1]?.xp}>
            <img src={ImgSVG.XP} alt="Medalha" />
            <p>{homeContext?.ranking[1]?.xp > 999 ? "+999" : homeContext?.ranking[1]?.xp}XP</p>
          </S.XPInfo>

          <S.Trophy>
            <img src={`${ImgSVG.Trofeu2}`} alt="" />
          </S.Trophy>
        </S.TrophyInfo>

        <S.TrophyInfo>
          <S.Avatars>
            <S.Avatar>
              <img src={`${URL_FILES}images/avatar/${homeContext?.ranking[0]?.avatar}.png`} alt="icone do avatar" />
            </S.Avatar>
            <p title={homeContext?.ranking[0]?.nome}>{homeContext?.ranking[0]?.nome}</p>
          </S.Avatars>

          <S.XPInfo title={homeContext?.ranking[0]?.xp}>
            <img src={ImgSVG.XP} alt="Medalha" />
            <p>{homeContext?.ranking[0]?.xp > 999 ? "+999" : homeContext?.ranking[0]?.xp}XP</p>
          </S.XPInfo>

          <S.Trophy>
            <img src={`${ImgSVG.Trofeu1}`} alt="" />
          </S.Trophy>
        </S.TrophyInfo>
  
        <S.TrophyInfo>
          <S.Avatars>
            <S.Avatar>
              <img src={`${URL_FILES}images/avatar/${homeContext?.ranking[2]?.avatar}.png`} alt="icone do avatar" />
            </S.Avatar>
            <p title={homeContext?.ranking[2]?.nome}>{homeContext?.ranking[2]?.nome}</p>
          </S.Avatars>

          <S.XPInfo title={homeContext?.ranking[2]?.xp}>
            <img src={ImgSVG.XP} alt="Medalha" />
            <p>{homeContext?.ranking[2]?.xp > 999 ? "+999" : homeContext?.ranking[2]?.xp}XP</p>
          </S.XPInfo>

          <S.Trophy>
            <img src={`${ImgSVG.Trofeu3}`} alt="" />
          </S.Trophy>
        </S.TrophyInfo>
      </S.Trophies>
    </S.Container>
  )
}