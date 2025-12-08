import * as S from "./styles";
import { usePainelStudent } from "./hook";
import { useIndicators } from "../../hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Pagination } from "@/components/template";
import { Animations, Table0, Table1, Table2, ModalIAP, ModalICA } from "..";

export const PainelStudent = () => {
  const hook = usePainelStudent();
  const { t } = useTranslation("indicators");
  const indicatorsContext = useIndicators();

  const tableType = [
    <Table0 showDoubt={hook.handleShowDoubt} reportData={hook.reportData} reportType={indicatorsContext.typeSelected} handleOrderData={hook.handleOrderData} />,
    <Table1 reportData={hook.reportData} reportType={indicatorsContext.typeSelected} handleOrderData={hook.handleOrderData} />,
    <Table2 showDoubt={hook.handleShowDoubt} reportData={hook.reportData} reportType={indicatorsContext.typeSelected} handleOrderData={hook.handleOrderData} />,
  ];

  return (
    <S.Container>
      <ModalIAP showDoubt={hook.handleShowDoubt} show={hook.showIAP} />
      <ModalICA showDoubt={hook.handleShowDoubt} show={hook.showICA} />
      <Animations />
      <S.ButtonBack onClick={hook.handleBack}>
        <FaArrowLeft /> {t("back")}
      </S.ButtonBack>

      <S.Main>
        <S.Titles>
          <h2>{
            indicatorsContext?.typeSelected === 0 ? t("button0").toLocaleUpperCase() :
            indicatorsContext?.typeSelected === 1 ? t("button1").toLocaleUpperCase() : t("button2").toLocaleUpperCase()
          }</h2>
          <p>{`${hook?.studentData?.unidade} - ${hook?.studentData?.turma} - ${hook?.studentData?.nome}`}</p>
        </S.Titles>

        <S.Filter>
          <h2>{t("select")}</h2>

          <S.Div>
            {indicatorsContext.BUTTONS.map((item, index) => (
              <S.FilterDiv key={index}>
                <input
                  type="radio"
                  name="filterOption"
                  value={item.id}
                  checked={indicatorsContext.typeSelected === item.id}
                  onChange={() => hook.handleChangeReport(item.id)}
                  />
                {item.label}
              </S.FilterDiv>
            ))}
          </S.Div>
        </S.Filter>

        <S.Report>
          {hook.reportData?.length > 0 && tableType[Number(indicatorsContext.typeSelected)]}
          {(hook.reportData?.length <= 0 || hook.reportData === undefined || !hook.reportData) &&
            <div className="w-full h-full flex items-center justify-center">
              <p className="font-bold text-mbr-blue-10 text-lg md:text-2xl landscape:lg:text-2xl">{t("empty")}</p>
            </div>
          }
          {hook.totalOfPages > 1 &&
            <Pagination
              currentPage={hook.currentPage}
              numberOfPageButton={hook.totalOfPages}
              onChangePage={hook.setCurrentPage}
            />}
        </S.Report>
      </S.Main>
    </S.Container>
  )
}