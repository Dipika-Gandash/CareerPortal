import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles, blockIfBlocked = false  }) => {
  const user = useSelector((store) => store.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

   if (user.role === "recruiter" && user?.isBlocked && blockIfBlocked)
    return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoutes;
