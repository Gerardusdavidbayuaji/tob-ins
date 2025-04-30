import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./pages";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Dashboard />
    <Toaster />
  </StrictMode>
);
