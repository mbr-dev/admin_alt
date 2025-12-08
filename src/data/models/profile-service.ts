export interface IProfileService {
  id: number;
  id_usuario: number;
  id_hierarquia: number;
  usuario: string;
  nome: string;
  email?: string;
  moeda?: number;
  data_nascimento?: string;
  id_avatar: number;
  link: string;
  tempo_acesso: number;
  turma?: string;
  turmas?: any[];
  unidade?: string;
  unidades: any[];
  xp?: number;
  status: number;
  data_cadastro: string;
}