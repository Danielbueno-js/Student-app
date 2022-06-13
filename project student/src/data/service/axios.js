import axios from "axios";

export function getAPIClient() {
  const token = localStorage.getItem("user_token");

  const api = axios.create({
    baseURL: process.env.REACT_APP_URL
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }

  return api;
}
