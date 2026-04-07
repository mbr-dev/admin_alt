/** Parâmetros comuns aos endpoints de reportUserSession (tipo_sessao é opcional). */
export interface IReportUserSessionQueryParams {
  id_usuario: number;
  tipo_sessao?: string;
}

/** Item da lista `data` — mesma forma em todos os relatórios deste serviço. */
export interface IReportUserSessionDataItem {
  id_resposta: number;
  descricao: string;
  quantidade: number;
  frequencia: number;
}

/** Corpo de resposta compartilhado por evolution, type_activity e demais rotas do recurso. */
export interface IReportUserSessionReportResponse {
  id_usuario: number;
  id_pergunta: number;
  total_respostas: number;
  data: IReportUserSessionDataItem[];
}

/** Item de `session_types_distribution`. */
export interface ISessionTypesDistributionItem {
  tipo_sessao: string;
  quantidade: number;
  frequencia: number;
}

/** Resposta de `GET reportUserSession/session_types_distribution`. */
export interface ISessionTypesDistributionResponse {
  id_usuario: number;
  total_sessoes: number;
  data: ISessionTypesDistributionItem[];
}

/** Resposta de `GET reportUserSession/technical_ia_report`. */
export interface ITechnicalIaReportResponse {
  id_usuario: number;
  resumo_clinico: string;
  engajamento: string;
  comunicacao: string;
  atencao: string;
  comportamento: string;
  interacoes_sociais: string;
  nivel_prompt: string;
  intervencoes_eficazes: string[];
  dificuldades: string[];
  evolucao_geral: string;
  observacoes_relevantes: string;
}
