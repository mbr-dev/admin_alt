import * as S from "./styles";
import { useProfile } from "../../hook"
import { MdEdit } from "react-icons/md";
import { ImgSVG } from "@/components/images";
import { useApi, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";

export const Avatar = () => {
  const { getData } = useStorage();
  const profileContext = useProfile();
  const { URL_FILES } = useApi();

  return (
    <S.Container>
      <S.Avatar>
        <S.Button onClick={() => profileContext.setShowAvatars(true)}><MdEdit /></S.Button>
        <img src={`${URL_FILES}images/avatar/${getData("avatar")}.png`} alt="icone do avatar" />
      </S.Avatar>

      <S.Main>
        <h3 title={profileContext.userData?.nome}>Olá, {profileContext.userData?.nome}!</h3>

        {Number(getData("hierarquia")) === UserRole.STUDENT &&
          <S.Infos>
            <S.Div>
              <img src={ImgSVG.XP} alt="XP" />
              <p>{profileContext.userData?.xp ?? 0}</p>
            </S.Div>
            <S.Div>
              <img src={ImgSVG.Moeda} alt="Moeda" />
              <p>{profileContext.userData?.moeda ?? 0}</p>
            </S.Div>
          </S.Infos>}
      </S.Main>
    </S.Container>
  )
}