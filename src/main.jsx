import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.min.css";
import "./index.css";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>,
  document.getElementById("root")
);
