import { Bar } from "../";
import * as S from "./styles";
import { useApi } from "@/data/hooks";
import { Table } from "@/components/ui";
import { useTranslation } from "react-i18next";
import { FaCaretUp, FaCaretDown, FaCircleExclamation } from "react-icons/fa6";

interface ITable0 {
  reportData: any[];
  reportType: number;
  handleOrderData: (type: number, key: string) => void;
  showDoubt: (type: number, show: boolean) => void;
}

export const Table0 = ({ reportData, reportType, showDoubt, handleOrderData }: ITable0) => {
  const { URL_FILES } = useApi();
  const { t } = useTranslation("indicators");

  return (
    <Table.Table>
      <Table.TableHeader>
        <Table.TableRow>
          <S.Head>
            <S.HeadDiv>
              {t("language")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"idioma")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"idioma")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>
  
          <S.Head>
            <S.HeadDiv>
              {t("module")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"modulo")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"modulo")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("activity")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"atividade")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"atividade")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("content")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"conteudo")} disabled><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"conteudo")} disabled><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("attempts")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"total_acessos")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"total_acessos")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("hits")}
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"total_acertos")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"total_acertos")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head>
            <S.HeadDiv>
              {t("indexIAP")}
              <button onClick={() => showDoubt(0, true)}>
                <FaCircleExclamation />
              </button>
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"percentual_acerto")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"percentual_acerto")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>

          <S.Head className="border-r-transparent">
            <S.HeadDiv>
              {t("indexICP")}
              <button onClick={() => showDoubt(1, true)}>
                <FaCircleExclamation />
              </button>
              <S.ButtonFilter>
                <S.Button onClick={() => handleOrderData(1,"score_ponderado")}><FaCaretUp /></S.Button>
                <S.Button onClick={() => handleOrderData(0,"score_ponderado")}><FaCaretDown /></S.Button>
              </S.ButtonFilter>
            </S.HeadDiv>
          </S.Head>
        </Table.TableRow>
      </Table.TableHeader>

      <Table.TableBody>
        {(reportData.length > 0 && reportType === 0) && reportData.map((item, index) => (
          <Table.TableRow key={index}>
            <S.Cell>{item?.idioma}</S.Cell>
            <S.Cell>{item?.modulo}</S.Cell>
            <S.Cell>{item?.atividade}</S.Cell>
            <S.Cell>
              {item?.imagem ? <img src={`${URL_FILES}images/alt/app/idioma1/Imagens1/${item?.id_modulo}/${item?.conteudo}.png`} alt="" /> : item?.conteudo}
            </S.Cell>
            <S.Cell>{item?.total_acessos}</S.Cell>
            <S.Cell>{item?.total_acertos}</S.Cell>
            <S.Cell>
              <Bar value={item?.percentual_acerto} />
            </S.Cell>
            <S.Cell className="border-r-transparent">
              <Bar value={item?.score_ponderado} />
            </S.Cell>
          </Table.TableRow>
        ))}
      </Table.TableBody>
    </Table.Table>
  )
}