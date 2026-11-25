/** Atividade recente da Home da secretaria clínica. */
export interface ISecretaryHomeRecentActivity {
  id: number;
  nome: string;
  acao: string;
  descricao: string;
  data_cadastro: string;
}

/** Próxima sessão retornada pela Home da secretaria clínica. */
export interface ISecretaryHomeUpcomingSession {
  id?: number;
  tipo_sessao?: string;
  data_inicio?: string;
  data_final?: string;
  data?: string;
  status?: string;
  nome_profissional?: string;
  nome_paciente?: string;
  nome_aluno?: string;
  profissional?: string;
  aluno?: string;
}

/** Payload de `GET home/getSecretaryDatasForHomeALTClinic`. */
export interface ISecretaryHomeClinicData {
  nome: string;
  students: number;
  professionals: number;
  sessions_today: number;
  frequency: number;
  upcoming_sessions: ISecretaryHomeUpcomingSession[];
  recent_activities: ISecretaryHomeRecentActivity[];
}

export interface ISecretaryHomeClinicResponse {
  data: ISecretaryHomeClinicData;
}

export function unwrapSecretaryHomeClinicData(payload: unknown): ISecretaryHomeClinicData | null {
  if (!payload || typeof payload !== "object") return null;

  const root = payload as ISecretaryHomeClinicResponse & Partial<ISecretaryHomeClinicData>;
  const source = root.data && typeof root.data === "object" && "students" in root.data ? root.data : root;

  if (!("students" in source) || !("professionals" in source)) return null;

  const nestedName = typeof source.nome === "string" ? source.nome.trim() : "";
  const rootName = typeof root.nome === "string" ? root.nome.trim() : "";

  return {
    nome: nestedName || rootName,
    students: Number(source.students) || 0,
    professionals: Number(source.professionals) || 0,
    sessions_today: Number(source.sessions_today) || 0,
    frequency: Number(source.frequency) || 0,
    upcoming_sessions: Array.isArray(source.upcoming_sessions) ? source.upcoming_sessions : [],
    recent_activities: Array.isArray(source.recent_activities) ? source.recent_activities : [],
  };
}

/** Notificação da Home do responsável (`id_hierarquia` 9). */
export interface IResponsibleHomeNotification {
  id: number;
  id_notificacao_user: number;
  titulo: string;
  mensagem: string;
  prioridade: number;
  status_visualizacao: number;
  data_cadastro: string;
}

export interface IResponsibleHomeChildActivity {
  id: number;
  id_modulo: number;
  modulo: string | null;
  id_atividade: number;
  atividade: string | null;
  alternativa_correta: string;
  alternativa_escolhida: string;
  acertou: boolean;
  data_inicio: Date;
  data_termino: Date;
  data_cadastro: Date;
}

export interface IResponsibleHomeChild {
  id_paciente: number;
  id_usuario: number | null;
  nome: string | null;
  parentesco: string | null;
  usuario: string | null;
  unidade: string | null;
  ultimas_atividades: IResponsibleHomeChildActivity[];
}

export interface IResponsibleHomeUpcomingSession {
  id: number;
  tipo_sessao: string | null;
  data_inicio: Date | null;
  data_final: Date | null;
  status: "aberta" | "finalizada" | "cancelada" | "em_andamento" | null;
  nome_aluno: string | null;
  nome_profissional: string | null;
}

/** Payload de `GET home/getResponsibleDatasForHomeALTClinic`. */
export interface IGetResponsibleDatasForHomeALTClinic {
  nome: string;
  filhos: number;
  sessoes_hoje: number;
  filhos_vinculados: IResponsibleHomeChild[];
  proximas_sessoes: IResponsibleHomeUpcomingSession[];
  notificacoes: IResponsibleHomeNotification[];
}

export interface IGetResponsibleDatasForHomeALTClinicResponse {
  data: IGetResponsibleDatasForHomeALTClinic;
}
