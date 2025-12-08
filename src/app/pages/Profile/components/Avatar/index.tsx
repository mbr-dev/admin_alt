import * as S from "./styles";
import { useProfile } from "../../hook"
import { MdEdit } from "react-icons/md";
import { ImgSVG } from "@/components/images";
import { useApi, useMain } from "@/data/hooks";

export const Avatar = () => {
  const profileContext = useProfile();
  const mainContext = useMain();
  const { URL_FILES } = useApi();

  return (
    <S.Container>
      <S.Avatar>
        <S.Button onClick={() => profileContext.setShowAvatars(true)}><MdEdit /></S.Button>
        <img src={`${URL_FILES}images/avatar/${mainContext.avatarUser}.png`} alt="icone do avatar" />
      </S.Avatar>

      <S.Main>
        <h3 title={profileContext.userData?.nome}>Olá, {profileContext.userData?.nome}!</h3>

        <S.Infos>
          <S.Div>
            <img src={ImgSVG.XP} alt="XP" />
            <p>{profileContext.userData?.xp ?? 0}</p>
          </S.Div>
          <S.Div>
            <img src={ImgSVG.Moeda} alt="Moeda" />
            <p>{profileContext.userData?.moeda ?? 0}</p>
          </S.Div>
        </S.Infos>
      </S.Main>
    </S.Container>
  )
}