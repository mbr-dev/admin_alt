import { AuthRouter } from "./AuthRouter";
import { MainRouter } from "./MainRouter";
import { useStorage } from "@/data/hooks";
import { useLocation } from "react-router";

export function Router() {
  const { getData } = useStorage();
  const { pathname } = useLocation();
  const token = getData("token");
  const normalizedToken = typeof token === "string" ? token.trim() : "";
  const isAuthenticated = normalizedToken !== "" && normalizedToken !== "undefined" && normalizedToken !== "null";

  return isAuthenticated ? <MainRouter key={`main-${pathname}`} /> : <AuthRouter key={`auth-${pathname}`} />;
}