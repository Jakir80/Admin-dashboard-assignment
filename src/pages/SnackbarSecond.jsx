import React, { useEffect, useState } from "react";

const Snackbar = ({ message, duration, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Snackbar;
