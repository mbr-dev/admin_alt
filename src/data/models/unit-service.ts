export interface IUnitRegister {
  id_rede: number;
  id_pais: number;
  id_idioma: number;
  tipo?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  logradouro?: string;
  bairro?: string;
  regiao?: string;
  numero?: string;
  observacao?: string;
  fuso_horario: string;
  descricao: string;
  cep: string;
  cidade: string;
  estado: string;
}

export interface IUnitByNetworkPg {
  id: number;
  id_unidade_rede: number;
  descricao: string;
  cep: string;
  total_alunos: number;
  total_professores: number;
  total_coordenadores: number;
  cidade: string;
  estado: string;
  status: number;
  data_cadastro: string;
}

export interface IUnitByNetworkPgResponse {
  data: IUnitByNetworkPg[];
  totalPages: number;
}

export interface IUnitById {
  id: number;
  id_rede: number;
  id_pais?: number;
  id_idioma?: number;
  id_unidade_rede?: number;
  tipo?: string | null;
  cnpj?: string | null;
  email?: string | null;
  telefone?: string | null;
  logradouro?: string | null;
  bairro?: string | null;
  regiao?: string | null;
  numero?: string | null;
  observacao?: string | null;
  fuso_horario?: string | null;
  descricao: string;
  cep: string;
  cidade: string;
  estado: string;
  status?: number;
  data_cadastro?: string;
}
