import { useEffect, useState } from "react";
import { MENU_LIST } from "@/data/constants";
import { useLocation } from "react-router-dom";

export const useMenu = () => {
  const location = useLocation();

  const [dropDown, setDropDown] = useState<number | null>(null);
  const [isThatRout, setIsThatRout] = useState<number>(-1);
  //Função para pegar a rota que ta e deixa marcado no menu
  const fetchData = () => {
    const currentPath = location.pathname;

    let found: any = null;

    if (currentPath === "/" || currentPath === "" || currentPath === "/home") {
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
      setIsThatRout(found.id);
    } else {
      setIsThatRout(-1);
    }
  }
  //Função para abrir o dropdown do menu
  const handleDropDown = (id: number) => {
    setDropDown((prev) => prev === id ? null : id);
  }

  useEffect(() => { fetchData(); }, [])

  return { dropDown, handleDropDown, isThatRout };
}