import * as S from "./styles";
import { ImgSVG } from "@/components/images";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";
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

function formatPercentValue(value: number): string {
  const abs = Math.abs(value);
  const formatted = Number.isInteger(abs)
    ? String(abs)
    : abs.toFixed(1).replace(".", ",");
  return `${formatted}%`;
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

  const chartData =
    skillsDeveloped?.skills_tag?.categorias?.map((item) => ({
      categoria: item.categoria,
      media: item.media ?? 0,
    })) ?? [];

  return (
    <S.Card aria-label={t("skillsRadarTitle")}>
      <S.CardHeader>
        <S.CardTitle>{t("skillsRadarTitle")}</S.CardTitle>
      </S.CardHeader>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="70%">
            <PolarGrid stroke="#E0E0E0" />
            <PolarAngleAxis
              dataKey="categoria"
              tick={{ fill: "#5C5C5C", fontSize: 11 }}
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
