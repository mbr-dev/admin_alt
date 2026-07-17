import * as S from "./styles";
import { useMonitoring } from "../../hook";
import { useTranslation } from "react-i18next";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { ReactNode } from "react";

interface ISummaryItem {
  id: string;
  icon: ReactNode;
  value: string;
  labelKey: string;
}

function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0";
  return String(value);
}

function padTimeUnit(value: number): string {
  return String(value).padStart(2, "0");
}

/** Converte segundos para o formato `HH:MM:SS`. */
function formatSecondsToTime(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value) || value < 0) {
    return "00:00:00";
  }

  const totalSeconds = Math.floor(value);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${padTimeUnit(hours)}:${padTimeUnit(minutes)}:${padTimeUnit(seconds)}`;
}

export function NetworkSummary() {
  const { t } = useTranslation("monitoring");
  const { numbersNetwork, isNumbersNetworkLoading } = useMonitoring();

  if (isNumbersNetworkLoading) {
    return <S.Skeleton aria-busy="true" aria-label={t("networkSummaryLoading")} />;
  }

  const items: ISummaryItem[] = [
    {
      id: "unity",
      icon: <BsBuildings aria-hidden />,
      value: formatNumber(numbersNetwork?.unity),
      labelKey: "networkUnitsLabel",
    },
    {
      id: "students",
      icon: <HiOutlineUserGroup aria-hidden />,
      value: formatNumber(numbersNetwork?.students),
      labelKey: "networkStudentsLabel",
    },
    {
      id: "sessions",
      icon: <FaRegCalendarAlt aria-hidden />,
      value: formatNumber(numbersNetwork?.sessions),
      labelKey: "networkSessionsLabel",
    },
    {
      id: "time_alt",
      icon: <FiClock aria-hidden />,
      value: formatSecondsToTime(numbersNetwork?.time?.time_alt),
      labelKey: "networkTimeAltLabel",
    },
    {
      id: "time_session",
      icon: <FiClock aria-hidden />,
      value: formatSecondsToTime(numbersNetwork?.time?.time_session),
      labelKey: "networkTimeSessionLabel",
    },
  ];

  return (
    <S.Container aria-label={t("networkSummaryTitle")}>
      <S.Title>{t("networkSummaryTitle")}</S.Title>

      <S.Items>
        {items.map((item) => (
          <S.Item key={item.id}>
            <S.IconWrap>{item.icon}</S.IconWrap>
            <S.Content>
              <S.Value>{item.value}</S.Value>
              <S.Label>{t(item.labelKey)}</S.Label>
            </S.Content>
          </S.Item>
        ))}
      </S.Items>
    </S.Container>
  );
}
