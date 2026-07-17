import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";
import { TMonitoringPeriodFilter } from "../../context/monitoring-model";

const PERIOD_OPTIONS: TMonitoringPeriodFilter[] = [15, 30, 90, 180];

export function PeriodFilter() {
  const { t } = useTranslation("monitoring");
  const { filter, setFilter } = useMonitoring();

  return (
    <S.Filter role="radiogroup" aria-label={t("selectPeriod")}>
      <h2>{t("selectPeriod")}</h2>

      <S.Options>
        {PERIOD_OPTIONS.map((period) => (
          <S.Option key={period}>
            <S.Radio
              type="radio"
              name="monitoringPeriod"
              value={period}
              checked={filter === period}
              onChange={() => setFilter(period)}
            />
            {t(`period${period}`)}
          </S.Option>
        ))}
      </S.Options>
    </S.Filter>
  );
}
