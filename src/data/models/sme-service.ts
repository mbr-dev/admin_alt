export interface ISecretaryByUserId {
  id: number;
  id_usuario: number;
  id_unidade_rede: number;
  usuario: string;
  nome: string;
  id_hierarquia: number;
  id_avatar: number;
  link: string;
  status: number;
  data_cadastro: string;
}

export interface ISecretaryInsightMetric {
  variacao_percentual: number;
  status: string;
}

export interface ISecretaryProfileCards {
  total_unidades: number;
  total_unidades_ativas: number;
  alunos_ativos: number;
  professores_ativos: number;
  coordenadores_ativos: number;
  turmas_ativas: number;
  atividades_jogadas: number;
  insights_30_dias: {
    alunos_ativos: ISecretaryInsightMetric;
    professores_ativos: ISecretaryInsightMetric;
    atividades_jogadas: ISecretaryInsightMetric;
    total_unidades: ISecretaryInsightMetric;
    total_unidades_ativas: ISecretaryInsightMetric;
    turmas_ativas: ISecretaryInsightMetric;
  };
}

export interface ISecretaryNetworkHealth {
  indice_geral: number;
  status: string;
  usuarios_engajados_30_dias: number;
  total_usuarios_rede: number;
  taxa_engajamento_30_dias: number;
}

export interface ISecretaryProfile {
  id: number;
  id_usuario: number;
  usuario: string;
  id_hierarquia: number;
  nome: string;
  email: string;
  id_avatar: number;
  link: string;
  data_cadastro: string;
  status: number;
  cards: ISecretaryProfileCards;
  networkHealth: ISecretaryNetworkHealth;
  penultimo_acesso_login: string;
  nome_rede: string;
  network_local: string;
}

export interface ISecretaryUpdateByUserId {
  id_unidade_rede: number;
  nome: string;
  email?: string;
  senha?: string;
  tipo: "CLINICA";
  status: 1;
}
