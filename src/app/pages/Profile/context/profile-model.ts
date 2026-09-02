
import React, { Dispatch, SetStateAction } from "react";
import { ProfileService, AchievementService, AvatarService, SmeService } from "@/data/models";

export interface IProfileContextProvider {
  children: React.ReactNode;
}

export interface IProfileContext {
  achievements: AchievementService.IAchievementsUserService | null;
  userData: ProfileService.IProfileService | SmeService.ISecretaryProfile | null;
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