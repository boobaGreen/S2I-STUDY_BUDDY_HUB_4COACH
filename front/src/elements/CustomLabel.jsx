import React from "react";

const CustomLabel = ({ onClick, children }) => {
  return <label className={`block text-sm font-medium `}>{children}</label>;
};

export default CustomLabel;
