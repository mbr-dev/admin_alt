import { Container } from "./components";
import { Page } from "@/components/template";
import { StudentsContextProvider } from "./context";

export const Students = () => {
  return (
    <Page>
      <StudentsContextProvider>
        <Container />
      </StudentsContextProvider>
    </Page>
  )
}