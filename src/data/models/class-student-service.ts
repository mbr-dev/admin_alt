export interface IClassStudentService {
  id: number;
  id_aluno: number;
  id_turma: number;
  id_usuario: number;
  nome: string;
  email: string;
  link: string;
  num_serie: number;
  id_admin?: number;
  descricao: string;
  codigo: string;
  status: number;
  usuario: string;
  nascimento?: string | null;
  tempo_acesso: number;
  data_cadastro: string;
  data_nascimento: string;
  codigo_ids: number[];
  codigo_emoji: string[];
}