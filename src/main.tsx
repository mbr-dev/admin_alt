import "@/lib/i18n";
import "./index.css";
import { App } from "@/app";
import { Toaster } from "@/components/ui";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const basename = import.meta.env.VITE_BASENAME;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <App />
    <Toaster />
  </BrowserRouter>
);