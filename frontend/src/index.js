import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "../src/context/AuthContext";
import { CountryCurrencyProvider } from "../src/context/CountryCurrencyContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CountryCurrencyProvider>
        <App />
      </CountryCurrencyProvider>
    </AuthProvider>
  </React.StrictMode>
);
