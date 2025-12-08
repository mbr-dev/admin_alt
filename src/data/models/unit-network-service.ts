export interface IUnitNetworkService {
  id: number;
  descricao: string;
  status: number;
  data_cadastro: string;
  unit: {
    id: number;
    descricao: string;
    cep: string;
    cidade: string;
    estado: string;
    status: number;
    data_cadastro: string;
    id_unidade_rede: number;
  }[];
}