import * as S from "./styles";
import { useHeader } from "./hook";
import { Menu } from "./components";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import { useApi, useStorage } from "@/data/hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { URL_FILES } = useApi();
  const { getData } = useStorage();
  const hook = useHeader();

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
          <S.ButtonExit onClick={hook.handleLogout}><IoMdExit /></S.ButtonExit>
        </S.Infos>
      </S.Header>

      {hook.showMenu && <Menu isOpen={hook.showMenu} handleNavigate={hook.handleNavigate} />}
    </S.Container>
  )
}