import * as S from "./styles";
import { Animations, Modal } from "..";
import { useIndicators } from "../../hook";
import { useTranslation } from "react-i18next";

export const SelectReport = () => {
  const indicatorsContext = useIndicators();
  const { t } = useTranslation("indicators");

  return (
    <S.Container>
      <Modal />
      <Animations />

      <S.Main>
        <S.Titles>
          <h2>{t("title")}</h2>
          <p>{t("subTitle")}</p>
        </S.Titles>

        <S.ButtonBox>
          {indicatorsContext.BUTTONS && indicatorsContext.BUTTONS.map((item) => (
            <S.Buttons
              key={item.id}
              title={item.label}
              onClick={() => indicatorsContext.handleToggleModal(true, item.id)}
              style={{ background: `linear-gradient(to bottom, ${item.color[0]}, ${item.color[1]})` }}
            >
              <img src={item.icon} alt="" />
              <p>{item.label}</p>
            </S.Buttons>
          ))}
        </S.ButtonBox>
      </S.Main>
    </S.Container>
  )
}