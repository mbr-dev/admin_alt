import * as S from "./styles";
import { useHeader } from "./hook";
import { Menu } from "./components";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useApi, useStorage } from "@/data/hooks";
import { ConfirmActionModal } from "..";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const navigate = useNavigate();
  const { URL_FILES } = useApi();
  const { getData } = useStorage();
  const hook = useHeader();
  const { t } = useTranslation("header");
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleConfirmLogout = () => {
    void hook.handleLogout();
    setShowLogoutModal(false);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Menu>
          <S.Button onClick={() => hook.setShowMenu(!hook.showMenu)}>
            {hook.showMenu ? <IoClose /> : <IoMenu />}
          </S.Button>
          <p>{hook.label}</p>
        </S.Menu>

        <S.Infos>
          {/* <Language /> */}
          <S.Avatar onClick={() => navigate("/profile")}>
            <img src={`${URL_FILES}images/avatar/${getData("avatar")}.png`} alt="icone do avatar" />
          </S.Avatar>
          <S.ButtonExit onClick={() => setShowLogoutModal(true)}><IoMdExit /></S.ButtonExit>
        </S.Infos>
      </S.Header>

      {hook.showMenu && <Menu isOpen={hook.showMenu} handleNavigate={hook.handleNavigate} />}
      <ConfirmActionModal
        isOpen={showLogoutModal}
        title={t("logout_modal_title")}
        description={t("logout_modal_description")}
        cancelLabel={t("logout_modal_cancel")}
        confirmLabel={t("logout_modal_confirm")}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </S.Container>
  )
}