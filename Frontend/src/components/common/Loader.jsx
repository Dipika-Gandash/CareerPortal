import React from "react";

const Loader = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-40"
      }`}
    >
      <div
        className={`animate-spin rounded-full border-indigo-600 border-t-transparent ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default Loader;
