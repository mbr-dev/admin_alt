import * as S from "./styles";
import { WelcomeHero } from "../WelcomeHero";
import { ResponsibleSummary } from "./Summary";
import { ResponsibleChildren } from "./Children";
import { ResponsiblePanels } from "./Panels";
import { ResponsibleMessage } from "./Message";

export function Responsible() {
  return (
    <S.Container>
      <S.Main>
        <WelcomeHero gladKey="responsible_welcome_glad" subtitleKeys={["responsible_welcome_subtitle"]} />
        <ResponsibleSummary />
        <ResponsibleChildren />
        <ResponsiblePanels />
        <ResponsibleMessage />
      </S.Main>
    </S.Container>
  );
}
