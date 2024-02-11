
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useMain } from "../contexts/MainContext";


function GoogleOauth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch, jwtToken } = useMain();
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (jwtToken) {
      navigate("/home");
    }
    if (token) {
      Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
      dispatch({
        type: "main/setJwt",
        payload: token,
      });
    }
  }, [token, navigate, dispatch, jwtToken]);

  return (
    <div>
      {/* Puoi aggiungere contenuti aggiuntivi per questa route se necessario */}
      <h1>Google OAuth Redirect Page</h1>
    </div>
  );
}

export default GoogleOauth;
