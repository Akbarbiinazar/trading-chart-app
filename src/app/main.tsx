import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router/router";
import { Providers } from "./providers/index";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers router={router} />
  </React.StrictMode>
);
