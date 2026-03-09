import * as S from "./styles";
import { FaPlus } from "react-icons/fa6";

interface IFloatingAddButton {
  onClick?: () => void;
  ariaLabel?: string;
}

export function FloatingAddButton({ onClick, ariaLabel = "Adicionar" }: IFloatingAddButton) {
  return (
    <S.Button type="button" onClick={onClick} aria-label={ariaLabel}>
      <FaPlus />
    </S.Button>
  );
}
