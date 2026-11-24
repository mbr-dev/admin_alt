import * as S from "./styles";
import { Student } from "@/data/services";
import { StudentService } from "@/data/models";
import { useToast } from "@/data/hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface IBlockAccessModalProps {
  student: StudentService.IStudent;
  onClose: () => void;
  onSuccess: () => Promise<void> | void;
}

const ACCESS_OPTIONS: { value: StudentService.AccessBlockTarget; blockLabelKey: string; blockHintKey: string; enableLabelKey: string; enableHintKey: string }[] = [
  { value: "none", blockLabelKey: "block_access_none", blockHintKey: "block_access_none_hint", enableLabelKey: "enable_access_none", enableHintKey: "enable_access_none_hint" },
  { value: "app", blockLabelKey: "block_access_app", blockHintKey: "block_access_app_hint", enableLabelKey: "enable_access_app", enableHintKey: "enable_access_app_hint" },
  { value: "platform", blockLabelKey: "block_access_platform", blockHintKey: "block_access_platform_hint", enableLabelKey: "enable_access_platform", enableHintKey: "enable_access_platform_hint" },
  { value: "both", blockLabelKey: "block_access_both", blockHintKey: "block_access_both_hint", enableLabelKey: "enable_access_both", enableHintKey: "enable_access_both_hint" },
];

function toDeactivateAccessTarget(
  accessBlock: StudentService.AccessBlockTarget
): StudentService.DeactivateClinicStudentAccessTarget | null {
  if (accessBlock === "app") return "aluno";
  if (accessBlock === "platform") return "responsavel";
  if (accessBlock === "both") return "ambos";
  return null;
}

export function BlockAccessModal({ student, onClose, onSuccess }: IBlockAccessModalProps) {
  const { t } = useTranslation("students");
  const { toast } = useToast();
  const { deactivateClinicStudentAccess, reactivateClinicStudentAccess } = Student();
  const isEnableMode = student.status === 0;
  const [accessBlock, setAccessBlock] = useState<StudentService.AccessBlockTarget>("none");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleConfirm = async () => {
    const target = toDeactivateAccessTarget(accessBlock);
    if (!target) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    const response = isEnableMode
      ? await reactivateClinicStudentAccess(student.id_usuario, { alvo: target })
      : await deactivateClinicStudentAccess(student.id_usuario, { alvo: target });
    setIsSubmitting(false);
    if (!response) return;

    toast({
      title: t("toast_title"),
      description: t(isEnableMode ? "toast_enable_access_success" : "toast_block_access_success", { name: student.nome }),
      variant: "successful",
    });
    await onSuccess();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="block-access-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.Title id="block-access-title">{t(isEnableMode ? "section_enable_access" : "section_block_access")}</S.Title>
        <S.StudentName>{student.nome}</S.StudentName>
        <S.Hint id="block-access-hint">{t(isEnableMode ? "enable_access_hint" : "block_access_hint")}</S.Hint>
        <S.Options aria-describedby="block-access-hint">
          <S.Legend>{t(isEnableMode ? "enable_access_legend" : "block_access_legend")}</S.Legend>
          {ACCESS_OPTIONS.map((option) => {
            const optionId = `block-access-${option.value}`;
            const isSelected = accessBlock === option.value;

            return (
              <S.Option key={option.value} $selected={isSelected}>
                <S.Radio
                  id={optionId}
                  type="radio"
                  name="block-access"
                  value={option.value}
                  checked={isSelected}
                  onChange={() => setAccessBlock(option.value)}
                />
                <S.OptionText>
                  <S.OptionTitle>{t(isEnableMode ? option.enableLabelKey : option.blockLabelKey)}</S.OptionTitle>
                  <S.Hint>{t(isEnableMode ? option.enableHintKey : option.blockHintKey)}</S.Hint>
                </S.OptionText>
              </S.Option>
            );
          })}
        </S.Options>
        <S.Actions>
          <S.Button type="button" $variant="secondary" onClick={onClose} disabled={isSubmitting}>
            {t("button_cancel")}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={handleConfirm} disabled={isSubmitting}>
            {t("button_confirm")}
          </S.Button>
        </S.Actions>
      </S.Dialog>
    </S.Overlay>
  );
}
