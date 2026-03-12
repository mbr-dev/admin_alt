import { useProfile } from "../../hook";
import { useStorage } from "@/data/hooks";
import * as SIT from "../InfosTeacher/styles";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/data/constants/user-roles";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ProfileService } from "@/data/models";

export const InfosCoordinator = () => {
  const { t } = useTranslation("profile");
  const profileContext = useProfile();
  const { getData } = useStorage();
  const profileData = profileContext.userData as ProfileService.IProfileService | null;

  return (
    <SIT.Container>
      <SIT.Main>
        <SIT.Div>
          <SIT.DivInside>
            <h3>{t("name")}</h3>
            <p>{profileData?.nome}</p>
          </SIT.DivInside>
          <SIT.DivInside>
            <h3>{t("email")}</h3>
            <p>{profileData?.email}</p>
          </SIT.DivInside>
        </SIT.Div>

        <SIT.Div>
          {(Number(getData("hierarquia")) === UserRole.TEACHER || Number(getData("hierarquia")) === UserRole.STUDENT || Number(getData("hierarquia")) === UserRole.COORDINATOR) &&
            <SIT.DivInside>
              <h3>{t("unit")}</h3>
              {Number(getData("hierarquia")) === UserRole.STUDENT && <p>{profileData?.unidade}</p>}
              {(Number(getData("hierarquia")) === UserRole.TEACHER || Number(getData("hierarquia")) === UserRole.COORDINATOR) &&
                <SIT.Dropdown>
                  {profileData?.unidades && profileData?.unidades.length > 1 ?
                    <SIT.ButtonDropdown onClick={() => profileContext.handleDropdown(0)}>
                      <p title={profileData?.unidades[0].descricao}>{profileData?.unidades[0].descricao}</p>
                      {profileContext?.dropDown === 0 ? <FaChevronUp /> : <FaChevronDown />}
                    </SIT.ButtonDropdown>
                    :
                    <p title={profileData?.unidades[0].descricao}>{profileData?.unidades[0].descricao}</p>
                  }
                  {profileContext?.dropDown === 0 &&
                    <SIT.DropdownItem>
                      {profileData?.unidades && profileData?.unidades.map((item, index) => {
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