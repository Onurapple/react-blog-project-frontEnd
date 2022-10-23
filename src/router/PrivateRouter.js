import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const PrivateRouter = () => {
  let { currentUser } = useAuth();
  currentUser = {
    email: "test@gmail.com",
  };

  let location = useLocation();
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default PrivateRouter;
