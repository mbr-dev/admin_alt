
import React from "react";

export interface IHomeContextProvider {
  children: React.ReactNode;
}

export interface IHomeContext {
  events: any[];
  ranking: IUserPosition[];
  userPosition: IUserPosition | null;
}

export interface IUserPosition {
  avatar: string;
  id: number;
  id_usuario: number;
  nome: string;
  posicao: number;
  status: number;
  xp: number;
}

export interface IEvents {
  data_cadastro: string;
  data_hora: string;
  descricao: string;
  id: number;
  id_turma: number;
  id_unidade: number;
  id_usuario: number;
  prioridade: number;
  status: number;
  titulo: string;
}