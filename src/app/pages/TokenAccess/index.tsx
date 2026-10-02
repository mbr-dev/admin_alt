import { Container } from "./components";
import { LoginContextProvider } from "../Login/context";

export function TokenAccess() {
  return (
    <LoginContextProvider>
      <Container />
    </LoginContextProvider>
  );
}
