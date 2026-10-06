import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MenuPage from "./pages/MenuPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MenuPage />
  </StrictMode>,
);
