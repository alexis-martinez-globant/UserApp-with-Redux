import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { UserApp } from "./components/UserApp";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

