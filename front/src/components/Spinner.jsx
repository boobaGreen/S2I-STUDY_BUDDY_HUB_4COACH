import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useDarkMode } from "../contexts/DarkModeContext";

// Crea il componente Spinner
const Spinner = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color={
          isDarkMode ? "var(--color-spinner-dark)" : "var(--color-spinner)"
        } // Utilizza le variabili CSS
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Spinner;
