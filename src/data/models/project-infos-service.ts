export interface IProjectInfosService {
  id: number;
  id_projeto: number;
  cor: string;
  icone: string;
  serie_inicio: number;
  serie_final: number;
  status: number;
  data_cadastro: string;
  categoria: string;
  series: number[];
  modulos: IProjectInfosModule[];
}

export interface IProjectInfosModule {
  id: number;
  id_projeto: number;
  descricao: string;
  cor: string;
  icone: string;
  status: number;
  data_cadastro: string;
  ordem: number;
  serie: number;
}

export interface IProjectActivity {
  id: number;
  id_modulo: number;
  descricao: string;
  cor: string;
  icone: null,
  status: number;
  data_cadastro: string;
  instrucao: null,
  tags: string;
  atividade_id: number;
  dica_score: null
}