/** Corpo de `PATCH preferenceUser/updatePreference/{id}`. */
export interface IUpdatePreferencePayload {
  id_idioma: number;
}

/** Resposta de `GET preferenceUser/getPreferenceByUserId/{id}`. */
export interface IPreferenceByUserId {
  id: number;
  id_usuario: number;
  usuario: string;
  id_preferencia: number;
  descricao: string;
  status: number;
  data_cadastro: string;
}
