export interface IClassService {
  id: number;
  id_unidade: number;
  descricao: string;
  codigo: string;
  num_serie: number;
  tipo_turma?: string | null;
  tipo_ciclo?: string | null;
  ano_letivo?: number | null;
  data_inicio?: string | null;
  data_fim?: string | null;
  status: number;
  total_professores: number;
  total_alunos: number;
  total_disciplinas: number;
  data_cadastro: string;
}

export interface IClassRegister {
  id_unidade: number;
  descricao: string;
  codigo: string;
  tipo_turma: string;
  tipo_ciclo: string;
  ano_letivo: number;
  data_inicio: string;
  data_fim: string;
  num_serie: number;
  status?: number;
}