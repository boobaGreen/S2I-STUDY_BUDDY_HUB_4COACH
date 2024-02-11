import { baseURL } from "./const";
// axios setting for all the request in the app
import axios from "axios";
import Cookies from "js-cookie";

const jwtToken = Cookies.get("jwt");

export default axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${jwtToken}`,
  },
});
