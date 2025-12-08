import * as S from "./styles";
import { useMenu } from "./hook";
import { cn } from "@/lib/utils";
import { MENU_LIST } from "@/data/constants";
import { useTranslation } from "react-i18next";
import { useStorage } from "@/data/hooks";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface MenuProps {
  isOpen: boolean;
  handleNavigate: (route: string) => void;
}

export const Menu = ({ isOpen, handleNavigate }: MenuProps) => {
  const { t } = useTranslation("header");
  const hook = useMenu();
  const { getData } = useStorage();

  return (
    <S.Container className={cn("", isOpen ? "animate-slidein-50dvw-0dvw" : "animate-slideout-50dvw-0dvw")}>
      {MENU_LIST.map((item, index) => {
        return item.hierarchy.includes(Number(getData("hierarquia"))) && (
          <S.Main
            key={index}
            onClick={() => handleNavigate(item.route)}
          >
            <S.Item
              className={cn("", hook.isThatRout === item.id && "bg-mbr-red-20")}
              onClick={() => hook.handleDropDown(item.id)}
            >
              <S.ItemText title={item.name[Number(getData("id_idioma"))]}>
                <img src={item.icon} alt={`Icon ${item.name}`} />
                <p title={t(item.name)}>{t(item.name)}</p>
                {item.subMenu.length > 0 && (hook.dropDown === item.id ? <FaChevronUp /> : <FaChevronDown />)}
              </S.ItemText>

              {hook.dropDown === item.id && item.subMenu.length > 0 && 
                <S.Dropdown>
                  {item.subMenu.map((subItem, subIndex) => {
                    return subItem.hierarchy.includes(Number(getData("hierarquia"))) && (
                      <S.DropdownItem
                        key={subIndex}
                        title={t(subItem.name)}
                        onClick={() => handleNavigate(subItem.route)}
                      >
                        <p>{t(subItem.name)}</p>
                      </S.DropdownItem>
                    )
                  })}
                </S.Dropdown>
              }
            </S.Item>
          </S.Main>
        )
      })}
    </S.Container>
  )
}