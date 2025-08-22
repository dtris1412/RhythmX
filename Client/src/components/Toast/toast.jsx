import React, { useEffect, useState } from "react";
import "./toast.css";

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toast
    setTimeout(() => setIsVisible(true), 100);

    // Hide toast after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast ${type} ${isVisible ? "show" : ""}`}>
      <i
        className={`fas ${
          type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
        }`}
      ></i>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
