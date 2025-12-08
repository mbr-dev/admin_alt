import * as ILC from "./login-model";
import { Login } from "@/data/services";
import { useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import { useMain, useStorage } from "@/data/hooks";

export const LoginContext = createContext({} as ILC.ILoginContext);

export function LoginContextProvider({ children }: ILC.ILoginContextProvider) {
  const mainContext = useMain();

  const nav = useNavigate();
  const { Auth } = Login();
  const { setData } = useStorage();

  const [load, setLoad] = useState<boolean>(false);
 
  //Faz o login
  const handleSignIn = async (user: string, password: string) => {
    try {
      setLoad(true);

      const response = await Auth({ usuario: user, senha: password});
      if (response) {
        console.log(response);
        saveDataInStorage({ keys: Object.keys(response), values: Object.values(response) });
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
  }
  //Manda para Home
  const goToHome = () => {
    nav("/");
    location.reload();
  }

  return (
    <LoginContext.Provider value={{ handleSignIn, load }}>
      {children}
    </LoginContext.Provider>
  );
}