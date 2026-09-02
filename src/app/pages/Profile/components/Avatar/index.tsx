import * as S from "./styles";
import { useProfile } from "../../hook"
import { MdEdit } from "react-icons/md";
import { ImgSVG } from "@/components/images";
import { useApi, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { ProfileService, SmeService } from "@/data/models";
import { useTranslation } from "react-i18next";
import { FaBuilding } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaBuildingCircleCheck, FaUserDoctor, FaUsers } from "react-icons/fa6";

interface SecretarySummaryProps {
  data: SmeService.ISecretaryProfile | null;
}

function SecretarySummary({ data }: SecretarySummaryProps) {
  const { t } = useTranslation("profile");

  return (
    <>
      <h3 title={data?.nome}>{data?.nome}</h3>
      <S.SecretaryDetails>
        <S.SecretaryRow>
          <FaBuilding aria-hidden={true} />
          <p title={data?.nome_rede}>{data?.nome_rede}</p>
        </S.SecretaryRow>
        <S.SecretaryRow>
          <IoMdPin aria-hidden={true} />
          <p title={data?.network_local}>{data?.network_local}</p>
        </S.SecretaryRow>
        <S.SecretaryRow>
          <FaBuildingCircleCheck aria-hidden={true} />
          <p>{t("units")}: {data?.cards?.total_unidades ?? 0}</p>
        </S.SecretaryRow>
        <S.SecretaryRow>
          <FaUserDoctor aria-hidden={true} />
          <p>{t("professionals")}: {data?.cards?.coordenadores_ativos ?? 0}</p>
        </S.SecretaryRow>
        <S.SecretaryRow>
          <FaUsers aria-hidden={true} />
          <p>{t("students")}: {data?.cards?.alunos_ativos ?? 0}</p>
        </S.SecretaryRow>
      </S.SecretaryDetails>
    </>
  );
}

export const Avatar = () => {
  const { getData } = useStorage();
  const profileContext = useProfile();
  const { URL_FILES } = useApi();
  const { t } = useTranslation("profile");
  const hierarchy = Number(getData("hierarquia"));
  const avatarSrc = `${URL_FILES}images/avatar/${getData("avatar")}.png`;
  const profileData = profileContext.userData as ProfileService.IProfileService | null;
  const secretaryData = hierarchy === UserRole.SECRETARY
    ? (profileContext.userData as SmeService.ISecretaryProfile | null)
    : null;

  return (
    <S.Container>
      <S.Avatar>
        <S.Button onClick={() => profileContext.setShowAvatars(true)} aria-label={t("editAvatar")}><MdEdit /></S.Button>
        <img src={avatarSrc} alt="" />
      </S.Avatar>

      <S.Main>
        {hierarchy === UserRole.SECRETARY ?
          <SecretarySummary data={secretaryData} />
          :
          <>
            <h3 title={profileContext.userData?.nome}>{t("hello", { name: profileContext.userData?.nome ?? "" })}</h3>

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
          </>}
      </S.Main>
    </S.Container>
  )
}
