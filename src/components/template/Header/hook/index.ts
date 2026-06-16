import { useStorage } from "@/data/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useHeader = () => {
  const { removeAll } = useStorage();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (route: string) => {
    if (route === "NO") return;
    setShowMenu(false);
    navigate(route);
  };

  const handleLogout = async () => {
    removeAll();
    sessionStorage.removeItem("home-data");
    sessionStorage.removeItem("profile-data");
    sessionStorage.removeItem("didactic-module");
    sessionStorage.removeItem("monitoring-data");
    sessionStorage.removeItem("class-teacher");
    sessionStorage.removeItem("class-cood");
    sessionStorage.removeItem("class-sme");
    setShowMenu(false);
    navigate("/login", { replace: true });
  };

  return { showMenu, setShowMenu, handleLogout, handleNavigate };
};
