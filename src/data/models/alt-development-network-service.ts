/** Parâmetros comuns aos endpoints de rede de desenvolvimento ALT. */
export interface IALTDevelopmentNetworkQueryParams {
  id_rede: number;
  filter: number;
}

export interface IStatisticNetworkProgress {
  percentual: number;
  evolution: number | null;
}

export interface IStatisticNetworkRateComparison {
  taxa_atual: number;
  taxa_anterior: number | null;
  taxa_diferenca: number | null;
}

export interface IStatisticNetworkDevelopment {
  taxa_evolucao: number | null;
  taxa_diferenca: number | null;
}

/** Resposta de `GET altDevelopmentNetwork/getStatisticNetwork`. */
export interface IGetStatisticNetworkResponse {
  id_rede: number;
  nome_rede: string;
  filter: number;
  progress: IStatisticNetworkProgress;
  utilization: IStatisticNetworkRateComparison;
  performance: IStatisticNetworkRateComparison;
  development: IStatisticNetworkDevelopment;
}

export interface INumbersNetworkTime {
  time_alt: number;
  time_session: number;
}

/** Resposta de `GET altDevelopmentNetwork/getNumbersNetwork`. */
export interface IGetNumbersNetworkResponse {
  id_rede: number;
  filter: number;
  unity: number;
  students: number;
  sessions: number;
  time: INumbersNetworkTime;
}

export interface ISkillsDevelopedCategory {
  id_tag: number;
  categoria: string;
  media: number | null;
}

export interface ISkillsDevelopedTag {
  indice_geral: number;
  categorias: ISkillsDevelopedCategory[];
}

export interface IProgressionFunnelStage {
  quantidade: number;
  percentual: number;
}

export interface IProgressionFunnelDifference {
  regrediram: number | null;
  mantiveram: number | null;
  evoluiram: number | null;
}

export interface IProgressionFunnel {
  regrediram: IProgressionFunnelStage;
  mantiveram: IProgressionFunnelStage;
  evoluiram: IProgressionFunnelStage;
  percentual_diferenca: IProgressionFunnelDifference;
}

/** Resposta de `GET altDevelopmentNetwork/getSkillsDeveloped`. */
export interface IGetSkillsDevelopedResponse {
  id_rede: number;
  filter: number;
  skills_tag: ISkillsDevelopedTag;
  progression_funnel: IProgressionFunnel;
}

export interface IUnitCompareItem {
  id_unidade: number;
  unidade: string;
  alunos_ativos: number;
  adesao: number;
  progressao: number | null;
  indice_desenvolvimento: number | null;
  status: string;
}

export interface IUnitCompareNetworkAverage {
  alunos_ativos: number;
  adesao: number;
  progressao: number | null;
  indice_desenvolvimento: number | null;
}

/** Resposta de `GET altDevelopmentNetwork/getUnitCompare`. */
export interface IGetUnitCompareResponse {
  id_rede: number;
  filter: number;
  units: IUnitCompareItem[];
  media_rede: IUnitCompareNetworkAverage;
}
