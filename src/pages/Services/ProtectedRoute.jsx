import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminRoute,
  redirect = "/login",
  redirectAdmin = "/me/profile",
}) => {
    if (!isAuthenticated) {
      console.log(isAuthenticated)
    return <Navigate to={redirect} />;
  }

  if (adminRoute && isAdmin?.user?.role!=="admin") {
    return <Navigate to={redirectAdmin} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;