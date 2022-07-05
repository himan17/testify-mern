import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

let url = "https://testify-aimers.herokuapp.com/";

axios.defaults.baseURL = url;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "JWT_PAYLOAD"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
