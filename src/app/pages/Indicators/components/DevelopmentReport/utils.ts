//Paleta de cores atribuída às séries/categorias na ordem de aparição
export const CHART_COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F97316",
  "#06B6D4",
  "#F59E0B",
  "#EC4899",
  "#84CC16",
  "#6366F1",
  "#78716C",
];
//Faixas de cor do desempenho conforme o percentual (0-100)
export const getPerformanceColor = (value: number): string => {
  if (value >= 70) return "#22C55E";
  if (value >= 50) return "#EAB308";
  if (value >= 25) return "#F97316";
  return "#EF4444";
};
//Exibe inteiro quando possível, mantendo uma casa decimal apenas se necessário
export const formatPercent = (value: number): string =>
  Number.isInteger(value) ? String(value) : value.toFixed(1);
