import { createContext, useContext, useReducer } from "react";

import Cookies from "js-cookie";

const jwtTokenInit = Cookies.get("jwt") || "";

const QueryContext = createContext();

const initialState = {
  userId: "",
  userName: "",
  role: "",
  email: "",
  isAuth: false,
  jwtToken: jwtTokenInit,
  groupsActive: "0",
  scoket: null,
  // status: "",
  schools: [],
  masters: [],
  courses: [],
  selectedSchool: null,
  selectedMaster: null,
  selectedCourse: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "main/user/resetUser":
      return {
        ...state,
        userId: "",
        userName: "",
        role: "",
        email: "",
        isAuth: false,
        jwtToken: "",
      };
    case "main/user/setUser":
      return {
        ...state,
        userId: action.payload._id,
        userName: action.payload.userName,
        role: action.payload.role,
        email: action.payload.email,
        status: action.payload.status,
        isAuth: true,
      };
    case "main/setJwt":
      return {
        ...state,
        jwtToken: action.payload,
      };

    case "main/setSocket":
      return {
        ...state,
        socket: action.payload,
      };

    case "main/setSchools":
      return {
        ...state,
        schools: action.payload,
      };
    case "main/setMasters":
      return {
        ...state,
        masters: action.payload,
      };
    case "main/setCourses":
      return {
        ...state,
        courses: action.payload,
      };
    case "main/setSelectedSchool":
      return {
        ...state,
        selectedSchool: action.payload,
        selectedMaster: null,
        selectedCourse: null,
      };
    case "main/setSelectedMaster":
      return {
        ...state,
        selectedMaster: action.payload,
        selectedCourse: null,
      };
    case "main/setSelectedCourse":
      return {
        ...state,
        selectedCourse: action.payload,
      };
    case "main/setGroupsActive":
      return {
        ...state,
        groupsActive: action.payload,
      };
    case "main/resetSMC":
      return {
        ...state,
        selectedSchool: null,
        selectedMaster: null,
        selectedCourse: null,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

function MainProvider({ children }) {
  const [
    {
      userId,
      userName,
      role,
      email,
      isAuth,
      jwtToken,
      socket,
      groupsActive,
      schools,
      masters,
      courses,
      selectedSchool,
      selectedMaster,
      selectedCourse,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QueryContext.Provider
      value={{
        userId,
        userName,
        role,
        email,
        isAuth,
        jwtToken,
        socket,
        groupsActive,
        schools,
        masters,
        courses,
        selectedSchool,
        selectedMaster,
        selectedCourse,
        dispatch,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}
function useMain() {
  const context = useContext(QueryContext);
  if (context === undefined)
    throw new Error("MainContext was used outside of the MainProvider");
  return context;
}
export { MainProvider, useMain };
