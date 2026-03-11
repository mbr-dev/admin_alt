export type TAltSessionStatus = "aberta" | "em_andamento" | "finalizada" | "cancelada";

export interface IAltSession {
  id: number;
  id_profissional: number;
  id_paciente: number;
  tipo_sessao: string;
  data_inicio: string;
  data_final: string;
  status: TAltSessionStatus;
  preenchimento_formulario: boolean;
  nome_profissional: string;
  nome_paciente: string;
  id_unidade?: number;
  id_unidade_rede?: number;
}

export interface ICreateAltSessionPayload {
  id_profissional: number;
  id_paciente: number;
  tipo_sessao: string;
  data_inicio: string;
  data_final: string;
  status: TAltSessionStatus;
}

export interface IUpdateAltSessionPayload {
  id_profissional: number;
  id_paciente: number;
  tipo_sessao: string;
  data_inicio: string;
  data_final: string;
}

export interface IChangeAltSessionStatusPayload {
  status: TAltSessionStatus;
}

export interface IGetAltSessionsByNetworkParams {
  id_unidade_rede: number;
  id_unidade?: number;
  nome_profissional?: string;
  nome_aluno?: string;
  tipo_sessao?: string;
  periodo_data?: "hoje" | "ultimos_7_dias" | "ultimos_15_dias" | "ultimos_30_dias";
  status?: TAltSessionStatus;
  page?: number;
  limit?: number;
}

export interface IGetAltSessionsByNetworkResponse {
  data: IAltSession[];
  totalPages: number;
}

export type IGetAltSessionByIdResponse = IAltSession | { data: IAltSession };

export interface IMedicalRecordOption {
  id_resposta: number;
  descricao: string;
  ordem: number;
}

export interface IMedicalRecordQuestion {
  id_pergunta: number;
  descricao: string;
  tipo: string;
  opcoes: IMedicalRecordOption[];
}

export interface IGetMedicalRecordQuestionsItem {
  pergunta: IMedicalRecordQuestion[];
}

export interface IGetMedicalRecordQuestionsResponse {
  data: IGetMedicalRecordQuestionsItem[];
}

export interface ICreateMedicalRecordSessionItem {
  id_sessao: number;
  id_pergunta: number;
  resposta_texto?: string;
  id_resposta?: number;
  status: number;
}

export type IGetMedicalRecordSessionBySessionIdResponse = ICreateMedicalRecordSessionItem[] | { data: ICreateMedicalRecordSessionItem[] };

export type IUpdateMedicalRecordSessionBySessionIdPayload = ICreateMedicalRecordSessionItem[];
