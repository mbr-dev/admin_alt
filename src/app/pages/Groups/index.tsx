import { Container } from "./components";
import { Page } from "@/components/template";
import { GroupsContextProvider } from "./context";

export const Groups = () => {
  return (
    <Page>
      <GroupsContextProvider>
        <Container />
      </GroupsContextProvider>
    </Page>
  )
}