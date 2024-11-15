import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-service-jscn.onrender.com/api",
});

export default API;