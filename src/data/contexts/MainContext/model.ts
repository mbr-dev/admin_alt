
import React, { Dispatch, SetStateAction } from "react";

export interface IMainContextProvider {
  children: React.ReactNode;
}

export interface IMainContext {
  load: boolean;
  isReady: boolean;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

export interface ITokenData {
  aud: string;
  avatar: string;
  exp: number;
  hierarquia: number;
  iat: number;
  id: number;
  id_alt_user?: number;
  id_avatar: number;
  id_hierarquia: number;
  id_idioma: number;
  id_rede?: number;
  id_turma?: number;
  id_unidade?: number;
  iss: string;
  serie?: number;
  sub: string;
  usuario: string;
}