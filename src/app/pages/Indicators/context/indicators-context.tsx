import * as IHC from "./indicators-model";
import { ImgSVG } from "@/components/images";
import { useTranslation } from "react-i18next";
import { createContext, useState } from "react";

export const IndicatorsContext = createContext({} as IHC.IIndicatorsContext);

export function IndicatorsContextProvider({ children }: IHC.IIndicatorsContextProvider) {
  const { t } = useTranslation("indicators");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [typeSelected, setTypeSelected] = useState<number>(-1);
  const [showReports, setShowReports] = useState<boolean>(false);
  const [studentSelected, setStudentSelected] = useState<number>(0);

  const BUTTONS = [
    {id:0,label:t("button0"),icon:ImgSVG.Grafico0,color:["#FFEE00","#E39F00"]},
    {id:1,label:t("button1"),icon:ImgSVG.Grafico1,color:["#F3367E","#F981B1"]},
    {id:2,label:t("button2"),icon:ImgSVG.Grafico2,color:["#0CA644","#00D54F"]},
  ];
  //Funçao para abrir e fechar o modal e pegar o tipo de botão selecionado
  const handleToggleModal = (open: boolean, type: number) => {
    setShowModal(open);
    setTypeSelected(type);
  }

  return (
    <IndicatorsContext.Provider value={{ BUTTONS, studentSelected, setStudentSelected, typeSelected, showModal, handleToggleModal, showReports, setTypeSelected, setShowReports }}>
      {children}
    </IndicatorsContext.Provider>
  );
}