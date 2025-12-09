import * as S from "./styles";
import { useModal } from "./hook";
import { Dialog } from "@/components/ui";
import { useIndicators } from "../../hook";
import { useTranslation } from "react-i18next";
import { LabelSelect } from "@/components/template";

export const Modal = () => {
  const hook = useModal();
  const { t } = useTranslation("indicators");
  const indicatorsContext = useIndicators();

  return (
    <Dialog.Dialog open={indicatorsContext.showModal} onOpenChange={() => indicatorsContext.handleToggleModal(false, -1)}>
      <Dialog.DialogContent className="max-w-[300px] justify-center landscape:max-w-[400px] md:max-w-[450px] md:rounded-xl landscape:lg:rounded-xl landscape:lg:max-w-[450px] rounded-xl border-2 border-mbr-blue-10 overflow-hidden">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="text-mbr-blue-10 font-bold text-center text-2xl">{t("search_student")}</Dialog.DialogTitle>
        </Dialog.DialogHeader>

        <S.Main>
          <S.Form>
            <LabelSelect
              id="3"
              placeholder={t("select_student")}
              value={hook.students?.selected ?? ""}
              items={hook.students?.list}
              onChange={hook.handleSelectStudent}
              disabled={hook.students?.list.length <= 0}
              label={t("student")}
              load={hook.loadLabel && hook.students?.list.length <= 0}
            />
          </S.Form>

          <S.ButtonBox>
            <S.Button
              onClick={() => indicatorsContext.handleToggleModal(false, -1)}
              className="bg-mbr-gray-30"
            >{t("cancel")}</S.Button>

            <S.Button
              onClick={hook.handleConfirm}
              className="bg-mbr-green-30"
            >{t("confirm")}</S.Button>
          </S.ButtonBox>
        </S.Main>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}