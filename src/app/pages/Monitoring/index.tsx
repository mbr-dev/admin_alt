import { Container } from "./components";
import { Page } from "@/components/template";
import { MonitoringContextProvider } from "./context";

export const Monitoring = () => {
  return (
    <Page>
      <MonitoringContextProvider>
        <Container />
      </MonitoringContextProvider>
    </Page>
  )
}