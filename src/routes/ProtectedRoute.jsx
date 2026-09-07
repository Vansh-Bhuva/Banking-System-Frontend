import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;