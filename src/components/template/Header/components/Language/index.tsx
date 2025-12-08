import * as S from "./styles";
import { ModalLanguage } from "../";
import { useLanguage } from "./hook";
import { useStorage } from "@/data/hooks";

export const Language = () => {
  const hook = useLanguage();
  const { getData } = useStorage();

  return (
    <S.Container>
      <ModalLanguage
        languages={hook.flags}
        show={hook.showFlags}
        close={hook.setShowFlags}
        changeLanguage={hook.handleLanguageChange}
      />

      <S.Flag onClick={() => hook.setShowFlags(true)}>
        <img src={hook.flags[Number(getData("id_idioma"))].img} alt="Bandeiras" />
      </S.Flag>
    </S.Container>
  )
}