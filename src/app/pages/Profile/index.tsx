import { Container } from "./components";
import { Page } from "@/components/template";
import { ProfileContextProvider } from "./context";

export const Profile = () => {
  return (
    <Page>
      <ProfileContextProvider>
        <Container />
      </ProfileContextProvider>
    </Page>
  )
}