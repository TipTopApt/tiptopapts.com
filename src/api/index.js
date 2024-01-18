// import store from "../utils/store";
import axios from "axios";

const client = axios.create({
  baseURL: "https://test-api-tiptopapts-com-3hbx.onrender.com",
  // baseURL: "http://localhost:1212/api",
  // headers: {
  //   "x-access-token": store.getAccessToken(),
  // },
});

export default client;
