import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("token");

  return token ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/doctorlogin",
      }}
    />
  );
};

export default ProtectedRoute;
