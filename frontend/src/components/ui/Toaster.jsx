import React, { useState, useCallback, createContext, useContext } from "react";
import "./toaster.css"; // Optional: add your own styles

const ToasterContext = createContext();

export function useToaster() {
  return useContext(ToasterContext);
}

export default function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((toasts) => [...toasts, { id, message, type }]);
    setTimeout(() => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToasterContext.Provider value={addToast}>
      {children}
      <div className="toaster-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
}
