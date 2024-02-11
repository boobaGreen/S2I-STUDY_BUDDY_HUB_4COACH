import { useDarkMode } from "../contexts/DarkModeContext";
import DarkModeToggle from "react-dark-mode-toggle";
function DarkModeToggleCustom() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <DarkModeToggle
      onChange={toggleDarkMode}
      checked={isDarkMode}
      speed={1.3}
      size={60}
    />
  );
}

export default DarkModeToggleCustom;
