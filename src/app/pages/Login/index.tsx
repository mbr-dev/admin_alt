import { Container } from "./components";
import { LoginContextProvider } from "./context";

export const Login = () => {
  return (
    <LoginContextProvider>
      <Container />
    </LoginContextProvider>
  )
}