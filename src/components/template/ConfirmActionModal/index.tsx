import * as S from "./styles";

interface IConfirmActionModal {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmActionModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: IConfirmActionModal) {
  if (!isOpen) return null;

  return (
    <S.Overlay role="dialog" aria-modal="true" aria-labelledby="confirm-action-title" aria-describedby="confirm-action-description">
      <S.Card>
        <S.Title id="confirm-action-title">{title}</S.Title>
        <S.Description id="confirm-action-description">{description}</S.Description>

        <S.Footer>
          <S.Button type="button" $variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </S.Button>
          <S.Button type="button" $variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </S.Button>
        </S.Footer>
      </S.Card>
    </S.Overlay>
  );
}
