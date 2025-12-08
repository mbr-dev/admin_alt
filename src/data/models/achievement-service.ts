export interface IAchievementsUserService {
  conquistas: IAchievement[];
  porcentagem_total: number;
  total_conquistas: number;
  total_feito: number;
}

export interface IAchievement {
  id: number;
  id_hierarquia: number;
  icone: string;
  titulo: string;
  label: string;
  max_xp: number;
  moeda: number;
  porcentagem: number;
  feito: number;
  status: number;
  data_cadastro: string;
}