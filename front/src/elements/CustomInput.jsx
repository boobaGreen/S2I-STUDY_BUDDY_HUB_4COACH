import React from "react";

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      className={
        "block h-10 p-2 w-full mt-1 text-[var(--color-text-input)] dark:text-[var(--color-text-input-dark)] border-[var(--color-btn-hover-bg)] dark:border-[var(--color-btn-dark-bg)] rounded-md shadow-sm"
      }
      {...props}
    />
  );
});

export default CustomInput;
