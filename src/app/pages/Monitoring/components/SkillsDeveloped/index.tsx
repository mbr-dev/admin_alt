import * as S from "./styles";
import { createPortal } from "react-dom";
import { Table } from "@/components/ui";
import { ImgSVG } from "@/components/images";
import { useMonitoring } from "../../hook";
import { useStorage } from "@/data/hooks";
import { useTranslation } from "react-i18next";
import { Pagination } from "@/components/template";
import { IoClose } from "react-icons/io5";
import { ALTDevelopmentNetwork } from "@/data/services";
import { ALTDevelopmentNetworkService } from "@/data/models";
import { useCallback, useEffect, useRef, useState } from "react";
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

const FUNNEL_LABEL_KEYS: Record<TFunnelKey, string> = {
  evoluiram: "funnelEvoluiram",
  mantiveram: "funnelMantiveram",
  regrediram: "funnelRegrediram",
};

const FUNNEL_STUDENTS_LIMIT = 20;
const FUNNEL_DIALOG_TITLE_ID = "funnel-students-dialog-title";

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

function formatSignedPercent(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${formatPercentValue(value)}`;
}

function getVariationTone(value: number): "positive" | "negative" | "neutral" {
  if (value > 0) return "positive";
  if (value < 0) return "negative";
  return "neutral";
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

function FunnelStudentsDialog({
  classification,
  isLoading,
  page,
  response,
  onClose,
  onChangePage,
}: {
  classification: TFunnelKey;
  isLoading: boolean;
  page: number;
  response: ALTDevelopmentNetworkService.IGetProgressionFunnelStudentsResponse | null;
  onClose: () => void;
  onChangePage: (page: number) => void;
}) {
  const { t } = useTranslation("monitoring");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const classificationLabel = t(FUNNEL_LABEL_KEYS[classification]);
  const students = response?.data ?? [];
  const totalPages = response?.totalPages ?? 1;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <S.ModalRoot>
      <S.ModalBackdrop type="button" aria-label={t("funnelCloseStudents")} onClick={onClose} />

      <S.ModalPanel
        role="dialog"
        aria-modal="true"
        aria-labelledby={FUNNEL_DIALOG_TITLE_ID}
        aria-busy={isLoading}
      >
        <S.ModalHeader>
          <S.ModalTitle id={FUNNEL_DIALOG_TITLE_ID}>
            {t("funnelStudentsDialogTitle", { classification: classificationLabel })}
          </S.ModalTitle>
        </S.ModalHeader>

        <S.ModalClose
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={t("funnelCloseStudents")}
        >
          <IoClose aria-hidden />
        </S.ModalClose>

        <S.ModalBody>
          {isLoading ? (
            <S.ModalSkeleton aria-label={t("funnelStudentsLoading")} />
          ) : students.length === 0 ? (
            <S.ModalEmpty>{t("funnelStudentsEmpty")}</S.ModalEmpty>
          ) : (
            <>
              <Table.Table>
                <Table.TableHeader>
                  <Table.TableRow>
                    <S.Head>{t("funnelStudentName")}</S.Head>
                    <S.Head>{t("unit")}</S.Head>
                    <S.Head>{t("funnelStudentPrevious")}</S.Head>
                    <S.Head>{t("funnelStudentCurrent")}</S.Head>
                    <S.Head>{t("funnelStudentVariation")}</S.Head>
                    <S.Head>{t("funnelStudentClassification")}</S.Head>
                  </Table.TableRow>
                </Table.TableHeader>

                <Table.TableBody>
                  {students.map((student) => (
                    <Table.TableRow key={`${student.id_usuario}-${student.id_unidade}`}>
                      <S.Cell>{student.nome}</S.Cell>
                      <S.Cell>{student.unidade}</S.Cell>
                      <S.Cell>{formatPercentValue(student.percentual_anterior)}</S.Cell>
                      <S.Cell>{formatPercentValue(student.percentual_atual)}</S.Cell>
                      <S.Cell>
                        <S.Variation $tone={getVariationTone(student.variacao)}>
                          {formatSignedPercent(student.variacao)}
                        </S.Variation>
                      </S.Cell>
                      <S.Cell>{t(FUNNEL_LABEL_KEYS[student.classificacao])}</S.Cell>
                    </Table.TableRow>
                  ))}
                </Table.TableBody>
              </Table.Table>

              {totalPages > 1 && (
                <Pagination
                  numberOfPageButton={totalPages}
                  currentPage={page}
                  onChangePage={onChangePage}
                />
              )}
            </>
          )}
        </S.ModalBody>
      </S.ModalPanel>
    </S.ModalRoot>,
    document.body
  );
}

function ProgressionFunnelCard() {
  const { t } = useTranslation("monitoring");
  const { getData } = useStorage();
  const { skillsDeveloped, filter } = useMonitoring();
  const { getProgressionFunnelStudents } = ALTDevelopmentNetwork();
  const funnel = skillsDeveloped?.progression_funnel;

  const [page, setPage] = useState(1);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState<TFunnelKey | null>(null);
  const [studentsResponse, setStudentsResponse] =
    useState<ALTDevelopmentNetworkService.IGetProgressionFunnelStudentsResponse | null>(null);

  const requestIdRef = useRef(0);
  const getDataRef = useRef(getData);
  const getProgressionFunnelStudentsRef = useRef(getProgressionFunnelStudents);

  useEffect(() => {
    getDataRef.current = getData;
    getProgressionFunnelStudentsRef.current = getProgressionFunnelStudents;
  }, [getData, getProgressionFunnelStudents]);

  const fetchStudents = useCallback(async (classificacao: TFunnelKey, nextPage: number) => {
    const idRede = Number(getDataRef.current("id_rede"));
    if (Number.isNaN(idRede) || idRede <= 0) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsStudentsLoading(true);

    const response = await getProgressionFunnelStudentsRef.current({
      id_rede: idRede,
      filter,
      page: nextPage,
      limit: FUNNEL_STUDENTS_LIMIT,
      classificacao,
    });

    if (requestId !== requestIdRef.current) return;

    setStudentsResponse(response);
    setIsStudentsLoading(false);
  }, [filter]);

  const handleCloseStudents = useCallback(() => {
    requestIdRef.current += 1;
    setSelectedClassification(null);
    setStudentsResponse(null);
    setIsStudentsLoading(false);
    setPage(1);
  }, []);

  const handleSelectClassification = useCallback(
    (classificacao: TFunnelKey) => {
      setSelectedClassification(classificacao);
      setPage(1);
      setStudentsResponse(null);
      void fetchStudents(classificacao, 1);
    },
    [fetchStudents]
  );

  const handleChangePage = useCallback(
    (nextPage: number) => {
      if (!selectedClassification) return;
      setPage(nextPage);
      void fetchStudents(selectedClassification, nextPage);
    },
    [fetchStudents, selectedClassification]
  );

  useEffect(() => {
    if (!selectedClassification) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedClassification]);

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
    };
  }, []);

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
      labelKey: FUNNEL_LABEL_KEYS.evoluiram,
      difference: funnel?.percentual_diferenca?.evoluiram,
      width: "100%",
    },
    {
      key: "mantiveram",
      image: ImgSVG.MonitoringAmarelo,
      quantity: funnel?.mantiveram?.quantidade ?? 0,
      labelKey: FUNNEL_LABEL_KEYS.mantiveram,
      difference: funnel?.percentual_diferenca?.mantiveram,
      width: "72%",
    },
    {
      key: "regrediram",
      image: ImgSVG.MonitoringVermelho,
      quantity: funnel?.regrediram?.quantidade ?? 0,
      labelKey: FUNNEL_LABEL_KEYS.regrediram,
      difference: funnel?.percentual_diferenca?.regrediram,
      width: "48%",
    },
  ];

  return (
    <S.Card aria-label={t("funnelTitle")}>
      <S.FunnelHeader>
        <S.CardTitle>{t("funnelTitle")}</S.CardTitle>
        <S.FunnelSubtitle>{t("funnelSubtitle", { filter })}</S.FunnelSubtitle>
        <S.FunnelSubtitleSecondary>
          {t("funnelSubtitleComparison", { current: filter, previous: filter })}
        </S.FunnelSubtitleSecondary>
        <S.FunnelSubtitleSecondary>{t("funnelSubtitleExplanation")}</S.FunnelSubtitleSecondary>
        <S.FunnelAnalyzed>
          {t("funnelStudentsAnalyzed", { count: funnel?.alunos_analisados ?? 0 })}
        </S.FunnelAnalyzed>
      </S.FunnelHeader>

      <S.FunnelBody>
        {rows.map((row) => (
          <S.FunnelRow key={row.key}>
            <S.FunnelSegmentWrap>
              <S.FunnelSegment
                type="button"
                style={{ width: row.width }}
                $selected={selectedClassification === row.key}
                aria-pressed={selectedClassification === row.key}
                aria-haspopup="dialog"
                aria-label={t("funnelOpenStudents", { label: t(row.labelKey) })}
                onClick={() => handleSelectClassification(row.key)}
              >
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

      {selectedClassification && (
        <FunnelStudentsDialog
          key={selectedClassification}
          classification={selectedClassification}
          isLoading={isStudentsLoading}
          page={page}
          response={studentsResponse}
          onClose={handleCloseStudents}
          onChangePage={handleChangePage}
        />
      )}
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
