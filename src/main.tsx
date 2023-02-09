import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";

console.log(JSON.stringify(import.meta.env))

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <GoogleOAuthProvider clientId="299006767846-lsm9ha0u837jovfdlde1kntpalfacdtv.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
)