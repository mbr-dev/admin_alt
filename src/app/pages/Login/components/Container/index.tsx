import * as S from "./styles";
import { useState } from "react";
import { useLogin } from "../../hook";
import { ImgSVG, ImgPng } from "@/components/images";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const Container = () => {
  const loginContext = useLogin();

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <S.Container style={{ backgroundImage: `url(${ImgSVG.Login4})` }}>
      <S.Wave>
        <img src={ImgSVG.Login3} alt="" />
      </S.Wave>

      <S.Guys>
        <img src={ImgSVG.Login1} alt="" />
      </S.Guys>


      <S.Main>
        <S.Form>
          <S.Logo>
            <img src={ImgSVG.LogoMbr} alt="" />
          </S.Logo>

          <h2>Portal de acesso</h2>
          <S.BgMain>
            <img src={ImgPng.Login2} alt="" />
          </S.BgMain>

          <S.Label htmlFor="user_name">
            Usuário
            <input type="text" id="user_name" value={name} onChange={(e) => setName(e.target.value)} />
          </S.Label>

          <S.Label htmlFor="user_password">
            Senha
            <input type={showPassword ? "text" : "password"} id="user_password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <S.ButtonEyes
              onClick={() => setShowPassword(!showPassword)}
              disabled={loginContext.load}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </S.ButtonEyes>
          </S.Label>

          <S.Button
            onClick={() => loginContext.handleSignIn(name, password)}
            disabled={loginContext.load}
          >
            {loginContext.load ? "Carregando" : "Entrar"}
          </S.Button>
        </S.Form>
      </S.Main>
    </S.Container>
  )
}