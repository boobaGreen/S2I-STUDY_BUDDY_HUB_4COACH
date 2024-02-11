import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import StartNormal from "../icons/StartNormal";
import StartDark from "../icons/StartDark";
import DarkModeToggleCustom from "../elements/DarkModeToggleCustom";
import { useState } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useMain } from "../contexts/MainContext";
import { useRef, useEffect } from "react";

function Navbar() {
  const navRef = useRef();
  const [currentNavItem, setCurrentNavItem] = useState("home");
  const { isAuth, role } = useMain();
  const navigate = useNavigate();
  const goToHome = () => navigate("/home");
  const [nav, setNav] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  let navItems = [];

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  const handleNavItemClick = (route) => {
    setCurrentNavItem(route);
    navigate(`/${route}`);
    setNav(false); // Chiudi il menu mobile dopo la navigazione
  };

  isAuth
    ? // Array containing navigation itemsclassificationleaderboard
      (navItems = [
        { id: 1, text: "Home" }, //home app
        { id: 2, text: "Groups" },
        { id: 3, text: "About" },
        { id: 4, text: "Logout" },
      ])
    : (navItems = [
        { id: 1, text: "Home" }, //cover
        { id: 2, text: "SignUp" },
        { id: 3, text: "Login" },
        { id: 4, text: "About" },
      ]);

  // Aggiungi "Manage Course" solo per "admin" e "mod"
  if (isAuth && (role === "admin" || role === "mod")) {
    navItems.push({ id: 6, text: "Admin" });
  }
  useEffect(() => {
    // Funzione per gestire i click sul documento
    const handleClickOutside = (event) => {
      if (nav && navRef.current && !navRef.current.contains(event.target)) {
        setNav(false);
      }
    };

    // Aggiungi l'event listener quando il componente viene montato
    document.addEventListener("mousedown", handleClickOutside);

    // Rimuovi l'event listener quando il componente viene smontato
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);
  return (
    <div
      ref={navRef}
      className={
        "z-10 fixed-top flex justify-between items-center h-min w-full mx-auto px-4 bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]"
      }
    >
      <div
        className="flex w-max gap-5 hover:cursor-pointer bg-transparent"
        onClick={goToHome}
      >
        {/* Logo */}
        <div className="w-10 h-min bg-transparent">
          {isDarkMode ? <StartDark /> : <StartNormal />}
        </div>
        {/* Mobile Navigation tilte */}
        <h1 className={"block md:hidden  text-3xl font-bold  bg-transparent"}>
          SBH
        </h1>
        {/* Desktop Navigation tilte */}
        <h1 className={"hidden md:flex  text-3xl font-bold  "}>
          StudyBuddyHub
        </h1>
      </div>
      {/* Switch */}
      <DarkModeToggleCustom className="w-full h-min" />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavItemClick(item.text.toLowerCase())}
            className={`p-4 border-b rounded-xl duration-300 cursor-pointer border-gray-600 ${
              currentNavItem === item.text.toLowerCase()
                ? isDarkMode
                  ? "bg-lime-600"
                  : "bg-[#a0cbbf]" // Colore in light mode durante la selezione
                : ""
            } ${
              isDarkMode
                ? "hover:bg-lime-300 hover:text-gray-900"
                : "hover:bg-[#05bd88]" // Colore in light mode durante l'hover
            }`}
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "z-10 fixed md:hidden left-0 top-0 w-[60%] h-min py-16 px-4 border-r border-r-gray-900 ease-in-out duration-300  bg-[var(--color-bg-trasparent)] dark:bg-[var(--color-bg-trasparent-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)]"
            : "z-10 ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => handleNavItemClick(item.text.toLowerCase())}
            className={`p-4 border-b rounded-xl duration-300 cursor-pointer border-gray-600 ${
              currentNavItem === item.text.toLowerCase()
                ? isDarkMode
                  ? "bg-lime-600 "
                  : "bg-[#a0cbbf] " // Colore in light mode durante la selezione
                : ""
            } ${
              isDarkMode ? "hover:bg-lime-300 " : "hover:bg-[#05bd88] " // Colore in light mode durante l'hover
            }`}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Navbar;
