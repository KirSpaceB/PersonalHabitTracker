import React from "react";
import  ReactDOM  from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

console.log(JSON.stringify(import.meta.env))

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
)