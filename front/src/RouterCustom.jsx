import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Cover from "./pages/Cover";
import Login from "./pages/Login";
import GoogleOauth from "./auth/GoogleOAuth";
import { useAuth } from "./hooks/useAuth";
import About from "./pages/About";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import ConfirmAccount from "./pages/ConfirmAccount";
import ForgetPassword from "./pages/ForgetPassword";
import ChangeForgetPassword from "./pages/ChangeForgetPassword";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import GroupsPage from "./pages/GroupsPage";
import { useMain } from "./contexts/MainContext";
import { io } from "socket.io-client";

function RouterCustom() {
  const { isAuth, role, jwtToken, dispatch } = useMain();

  const socketRef = useRef(); // At this point, socketRef.current is undefined

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_APP_BASE_URL_SOCKET);
    dispatch({
      type: "main/setSocket",
      payload: socketRef.current,
    });
  }, [dispatch]);

  const { isLoadingG, user, errorG } = useAuth(jwtToken);

  useEffect(() => {
    // console.log("user in RouterCustom:", user);

    if (!isAuth && user) {
      dispatch({
        type: "main/user/setUser",
        payload: user,
      });
    }
  }, [user, isAuth, jwtToken, dispatch]);

  const isAdmin = role === "admin" ? true : false;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="cover" />} />
          {/* Rotte protette per utenti autenticati */}
          <Route
            path="home"
            element={isAuth ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="logout"
            element={isAuth ? <Logout /> : <Navigate to="/" />}
          />

          <Route
            path="Admin"
            element={isAuth && isAdmin ? <AdminPanel /> : null}
          />
          <Route
            path="groups"
            element={isAuth ? <GroupsPage /> : <Navigate to="/" />}
          />
          {/* Rotte pubbliche accessibili solo agli utenti non autenticati */}

          <Route
            path="cover"
            element={!isAuth ? <Cover /> : <Navigate to="/home" />}
          />
          <Route
            path="login"
            element={!isAuth ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="googleOauth"
            element={!isAuth ? <GoogleOauth /> : <Navigate to="/home" />}
          />
          <Route
            path="signup"
            element={!isAuth ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="confirmAccount/:token"
            element={!isAuth ? <ConfirmAccount /> : <Navigate to="/home" />}
          />
          <Route
            path="forgetPassword"
            element={!isAuth ? <ForgetPassword /> : <Navigate to="/home" />}
          />
          <Route
            path="resetPassword/:token"
            element={
              !isAuth ? <ChangeForgetPassword /> : <Navigate to="/home" />
            }
          />

          {/* route accessibili allo stesso modo da utenti autrntificati o NO */}

          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterCustom;
