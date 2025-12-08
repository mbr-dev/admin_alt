import * as S from "../ModalIAP/styles";
import { Dialog } from "@/components/ui";
import { useTranslation } from "react-i18next";

interface IModal {
  show: boolean;
  showDoubt: (type: number, show: boolean) => void;
}

export const ModalICA = ({ show, showDoubt }: IModal) => {
  const { t } = useTranslation("indicators");

  return (
    <Dialog.Dialog open={show} onOpenChange={() => showDoubt(1, false)}>
      <Dialog.DialogContent className="max-w-[300px] justify-center landscape:max-w-[550px] md:max-w-[600px] md:rounded-xl landscape:lg:rounded-xl landscape:lg:max-w-[650px] rounded-xl border-2 border-mbr-blue-10 overflow-hidden">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="text-mbr-blue-10 font-bold text-center text-xl md:text-2xl landscape:lg:text-2xl">{t("ica_title")}</Dialog.DialogTitle>
        </Dialog.DialogHeader>

        <S.Main>
          <S.Text>{t("ica_textTop")}</S.Text>
          <S.Div>
            <S.Text className="font-bold text-mbr-blue-100 pb-1 md:pb-2 landscape:lg:pb-2">{t("iap_example")}</S.Text>
            <S.Text className="text-mbr-blue-100">{t("iap_text1")}</S.Text>
            <S.Text className="text-mbr-blue-100">{t("iap_text2")}</S.Text>
            <S.Text className="text-mbr-blue-100">{t("iap_text3")}</S.Text>
          </S.Div>
          <S.Div className="bg-mbr-green-70">
            <S.Text className="font-bold text-mbr-green-80 pb-1 md:pb-2 landscape:lg:pb-2">{t("ica_exampleG")}</S.Text>
            <S.Text className="text-mbr-green-80">{t("ica_exampleG2")}</S.Text>
            <S.Text className="text-mbr-green-80">{t("ica_textG1")}</S.Text>
            <S.Text className="text-mbr-green-80">{t("ica_textG2")}</S.Text>
          </S.Div>
        </S.Main>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}