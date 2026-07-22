import * as S from "./styles";
import { useState, useEffect } from "react";
import { EXPORT_CHART_SIZE } from "../../utils";
import { ALTDevelopmentReportService } from "@/data/models";
import { useTranslation } from "react-i18next";
import {
  Radar,
  Tooltip,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface ICategoryPerformance {
  categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[];
  isExporting?: boolean;
}

interface IAngleTickProps {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  textAnchor?: string;
  payload?: { value?: string | number };
  $small?: boolean;
}

const MOBILE_BREAKPOINT = 768;
const LABEL_OUTWARD_OFFSET = 14;
const LABEL_OUTWARD_OFFSET_MOBILE = 10;

//Detecta viewport mobile para compactar os rótulos do radar
const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const handleChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

//Quebra rótulos longos em múltiplas linhas para não cortarem nas bordas do gráfico
const wrapTickLabel = (label: string, maxLineLength: number): string[] => {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLineLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);
  return lines;
};

//Empurra o rótulo radialmente para fora do gráfico, evitando sobreposição com o eixo (ex.: 100)
const getOutwardPosition = (
  x: number,
  y: number,
  cx: number,
  cy: number,
  offset: number
): { x: number; y: number } => {
  const dx = x - cx;
  const dy = y - cy;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) return { x, y: y - offset };

  return {
    x: x + (dx / distance) * offset,
    y: y + (dy / distance) * offset,
  };
};

const AngleTick = ({
  x = 0,
  y = 0,
  cx = 0,
  cy = 0,
  textAnchor,
  payload,
  $small = false,
}: IAngleTickProps) => {
  const fontSize = $small ? 10 : 12;
  const lineHeight = $small ? 11 : 13;
  const maxLineLength = $small ? 10 : 12;
  const outwardOffset = $small ? LABEL_OUTWARD_OFFSET_MOBILE : LABEL_OUTWARD_OFFSET;
  const lines = wrapTickLabel(String(payload?.value ?? ""), maxLineLength);
  const offsetY = ((lines.length - 1) * lineHeight) / 2;
  const position = getOutwardPosition(x, y, cx, cy, outwardOffset);

  return (
    <text
      x={position.x}
      y={position.y - offsetY}
      textAnchor={textAnchor}
      fill="#5C5C5C"
      fontSize={fontSize}
    >
      {lines.map((line, index) => (
        <tspan key={index} x={position.x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const renderRadarChart = (
  categories: ALTDevelopmentReportService.IGeneralDevelopmentIndexCategory[],
  title: string,
  isMobile: boolean
) => (
  <RadarChart data={categories} outerRadius={isMobile ? "48%" : "55%"}>
    <PolarGrid stroke="#E0E0E0" />
    <PolarAngleAxis dataKey="categoria" tick={<AngleTick $small={isMobile} />} />
    <PolarRadiusAxis
      domain={[0, 100]}
      angle={90}
      tick={{ fill: "#929292", fontSize: 10 }}
      axisLine={false}
    />
    <Radar name={title} dataKey="media" stroke="#0288D1" fill="#0288D1" fillOpacity={0.5} />
    <Tooltip
      formatter={(value: number) => [`${value}%`, ""]}
      contentStyle={{ borderRadius: 8, borderColor: "#E0E0E0" }}
    />
  </RadarChart>
);

export const CategoryPerformance = ({ categories, isExporting = false }: ICategoryPerformance) => {
  const { t } = useTranslation("indicators");
  const isMobile = useIsMobile();
  const { width, height } = EXPORT_CHART_SIZE.wide;

  return (
    <S.Card>
      <S.Title>{t("dev_categoryTitle")}</S.Title>
      <S.Subtitle>{t("dev_categorySubtitle")}</S.Subtitle>

      <S.ChartWrapper $exporting={isExporting}>
        {isExporting ? (
          <RadarChart width={width} height={height} data={categories} outerRadius="55%">
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis dataKey="categoria" tick={<AngleTick />} />
            <PolarRadiusAxis
              domain={[0, 100]}
              angle={90}
              tick={{ fill: "#929292", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name={t("dev_categoryTitle")}
              dataKey="media"
              stroke="#0288D1"
              fill="#0288D1"
              fillOpacity={0.5}
              isAnimationActive={false}
            />
          </RadarChart>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {renderRadarChart(categories, t("dev_categoryTitle"), isMobile)}
          </ResponsiveContainer>
        )}
      </S.ChartWrapper>
    </S.Card>
  );
};
