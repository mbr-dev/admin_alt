export interface IStudentService {
  id: number;
  id_usuario: number;
  usuario: string;
  nome: string;
  email: string;
  tempo_acesso: number;
  data_nascimento: Date;
  id_hierarquia: number;
  status: number;
  moeda?: number;
  turma?: string;
  unidade?: string;
  xp?: number;
  id_avatar: number;
  link: string;
  data_cadastro: Date;
}

export interface IUnitStudent {
  id: number;
  id_admin?: number;
  id_usuario: number;
  usuario: string;
  nome: string;
  email?: string | null;
  id_avatar?: number;
  link?: string;
  ultimo_acesso?: string;
  id_unidade: number;
  descricao: string;
  status: number;
  nascimento?: string;
  data_cadastro: Date;
}

export interface IUserUnitAndId {
  id: number;
  id_unidade: number;
  unidade: string | null;
  cidade: string | null;
}

export interface IUnitsAll {
  id: number;
  id_fuso: number;
  descricao: string;
  cep: string;
  cidade: string;
  estado: string;
  status: number;
  fuso_horario: string;
  data_cadastro: string;
}

export interface IStudent {
  id: number;
  id_admin?: number;
  id_usuario: number;
  usuario: string;
  id_unidade: number;
  descricao: string;
  nome: string;
  email: string;
  id_avatar?: number;
  link?: string;
  status: number;
  nascimento?: string | null;
  ultimo_acesso?: string | null;
  data_cadastro: string;
  codigo: string;
  codigo_ids: number[];
  codigo_emoji: string[];
}

export interface ICreateClinicStudentPayload {
  usuario: {
    usuario: string;
    senha: string | null;
    unidade: number;
  };
  aluno: {
    nome: string;
    email: string;
    data_nascimento: string;
    sexo: string;
  };
  responsavel: {
    nome: string;
    email: string;
    data_nascimento: string;
    cpf_cnpj: string;
    parentesco: string;
  };
  responsavel_endereco: {
    logradouro: string;
    numero: string;
    complemento?: string;
    cep: string;
    bairro: string;
    regiao: string;
    tipo: string;
  };
  responsavel_contato: {
    nome_responsavel: string;
    contato: string;
    tipo: string;
  };
  cid_usuario: number[];
}