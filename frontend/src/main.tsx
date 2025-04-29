import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import Dashboard from "./pages";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);
