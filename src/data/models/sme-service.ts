export interface ISecretaryByUserId {
  id: number;
  id_usuario: number;
  id_unidade_rede: number;
  usuario: string;
  nome: string;
  id_hierarquia: number;
  id_avatar: number;
  link: string;
  status: number;
  data_cadastro: string;
}

export interface ISecretaryUpdateByUserId {
  id_unidade_rede: number;
  nome: string;
  senha?: string;
  tipo: "CLINICA";
  status: 1;
}
