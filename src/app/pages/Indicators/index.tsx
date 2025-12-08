import { Container } from "./components";
import { Page } from "@/components/template";
import { IndicatorsContextProvider } from "./context";

export const Indicators = () => {
  return (
    <Page>
      <IndicatorsContextProvider>
        <Container />
      </IndicatorsContextProvider>
    </Page>
  )
}