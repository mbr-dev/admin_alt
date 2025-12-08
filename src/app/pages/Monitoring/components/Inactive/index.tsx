import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Inactive = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();

  const [unitsInactive, setUnitsInactive] = useState<any[]>([]);

  const fetchData = () => {
    const filterUnitInactive = monitoringContext.data.unidades.filter((item: any) => item.total_rodadas === 0);
    setUnitsInactive(filterUnitInactive);
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <S.Container>
      <h2>{t("inative")}</h2>
      {unitsInactive.length > 0 ?
        <S.Div>
          {unitsInactive.map((item, index) => (
            <p key={index}>{item.nome_unidade}</p>
          ))}
        </S.Div>
        :
        <div className="p-4 text-center md:p-8 landscape:lg:p-8">
          <h2 className="text-lg md:text-2xl landscape:lg:text-2xl font-bold">{t("empty")}</h2>
        </div>
      }
    </S.Container>
  )
}