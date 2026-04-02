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
