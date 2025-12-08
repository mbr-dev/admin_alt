import * as S from "./styles";
import { useMain } from "@/data/hooks";
import { Animations } from "./components";
import { ImgSVG } from "@/components/images";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { UserRole } from "@/data/constants/user-roles";

export const Painel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("home");
  const mainContext = useMain();

  return (
    <S.Container>
      <Animations />

      <S.Main>
        {(mainContext.tokenData.hierarquia === UserRole.SECRETARY) &&
          <S.Painel className="bg-gradient-to-b from-mbr-green-10 to-mbr-green-20 hover:from-mbr-green-20 hover:to-mbr-green-10" onClick={() => navigate("/monitoring")}>
            <S.PainelIcon>
              <img src={ImgSVG.Escola} alt="icone" />
            </S.PainelIcon>

            <div>
              <h2>{t("painel_es")}</h2>
              <p>{t("painel_es_txt")}</p>
            </div>
          </S.Painel>
        }

        {(mainContext.tokenData.hierarquia === UserRole.COORDINATOR || mainContext.tokenData.hierarquia === UserRole.SECRETARY || mainContext.tokenData.hierarquia === UserRole.TEACHER) &&
          <S.Painel className="bg-gradient-to-b from-mbr-orange-20 to-mbr-orange-30 hover:from-mbr-orange-30 hover:to-mbr-orange-20" onClick={() => navigate("/indicators")}>
            <S.PainelIcon>
              <img src={ImgSVG.Aluno} alt="icone" />
            </S.PainelIcon>

            <div>
              <h2>{t("painel_al")}</h2>
              <p>{t("painel_al_txt")}</p>
            </div>
          </S.Painel>
        }
      </S.Main>
    </S.Container>
  )
}