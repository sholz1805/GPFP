import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const uniqueId = localStorage.getItem("uniqueId");

  if (!uniqueId) {
       return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
