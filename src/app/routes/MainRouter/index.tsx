import * as Page from "@/app/pages";
import { MainContextProvider } from "@/data/contexts";
import { Routes, Route, Navigate } from "react-router";

export const MainRouter = () => {
  return (
    <MainContextProvider>
      <Routes>
        <Route path="/" element={<Page.Home />} />
        <Route path="/home" element={<Page.Home />} />
        <Route path="/indicators" element={<Page.Indicators />} />
        <Route path="/monitoring" element={<Page.Monitoring />} />
        <Route path="/didactic" element={<Page.ChoiceDidactic />} />
        <Route path="/support" element={<Page.Support />} />
        <Route path="/profile" element={<Page.Profile />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </MainContextProvider>
  )
}