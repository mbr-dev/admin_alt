import * as ImgSVG from "@/components/images/svg";
import { ALTDevelopmentReportService } from "@/data/models";

export interface ITagSoftColor {
  bg: string;
  border: string;
  accent: string;
}

// Paleta suave alinhada à ordem de CHART_COLORS
export const TAG_SOFT_COLORS: ITagSoftColor[] = [
  { bg: "#EFF6FF", border: "#BFDBFE", accent: "#2563EB" },
  { bg: "#ECFDF5", border: "#A7F3D0", accent: "#059669" },
  { bg: "#F5F3FF", border: "#DDD6FE", accent: "#7C3AED" },
  { bg: "#FFF7ED", border: "#FED7AA", accent: "#EA580C" },
  { bg: "#ECFEFF", border: "#A5F3FC", accent: "#0891B2" },
  { bg: "#FFFBEB", border: "#FDE68A", accent: "#D97706" },
  { bg: "#FDF2F8", border: "#FBCFE8", accent: "#DB2777" },
  { bg: "#F7FEE7", border: "#D9F99D", accent: "#65A30D" },
  { bg: "#EEF2FF", border: "#C7D2FE", accent: "#4F46E5" },
  { bg: "#F5F5F4", border: "#D6D3D1", accent: "#57534E" },
];

export const getTagSoftColor = (index: number): ITagSoftColor =>
  TAG_SOFT_COLORS[index % TAG_SOFT_COLORS.length];

const TAG_ICONS: Record<number, string> = {
  1: ImgSVG.altTag1,
  2: ImgSVG.altTag2,
  3: ImgSVG.altTag3,
  4: ImgSVG.altTag4,
  5: ImgSVG.altTag5,
  6: ImgSVG.altTag6,
  7: ImgSVG.altTag7,
};

export const getTagIcon = (tagId: number): string | null => TAG_ICONS[tagId] ?? null;

// 0-25 vermelho | 26-50 laranja | 51-70 azul | 71-100 verde
export const getCompetencyMapPerformanceColor = (value: number): string => {
  if (value >= 71) return "#22C55E";
  if (value >= 51) return "#3B82F6";
  if (value >= 26) return "#F97316";
  return "#EF4444";
};

export const getCategoryMedia = (
  categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[],
  tagId: number
): number | null => {
  const category = categories.find((item) => item.id_tag === tagId);
  return category?.media ?? null;
};

export const hasCompetencyContent = (
  tags: ALTDevelopmentReportService.ICompetencyTreeTag[]
): boolean =>
  tags.some((tag) =>
    tag.subtags?.some((subtag) => (subtag.competencias?.length ?? 0) > 0)
  );
