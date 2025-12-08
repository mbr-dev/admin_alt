import { UserRole } from "./user-roles";
import { ImgSVG } from "@/components/images";

interface IMENU_LIST {
  id: number;
  route: string;
  name: string;
  icon: string;
  hierarchy: number[];
  status: number;
  subMenu: {
    id: number;
    route: string;
    name: string[] | string;
    hierarchy: number[];
  }[];
}

export const MENU_LIST: IMENU_LIST[] = [
  {
    id: 0,
    status: 1,
    route: "/",
    name: "home",
    icon: ImgSVG.Home,
    hierarchy: [UserRole.ADMIN, UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.STUDENT, UserRole.TEACHER],
    subMenu: []
  },
  {
    id: 1,
    status: 1,
    route: "NO",
    name: "management",
    icon: ImgSVG.Gestao,
    hierarchy: [UserRole.ADMIN, UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.TEACHER],
    subMenu: [
      {
        id: 0,
        route: "/monitoring",
        name: "management_monitoring",
        hierarchy: [UserRole.SECRETARY, UserRole.ADMIN]
      },
      {
        id: 1,
        route: "/indicators",
        name: "management_indicators",
        hierarchy: [UserRole.SECRETARY, UserRole.ADMIN, UserRole.TEACHER, UserRole.COORDINATOR]
      }
    ]
  },
  {
    id: 4,
    status: 0,
    route: "NO",
    name: "learning",
    icon: ImgSVG.Books,
    hierarchy: [UserRole.STUDENT, UserRole.TEACHER],
    subMenu: [
      {
        id: 1,
        route: "/didactic",
        name: "learning_literacy",
        hierarchy: [UserRole.TEACHER, UserRole.STUDENT]
      }
    ]
  },
  {
    id: 2,
    status: 1,
    route: "/profile",
    name: "profile",
    icon: ImgSVG.Perfil,
    hierarchy: [UserRole.COORDINATOR, UserRole.STUDENT, UserRole.TEACHER],
    subMenu: []
  },
  {
    id: 3,
    status: 1,
    route: "/support",
    name: "support",
    icon: ImgSVG.Suport,
    hierarchy: [UserRole.ADMIN, UserRole.COORDINATOR, UserRole.SECRETARY, UserRole.STUDENT, UserRole.TEACHER],
    subMenu: []
  },
]