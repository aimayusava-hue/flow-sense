import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RainProvider } from "./context/RainContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RainProvider>
      <App />
    </RainProvider>
  </StrictMode>
);