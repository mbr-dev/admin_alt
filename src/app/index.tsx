import { Router } from "@/app/routes";
import { MainContextProvider } from "@/data/contexts";

export function App() {
  return (
    <MainContextProvider>
      <Router />
    </MainContextProvider>
  )
}