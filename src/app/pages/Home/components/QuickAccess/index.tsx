import * as S from "./styles";
import { useHome } from "../../hook";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TQuickAccessTone } from "./styles";
import iconEscola from "@/components/images/svg/home/icon_escola.svg";
import iconAndrey from "@/components/images/svg/home/icon_andrey.svg";
import iconCoracao from "@/components/images/svg/home/icon_coracao.svg";
import iconAgenda from "@/components/images/svg/home/icon_agenda.svg";
import iconLista from "@/components/images/svg/home/icon_lista.svg";
import setaVerde from "@/components/images/svg/home/seta_verde.svg";
import setaLaranja from "@/components/images/svg/home/seta_laranja.svg";
import setaAzul from "@/components/images/svg/home/seta_azul.svg";
import setaRoxo from "@/components/images/svg/home/seta_roxo.svg";
import setaRosa from "@/components/images/svg/home/seta_rosa.svg";

interface IQuickAccessCard {
  id: TQuickAccessTone;
  titleKey: string;
  subtitleKey: string;
  route: string;
  icon: string;
  arrow: string;
}

const cards: IQuickAccessCard[] = [
  {
    id: "unit",
    titleKey: "quick_unit_title",
    subtitleKey: "quick_unit_subtitle",
    route: "/monitoring",
    icon: iconEscola,
    arrow: setaVerde,
  },
  {
    id: "student",
    titleKey: "quick_student_title",
    subtitleKey: "quick_student_subtitle",
    route: "/indicators",
    icon: iconAndrey,
    arrow: setaLaranja,
  },
  {
    id: "professionals",
    titleKey: "quick_professionals_title",
    subtitleKey: "quick_professionals_subtitle",
    route: "/professionals",
    icon: iconCoracao,
    arrow: setaAzul,
  },
  {
    id: "agenda",
    titleKey: "quick_agenda_title",
    subtitleKey: "quick_agenda_subtitle",
    route: "/alt_session",
    icon: iconAgenda,
    arrow: setaRoxo,
  },
  {
    id: "reports",
    titleKey: "quick_reports_title",
    subtitleKey: "quick_reports_subtitle",
    route: "/students",
    icon: iconLista,
    arrow: setaRosa,
  },
];

export function QuickAccess() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const homeContext = useHome();

  if (homeContext.isLoading) {
    return (
      <S.Section>
        <S.Title>{t("quick_access")}</S.Title>
        <S.Grid aria-busy="true" aria-label={t("quick_access_loading")}>
          {cards.map((card) => (
            <S.SkeletonCard key={card.id} />
          ))}
        </S.Grid>
      </S.Section>
    );
  }

  return (
    <S.Section>
      <S.Title>{t("quick_access")}</S.Title>
      <S.Grid>
        {cards.map((card) => (
          <S.Card
            key={card.id}
            type="button"
            $tone={card.id}
            onClick={() => navigate(card.route)}
            aria-label={t("quick_go", { destination: t(card.titleKey) })}
          >
            <S.Icon src={card.icon} alt="" />
            <S.CardTitle>{t(card.titleKey)}</S.CardTitle>
            <S.CardSubtitle>{t(card.subtitleKey)}</S.CardSubtitle>
            <S.Arrow src={card.arrow} alt="" />
          </S.Card>
        ))}
      </S.Grid>
    </S.Section>
  );
}
