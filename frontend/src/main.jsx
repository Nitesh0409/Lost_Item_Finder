// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToasterProvider from "./components/ui/Toaster";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToasterProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToasterProvider>
  </React.StrictMode>
);
