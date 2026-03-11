export interface ICidSigla {
  id: number;
  sigla: string;
  descricao: string;
}

export interface ICidSubcategoria {
  titulo: string;
  siglas: ICidSigla[];
}

export interface ICidGrupo {
  titulo: string;
  subcategoria: ICidSubcategoria[];
}

export interface IGetAllCidGroupedResponse {
  data: ICidGrupo[];
}
