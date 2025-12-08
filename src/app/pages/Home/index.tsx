import { Container } from "./components";
import { Page } from "@/components/template";
import { HomeContextProvider } from "./context";

export const Home = () => {
  return (
    <Page>
      <HomeContextProvider>
        <Container />
      </HomeContextProvider>
    </Page>
  )
}