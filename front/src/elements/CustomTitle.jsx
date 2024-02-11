import React from "react";
const sizeToClass = {
  medium: "text-3xl",
  small: "text-2xl",
  default: "text-4xl",
};
const CustomTitle = ({ size = "default", children }) => {
  const textSizeClass = sizeToClass[size];

  return (
    <h1 className={`${textSizeClass} font-bold mb-4 mt-4 text-center`}>
      {children}
    </h1>
  );
};

export default CustomTitle;
