import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import { Providers } from "./providers";
import "./styles/globals.css";
import "./styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
