import * as ILC from "./login-model";
import { Login } from "@/data/services";
import { useStorage } from "@/data/hooks";
import { useNavigate } from "react-router-dom";
import { useState, createContext } from "react";

export const LoginContext = createContext({} as ILC.ILoginContext);

export function LoginContextProvider({ children }: ILC.ILoginContextProvider) {
  const nav = useNavigate();
  const { Auth, getUserUnitAndIdByIdUser } = Login();
  const { setData } = useStorage();

  const [load, setLoad] = useState<boolean>(false);
  //Faz o login
  const handleSignIn = async (user: string, password: string) => {
    try {
      setLoad(true);

      const response = await Auth({ usuario: user, senha: password});
      if (response) {
        saveDataInStorage({ keys: Object.keys(response), values: Object.values(response) });

        const responseUnit = await getUserUnitAndIdByIdUser(response.id);
        console.log("responseUnit ==> ", responseUnit)
        if (responseUnit) {
          setData("id_unidade", responseUnit.id_unidade);
        }

        goToHome();
      }
    } finally {
      setLoad(false);
    }
  }
  //Salva os dados no cookie
  const saveDataInStorage = (data: any) => {
    data.keys.forEach((key: any, index: any) => {
      if (data.values[index] === 0 || data.values[index] === "") return;

      if (key === "access_token") {
        setData("token", data.values[index]);
        return;
      }

      setData(key, data.values[index]);
    });

    setData("id_idioma", 1);
  }
  //Manda para Home
  const goToHome = () => {
    nav("/");
    window.location.reload();
  }

  return (
    <LoginContext.Provider value={{ handleSignIn, load }}>
      {children}
    </LoginContext.Provider>
  );
}