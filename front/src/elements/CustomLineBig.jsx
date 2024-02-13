import React from "react";

const CustomLineBig = ({ onClick, children }) => {
  return (
    <div className="mt-2 mb-4 text-base sm:text-xl md:text-2xl max-w-fit-center">
      {children}
    </div>
  );
};

export default CustomLineBig;
