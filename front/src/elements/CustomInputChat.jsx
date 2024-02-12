import React from "react";

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={
        "border-solid border-2 border-black block h-10 p-2 w-full mt-1  text-black bg-gray-400 rounded-md shadow-sm"
      }
      {...props}
    />
  );
});

export default CustomInput;
