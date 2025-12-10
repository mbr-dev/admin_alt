export interface IClassService {
  id: number;
  id_unidade: number;
  descricao: string;
  codigo: string;
  num_serie: number;
  status: number;
  total_professores: number;
  total_alunos: number;
  total_disciplinas: number;
  data_cadastro: string;
}

export interface IRegisterClassService {
  id_unidade: number;
  descricao: string;
  codigo: string;
  num_serie: number;
}