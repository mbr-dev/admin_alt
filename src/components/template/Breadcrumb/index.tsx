import * as S from "./styles";
import { useBreadcrumb } from "./hook";
import { useTranslation } from "react-i18next";

export function Breadcrumb() {
  const { items, navigateTo } = useBreadcrumb();
  const { t } = useTranslation("header");

  if (items.length === 0) return null;

  return (
    <S.Nav aria-label={t("breadcrumb_aria_label")}>
      <S.List>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = t(item.labelKey);

          return (
            <S.Item key={`${item.labelKey}-${index}`}>
              {isLast ? (
                <S.Current aria-current="page">{label}</S.Current>
              ) : item.route ? (
                <S.Link type="button" onClick={() => navigateTo(item.route!)}>
                  {label}
                </S.Link>
              ) : (
                <S.Parent>{label}</S.Parent>
              )}

              {!isLast ? <S.Separator aria-hidden>/</S.Separator> : null}
            </S.Item>
          );
        })}
      </S.List>
    </S.Nav>
  );
}
