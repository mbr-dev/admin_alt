import * as S from "./styles";
import { ReactNode } from "react";
import { Header } from "@/components/template";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <S.Container>
      <Header />

      <S.Main>
        {children}
      </S.Main>
    </S.Container>
  )
}