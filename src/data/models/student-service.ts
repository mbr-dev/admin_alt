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