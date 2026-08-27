import * as S from "./styles";
import { PerformanceBar } from "../PerformanceBar";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";
import { toCamelCaseLabel } from "@/lib/utils";
import {
  translateAltSubtagById,
  translateAltTagById,
} from "@/lib/i18n/tables/lookup";

interface IHighlightList {
  title: string;
  variant: "strong" | "weak";
  items: ALTDevelopmentReportService.IPerformanceSubtagHighlight[];
  isExporting?: boolean;
}

export function HighlightList({ title, variant, items, isExporting = false }: IHighlightList) {
  const { t, i18n } = useTranslation("indicators");

  return (
    <S.Card $exporting={isExporting} data-export-highlight={isExporting ? "" : undefined}>
      <S.TitleBar $variant={variant}>{title}</S.TitleBar>

      {items.length > 0 ? (
        <S.Body>
          {items.map((item) => {
            const tagLabel = translateAltTagById(item.id_tag, i18n.language, item.tag);
            const subtagLabel = translateAltSubtagById(
              item.id_subtag,
              i18n.language,
              item.subtag
            );

            return (
              <S.Item key={`${item.id_tag}-${item.id_subtag}`}>
                <S.Category $exporting={isExporting}>{tagLabel}</S.Category>
                <S.Skill $exporting={isExporting}>
                  {toCamelCaseLabel(subtagLabel)}
                </S.Skill>
                <PerformanceBar value={item.percentual} />
              </S.Item>
            );
          })}
        </S.Body>
      ) : (
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      )}
    </S.Card>
  );
}
