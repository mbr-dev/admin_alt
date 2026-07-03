import * as S from "./styles";
import { PerformanceBar } from "../PerformanceBar";
import { useTranslation } from "react-i18next";
import { ALTDevelopmentReportService } from "@/data/models";

interface IHighlightList {
  title: string;
  variant: "strong" | "weak";
  items: ALTDevelopmentReportService.IPerformanceSubtagHighlight[];
}

export const HighlightList = ({ title, variant, items }: IHighlightList) => {
  const { t } = useTranslation("indicators");

  return (
    <S.Card>
      <S.TitleBar $variant={variant}>{title}</S.TitleBar>

      {items.length > 0 ? (
        <S.Body>
          {items.map((item) => (
            <S.Item key={`${item.id_tag}-${item.id_subtag}`}>
              <S.Category>{item.tag}</S.Category>
              <S.Skill>{item.subtag}</S.Skill>
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
