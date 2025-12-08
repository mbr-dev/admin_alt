import * as S from "./styles";
import { Table } from "@/components/ui";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";

export const Details = () => {
  const { t } = useTranslation("monitoring");
  const monitoringContext = useMonitoring();

  const getStatus = (data_log: any["data_log"]): { key: string; label: string } => {
    if (!data_log || data_log.length < 2) return { key: "stable", label: t("stable") };
    const first = data_log[0]?.total_rodadas ?? 0;
    const last = data_log[data_log.length - 1]?.total_rodadas ?? 0;
    if (last > first) return { key: "growth", label: t("growth") };
    if (last < first) return { key: "fall", label: t("fall") };
    return { key: "stable", label: t("stable") };
  }

  return (
    <S.Container>
      <h2>{t("detailing")}</h2>

      <S.Main>
        <Table.Table>
          <Table.TableHeader>
            <Table.TableRow>
              <S.Head>{t("unit")}</S.Head>
              <S.Head>{t("round")}</S.Head>
              <S.Head>{t("total0")}</S.Head>
              <S.Head>{t("status")}</S.Head>
            </Table.TableRow>
          </Table.TableHeader>

          <Table.TableBody>
            {monitoringContext.data && monitoringContext.data.unidades.map((item: any) => {
              const status = getStatus(item.data_log);
              return (
                <Table.TableRow key={item.id_unidade}>
                  <S.Cell>{item.nome_unidade}</S.Cell>
                  <S.Cell>{item.total_alunos}</S.Cell>
                  <S.Cell>{item.total_rodadas}</S.Cell>
                  <S.Cell>
                    <S.Status $status={status.key}>{status.label}</S.Status>
                  </S.Cell>
                </Table.TableRow>
              )
            })}
          </Table.TableBody>
        </Table.Table>
      </S.Main>
    </S.Container>
  )
}