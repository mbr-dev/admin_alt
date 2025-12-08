import { format } from "date-fns";
import * as S from "../Table0/styles";
import { Table } from "@/components/ui";
import { formatTime } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { FaCaretUp, FaCaretDown, FaCheck } from "react-icons/fa6";

interface ITable1 {
  reportData: any[];
  reportType: number;
  handleOrderData: (type: number, key: string) => void;
}

export const Table1 = ({ reportData, reportType, handleOrderData }: ITable1) => {
  const { t } = useTranslation("indicators");

  return (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          <S.Head>
            <S.HeadDiv>
              {t("module")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "descricao")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "descricao")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("activity")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "atividade")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "atividade")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("language")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "idioma")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "idioma")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("answerRight")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "alternativa_correta")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "alternativa_correta")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("answerStudent")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "alternativa_escolhida")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "alternativa_escolhida")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("result")}
              <S.ButtonFilter>
                <S.Button onClick={() => false} disabled><FaCaretUp /></S.Button>
                <S.Button onClick={() => false} disabled><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("time")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "tempo_em_segundos")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "tempo_em_segundos")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("start")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "data_inicio")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "data_inicio")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head className="border-r-transparent">
            <S.HeadDiv>
              {t("end")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1, "data_termino")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0, "data_termino")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>
        </Table.TableRow>
      </Table.TableHeader>

      <Table.TableBody>
        {(reportData.length > 0 && reportType === 1) && reportData.map((item, index) => (
          <Table.TableRow key={index}>
            <S.Cell>{item?.descricao}</S.Cell>
            <S.Cell>{item?.atividade}</S.Cell>
            <S.Cell>{item?.idioma}</S.Cell>
            <S.Cell>{item?.alternativa_correta}</S.Cell>
            <S.Cell>{item?.alternativa_escolhida}</S.Cell>
            <S.Cell>{item?.alternativa_escolhida === item?.alternativa_correta ? <FaCheck className="text-mbr-green-40" /> : <IoClose className="text-mbr-red-20" />}</S.Cell>
            <S.Cell>{formatTime(item?.tempo_em_segundos)}</S.Cell>
            <S.Cell>{format(new Date(item?.data_inicio), "dd/MM/yyyy HH:mm")}</S.Cell>
            <S.Cell className="border-r-transparent">{format(new Date(item?.data_termino), "dd/MM/yyyy HH:mm")}</S.Cell>
          </Table.TableRow>
        ))}
      </Table.TableBody>
    </Table.Table>
  )
}