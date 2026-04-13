/** Parâmetros comuns aos endpoints ABA (`id_usuario`). */
export interface IABAQueryParams {
  id_usuario: number;
}

export interface IABApercentageCorrectItem {
  id_sessao: number;
  independent_agreements: number;
  frequency: number;
  total_percent: number;
  media_movel: number | null;
}

/** Resposta de `GET reportUserSession/getABApercentageCorrect`. */
export interface IGetABApercentageCorrectResponse {
  id_usuario: number;
  media_geral: number;
  data: IABApercentageCorrectItem[];
  tendencia_valor: number;
  tendencia: string;
  variabilidade: number;
  variabilidade_classificacao: string;
  interpretacao_final: string;
}

/** Resposta de `GET reportUserSession/getABAaverageHelp`. */
export interface IGetABAaverageHelpResponse {
  id_usuario: number;
  media: number;
  interpretacao: string;
  sessoes_utilizadas: number;
}

export interface IABAlatencyTimeItem {
  id_sessao: number;
  valor: number;
}

/** Resposta de `GET reportUserSession/getABAlatencyTime`. */
export interface IGetABAlatencyTimeResponse {
  id_usuario: number;
  data: IABAlatencyTimeItem[];
  media: number;
  maior_valor: number;
  menor_valor: number;
}

export interface IABAfrequencyBehaviorItem {
  rotulo: string;
  total: number;
}

/** Resposta de `GET reportUserSession/getABAfrequencyBehavior`. */
export interface IGetABAfrequencyBehaviorResponse {
  id_usuario: number;
  data: IABAfrequencyBehaviorItem[];
  total_frequencias: number;
}

export interface IABAMediumIntensityItem {
  rotulo: string;
  peso: number;
  frequencia_total: number;
}

/** Resposta de `GET reportUserSession/getABAMediumIntensity`. */
export interface IGetABAMediumIntensityResponse {
  id_usuario: number;
  data: IABAMediumIntensityItem[];
  total_frequencia_peso: number;
  total_frequencia: number;
  media: number;
  interpretacao: string;
  total_sessoes: number;
}

export interface IABAengagementItem {
  rotulo: string;
  peso_opcao: number;
  total: number;
  quantidade_sessoes: number;
}

/** Resposta de `GET reportUserSession/getABAengagement`. */
export interface IGetABAengagementResponse {
  id_usuario: number;
  data: IABAengagementItem[];
  sessoes_utilizadas: number;
}

export interface IABAperformanceItem {
  rotulo: string;
  peso_opcao: number;
  total_peso_opcao: number;
  quantidade_sessoes: number;
}

/** Resposta de `GET reportUserSession/getABAperformance`. */
export interface IGetABAperformanceResponse {
  id_usuario: number;
  data: IABAperformanceItem[];
  total_frequencia: number;
  total_sessao: number;
  media: number;
  classificacao_tecnica: string;
  interpretacao_clinica: string;
}
