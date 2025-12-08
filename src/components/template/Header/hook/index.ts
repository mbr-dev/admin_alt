import { useStorage } from "@/data/hooks";
import { useEffect, useState } from "react";
import { MENU_LIST } from "@/data/constants";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useHeader = () => {
  const { removeAll } = useStorage();
  const location = useLocation();
  const { t } = useTranslation("header");
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [label, setLabel] = useState<string>("");
  //Função que pegar os inicial
  const fetchData = () => {
    const currentPath = location.pathname;

    let found: any = null;

    if (currentPath === "/" || currentPath === "") {
      found = MENU_LIST[0];
    } else {
      found = MENU_LIST.find((item) => item.route === currentPath);

      if (!found) {
        MENU_LIST.forEach((item) => {
          const sub = item.subMenu.find((subItem) => subItem.route === currentPath);
          if (sub) found = sub;
        });
      }
    }

    if (found) {
      setLabel(t(found.name) || "");
    } else {
      setLabel("");
    }
  }
  //Função para mudar de rota no menu
  const handleNavigate = (route: string) => {
    if (route === "NO") return;
    setShowMenu(false);
    navigate(route);
  }
  //Função para deslogar do alt
  const handleLogout = async () => {
    //Limpa o cookies e session storage e manda pro progeto pai
    removeAll();
    sessionStorage.removeItem("home-data");
    sessionStorage.removeItem("profile-data");
    sessionStorage.removeItem("didactic-module");
    sessionStorage.removeItem("monitoring-data");
    sessionStorage.removeItem("class-teacher");
    sessionStorage.removeItem("class-cood");
    sessionStorage.removeItem("class-sme");
    window.location.reload();
  }

  useEffect(() => { fetchData(); }, []);

  return { showMenu, setShowMenu, handleLogout, label, handleNavigate }
}