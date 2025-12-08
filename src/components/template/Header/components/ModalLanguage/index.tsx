import * as S from "./styles";
import { Dialog } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";

interface IModalLanguage {
  languages: any[];
  show: boolean;
  close: Dispatch<SetStateAction<boolean>>;
  changeLanguage: (item: string) => void;
}

export const ModalLanguage = ({ show, close, languages, changeLanguage }: IModalLanguage) => {
  const { t } = useTranslation("header");

  return (
    <Dialog.Dialog open={show} onOpenChange={() => close(false)}>
      <Dialog.DialogContent className="max-w-[250px] justify-center landscape:max-w-[320px] md:max-w-[400px] md:rounded-xl landscape:lg:rounded-xl landscape:lg:max-w-[400px] rounded-xl border-2 border-mbr-blue-10 overflow-hidden">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="text-mbr-blue-10 font-bold text-center text-2xl">{t("language")}</Dialog.DialogTitle>
        </Dialog.DialogHeader>

        <S.Main>
          {languages.map((item, index) => {
            return index > 0 && 
              <S.Button key={item.id} onClick={() => changeLanguage(item.code)}>
                <img src={item.img} alt="Bandeiras" />
              </S.Button>
          })}
        </S.Main>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}