import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
import { useStorage } from "@/data/hooks";

export function Router() {
  const { getData } = useStorage();
  const token = getData("token") ?? "";
  return token ? <MainRouter /> : <AuthRouter />;
}