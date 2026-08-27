import { useCallback } from "react";
import { useApi, useStorage } from "@/data/hooks";
import { PreferenceUserService } from "@/data/models";

function unwrapPreference(data: unknown): PreferenceUserService.IPreferenceByUserId | null {
  if (!data || typeof data !== "object") return null;

  const payload = data as PreferenceUserService.IPreferenceByUserId & {
    data?: PreferenceUserService.IPreferenceByUserId;
  };

  if (payload.data && typeof payload.data === "object" && "id_preferencia" in payload.data) {
    return payload.data;
  }

  if ("id_preferencia" in payload) return payload;
  return null;
}

export function PreferenceUser() {
  const { api, get_error } = useApi();
  const { getData } = useStorage();

  const getPreferenceByUserId = useCallback(
    async (id: number): Promise<PreferenceUserService.IPreferenceByUserId | null> => {
      try {
        const token = getData("token");
        const { data } = await api.get(`preferenceUser/getPreferenceByUserId/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        return unwrapPreference(data);
      } catch (error) {
        console.log(get_error(error));
        return null;
      }
    },
    [api, get_error, getData]
  );

  const updatePreference = useCallback(
    async (id: number, payload: PreferenceUserService.IUpdatePreferencePayload): Promise<boolean> => {
      try {
        const { data } = await api.patch(`preferenceUser/updatePreference/${id}`, payload);
        return data === true;
      } catch (error) {
        console.log(get_error(error));
        return false;
      }
    },
    [api, get_error]
  );

  return { getPreferenceByUserId, updatePreference };
}
