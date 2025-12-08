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