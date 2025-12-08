import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { useDidactic } from "../../hook";
import { Animations, ModalGame } from "..";
import { IoCloseSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export const Container = () => {
  const { t } = useTranslation("didactic");
  const didacticContext = useDidactic();
  const { URL_FILES } = useApi();

  return (
    <S.Container>
      <Animations />
      {didacticContext.showGame && <ModalGame />}

      <S.Titles>
        <h2>{t("title").toUpperCase()}</h2>
      </S.Titles>
      
      {!didacticContext.showActivities ?
        <S.Main>
          {(didacticContext?.data && didacticContext.modules?.length > 0) && didacticContext.modules?.map((item) => (
            <S.Cards
              key={item.id}
              title={item.descricao}
              onClick={() => didacticContext.fetchActivities(item)}
            >
              <img src={`${URL_FILES}${item.icone}`} alt="" />
              <p>{item.descricao}</p>
            </S.Cards>
          ))}
        </S.Main>
        :
        <S.Activities>
          <h2>{didacticContext.activitySelectedTitle}</h2>
          <S.Close onClick={didacticContext.handleClose}><IoCloseSharp /></S.Close>

          <S.ActivitiesDiv>
            {didacticContext.activities.length > 0 && didacticContext.activities.map((item) => (
              <S.Button
                key={item.id}
                onClick={() => didacticContext.handleGetActivity(item)}
                label={item.descricao}
              >
                {item.descricao}
              </S.Button>
            ))}
          </S.ActivitiesDiv>
        </S.Activities>}
    </S.Container>
  )
}