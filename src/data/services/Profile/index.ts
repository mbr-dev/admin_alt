import { useCallback } from "react";
import { useApi } from "@/data/hooks";
import { AchievementService, AvatarService } from "@/data/models";

export function Profile() {
  const { api, get_error } = useApi();

  const getTeacherProfile = useCallback(async () => {
    try {
      const { data } = await api.get("teacher/getTeacherProfile");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  const getStudentByStudentId = useCallback(
    async (id_hierarquia: number) => {
      try {
        const { data } = await api.get(`student/getStudentByStudentId/${id_hierarquia}`);
        if (data) return data;
        return null;
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error]
  );

  const getCoordinatorProfile = useCallback(async () => {
    try {
      const { data } = await api.get("coordinator/getCoordinatorProfile");
      if (data) return data;
      return null;
    } catch (error) {
      console.log(get_error(error));
      return null;
    }
  }, [api, get_error]);

  const getAllAchievementsForHomeByUserId = useCallback(
    async (idUser: number): Promise<AchievementService.IAchievementsUserService | any> => {
      try {
        const { data } = await api.get(`achievements/getAllAchievementsForHomeByUserId/${idUser}`);
        return data ?? { conquistas: [], porcentagem_total: 0 };
      } catch (error) {
        console.log(get_error(error));
        return { conquistas: [], porcentagem_total: 0 };
      }
    },
    [api, get_error]
  );

  const getAllAvatars = useCallback(async () => {
    try {
      const { data } = await api.get("avatar/getAllAvatars");
      if (data.length > 0) return data;
      return [] as AvatarService.IAvatarService[];
    } catch (error) {
      console.log(get_error(error));
      return [] as AvatarService.IAvatarService[];
    }
  }, [api, get_error]);

  const updateAvatar = useCallback(
    async (idUser: number, idAvatar: number) => {
      try {
        const { data } = await api.patch(`user/updateAvatar?idUser=${idUser}&idAvatar=${idAvatar}`);
        if (data) return data;
        return false;
      } catch (error) {
        console.log(get_error(error));
        return false;
      }
    },
    [api, get_error]
  );

  return { getTeacherProfile, getStudentByStudentId, getAllAchievementsForHomeByUserId, getCoordinatorProfile, updateAvatar, getAllAvatars };
}