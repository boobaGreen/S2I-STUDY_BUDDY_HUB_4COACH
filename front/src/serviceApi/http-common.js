import { baseURL } from "./const";
// axios setting for all the request in the app
import axios from "axios";

export default axios.create({
  baseURL: baseURL,
});
