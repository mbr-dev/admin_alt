import * as S from "./styles";
import { IoClose } from "react-icons/io5";

interface IListModalItem {
  id: number;
  name: string;
  description?: string;
}

interface IListModal {
  isOpen: boolean;
  title: string;
  emptyMessage: string;
  closeLabel: string;
  isLoading: boolean;
  items: IListModalItem[];
  onClose: () => void;
}

export function ListModal({
  isOpen,
  title,
  emptyMessage,
  closeLabel,
  isLoading,
  items,
  onClose,
}: IListModal) {
  if (!isOpen) return null;

  return (
    <S.Overlay role="dialog" aria-modal="true" aria-labelledby="class-list-modal-title">
      <S.Card>
        <S.Header>
          <S.Title id="class-list-modal-title">{title}</S.Title>
          <S.CloseButton type="button" aria-label={closeLabel} onClick={onClose}>
            <IoClose />
          </S.CloseButton>
        </S.Header>

        {isLoading ? (
          <S.SkeletonList>
            <S.SkeletonItem />
            <S.SkeletonItem />
            <S.SkeletonItem />
          </S.SkeletonList>
        ) : items.length === 0 ? (
          <S.Empty>{emptyMessage}</S.Empty>
        ) : (
          <S.List>
            {items.map((item) => (
              <S.ListItem key={item.id}>
                <S.ItemName>{item.name}</S.ItemName>
                {item.description && <S.ItemDescription>{item.description}</S.ItemDescription>}
              </S.ListItem>
            ))}
          </S.List>
        )}
      </S.Card>
    </S.Overlay>
  );
}
