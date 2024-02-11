import React from "react";

const CustomButton = ({ onClick, children }) => {
  return (
    <button
      className={
        "bg-[var(--color-btn-bg)] dark:bg-[var(--color-btn-dark-bg)] hover:bg-[var(--color-btn-hover-bg)] dark:hover:bg-[var(--color-btn-dark-hover-bg)] transition: background-color 0.3s; text-[var(--color-btn-text)] dark:text-[var(--color-btn-dark-text)] dark:hover:text-gray-900  py-2 px-4 border rounded-lg transition duration-300 "
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
