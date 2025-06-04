import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
// import { Flowbite } from "flowbite-react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CSSPlugin } from "gsap/CSSPlugin";
import { setupAxios } from "./core/AuthHelpers";
import "./assets/index.css";

import PublicRouter from "./routers";
import { AuthProvider } from "./core/Auth";
gsap.registerPlugin(useGSAP, CSSPlugin);
const queryClient = new QueryClient();
setupAxios(axios);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {/* <Flowbite> */}
        <PublicRouter />
        {/* </Flowbite> */}
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
