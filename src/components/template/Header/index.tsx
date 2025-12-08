import * as S from "./styles";
import { useHeader } from "./hook";
import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useApi, useMain } from "@/data/hooks";
import { Menu, Language } from "./components";
import { IoMenu, IoClose } from "react-icons/io5";

export const Header = () => {
  const navigate = useNavigate();
  const { URL_FILES } = useApi();
  const mainContext = useMain();
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
          <Language />
          <S.Avatar onClick={() => navigate("/profile")}>
            <img src={`${URL_FILES}images/avatar/${mainContext.avatarUser}.png`} alt="icone do avatar" />
          </S.Avatar>
          <S.ButtonExit onClick={hook.handleLogout}><IoMdExit /></S.ButtonExit>
        </S.Infos>
      </S.Header>

      {hook.showMenu && <Menu isOpen={hook.showMenu} handleNavigate={hook.handleNavigate} />}
    </S.Container>
  )
}