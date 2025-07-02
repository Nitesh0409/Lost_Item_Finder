// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToasterProvider from "./components/ui/Toaster";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToasterProvider>
      <App />
    </ToasterProvider>
  </React.StrictMode>
);
