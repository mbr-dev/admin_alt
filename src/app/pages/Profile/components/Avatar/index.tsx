import * as S from "./styles";
import { useProfile } from "../../hook"
import { MdEdit } from "react-icons/md";
import { ImgSVG } from "@/components/images";
import { useApi, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { ProfileService } from "@/data/models";

export const Avatar = () => {
  const { getData } = useStorage();
  const profileContext = useProfile();
  const { URL_FILES } = useApi();
  const hierarchy = Number(getData("hierarquia"));
  const avatarSrc = `${URL_FILES}images/avatar/${getData("avatar")}.png`;
  const profileData = profileContext.userData as ProfileService.IProfileService | null;

  return (
    <S.Container>
      <S.Avatar>
        <S.Button onClick={() => profileContext.setShowAvatars(true)}><MdEdit /></S.Button>
        <img src={avatarSrc} />
      </S.Avatar>

      <S.Main>
        <h3 title={profileContext.userData?.nome}>Olá, {profileContext.userData?.nome}!</h3>

        {hierarchy === UserRole.STUDENT &&
          <S.Infos>
            <S.Div>
              <img src={ImgSVG.XP} alt="XP" />
              <p>{profileData?.xp ?? 0}</p>
            </S.Div>
            <S.Div>
              <img src={ImgSVG.Moeda} alt="Moeda" />
              <p>{profileData?.moeda ?? 0}</p>
            </S.Div>
          </S.Infos>}
      </S.Main>
    </S.Container>
  )
}