import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CharacterContextProvider } from "./context/characterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CharacterContextProvider>
        <App />
      </CharacterContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
