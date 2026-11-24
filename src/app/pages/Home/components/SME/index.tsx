import * as S from "./styles";
import { WelcomeHero } from "../WelcomeHero";
import { StatsCards } from "../StatsCards";
import { QuickAccess } from "../QuickAccess";
import { SessionsActivities } from "../SessionsActivities";
import { DailyTip } from "../DailyTip";

export const SME = () => {
  return (
    <S.Container>
      <S.Main>
        <WelcomeHero />
        <StatsCards />
        <QuickAccess />
        <SessionsActivities />
        <DailyTip />
      </S.Main>
    </S.Container>
  )
}
