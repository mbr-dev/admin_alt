export interface IProfessionalByNetwork {
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
