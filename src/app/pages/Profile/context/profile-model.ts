
import React, { Dispatch, SetStateAction } from "react";
import { ProfileService, AchievementService, AvatarService } from "@/data/models";

export interface IProfileContextProvider {
  children: React.ReactNode;
}

export interface IProfileContext {
  achievements: AchievementService.IAchievementsUserService | null;
  userData: ProfileService.IProfileService | null;
  showAvatars: boolean;
  tempAvatar: number;
  dropDown: number | null;
  COLORS: string[];
  data: any[];
  allAvatars: AvatarService.IAvatarService[];
  setShowAvatars: Dispatch<SetStateAction<boolean>>;
  handleGetAvatar: (id: number, link: string) => void;
  handleSaveAvatar: () => Promise<void>;
  handleDropdown: (id: number) => void;
}