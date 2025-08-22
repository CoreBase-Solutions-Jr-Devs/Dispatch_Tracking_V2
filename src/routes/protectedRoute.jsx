import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_ROUTES } from "./common/routePath";

const ProtectedRoute = ({ allowedRoles }) => {
  const { accessToken, user } = useSelector((state) => state.auth);

  // Wait until user state is loaded
  if (accessToken === undefined || user === undefined) return null;

  // Not logged in? redirect to sign-in
  if (!accessToken || !user) {
    return <Navigate to={AUTH_ROUTES.SIGN_IN} replace />;
  }

  // Role not allowed? redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user.userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
