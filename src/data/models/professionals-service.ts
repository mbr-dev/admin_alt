export interface IProfessionalByNetwork {
  id_unidade?: number | null;
  id_unidade_rede?: number | null;
  nome: string | null;
  cpf_cnpj: string | null;
  email: string | null;
  especialidade: string | null;
  registro_profissional: string | null;
  id_usuario: number | null;
  usuario: string | null;
  status: number | null;
}

export interface IProfessionalByNetworkResponse {
  data: IProfessionalByNetwork[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface IProfessionalRegister {
  usuario: string;
  senha: string;
  id_unidade: number;
  id_unidade_rede: number;
  nome: string;
  cpf_cnpj?: string;
  email?: string;
  especialidade?: string;
  registro_profissional?: string;
}

export interface IProfessionalByUserId {
  id_unidade: number | null;
  id_usuario: number | null;
  usuario: string | null;
  cpf_cnpj: string | null;
  nome: string | null;
  email: string | null;
  especialidade: string | null;
  registro_profissional: string | null;
  status: number | null;
}

export interface IProfessionalUpdateByUserId {
  id_unidade: number;
  id_usuario: number;
  usuario: string;
  senha?: string;
  cpf_cnpj?: string;
  nome: string;
  email?: string;
  especialidade?: string;
  registro_profissional?: string;
  status: number;
}
