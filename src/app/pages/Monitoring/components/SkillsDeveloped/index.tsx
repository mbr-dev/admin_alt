import * as S from "./styles";
import { useEffect, useState } from "react";
import { ImgSVG } from "@/components/images";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";
import { translateSkillCategory } from "@/lib/i18n/translate-skill-category";
import {
  Radar,
  Tooltip,
  PolarGrid,
  RadarChart,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const FUNNEL_COLORS = {
  evoluiram: "#57BD6E",
  mantiveram: "#E6B422",
  regrediram: "#E57373",
} as const;

type TFunnelKey = keyof typeof FUNNEL_COLORS;

const MOBILE_BREAKPOINT = 768;
const LABEL_OUTWARD_OFFSET = 12;
const LABEL_OUTWARD_OFFSET_MOBILE = 8;

interface IAngleTickProps {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  textAnchor?: string;
  payload?: { value?: string | number };
  $small?: boolean;
}

function formatPercentValue(value: number): string {
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs)
    ? String(abs)
    : abs.toFixed(1).replace(".", ",");
  return `${formatted}%`;
}

//Detecta viewport mobile para compactar os rótulos do radar
function useIsMobile(): boolean {
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
}

//Quebra rótulos longos em múltiplas linhas para não cortarem nas bordas do gráfico
function wrapTickLabel(label: string, maxLineLength: number): string[] {
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
}

//Empurra o rótulo radialmente para fora do gráfico, evitando sobreposição com o eixo
function getOutwardPosition(
  x: number,
  y: number,
  cx: number,
  cy: number,
  offset: number
): { x: number; y: number } {
  const dx = x - cx;
  const dy = y - cy;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) return { x, y: y - offset };

  return {
    x: x + (dx / distance) * offset,
    y: y + (dy / distance) * offset,
  };
}

function AngleTick({
  x = 0,
  y = 0,
  cx = 0,
  cy = 0,
  textAnchor,
  payload,
  $small = false,
}: IAngleTickProps) {
  const fontSize = $small ? 10 : 11;
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
}

function FunnelDiff({
  value,
  color,
  vsLabel,
  stableLabel,
}: {
  value: number | null | undefined;
  color: string;
  vsLabel: string;
  stableLabel: string;
}) {
  const diff = value ?? 0;
  const isStable = diff === 0;

  return (
    <S.DiffBlock>
      <S.DiffValue style={{ color }}>
        {isStable ? <FaArrowRight aria-hidden /> : diff > 0 ? <FaArrowUp aria-hidden /> : <FaArrowDown aria-hidden />}
        {isStable ? stableLabel : formatPercentValue(diff)}
      </S.DiffValue>
      <S.DiffLabel>{vsLabel}</S.DiffLabel>
    </S.DiffBlock>
  );
}

function SkillsRadarCard() {
  const { t } = useTranslation("monitoring");
  const { skillsDeveloped } = useMonitoring();
  const isMobile = useIsMobile();

  const chartData =
    skillsDeveloped?.skills_tag?.categorias?.map((item) => ({
      categoria: translateSkillCategory(t, item.categoria),
      media: item.media ?? 0,
    })) ?? [];

  return (
    <S.Card aria-label={t("skillsRadarTitle")}>
      <S.CardHeader>
        <S.CardTitle>{t("skillsRadarTitle")}</S.CardTitle>
      </S.CardHeader>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius={isMobile ? "48%" : "55%"}>
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis
              dataKey="categoria"
              tick={<AngleTick $small={isMobile} />}
            />
            <PolarRadiusAxis
              domain={[0, 100]}
              angle={90}
              tick={{ fill: "#929292", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name={t("skillsRadarTitle")}
              dataKey="media"
              stroke="#0288D1"
              fill="#0288D1"
              fillOpacity={0.5}
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, ""]}
              contentStyle={{ borderRadius: 8, borderColor: "#E0E0E0" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.Card>
  );
}

function ProgressionFunnelCard() {
  const { t } = useTranslation("monitoring");
  const { skillsDeveloped } = useMonitoring();
  const funnel = skillsDeveloped?.progression_funnel;

  const rows: Array<{
    key: TFunnelKey;
    image: string;
    quantity: number;
    labelKey: string;
    difference: number | null | undefined;
    width: string;
  }> = [
    {
      key: "evoluiram",
      image: ImgSVG.MonitoringVerde,
      quantity: funnel?.evoluiram?.quantidade ?? 0,
      labelKey: "funnelEvoluiram",
      difference: funnel?.percentual_diferenca?.evoluiram,
      width: "100%",
    },
    {
      key: "mantiveram",
      image: ImgSVG.MonitoringAmarelo,
      quantity: funnel?.mantiveram?.quantidade ?? 0,
      labelKey: "funnelMantiveram",
      difference: funnel?.percentual_diferenca?.mantiveram,
      width: "72%",
    },
    {
      key: "regrediram",
      image: ImgSVG.MonitoringVermelho,
      quantity: funnel?.regrediram?.quantidade ?? 0,
      labelKey: "funnelRegrediram",
      difference: funnel?.percentual_diferenca?.regrediram,
      width: "48%",
    },
  ];

  return (
    <S.Card aria-label={t("funnelTitle")}>
      <S.CardHeader>
        <S.CardTitle>{t("funnelTitle")}</S.CardTitle>
      </S.CardHeader>

      <S.FunnelBody>
        {rows.map((row) => (
          <S.FunnelRow key={row.key}>
            <S.FunnelSegmentWrap>
              <S.FunnelSegment style={{ width: row.width }}>
                <S.FunnelImage src={row.image} alt="" />
                <S.FunnelOverlay>
                  <S.FunnelValue>{row.quantity}</S.FunnelValue>
                  <S.FunnelLabel>{t(row.labelKey)}</S.FunnelLabel>
                </S.FunnelOverlay>
              </S.FunnelSegment>
            </S.FunnelSegmentWrap>

            <FunnelDiff
              value={row.difference}
              color={FUNNEL_COLORS[row.key]}
              vsLabel={t("vsPreviousPeriod")}
              stableLabel={t("funnelStable")}
            />
          </S.FunnelRow>
        ))}
      </S.FunnelBody>
    </S.Card>
  );
}

export function SkillsDeveloped() {
  const { t } = useTranslation("monitoring");
  const { isSkillsDevelopedLoading } = useMonitoring();

  if (isSkillsDevelopedLoading) {
    return (
      <S.Container aria-busy="true" aria-label={t("skillsDevelopedLoading")}>
        <S.Skeleton />
        <S.Skeleton />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SkillsRadarCard />
      <ProgressionFunnelCard />
    </S.Container>
  );
}
