import * as S from "./styles";
import { Table } from "@/components/ui";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0";
  return String(value);
}

function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0%";

  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(1).replace(".", ",");

  return `${formatted}%`;
}

/** Normaliza o status da API para as chaves visuais já usadas no componente. */
function resolveStatus(status: string | undefined): {
  key: "growth" | "fall" | "stable";
  labelKey: string;
} {
  const normalized = (status ?? "").toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");

  if (normalized === "growth" || normalized === "crescimento") {
    return { key: "growth", labelKey: "growth" };
  }
  if (normalized === "fall" || normalized === "caindo") {
    return { key: "fall", labelKey: "fall" };
  }
  if (normalized === "atencao") {
    return { key: "fall", labelKey: "attention" };
  }
  return { key: "stable", labelKey: "stable" };
}

export function Details() {
  const { t } = useTranslation("monitoring");
  const { unitCompare, isUnitCompareLoading } = useMonitoring();

  if (isUnitCompareLoading) {
    return (
      <S.Container aria-busy="true" aria-label={t("unitCompareLoading")}>
        <h2>{t("detailing")}</h2>
        <S.Skeleton />
      </S.Container>
    );
  }

  const units = unitCompare?.units ?? [];
  const mediaRede = unitCompare?.media_rede;

  return (
    <S.Container>
      <h2>{t("detailing")}</h2>

      <S.Main>
        <Table.Table>
          <Table.TableHeader>
            <Table.TableRow>
              <S.Head>{t("unit")}</S.Head>
              <S.Head>{t("activeStudents")}</S.Head>
              <S.Head>{t("adhesion")}</S.Head>
              <S.Head>{t("progression")}</S.Head>
              <S.Head>{t("developmentIndex")}</S.Head>
              <S.Head>{t("status")}</S.Head>
            </Table.TableRow>
          </Table.TableHeader>

          <Table.TableBody>
            {units.map((item) => {
              const status = resolveStatus(item.status);

              return (
                <Table.TableRow key={item.id_unidade}>
                  <S.Cell>{item.unidade}</S.Cell>
                  <S.Cell>{formatNumber(item.alunos_ativos)}</S.Cell>
                  <S.Cell>{formatPercent(item.adesao)}</S.Cell>
                  <S.Cell>{formatPercent(item.progressao)}</S.Cell>
                  <S.Cell>{formatPercent(item.indice_desenvolvimento)}</S.Cell>
                  <S.Cell>
                    <S.Status $status={status.key}>{t(status.labelKey)}</S.Status>
                  </S.Cell>
                </Table.TableRow>
              );
            })}

            {mediaRede && (
              <S.MediaRow>
                <S.MediaCell>{t("networkAverage")}</S.MediaCell>
                <S.MediaCell>{formatNumber(mediaRede.alunos_ativos)}</S.MediaCell>
                <S.MediaCell>{formatPercent(mediaRede.adesao)}</S.MediaCell>
                <S.MediaCell>{formatPercent(mediaRede.progressao)}</S.MediaCell>
                <S.MediaCell>{formatPercent(mediaRede.indice_desenvolvimento)}</S.MediaCell>
                <S.MediaCell>—</S.MediaCell>
              </S.MediaRow>
            )}
          </Table.TableBody>
        </Table.Table>
      </S.Main>
    </S.Container>
  );
}
