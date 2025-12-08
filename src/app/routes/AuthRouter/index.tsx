import * as Page from "@/app/pages";
import { Routes, Route, Navigate } from "react-router";

export const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Page.Login />} />
      <Route path="/login" element={<Page.Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}