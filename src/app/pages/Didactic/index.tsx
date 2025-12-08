import { Container } from "./components";
import { Page } from "@/components/template";
import { DidacticContextProvider } from "./context";

export const ChoiceDidactic = () => {
  return (
    <Page>
      <DidacticContextProvider>
        <Container />
      </DidacticContextProvider>
    </Page>
  )
}