/** Mapeia o rótulo em PT retornado pela API para a chave i18n em `common`. */
export const SKILL_CATEGORY_KEYS: Record<string, string> = {
  "Processamento Auditivo": "skill_auditory_processing",
  "Processamento Visual": "skill_visual_processing",
  "Funções Executivas": "skill_executive_functions",
  "Linguagem e Comunicação": "skill_language_communication",
  "Coordenação Motora": "skill_motor_coordination",
  "Cognição": "skill_cognition",
  "Comportamental e Socioemocional": "skill_behavioral_socioemotional",
};

type TranslateFn = (key: string, options?: { ns?: string }) => string;

export function translateSkillCategory(
  t: TranslateFn,
  category: string
): string {
  const key = SKILL_CATEGORY_KEYS[category.trim()];
  if (!key) return category;
  return t(key, { ns: "common" });
}
