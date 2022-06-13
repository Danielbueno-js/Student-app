import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [student, setStudent] = React.useState([{}]);
  const signin = async (body) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/auth/login`,
        body
      );
      if (data) {
        localStorage.setItem("user_token", data?.token);
        navigate("/home");
      }
    } catch (error) {
      return error;
    }
  };

  const signup = async (body) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/auth/register`,
        body
      );
      if (res?.status === 201 && res?.statusText === "Created") {
        navigate("/");
      }
    } catch (error) {
      return error;
    }
  };

  const signout = () => {
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ signin, signup, signout, student, setStudent }}
    >
      {children}
    </AuthContext.Provider>
  );
};
