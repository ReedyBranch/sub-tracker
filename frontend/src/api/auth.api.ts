import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5500/api/v1/auth",
  withCredentials: true,
});

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await API.post("/sign-up", { name, email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/sign-in", { email, password });
  return res.data;
};
