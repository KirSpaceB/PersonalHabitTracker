import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <GoogleOAuthProvider clientId="299006767846-lsm9ha0u837jovfdlde1kntpalfacdtv.apps.googleusercontent.com">
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </GoogleOAuthProvider>
)