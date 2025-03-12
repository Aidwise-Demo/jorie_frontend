import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./NavBar";

// For routes that should only be accessible to logged-out users
export const PublicRoute = () => {
  const token = localStorage.getItem("token");
  
  // If user is already logged in, redirect to home
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

// For routes that should only be accessible to logged-in users
export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default { PublicRoute, PrivateRoute };