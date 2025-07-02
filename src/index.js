import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AIPersonalAssistant from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AIPersonalAssistant />
  </StrictMode>
);
