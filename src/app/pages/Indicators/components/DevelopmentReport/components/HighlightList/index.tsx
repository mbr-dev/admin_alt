import * as S from "./styles";
import { PerformanceBar } from "../PerformanceBar";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";

interface IHighlightList {
  title: string;
  variant: "strong" | "weak";
  items: ALTDevelopmentReportService.IPerformanceSubtagHighlight[];
  isExporting?: boolean;
}

export const HighlightList = ({ title, variant, items, isExporting = false }: IHighlightList) => {
  const { t } = useTranslation("indicators");

  return (
    <S.Card $exporting={isExporting} data-export-highlight={isExporting ? "" : undefined}>
      <S.TitleBar $variant={variant}>{title}</S.TitleBar>

      {items.length > 0 ? (
        <S.Body>
          {items.map((item) => (
            <S.Item key={`${item.id_tag}-${item.id_subtag}`}>
              <S.Category $exporting={isExporting}>{item.tag}</S.Category>
              <S.Skill $exporting={isExporting}>{item.subtag}</S.Skill>
              <PerformanceBar value={item.percentual} />
            </S.Item>
          ))}
        </S.Body>
      ) : (
        <S.Empty>
          <p>{t("empty")}</p>
        </S.Empty>
      )}
    </S.Card>
  );
};
