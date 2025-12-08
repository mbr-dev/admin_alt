import * as S from "./styles";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

interface IPagination {
  numberOfPageButton: number;
  currentPage: number;
  onChangePage: (value: number) => void;
  className?: string;
}

export const Pagination = ({ numberOfPageButton, currentPage, onChangePage, className }: IPagination) => {
  const { t } = useTranslation("common");

  const [pageButtons, setPageButtons] = useState<number[]>([]);
  const [buttonNextDisabled, setButtonNextDisabled] = useState<boolean>(false);
  const [buttonPreviousDisabled, setButtonPreviousDisabled] = useState<boolean>(false);
  // Define o range inicial de páginas exibidas
  useEffect(() => {
    const startPage = 1;
    const endPage = Math.min(4, numberOfPageButton); // Até 4 páginas ou o total disponível
    setPageButtons(Array.from({ length: endPage }, (_, i) => startPage + i));
  }, [numberOfPageButton]);

  const handleChangeByButton = (value: number) => {
    if (value !== currentPage) {
      onChangePage(value);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPageButton) {
      const nextPage = currentPage + 1;
      onChangePage(nextPage);
      // Move a janela de números se a última página visível for alcançada
      if (nextPage > pageButtons[3]) {
        setPageButtons((prev) => prev.map((num) => num + 1));
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      onChangePage(prevPage);
      // Move a janela de números para trás se a primeira página visível for alcançada
      if (prevPage < pageButtons[0]) {
        setPageButtons((prev) => prev.map((num) => num - 1));
      }
    }
  };

  useEffect(() => {
    setButtonPreviousDisabled(currentPage === 1);
    setButtonNextDisabled(currentPage === numberOfPageButton);
  }, [currentPage, numberOfPageButton]);

  return (
    <S.Container className={cn(className)}>
      <S.NextAndPrevious onClick={handlePreviousPage} disabled={buttonPreviousDisabled}>
        <FaAngleLeft /> <p>{t("previous")}</p>
      </S.NextAndPrevious>
      <S.Main>
        {pageButtons.map((pageButton) => (
          <S.ButtonPages
            key={pageButton}
            className={`${currentPage === pageButton ? "bg-mbr-blue-10 text-white" : ""}`}
            onClick={() => handleChangeByButton(pageButton)}
          >
            {pageButton}
          </S.ButtonPages>
        ))}
      </S.Main>
      <S.NextAndPrevious onClick={handleNextPage} disabled={buttonNextDisabled}>
        <p>{t("next")}</p> <FaAngleRight />
      </S.NextAndPrevious>
    </S.Container>
  );
};
