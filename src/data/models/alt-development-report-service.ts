/** Parâmetros comuns aos endpoints de relatório de desenvolvimento ALT (`id_usuario`). */
export interface IALTDevelopmentReportQueryParams {
  id_usuario: number;
}

export interface IGeneralDevelopmentIndexCategory {
  id_tag: number;
  categoria: string;
  media: number;
}

/** Resposta de `GET altDevelopmentReport/generalDevelopmentIndex`. */
export interface IGetGeneralDevelopmentIndexResponse {
  id_usuario: number;
  indice_geral: number;
  categorias: IGeneralDevelopmentIndexCategory[];
}

export interface IPerformanceSubtagItem {
  id_subtag: number;
  subtag: string;
  percentual: number;
}

export interface IPerformanceSubtagTag {
  id_tag: number;
  tag: string;
  subtags: IPerformanceSubtagItem[];
}

export interface IPerformanceSubtagHighlight {
  id_tag: number;
  tag: string;
  id_subtag: number;
  subtag: string;
  percentual: number;
}

/** Resposta de `GET altDevelopmentReport/performanceSubtag`. */
export interface IGetPerformanceSubtagResponse {
  id_usuario: number;
  tags: IPerformanceSubtagTag[];
  pontos_fortes: IPerformanceSubtagHighlight[];
  pontos_fracos: IPerformanceSubtagHighlight[];
}

export interface ICompetencyTreeCompetency {
  id_competencia: number;
  competencia: string;
  percentual: number;
}

export interface ICompetencyTreeSubtag {
  id_subtag: number;
  subtag: string;
  percentual: number;
  competencias: ICompetencyTreeCompetency[];
}

export interface ICompetencyTreeTag {
  id_tag: number;
  tag: string;
  subtags: ICompetencyTreeSubtag[];
}

/** Resposta de `GET altDevelopmentReport/competencyTree`. */
export interface IGetCompetencyTreeResponse {
  id_usuario: number;
  tags: ICompetencyTreeTag[];
}

export interface IEvolutionAltTagItem {
  id_tag: number;
  tag: string;
  percentual: number;
}

export interface IEvolutionAltTagPeriod {
  periodo: string;
  tags: IEvolutionAltTagItem[];
}

/** Resposta de `GET altDevelopmentReport/evolutionAltTag`. */
export interface IGetEvolutionAltTagResponse {
  id_usuario: number;
  periodos: IEvolutionAltTagPeriod[];
}

export interface IDistributionActivitiesPerformedItem {
  id_tag: number;
  tag: string;
  realizada: number;
  total_atividade: number;
  atividade_realizada: number;
}

/** Resposta de `GET altDevelopmentReport/distributionActivitiesPerformed`. */
export interface IGetDistributionActivitiesPerformedResponse {
  id_usuario: number;
  tags: IDistributionActivitiesPerformedItem[];
}
