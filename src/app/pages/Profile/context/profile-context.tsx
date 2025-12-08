import * as IHC from "./profile-model";
import { Profile } from "@/data/services";
import { useTranslation } from "react-i18next";
import { useMain, useStorage } from "@/data/hooks";
import { UserRole } from "@/data/constants/user-roles";
import { useState, createContext, useEffect } from "react";
import { ProfileService, AchievementService, AvatarService } from "@/data/models";

export const ProfileContext = createContext({} as IHC.IProfileContext);

export function ProfileContextProvider({ children }: IHC.IProfileContextProvider) {
  const mainContext = useMain();
  const { setData, getData } = useStorage();
  const { t } = useTranslation("profile");
  const { getStudentByStudentId, getTeacherProfile, getCoordinatorProfile, getAllAchievementsForHomeByUserId, getAllAvatars, updateAvatar } = Profile();

  const [userData, setUserData] = useState<null | ProfileService.IProfileService>(null);
  const [allAvatars, setAllAvatars] = useState<AvatarService.IAvatarService[]>([]);
  const [showAvatars, setShowAvatars] = useState<boolean>(false);
  const [tempAvatar, setTempAvatar] = useState<number>(0);
  const [tempLink, setTempLink] = useState<string>("");
  const [dropDown, setDropDown] = useState<number | null>(null);
  const [achievements, setAchievements] = useState<AchievementService.IAchievementsUserService | null>(null);
  //Cor do gráfico de pizza
  const COLORS = ["#01D34E", "#EC5691"];
  //Data para o gráfico de pizza
  const data = [
    { name: t("done"), value: achievements?.total_feito ?? 0 },
    { name: t("left"), value: achievements && (achievements?.total_conquistas - achievements?.total_feito) },
  ];
  //Função que busca os dados do perfil e da conquista do usuário
  const fetchData = async () => {
    try {
      mainContext.setLoad(true);

      const response = 
        Number(getData("hierarquia")) === UserRole.STUDENT ? await getStudentByStudentId(Number(getData("id_hierarquia"))) :
        Number(getData("hierarquia")) === UserRole.TEACHER ? await getTeacherProfile() : await getCoordinatorProfile();

      const responseAvatar = await getAllAvatars();
      //Busca as conquista do professor e do aluno
      const responseAchievement = (Number(getData("hierarquia")) === UserRole.STUDENT || Number(getData("hierarquia")) === UserRole.TEACHER) &&
        await getAllAchievementsForHomeByUserId(Number(getData("id")));

      if (response) {
        setUserData(response);
        if (Number(getData("hierarquia")) === UserRole.STUDENT || Number(getData("hierarquia")) === UserRole.TEACHER) {
          setAchievements(responseAchievement);
        }
        setAllAvatars(responseAvatar);
        setTempAvatar(response.id_avatar);
        //Salva no storage os dados
        const sessionData = {
          userData: response,
          achievements: responseAchievement ?? [],
          allAvatars: responseAvatar,
          tempAvatar: response.id_avatar,
        }
        sessionStorage.setItem("profile-data", JSON.stringify(sessionData));
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }
  //Função que seleciona o avatar
  const handleGetAvatar = (id: number, link: string) => {
    setTempAvatar(id);
    setTempLink(link);
  }
  //Função responsavel pelo dropdown
  const handleDropdown = (id: number) => {
    if (userData?.unidades && userData?.unidades.length < 1) return;
    setDropDown((prev) => prev === id ? null : id);
  }
  //Função que salva a edição do avatar
  const handleSaveAvatar = async () => {
    try {
      mainContext.setLoad(true);
      setShowAvatars(false);

      const response = await updateAvatar(Number(getData("id")), tempAvatar);
      if (response) {
        setData("avatar", tempLink);
      }

      mainContext.setLoad(false);
    } finally {
      mainContext.setLoad(false);
    }
  }

  useEffect(() => {
    const cached = sessionStorage.getItem("profile-data");

    if (cached) {
      const parsed = JSON.parse(cached);

      setUserData(parsed.userData);
      setAchievements(parsed.achievements);
      setAllAvatars(parsed.allAvatars);
      setTempAvatar(parsed.tempAvatar);
    } else {
      fetchData();
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ userData, dropDown, achievements, tempAvatar, setShowAvatars, showAvatars, allAvatars, handleGetAvatar, handleSaveAvatar, handleDropdown, COLORS, data }}>
      {children}
    </ProfileContext.Provider>
  );
}