import React from "react";
import useKeydown from "../../hooks/use-keydown.js";

export const ToastContext = React.createContext("ToastContext");

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscapeKey = React.useCallback((event) => {
    setToasts([]);
  }, []);

  useKeydown("Escape", handleEscapeKey);

  function createToast(message, variant) {
    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message: message,
        variant: variant,
      },
    ]);
  }

  function dismissToast(toastId) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== toastId;
    });

    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
