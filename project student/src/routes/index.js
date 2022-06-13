import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { AuthProvider } from "../contexts/auth";
import Home from "../pages/home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Student from "../pages/Student";

const Private = ({ Item }) => {
  const token = localStorage.getItem("user_token");
  return token ? (
    <Fragment>
      <Sidebar />
      <Item />
    </Fragment>
  ) : (
    <Signin />
  );
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <AuthProvider>
          <Routes>
            <Route exact path="/home" element={<Private Item={Home} />} />
            <Route exact path="/student" element={<Private Item={Student} />} />
            <Route exact path="/student/:id" element={<Private Item={Student} />} />
            <Route path="/" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="*" element={<Signin />} />
          </Routes>{" "}
        </AuthProvider>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
