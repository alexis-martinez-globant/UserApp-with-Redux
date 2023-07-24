import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { UserApp } from "./components/UserApp";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserApp />
    </BrowserRouter>
  </React.StrictMode>
);

