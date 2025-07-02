import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import "./toaster.css";

const ToasterContext = createContext();

export function useToaster() {
  return useContext(ToasterContext);
}

export default function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Remove toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add new toast
  const addToast = useCallback(
    (message, type = "info", duration = 3500) => {
      if (!message) return;

      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now();

      // Optional: prevent duplicate message
      setToasts((prev) => {
        if (prev.some((t) => t.message === message)) return prev;
        return [...prev, { id, message, type }];
      });

      setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  return (
    <ToasterContext.Provider value={addToast}>
      {children}
      <div className="toaster-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.type === "success" && "✅"}
              {toast.type === "error" && "❌"}
              {toast.type === "info" && "ℹ️"}
            </span>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
}
