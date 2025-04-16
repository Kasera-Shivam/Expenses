import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default AuthRoute;
