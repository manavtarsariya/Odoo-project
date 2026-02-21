import api from "./axios";
import axios from "axios"

export const registerUser = (data) => {
    console.log(data, "hi")
  return axios.post("http://localhost:3000/api/auth/register", data);
};

export const verifyUser = (data) => {
    // console.log(data, "hi")
  return api.post("/api/inventory/auth/verify-otp", data);
};

export const loginUser = (data) => {
    // console.log(data,"i")
  return axios.post("http://localhost:3000/api/auth/login", data);
};

export const logoutUser = (data) => {
    // console.log(data,"i")
  return api.post("/api/inventory/auth/logout");
};