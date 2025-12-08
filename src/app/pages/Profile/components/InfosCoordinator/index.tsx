import { useMain } from "@/data/hooks";
import { useProfile } from "../../hook";
import * as SIT from "../InfosTeacher/styles";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/data/constants/user-roles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const InfosCoordinator = () => {
  const mainContext = useMain();
  const { t } = useTranslation("profile");
  const profileContext = useProfile();

  return (
    <SIT.Container>
      <SIT.Main>
        <SIT.Div>
          <SIT.DivInside>
            <h3>{t("name")}</h3>
            <p>{profileContext.userData?.nome}</p>
          </SIT.DivInside>
          <SIT.DivInside>
            <h3>{t("email")}</h3>
            <p>{profileContext.userData?.email}</p>
          </SIT.DivInside>
        </SIT.Div>

        <SIT.Div>
          {(mainContext.tokenData.hierarquia === UserRole.TEACHER || mainContext.tokenData.hierarquia === UserRole.STUDENT || mainContext.tokenData.hierarquia === UserRole.COORDINATOR) &&
            <SIT.DivInside>
              <h3>{t("unit")}</h3>
              {mainContext.tokenData.hierarquia === UserRole.STUDENT && <p>{profileContext.userData?.unidade}</p>}
              {(mainContext.tokenData.hierarquia === UserRole.TEACHER || mainContext.tokenData.hierarquia === UserRole.COORDINATOR) &&
                <SIT.Dropdown>
                  {profileContext.userData?.unidades && profileContext.userData?.unidades.length > 1 ?
                    <SIT.ButtonDropdown onClick={() => profileContext.handleDropdown(0)}>
                      <p title={profileContext?.userData?.unidades[0].descricao}>{profileContext?.userData?.unidades[0].descricao}</p>
                      {profileContext?.dropDown === 0 ? <FaChevronUp /> : <FaChevronDown />}
                    </SIT.ButtonDropdown>
                    :
                    <p title={profileContext?.userData?.unidades[0].descricao}>{profileContext?.userData?.unidades[0].descricao}</p>
                  }
                  {profileContext?.dropDown === 0 &&
                    <SIT.DropdownItem>
                      {profileContext?.userData?.unidades && profileContext?.userData?.unidades.map((item, index) => {
                        return index > 0 && (
                          <p title={item.descricao}>{item.descricao}</p>
                        )
                      })}
                    </SIT.DropdownItem>
                  }
                </SIT.Dropdown>
              }
            </SIT.DivInside>}
        </SIT.Div>
      </SIT.Main>
    </SIT.Container>
  )
}