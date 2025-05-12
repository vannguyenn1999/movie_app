import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "assets/index.css";
import "./assets/index.css";
import App from "./App.tsx";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
