import * as S from "./styles";
import { getPerformanceColor, formatPercent } from "../../utils";

interface IPerformanceBar {
  value: number;
}

export const PerformanceBar = ({ value }: IPerformanceBar) => {
  const safeValue = Math.min(Math.max(value ?? 0, 0), 100);

  return (
    <S.Row>
      <S.Track>
        <S.Fill style={{ width: `${safeValue}%`, backgroundColor: getPerformanceColor(safeValue) }} />
      </S.Track>
      <S.Value>{formatPercent(safeValue)}%</S.Value>
    </S.Row>
  );
};
